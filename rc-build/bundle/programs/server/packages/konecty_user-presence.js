(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var UsersSessions, UserPresence, UserPresenceEvents, UserPresenceMonitor;

var require = meteorInstall({"node_modules":{"meteor":{"konecty:user-presence":{"common":{"common.js":function module(){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/konecty_user-presence/common/common.js                                                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
/* globals UsersSessions */

/* exported UsersSessions */
UsersSessions = new Meteor.Collection('usersSessions');
///////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/konecty_user-presence/server/server.js                                                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
module.link("colors");

UsersSessions._ensureIndex({
  'connections.instanceId': 1
}, {
  sparse: 1,
  name: 'connections.instanceId'
});

UsersSessions._ensureIndex({
  'connections.id': 1
}, {
  sparse: 1,
  name: 'connections.id'
});

var allowedStatus = ['online', 'away', 'busy', 'offline'];
var logEnable = process.env.ENABLE_PRESENCE_LOGS === 'true';

var log = function (msg, color) {
  if (logEnable) {
    if (color) {
      console.log(msg[color]);
    } else {
      console.log(msg);
    }
  }
};

var logRed = function () {
  log(Array.prototype.slice.call(arguments).join(' '), 'red');
};

var logGrey = function () {
  log(Array.prototype.slice.call(arguments).join(' '), 'grey');
};

var logGreen = function () {
  log(Array.prototype.slice.call(arguments).join(' '), 'green');
};

var logYellow = function () {
  log(Array.prototype.slice.call(arguments).join(' '), 'yellow');
};

var checkUser = function (id, userId) {
  if (!id || !userId || id === userId) {
    return true;
  }

  var user = Meteor.users.findOne(id, {
    fields: {
      _id: 1
    }
  });

  if (user) {
    throw new Meteor.Error('cannot-change-other-users-status');
  }

  return true;
};

UserPresence = {
  activeLogs: function () {
    logEnable = true;
  },
  removeConnectionsByInstanceId: function (instanceId) {
    logRed('[user-presence] removeConnectionsByInstanceId', instanceId);
    var update = {
      $pull: {
        connections: {
          instanceId: instanceId
        }
      }
    };
    UsersSessions.update({}, update, {
      multi: true
    });
  },
  removeAllConnections: function () {
    logRed('[user-presence] removeAllConnections');
    UsersSessions.remove({});
  },

  getConnectionHandle(connectionId) {
    const internalConnection = Meteor.server.sessions.get(connectionId);

    if (!internalConnection) {
      return;
    }

    return internalConnection.connectionHandle;
  },

  createConnection: function (userId, connection, status, metadata) {
    // if connections is invalid, does not have an userId or is already closed, don't save it on db
    if (!userId || !connection.id) {
      return;
    }

    const connectionHandle = UserPresence.getConnectionHandle(connection.id);

    if (!connectionHandle || connectionHandle.closed) {
      return;
    }

    connectionHandle.UserPresenceUserId = userId;
    status = status || 'online';
    logGreen('[user-presence] createConnection', userId, connection.id, status, metadata);
    var query = {
      _id: userId
    };
    var now = new Date();
    var instanceId = undefined;

    if (Package['konecty:multiple-instances-status']) {
      instanceId = InstanceStatus.id();
    }

    var update = {
      $push: {
        connections: {
          id: connection.id,
          instanceId: instanceId,
          status: status,
          _createdAt: now,
          _updatedAt: now
        }
      }
    };

    if (metadata) {
      update.$set = {
        metadata: metadata
      };
      connection.metadata = metadata;
    } // make sure closed connections are being created


    if (!connectionHandle.closed) {
      UsersSessions.upsert(query, update);
    }
  },
  setConnection: function (userId, connection, status) {
    if (!userId) {
      return;
    }

    logGrey('[user-presence] setConnection', userId, connection.id, status);
    var query = {
      _id: userId,
      'connections.id': connection.id
    };
    var now = new Date();
    var update = {
      $set: {
        'connections.$.status': status,
        'connections.$._updatedAt': now
      }
    };

    if (connection.metadata) {
      update.$set.metadata = connection.metadata;
    }

    var count = UsersSessions.update(query, update);

    if (count === 0) {
      return UserPresence.createConnection(userId, connection, status, connection.metadata);
    }

    if (status === 'online') {
      Meteor.users.update({
        _id: userId,
        statusDefault: 'online',
        status: {
          $ne: 'online'
        }
      }, {
        $set: {
          status: 'online'
        }
      });
    } else if (status === 'away') {
      Meteor.users.update({
        _id: userId,
        statusDefault: 'online',
        status: {
          $ne: 'away'
        }
      }, {
        $set: {
          status: 'away'
        }
      });
    }
  },
  setDefaultStatus: function (userId, status) {
    if (!userId) {
      return;
    }

    if (allowedStatus.indexOf(status) === -1) {
      return;
    }

    logYellow('[user-presence] setDefaultStatus', userId, status);
    var update = Meteor.users.update({
      _id: userId,
      statusDefault: {
        $ne: status
      }
    }, {
      $set: {
        statusDefault: status
      }
    });

    if (update > 0) {
      UserPresenceMonitor.processUser(userId, {
        statusDefault: status
      });
    }
  },
  removeConnection: function (connectionId) {
    logRed('[user-presence] removeConnection', connectionId);
    var query = {
      'connections.id': connectionId
    };
    var update = {
      $pull: {
        connections: {
          id: connectionId
        }
      }
    };
    return UsersSessions.update(query, update);
  },
  start: function () {
    Meteor.onConnection(function (connection) {
      const session = Meteor.server.sessions.get(connection.id);
      connection.onClose(function () {
        if (!session) {
          return;
        }

        const connectionHandle = session.connectionHandle; // mark connection as closed so if it drops in the middle of the process it doesn't even is created

        if (!connectionHandle) {
          return;
        }

        connectionHandle.closed = true;

        if (connectionHandle.UserPresenceUserId != null) {
          UserPresence.removeConnection(connection.id);
        }
      });
    });
    process.on('exit', Meteor.bindEnvironment(function () {
      if (Package['konecty:multiple-instances-status']) {
        UserPresence.removeConnectionsByInstanceId(InstanceStatus.id());
      } else {
        UserPresence.removeAllConnections();
      }
    }));

    if (Package['accounts-base']) {
      Accounts.onLogin(function (login) {
        UserPresence.createConnection(login.user._id, login.connection);
      });
      Accounts.onLogout(function (login) {
        UserPresence.removeConnection(login.connection.id);
      });
    }

    Meteor.publish(null, function () {
      if (this.userId == null && this.connection && this.connection.id) {
        const connectionHandle = UserPresence.getConnectionHandle(this.connection.id);

        if (connectionHandle && connectionHandle.UserPresenceUserId != null) {
          UserPresence.removeConnection(this.connection.id);
        }
      }

      this.ready();
    });
    UserPresenceEvents.on('setStatus', function (userId, status) {
      var user = Meteor.users.findOne(userId);
      var statusConnection = status;

      if (!user) {
        return;
      }

      if (user.statusDefault != null && status !== 'offline' && user.statusDefault !== 'online') {
        status = user.statusDefault;
      }

      var query = {
        _id: userId,
        $or: [{
          status: {
            $ne: status
          }
        }, {
          statusConnection: {
            $ne: statusConnection
          }
        }]
      };
      var update = {
        $set: {
          status: status,
          statusConnection: statusConnection
        }
      };
      const result = Meteor.users.update(query, update); // if nothing updated, do not emit anything

      if (result) {
        UserPresenceEvents.emit('setUserStatus', user, status, statusConnection);
      }
    });
    Meteor.methods({
      'UserPresence:connect': function (id, metadata) {
        check(id, Match.Maybe(String));
        check(metadata, Match.Maybe(Object));
        this.unblock();
        checkUser(id, this.userId);
        UserPresence.createConnection(id || this.userId, this.connection, 'online', metadata);
      },
      'UserPresence:away': function (id) {
        check(id, Match.Maybe(String));
        this.unblock();
        checkUser(id, this.userId);
        UserPresence.setConnection(id || this.userId, this.connection, 'away');
      },
      'UserPresence:online': function (id) {
        check(id, Match.Maybe(String));
        this.unblock();
        checkUser(id, this.userId);
        UserPresence.setConnection(id || this.userId, this.connection, 'online');
      },
      'UserPresence:setDefaultStatus': function (id, status) {
        check(id, Match.Maybe(String));
        check(status, Match.Maybe(String));
        this.unblock(); // backward compatible (receives status as first argument)

        if (arguments.length === 1) {
          UserPresence.setDefaultStatus(this.userId, id);
          return;
        }

        checkUser(id, this.userId);
        UserPresence.setDefaultStatus(id || this.userId, status);
      }
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

},"monitor.js":function module(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// packages/konecty_user-presence/server/monitor.js                                                  //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
/* globals UserPresenceMonitor, UsersSessions, InstanceStatus */
var EventEmitter = Npm.require('events');

UserPresenceEvents = new EventEmitter();

function monitorUsersSessions() {
  UsersSessions.find({}).observe({
    added: function (record) {
      UserPresenceMonitor.processUserSession(record, 'added');
    },
    changed: function (record) {
      UserPresenceMonitor.processUserSession(record, 'changed');
    },
    removed: function (record) {
      UserPresenceMonitor.processUserSession(record, 'removed');
    }
  });
}

function monitorDeletedServers() {
  InstanceStatus.getCollection().find({}, {
    fields: {
      _id: 1
    }
  }).observeChanges({
    removed: function (id) {
      UserPresence.removeConnectionsByInstanceId(id);
    }
  });
}

function removeLostConnections() {
  if (!Package['konecty:multiple-instances-status']) {
    return UsersSessions.remove({});
  }

  var ids = InstanceStatus.getCollection().find({}, {
    fields: {
      _id: 1
    }
  }).fetch().map(function (id) {
    return id._id;
  });
  var update = {
    $pull: {
      connections: {
        instanceId: {
          $nin: ids
        }
      }
    }
  };
  UsersSessions.update({}, update, {
    multi: true
  });
}

UserPresenceMonitor = {
  /**
   * The callback will receive the following parameters: user, status, statusConnection
   */
  onSetUserStatus: function (callback) {
    UserPresenceEvents.on('setUserStatus', callback);
  },
  // following actions/observers will run only when presence monitor turned on
  start: function () {
    monitorUsersSessions();
    removeLostConnections();

    if (Package['konecty:multiple-instances-status']) {
      monitorDeletedServers();
    }
  },
  processUserSession: function (record, action) {
    if (action === 'removed' && (record.connections == null || record.connections.length === 0)) {
      return;
    }

    if (record.connections == null || record.connections.length === 0 || action === 'removed') {
      UserPresenceMonitor.setStatus(record._id, 'offline', record.metadata);

      if (action !== 'removed') {
        UsersSessions.remove({
          _id: record._id,
          'connections.0': {
            $exists: false
          }
        });
      }

      return;
    }

    var connectionStatus = 'offline';
    record.connections.forEach(function (connection) {
      if (connection.status === 'online') {
        connectionStatus = 'online';
      } else if (connection.status === 'away' && connectionStatus === 'offline') {
        connectionStatus = 'away';
      }
    });
    UserPresenceMonitor.setStatus(record._id, connectionStatus, record.metadata);
  },
  processUser: function (id, fields) {
    if (fields.statusDefault == null) {
      return;
    }

    var userSession = UsersSessions.findOne({
      _id: id
    });

    if (userSession) {
      UserPresenceMonitor.processUserSession(userSession, 'changed');
    }
  },
  setStatus: function (id, status, metadata) {
    UserPresenceEvents.emit('setStatus', id, status, metadata);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

}},"node_modules":{"colors":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// node_modules/meteor/konecty_user-presence/node_modules/colors/package.json                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
module.exports = {
  "name": "colors",
  "version": "1.3.2",
  "main": "lib/index.js"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
// node_modules/meteor/konecty_user-presence/node_modules/colors/lib/index.js                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/konecty:user-presence/common/common.js");
require("/node_modules/meteor/konecty:user-presence/server/server.js");
require("/node_modules/meteor/konecty:user-presence/server/monitor.js");

/* Exports */
Package._define("konecty:user-presence", {
  UserPresence: UserPresence,
  UsersSessions: UsersSessions,
  UserPresenceMonitor: UserPresenceMonitor,
  UserPresenceEvents: UserPresenceEvents
});

})();

//# sourceURL=meteor://💻app/packages/konecty_user-presence.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMva29uZWN0eTp1c2VyLXByZXNlbmNlL2NvbW1vbi9jb21tb24uanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2tvbmVjdHk6dXNlci1wcmVzZW5jZS9zZXJ2ZXIvc2VydmVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9rb25lY3R5OnVzZXItcHJlc2VuY2Uvc2VydmVyL21vbml0b3IuanMiXSwibmFtZXMiOlsiVXNlcnNTZXNzaW9ucyIsIk1ldGVvciIsIkNvbGxlY3Rpb24iLCJtb2R1bGUiLCJsaW5rIiwiX2Vuc3VyZUluZGV4Iiwic3BhcnNlIiwibmFtZSIsImFsbG93ZWRTdGF0dXMiLCJsb2dFbmFibGUiLCJwcm9jZXNzIiwiZW52IiwiRU5BQkxFX1BSRVNFTkNFX0xPR1MiLCJsb2ciLCJtc2ciLCJjb2xvciIsImNvbnNvbGUiLCJsb2dSZWQiLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImpvaW4iLCJsb2dHcmV5IiwibG9nR3JlZW4iLCJsb2dZZWxsb3ciLCJjaGVja1VzZXIiLCJpZCIsInVzZXJJZCIsInVzZXIiLCJ1c2VycyIsImZpbmRPbmUiLCJmaWVsZHMiLCJfaWQiLCJFcnJvciIsIlVzZXJQcmVzZW5jZSIsImFjdGl2ZUxvZ3MiLCJyZW1vdmVDb25uZWN0aW9uc0J5SW5zdGFuY2VJZCIsImluc3RhbmNlSWQiLCJ1cGRhdGUiLCIkcHVsbCIsImNvbm5lY3Rpb25zIiwibXVsdGkiLCJyZW1vdmVBbGxDb25uZWN0aW9ucyIsInJlbW92ZSIsImdldENvbm5lY3Rpb25IYW5kbGUiLCJjb25uZWN0aW9uSWQiLCJpbnRlcm5hbENvbm5lY3Rpb24iLCJzZXJ2ZXIiLCJzZXNzaW9ucyIsImdldCIsImNvbm5lY3Rpb25IYW5kbGUiLCJjcmVhdGVDb25uZWN0aW9uIiwiY29ubmVjdGlvbiIsInN0YXR1cyIsIm1ldGFkYXRhIiwiY2xvc2VkIiwiVXNlclByZXNlbmNlVXNlcklkIiwicXVlcnkiLCJub3ciLCJEYXRlIiwidW5kZWZpbmVkIiwiUGFja2FnZSIsIkluc3RhbmNlU3RhdHVzIiwiJHB1c2giLCJfY3JlYXRlZEF0IiwiX3VwZGF0ZWRBdCIsIiRzZXQiLCJ1cHNlcnQiLCJzZXRDb25uZWN0aW9uIiwiY291bnQiLCJzdGF0dXNEZWZhdWx0IiwiJG5lIiwic2V0RGVmYXVsdFN0YXR1cyIsImluZGV4T2YiLCJVc2VyUHJlc2VuY2VNb25pdG9yIiwicHJvY2Vzc1VzZXIiLCJyZW1vdmVDb25uZWN0aW9uIiwic3RhcnQiLCJvbkNvbm5lY3Rpb24iLCJzZXNzaW9uIiwib25DbG9zZSIsIm9uIiwiYmluZEVudmlyb25tZW50IiwiQWNjb3VudHMiLCJvbkxvZ2luIiwibG9naW4iLCJvbkxvZ291dCIsInB1Ymxpc2giLCJyZWFkeSIsIlVzZXJQcmVzZW5jZUV2ZW50cyIsInN0YXR1c0Nvbm5lY3Rpb24iLCIkb3IiLCJyZXN1bHQiLCJlbWl0IiwibWV0aG9kcyIsImNoZWNrIiwiTWF0Y2giLCJNYXliZSIsIlN0cmluZyIsIk9iamVjdCIsInVuYmxvY2siLCJsZW5ndGgiLCJFdmVudEVtaXR0ZXIiLCJOcG0iLCJyZXF1aXJlIiwibW9uaXRvclVzZXJzU2Vzc2lvbnMiLCJmaW5kIiwib2JzZXJ2ZSIsImFkZGVkIiwicmVjb3JkIiwicHJvY2Vzc1VzZXJTZXNzaW9uIiwiY2hhbmdlZCIsInJlbW92ZWQiLCJtb25pdG9yRGVsZXRlZFNlcnZlcnMiLCJnZXRDb2xsZWN0aW9uIiwib2JzZXJ2ZUNoYW5nZXMiLCJyZW1vdmVMb3N0Q29ubmVjdGlvbnMiLCJpZHMiLCJmZXRjaCIsIm1hcCIsIiRuaW4iLCJvblNldFVzZXJTdGF0dXMiLCJjYWxsYmFjayIsImFjdGlvbiIsInNldFN0YXR1cyIsIiRleGlzdHMiLCJjb25uZWN0aW9uU3RhdHVzIiwiZm9yRWFjaCIsInVzZXJTZXNzaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FB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LFdBQVcsR0FBR2xJLGFBQWEsQ0FBQ2dDLE9BQWQsQ0FBc0I7QUFBQ0UsU0FBRyxFQUFFTjtBQUFOLEtBQXRCLENBQWxCOztBQUVBLFFBQUlzRyxXQUFKLEVBQWlCO0FBQ2hCdEQseUJBQW1CLENBQUNvQyxrQkFBcEIsQ0FBdUNrQixXQUF2QyxFQUFvRCxTQUFwRDtBQUNBO0FBQ0QsR0F0RG9CO0FBd0RyQkosV0FBUyxFQUFFLFVBQVNsRyxFQUFULEVBQWEyQixNQUFiLEVBQXFCQyxRQUFyQixFQUErQjtBQUN6Q21DLHNCQUFrQixDQUFDSSxJQUFuQixDQUF3QixXQUF4QixFQUFxQ25FLEVBQXJDLEVBQXlDMkIsTUFBekMsRUFBaURDLFFBQWpEO0FBQ0E7QUExRG9CLENBQXRCLEMiLCJmaWxlIjoiL3BhY2thZ2VzL2tvbmVjdHlfdXNlci1wcmVzZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbHMgVXNlcnNTZXNzaW9ucyAqL1xuLyogZXhwb3J0ZWQgVXNlcnNTZXNzaW9ucyAqL1xuXG5Vc2Vyc1Nlc3Npb25zID0gbmV3IE1ldGVvci5Db2xsZWN0aW9uKCd1c2Vyc1Nlc3Npb25zJyk7XG4iLCIvKiBnbG9iYWxzIEluc3RhbmNlU3RhdHVzLCBVc2Vyc1Nlc3Npb25zLCBVc2VyUHJlc2VuY2VNb25pdG9yLCBVc2VyUHJlc2VuY2UgKi9cbmltcG9ydCAnY29sb3JzJztcblxuVXNlcnNTZXNzaW9ucy5fZW5zdXJlSW5kZXgoeydjb25uZWN0aW9ucy5pbnN0YW5jZUlkJzogMX0sIHtzcGFyc2U6IDEsIG5hbWU6ICdjb25uZWN0aW9ucy5pbnN0YW5jZUlkJ30pO1xuVXNlcnNTZXNzaW9ucy5fZW5zdXJlSW5kZXgoeydjb25uZWN0aW9ucy5pZCc6IDF9LCB7c3BhcnNlOiAxLCBuYW1lOiAnY29ubmVjdGlvbnMuaWQnfSk7XG5cbnZhciBhbGxvd2VkU3RhdHVzID0gWydvbmxpbmUnLCAnYXdheScsICdidXN5JywgJ29mZmxpbmUnXTtcblxudmFyIGxvZ0VuYWJsZSA9IHByb2Nlc3MuZW52LkVOQUJMRV9QUkVTRU5DRV9MT0dTID09PSAndHJ1ZSc7XG5cbnZhciBsb2cgPSBmdW5jdGlvbihtc2csIGNvbG9yKSB7XG5cdGlmIChsb2dFbmFibGUpIHtcblx0XHRpZiAoY29sb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKG1zZ1tjb2xvcl0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLmxvZyhtc2cpO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGxvZ1JlZCA9IGZ1bmN0aW9uKCkge1xuXHRsb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJyksICdyZWQnKTtcbn07XG52YXIgbG9nR3JleSA9IGZ1bmN0aW9uKCkge1xuXHRsb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJyksICdncmV5Jyk7XG59O1xudmFyIGxvZ0dyZWVuID0gZnVuY3Rpb24oKSB7XG5cdGxvZyhBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oJyAnKSwgJ2dyZWVuJyk7XG59O1xudmFyIGxvZ1llbGxvdyA9IGZ1bmN0aW9uKCkge1xuXHRsb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5qb2luKCcgJyksICd5ZWxsb3cnKTtcbn07XG5cbnZhciBjaGVja1VzZXIgPSBmdW5jdGlvbihpZCwgdXNlcklkKSB7XG5cdGlmICghaWQgfHwgIXVzZXJJZCB8fCBpZCA9PT0gdXNlcklkKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0dmFyIHVzZXIgPSBNZXRlb3IudXNlcnMuZmluZE9uZShpZCwgeyBmaWVsZHM6IHsgX2lkOiAxIH0gfSk7XG5cdGlmICh1c2VyKSB7XG5cdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignY2Fubm90LWNoYW5nZS1vdGhlci11c2Vycy1zdGF0dXMnKTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5Vc2VyUHJlc2VuY2UgPSB7XG5cdGFjdGl2ZUxvZ3M6IGZ1bmN0aW9uKCkge1xuXHRcdGxvZ0VuYWJsZSA9IHRydWU7XG5cdH0sXG5cblx0cmVtb3ZlQ29ubmVjdGlvbnNCeUluc3RhbmNlSWQ6IGZ1bmN0aW9uKGluc3RhbmNlSWQpIHtcblx0XHRsb2dSZWQoJ1t1c2VyLXByZXNlbmNlXSByZW1vdmVDb25uZWN0aW9uc0J5SW5zdGFuY2VJZCcsIGluc3RhbmNlSWQpO1xuXHRcdHZhciB1cGRhdGUgPSB7XG5cdFx0XHQkcHVsbDoge1xuXHRcdFx0XHRjb25uZWN0aW9uczoge1xuXHRcdFx0XHRcdGluc3RhbmNlSWQ6IGluc3RhbmNlSWRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRVc2Vyc1Nlc3Npb25zLnVwZGF0ZSh7fSwgdXBkYXRlLCB7bXVsdGk6IHRydWV9KTtcblx0fSxcblxuXHRyZW1vdmVBbGxDb25uZWN0aW9uczogZnVuY3Rpb24oKSB7XG5cdFx0bG9nUmVkKCdbdXNlci1wcmVzZW5jZV0gcmVtb3ZlQWxsQ29ubmVjdGlvbnMnKTtcblx0XHRVc2Vyc1Nlc3Npb25zLnJlbW92ZSh7fSk7XG5cdH0sXG5cblx0Z2V0Q29ubmVjdGlvbkhhbmRsZShjb25uZWN0aW9uSWQpIHtcblx0XHRjb25zdCBpbnRlcm5hbENvbm5lY3Rpb24gPSBNZXRlb3Iuc2VydmVyLnNlc3Npb25zLmdldChjb25uZWN0aW9uSWQpO1xuXG5cdFx0aWYgKCFpbnRlcm5hbENvbm5lY3Rpb24pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW50ZXJuYWxDb25uZWN0aW9uLmNvbm5lY3Rpb25IYW5kbGU7XG5cdH0sXG5cblx0Y3JlYXRlQ29ubmVjdGlvbjogZnVuY3Rpb24odXNlcklkLCBjb25uZWN0aW9uLCBzdGF0dXMsIG1ldGFkYXRhKSB7XG5cdFx0Ly8gaWYgY29ubmVjdGlvbnMgaXMgaW52YWxpZCwgZG9lcyBub3QgaGF2ZSBhbiB1c2VySWQgb3IgaXMgYWxyZWFkeSBjbG9zZWQsIGRvbid0IHNhdmUgaXQgb24gZGJcblx0XHRpZiAoIXVzZXJJZCB8fCAhY29ubmVjdGlvbi5pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGNvbm5lY3Rpb25IYW5kbGUgPSBVc2VyUHJlc2VuY2UuZ2V0Q29ubmVjdGlvbkhhbmRsZShjb25uZWN0aW9uLmlkKTtcblxuXHRcdGlmICghY29ubmVjdGlvbkhhbmRsZSB8fCBjb25uZWN0aW9uSGFuZGxlLmNsb3NlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbm5lY3Rpb25IYW5kbGUuVXNlclByZXNlbmNlVXNlcklkID0gdXNlcklkO1xuXG5cdFx0c3RhdHVzID0gc3RhdHVzIHx8ICdvbmxpbmUnO1xuXG5cdFx0bG9nR3JlZW4oJ1t1c2VyLXByZXNlbmNlXSBjcmVhdGVDb25uZWN0aW9uJywgdXNlcklkLCBjb25uZWN0aW9uLmlkLCBzdGF0dXMsIG1ldGFkYXRhKTtcblxuXHRcdHZhciBxdWVyeSA9IHtcblx0XHRcdF9pZDogdXNlcklkXG5cdFx0fTtcblxuXHRcdHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuXG5cdFx0dmFyIGluc3RhbmNlSWQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKFBhY2thZ2VbJ2tvbmVjdHk6bXVsdGlwbGUtaW5zdGFuY2VzLXN0YXR1cyddKSB7XG5cdFx0XHRpbnN0YW5jZUlkID0gSW5zdGFuY2VTdGF0dXMuaWQoKTtcblx0XHR9XG5cblx0XHR2YXIgdXBkYXRlID0ge1xuXHRcdFx0JHB1c2g6IHtcblx0XHRcdFx0Y29ubmVjdGlvbnM6IHtcblx0XHRcdFx0XHRpZDogY29ubmVjdGlvbi5pZCxcblx0XHRcdFx0XHRpbnN0YW5jZUlkOiBpbnN0YW5jZUlkLFxuXHRcdFx0XHRcdHN0YXR1czogc3RhdHVzLFxuXHRcdFx0XHRcdF9jcmVhdGVkQXQ6IG5vdyxcblx0XHRcdFx0XHRfdXBkYXRlZEF0OiBub3dcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpZiAobWV0YWRhdGEpIHtcblx0XHRcdHVwZGF0ZS4kc2V0ID0ge1xuXHRcdFx0XHRtZXRhZGF0YTogbWV0YWRhdGFcblx0XHRcdH07XG5cdFx0XHRjb25uZWN0aW9uLm1ldGFkYXRhID0gbWV0YWRhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gbWFrZSBzdXJlIGNsb3NlZCBjb25uZWN0aW9ucyBhcmUgYmVpbmcgY3JlYXRlZFxuXHRcdGlmICghY29ubmVjdGlvbkhhbmRsZS5jbG9zZWQpIHtcblx0XHRcdFVzZXJzU2Vzc2lvbnMudXBzZXJ0KHF1ZXJ5LCB1cGRhdGUpO1xuXHRcdH1cblx0fSxcblxuXHRzZXRDb25uZWN0aW9uOiBmdW5jdGlvbih1c2VySWQsIGNvbm5lY3Rpb24sIHN0YXR1cykge1xuXHRcdGlmICghdXNlcklkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9nR3JleSgnW3VzZXItcHJlc2VuY2VdIHNldENvbm5lY3Rpb24nLCB1c2VySWQsIGNvbm5lY3Rpb24uaWQsIHN0YXR1cyk7XG5cblx0XHR2YXIgcXVlcnkgPSB7XG5cdFx0XHRfaWQ6IHVzZXJJZCxcblx0XHRcdCdjb25uZWN0aW9ucy5pZCc6IGNvbm5lY3Rpb24uaWRcblx0XHR9O1xuXG5cdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCk7XG5cblx0XHR2YXIgdXBkYXRlID0ge1xuXHRcdFx0JHNldDoge1xuXHRcdFx0XHQnY29ubmVjdGlvbnMuJC5zdGF0dXMnOiBzdGF0dXMsXG5cdFx0XHRcdCdjb25uZWN0aW9ucy4kLl91cGRhdGVkQXQnOiBub3dcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aWYgKGNvbm5lY3Rpb24ubWV0YWRhdGEpIHtcblx0XHRcdHVwZGF0ZS4kc2V0Lm1ldGFkYXRhID0gY29ubmVjdGlvbi5tZXRhZGF0YTtcblx0XHR9XG5cblx0XHR2YXIgY291bnQgPSBVc2Vyc1Nlc3Npb25zLnVwZGF0ZShxdWVyeSwgdXBkYXRlKTtcblxuXHRcdGlmIChjb3VudCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIFVzZXJQcmVzZW5jZS5jcmVhdGVDb25uZWN0aW9uKHVzZXJJZCwgY29ubmVjdGlvbiwgc3RhdHVzLCBjb25uZWN0aW9uLm1ldGFkYXRhKTtcblx0XHR9XG5cblx0XHRpZiAoc3RhdHVzID09PSAnb25saW5lJykge1xuXHRcdFx0TWV0ZW9yLnVzZXJzLnVwZGF0ZSh7X2lkOiB1c2VySWQsIHN0YXR1c0RlZmF1bHQ6ICdvbmxpbmUnLCBzdGF0dXM6IHskbmU6ICdvbmxpbmUnfX0sIHskc2V0OiB7c3RhdHVzOiAnb25saW5lJ319KTtcblx0XHR9IGVsc2UgaWYgKHN0YXR1cyA9PT0gJ2F3YXknKSB7XG5cdFx0XHRNZXRlb3IudXNlcnMudXBkYXRlKHtfaWQ6IHVzZXJJZCwgc3RhdHVzRGVmYXVsdDogJ29ubGluZScsIHN0YXR1czogeyRuZTogJ2F3YXknfX0sIHskc2V0OiB7c3RhdHVzOiAnYXdheSd9fSk7XG5cdFx0fVxuXHR9LFxuXG5cdHNldERlZmF1bHRTdGF0dXM6IGZ1bmN0aW9uKHVzZXJJZCwgc3RhdHVzKSB7XG5cdFx0aWYgKCF1c2VySWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoYWxsb3dlZFN0YXR1cy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bG9nWWVsbG93KCdbdXNlci1wcmVzZW5jZV0gc2V0RGVmYXVsdFN0YXR1cycsIHVzZXJJZCwgc3RhdHVzKTtcblxuXHRcdHZhciB1cGRhdGUgPSBNZXRlb3IudXNlcnMudXBkYXRlKHtfaWQ6IHVzZXJJZCwgc3RhdHVzRGVmYXVsdDogeyRuZTogc3RhdHVzfX0sIHskc2V0OiB7c3RhdHVzRGVmYXVsdDogc3RhdHVzfX0pO1xuXG5cdFx0aWYgKHVwZGF0ZSA+IDApIHtcblx0XHRcdFVzZXJQcmVzZW5jZU1vbml0b3IucHJvY2Vzc1VzZXIodXNlcklkLCB7IHN0YXR1c0RlZmF1bHQ6IHN0YXR1cyB9KTtcblx0XHR9XG5cdH0sXG5cblx0cmVtb3ZlQ29ubmVjdGlvbjogZnVuY3Rpb24oY29ubmVjdGlvbklkKSB7XG5cdFx0bG9nUmVkKCdbdXNlci1wcmVzZW5jZV0gcmVtb3ZlQ29ubmVjdGlvbicsIGNvbm5lY3Rpb25JZCk7XG5cblx0XHR2YXIgcXVlcnkgPSB7XG5cdFx0XHQnY29ubmVjdGlvbnMuaWQnOiBjb25uZWN0aW9uSWRcblx0XHR9O1xuXG5cdFx0dmFyIHVwZGF0ZSA9IHtcblx0XHRcdCRwdWxsOiB7XG5cdFx0XHRcdGNvbm5lY3Rpb25zOiB7XG5cdFx0XHRcdFx0aWQ6IGNvbm5lY3Rpb25JZFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBVc2Vyc1Nlc3Npb25zLnVwZGF0ZShxdWVyeSwgdXBkYXRlKTtcblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24oKSB7XG5cdFx0TWV0ZW9yLm9uQ29ubmVjdGlvbihmdW5jdGlvbihjb25uZWN0aW9uKSB7XG5cdFx0XHRjb25zdCBzZXNzaW9uID0gTWV0ZW9yLnNlcnZlci5zZXNzaW9ucy5nZXQoY29ubmVjdGlvbi5pZCk7XG5cblx0XHRcdGNvbm5lY3Rpb24ub25DbG9zZShmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCFzZXNzaW9uKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgY29ubmVjdGlvbkhhbmRsZSA9IHNlc3Npb24uY29ubmVjdGlvbkhhbmRsZTtcblxuXHRcdFx0XHQvLyBtYXJrIGNvbm5lY3Rpb24gYXMgY2xvc2VkIHNvIGlmIGl0IGRyb3BzIGluIHRoZSBtaWRkbGUgb2YgdGhlIHByb2Nlc3MgaXQgZG9lc24ndCBldmVuIGlzIGNyZWF0ZWRcblx0XHRcdFx0aWYgKCFjb25uZWN0aW9uSGFuZGxlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbm5lY3Rpb25IYW5kbGUuY2xvc2VkID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAoY29ubmVjdGlvbkhhbmRsZS5Vc2VyUHJlc2VuY2VVc2VySWQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFVzZXJQcmVzZW5jZS5yZW1vdmVDb25uZWN0aW9uKGNvbm5lY3Rpb24uaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHByb2Nlc3Mub24oJ2V4aXQnLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKFBhY2thZ2VbJ2tvbmVjdHk6bXVsdGlwbGUtaW5zdGFuY2VzLXN0YXR1cyddKSB7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5yZW1vdmVDb25uZWN0aW9uc0J5SW5zdGFuY2VJZChJbnN0YW5jZVN0YXR1cy5pZCgpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5yZW1vdmVBbGxDb25uZWN0aW9ucygpO1xuXHRcdFx0fVxuXHRcdH0pKTtcblxuXHRcdGlmIChQYWNrYWdlWydhY2NvdW50cy1iYXNlJ10pIHtcblx0XHRcdEFjY291bnRzLm9uTG9naW4oZnVuY3Rpb24obG9naW4pIHtcblx0XHRcdFx0VXNlclByZXNlbmNlLmNyZWF0ZUNvbm5lY3Rpb24obG9naW4udXNlci5faWQsIGxvZ2luLmNvbm5lY3Rpb24pO1xuXHRcdFx0fSk7XG5cblx0XHRcdEFjY291bnRzLm9uTG9nb3V0KGZ1bmN0aW9uKGxvZ2luKSB7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5yZW1vdmVDb25uZWN0aW9uKGxvZ2luLmNvbm5lY3Rpb24uaWQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0TWV0ZW9yLnB1Ymxpc2gobnVsbCwgZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodGhpcy51c2VySWQgPT0gbnVsbCAmJiB0aGlzLmNvbm5lY3Rpb24gJiYgdGhpcy5jb25uZWN0aW9uLmlkKSB7XG5cdFx0XHRcdGNvbnN0IGNvbm5lY3Rpb25IYW5kbGUgPSBVc2VyUHJlc2VuY2UuZ2V0Q29ubmVjdGlvbkhhbmRsZSh0aGlzLmNvbm5lY3Rpb24uaWQpO1xuXHRcdFx0XHRpZiAoY29ubmVjdGlvbkhhbmRsZSAmJiBjb25uZWN0aW9uSGFuZGxlLlVzZXJQcmVzZW5jZVVzZXJJZCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0VXNlclByZXNlbmNlLnJlbW92ZUNvbm5lY3Rpb24odGhpcy5jb25uZWN0aW9uLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlYWR5KCk7XG5cdFx0fSk7XG5cblx0XHRVc2VyUHJlc2VuY2VFdmVudHMub24oJ3NldFN0YXR1cycsIGZ1bmN0aW9uKHVzZXJJZCwgc3RhdHVzKSB7XG5cdFx0XHR2YXIgdXNlciA9IE1ldGVvci51c2Vycy5maW5kT25lKHVzZXJJZCk7XG5cdFx0XHR2YXIgc3RhdHVzQ29ubmVjdGlvbiA9IHN0YXR1cztcblxuXHRcdFx0aWYgKCF1c2VyKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHVzZXIuc3RhdHVzRGVmYXVsdCAhPSBudWxsICYmIHN0YXR1cyAhPT0gJ29mZmxpbmUnICYmIHVzZXIuc3RhdHVzRGVmYXVsdCAhPT0gJ29ubGluZScpIHtcblx0XHRcdFx0c3RhdHVzID0gdXNlci5zdGF0dXNEZWZhdWx0O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcXVlcnkgPSB7XG5cdFx0XHRcdF9pZDogdXNlcklkLFxuXHRcdFx0XHQkb3I6IFtcblx0XHRcdFx0XHR7c3RhdHVzOiB7JG5lOiBzdGF0dXN9fSxcblx0XHRcdFx0XHR7c3RhdHVzQ29ubmVjdGlvbjogeyRuZTogc3RhdHVzQ29ubmVjdGlvbn19XG5cdFx0XHRcdF1cblx0XHRcdH07XG5cblx0XHRcdHZhciB1cGRhdGUgPSB7XG5cdFx0XHRcdCRzZXQ6IHtcblx0XHRcdFx0XHRzdGF0dXM6IHN0YXR1cyxcblx0XHRcdFx0XHRzdGF0dXNDb25uZWN0aW9uOiBzdGF0dXNDb25uZWN0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGNvbnN0IHJlc3VsdCA9IE1ldGVvci51c2Vycy51cGRhdGUocXVlcnksIHVwZGF0ZSk7XG5cblx0XHRcdC8vIGlmIG5vdGhpbmcgdXBkYXRlZCwgZG8gbm90IGVtaXQgYW55dGhpbmdcblx0XHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdFx0VXNlclByZXNlbmNlRXZlbnRzLmVtaXQoJ3NldFVzZXJTdGF0dXMnLCB1c2VyLCBzdGF0dXMsIHN0YXR1c0Nvbm5lY3Rpb24pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0TWV0ZW9yLm1ldGhvZHMoe1xuXHRcdFx0J1VzZXJQcmVzZW5jZTpjb25uZWN0JzogZnVuY3Rpb24oaWQsIG1ldGFkYXRhKSB7XG5cdFx0XHRcdGNoZWNrKGlkLCBNYXRjaC5NYXliZShTdHJpbmcpKTtcblx0XHRcdFx0Y2hlY2sobWV0YWRhdGEsIE1hdGNoLk1heWJlKE9iamVjdCkpO1xuXHRcdFx0XHR0aGlzLnVuYmxvY2soKTtcblx0XHRcdFx0Y2hlY2tVc2VyKGlkLCB0aGlzLnVzZXJJZCk7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5jcmVhdGVDb25uZWN0aW9uKGlkIHx8IHRoaXMudXNlcklkLCB0aGlzLmNvbm5lY3Rpb24sICdvbmxpbmUnLCBtZXRhZGF0YSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQnVXNlclByZXNlbmNlOmF3YXknOiBmdW5jdGlvbihpZCkge1xuXHRcdFx0XHRjaGVjayhpZCwgTWF0Y2guTWF5YmUoU3RyaW5nKSk7XG5cdFx0XHRcdHRoaXMudW5ibG9jaygpO1xuXHRcdFx0XHRjaGVja1VzZXIoaWQsIHRoaXMudXNlcklkKTtcblx0XHRcdFx0VXNlclByZXNlbmNlLnNldENvbm5lY3Rpb24oaWQgfHwgdGhpcy51c2VySWQsIHRoaXMuY29ubmVjdGlvbiwgJ2F3YXknKTtcblx0XHRcdH0sXG5cblx0XHRcdCdVc2VyUHJlc2VuY2U6b25saW5lJzogZnVuY3Rpb24oaWQpIHtcblx0XHRcdFx0Y2hlY2soaWQsIE1hdGNoLk1heWJlKFN0cmluZykpO1xuXHRcdFx0XHR0aGlzLnVuYmxvY2soKTtcblx0XHRcdFx0Y2hlY2tVc2VyKGlkLCB0aGlzLnVzZXJJZCk7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5zZXRDb25uZWN0aW9uKGlkIHx8IHRoaXMudXNlcklkLCB0aGlzLmNvbm5lY3Rpb24sICdvbmxpbmUnKTtcblx0XHRcdH0sXG5cblx0XHRcdCdVc2VyUHJlc2VuY2U6c2V0RGVmYXVsdFN0YXR1cyc6IGZ1bmN0aW9uKGlkLCBzdGF0dXMpIHtcblx0XHRcdFx0Y2hlY2soaWQsIE1hdGNoLk1heWJlKFN0cmluZykpO1xuXHRcdFx0XHRjaGVjayhzdGF0dXMsIE1hdGNoLk1heWJlKFN0cmluZykpO1xuXHRcdFx0XHR0aGlzLnVuYmxvY2soKTtcblxuXHRcdFx0XHQvLyBiYWNrd2FyZCBjb21wYXRpYmxlIChyZWNlaXZlcyBzdGF0dXMgYXMgZmlyc3QgYXJndW1lbnQpXG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0VXNlclByZXNlbmNlLnNldERlZmF1bHRTdGF0dXModGhpcy51c2VySWQsIGlkKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2hlY2tVc2VyKGlkLCB0aGlzLnVzZXJJZCk7XG5cdFx0XHRcdFVzZXJQcmVzZW5jZS5zZXREZWZhdWx0U3RhdHVzKGlkIHx8IHRoaXMudXNlcklkLCBzdGF0dXMpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuIiwiLyogZ2xvYmFscyBVc2VyUHJlc2VuY2VNb25pdG9yLCBVc2Vyc1Nlc3Npb25zLCBJbnN0YW5jZVN0YXR1cyAqL1xudmFyIEV2ZW50RW1pdHRlciA9IE5wbS5yZXF1aXJlKCdldmVudHMnKTtcblxuVXNlclByZXNlbmNlRXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5mdW5jdGlvbiBtb25pdG9yVXNlcnNTZXNzaW9ucygpIHtcblx0VXNlcnNTZXNzaW9ucy5maW5kKHt9KS5vYnNlcnZlKHtcblx0XHRhZGRlZDogZnVuY3Rpb24ocmVjb3JkKSB7XG5cdFx0XHRVc2VyUHJlc2VuY2VNb25pdG9yLnByb2Nlc3NVc2VyU2Vzc2lvbihyZWNvcmQsICdhZGRlZCcpO1xuXHRcdH0sXG5cdFx0Y2hhbmdlZDogZnVuY3Rpb24ocmVjb3JkKSB7XG5cdFx0XHRVc2VyUHJlc2VuY2VNb25pdG9yLnByb2Nlc3NVc2VyU2Vzc2lvbihyZWNvcmQsICdjaGFuZ2VkJyk7XG5cdFx0fSxcblx0XHRyZW1vdmVkOiBmdW5jdGlvbihyZWNvcmQpIHtcblx0XHRcdFVzZXJQcmVzZW5jZU1vbml0b3IucHJvY2Vzc1VzZXJTZXNzaW9uKHJlY29yZCwgJ3JlbW92ZWQnKTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBtb25pdG9yRGVsZXRlZFNlcnZlcnMoKSB7XG5cdEluc3RhbmNlU3RhdHVzLmdldENvbGxlY3Rpb24oKS5maW5kKHt9LCB7ZmllbGRzOiB7X2lkOiAxfX0pLm9ic2VydmVDaGFuZ2VzKHtcblx0XHRyZW1vdmVkOiBmdW5jdGlvbihpZCkge1xuXHRcdFx0VXNlclByZXNlbmNlLnJlbW92ZUNvbm5lY3Rpb25zQnlJbnN0YW5jZUlkKGlkKTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMb3N0Q29ubmVjdGlvbnMoKSB7XG5cdGlmICghUGFja2FnZVsna29uZWN0eTptdWx0aXBsZS1pbnN0YW5jZXMtc3RhdHVzJ10pIHtcblx0XHRyZXR1cm4gVXNlcnNTZXNzaW9ucy5yZW1vdmUoe30pO1xuXHR9XG5cblx0dmFyIGlkcyA9IEluc3RhbmNlU3RhdHVzLmdldENvbGxlY3Rpb24oKS5maW5kKHt9LCB7ZmllbGRzOiB7X2lkOiAxfX0pLmZldGNoKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG5cdFx0cmV0dXJuIGlkLl9pZDtcblx0fSk7XG5cblx0dmFyIHVwZGF0ZSA9IHtcblx0XHQkcHVsbDoge1xuXHRcdFx0Y29ubmVjdGlvbnM6IHtcblx0XHRcdFx0aW5zdGFuY2VJZDoge1xuXHRcdFx0XHRcdCRuaW46IGlkc1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRVc2Vyc1Nlc3Npb25zLnVwZGF0ZSh7fSwgdXBkYXRlLCB7bXVsdGk6IHRydWV9KTtcbn1cblxuVXNlclByZXNlbmNlTW9uaXRvciA9IHtcblx0LyoqXG5cdCAqIFRoZSBjYWxsYmFjayB3aWxsIHJlY2VpdmUgdGhlIGZvbGxvd2luZyBwYXJhbWV0ZXJzOiB1c2VyLCBzdGF0dXMsIHN0YXR1c0Nvbm5lY3Rpb25cblx0ICovXG5cdG9uU2V0VXNlclN0YXR1czogZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRVc2VyUHJlc2VuY2VFdmVudHMub24oJ3NldFVzZXJTdGF0dXMnLCBjYWxsYmFjayk7XG5cdH0sXG5cblx0Ly8gZm9sbG93aW5nIGFjdGlvbnMvb2JzZXJ2ZXJzIHdpbGwgcnVuIG9ubHkgd2hlbiBwcmVzZW5jZSBtb25pdG9yIHR1cm5lZCBvblxuXHRzdGFydDogZnVuY3Rpb24oKSB7XG5cdFx0bW9uaXRvclVzZXJzU2Vzc2lvbnMoKTtcblx0XHRyZW1vdmVMb3N0Q29ubmVjdGlvbnMoKTtcblxuXHRcdGlmIChQYWNrYWdlWydrb25lY3R5Om11bHRpcGxlLWluc3RhbmNlcy1zdGF0dXMnXSkge1xuXHRcdFx0bW9uaXRvckRlbGV0ZWRTZXJ2ZXJzKCk7XG5cdFx0fVxuXHR9LFxuXG5cdHByb2Nlc3NVc2VyU2Vzc2lvbjogZnVuY3Rpb24ocmVjb3JkLCBhY3Rpb24pIHtcblx0XHRpZiAoYWN0aW9uID09PSAncmVtb3ZlZCcgJiYgKHJlY29yZC5jb25uZWN0aW9ucyA9PSBudWxsIHx8IHJlY29yZC5jb25uZWN0aW9ucy5sZW5ndGggPT09IDApKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHJlY29yZC5jb25uZWN0aW9ucyA9PSBudWxsIHx8IHJlY29yZC5jb25uZWN0aW9ucy5sZW5ndGggPT09IDAgfHwgYWN0aW9uID09PSAncmVtb3ZlZCcpIHtcblx0XHRcdFVzZXJQcmVzZW5jZU1vbml0b3Iuc2V0U3RhdHVzKHJlY29yZC5faWQsICdvZmZsaW5lJywgcmVjb3JkLm1ldGFkYXRhKTtcblxuXHRcdFx0aWYgKGFjdGlvbiAhPT0gJ3JlbW92ZWQnKSB7XG5cdFx0XHRcdFVzZXJzU2Vzc2lvbnMucmVtb3ZlKHtfaWQ6IHJlY29yZC5faWQsICdjb25uZWN0aW9ucy4wJzogeyRleGlzdHM6IGZhbHNlfSB9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgY29ubmVjdGlvblN0YXR1cyA9ICdvZmZsaW5lJztcblx0XHRyZWNvcmQuY29ubmVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihjb25uZWN0aW9uKSB7XG5cdFx0XHRpZiAoY29ubmVjdGlvbi5zdGF0dXMgPT09ICdvbmxpbmUnKSB7XG5cdFx0XHRcdGNvbm5lY3Rpb25TdGF0dXMgPSAnb25saW5lJztcblx0XHRcdH0gZWxzZSBpZiAoY29ubmVjdGlvbi5zdGF0dXMgPT09ICdhd2F5JyAmJiBjb25uZWN0aW9uU3RhdHVzID09PSAnb2ZmbGluZScpIHtcblx0XHRcdFx0Y29ubmVjdGlvblN0YXR1cyA9ICdhd2F5Jztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdFVzZXJQcmVzZW5jZU1vbml0b3Iuc2V0U3RhdHVzKHJlY29yZC5faWQsIGNvbm5lY3Rpb25TdGF0dXMsIHJlY29yZC5tZXRhZGF0YSk7XG5cdH0sXG5cblx0cHJvY2Vzc1VzZXI6IGZ1bmN0aW9uKGlkLCBmaWVsZHMpIHtcblx0XHRpZiAoZmllbGRzLnN0YXR1c0RlZmF1bHQgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB1c2VyU2Vzc2lvbiA9IFVzZXJzU2Vzc2lvbnMuZmluZE9uZSh7X2lkOiBpZH0pO1xuXG5cdFx0aWYgKHVzZXJTZXNzaW9uKSB7XG5cdFx0XHRVc2VyUHJlc2VuY2VNb25pdG9yLnByb2Nlc3NVc2VyU2Vzc2lvbih1c2VyU2Vzc2lvbiwgJ2NoYW5nZWQnKTtcblx0XHR9XG5cdH0sXG5cblx0c2V0U3RhdHVzOiBmdW5jdGlvbihpZCwgc3RhdHVzLCBtZXRhZGF0YSkge1xuXHRcdFVzZXJQcmVzZW5jZUV2ZW50cy5lbWl0KCdzZXRTdGF0dXMnLCBpZCwgc3RhdHVzLCBtZXRhZGF0YSk7XG5cdH1cbn07XG4iXX0=

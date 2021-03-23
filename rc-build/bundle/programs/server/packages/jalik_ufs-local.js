(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var options, file;

var require = meteorInstall({"node_modules":{"meteor":{"jalik:ufs-local":{"ufs-local.js":function module(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/jalik_ufs-local/ufs-local.js                                                                        //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.export({
  LocalStore: () => LocalStore
});
let UploadFS;
module.link("meteor/jalik:ufs", {
  UploadFS(v) {
    UploadFS = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);

class LocalStore extends UploadFS.Store {
  constructor(options) {
    // Default options
    options = Object.assign({
      mode: '0744',
      path: 'ufs/uploads',
      writeMode: '0744'
    }, options); // Check options

    if (typeof options.mode !== 'string') {
      throw new TypeError('LocalStore: mode is not a string');
    }

    if (typeof options.path !== 'string') {
      throw new TypeError('LocalStore: path is not a string');
    }

    if (typeof options.writeMode !== 'string') {
      throw new TypeError('LocalStore: writeMode is not a string');
    }

    super(options);
    let self = this; // Private attributes

    let mode = options.mode;
    let path = options.path;
    let writeMode = options.writeMode;

    if (Meteor.isServer) {
      const fs = Npm.require('fs');

      fs.stat(path, function (err) {
        if (err) {
          const mkdirp = Npm.require('mkdirp'); // Create the directory


          mkdirp(path, {
            mode: mode
          }, function (err) {
            if (err) {
              console.error("LocalStore: cannot create store at ".concat(path, " (").concat(err.message, ")"));
            } else {
              console.info("LocalStore: store created at ".concat(path));
            }
          });
        } else {
          // Set directory permissions
          fs.chmod(path, mode, function (err) {
            err && console.error("LocalStore: cannot set store permissions ".concat(mode, " (").concat(err.message, ")"));
          });
        }
      });
    }
    /**
     * Returns the path or sub path
     * @param file
     * @return {string}
     */


    this.getPath = function (file) {
      return path + (file ? "/".concat(file) : '');
    };

    if (Meteor.isServer) {
      /**
       * Removes the file
       * @param fileId
       * @param callback
       */
      this.delete = function (fileId, callback) {
        let path = this.getFilePath(fileId);

        if (typeof callback !== 'function') {
          callback = function (err) {
            err && console.error("LocalStore: cannot delete file \"".concat(fileId, "\" at ").concat(path, " (").concat(err.message, ")"));
          };
        }

        const fs = Npm.require('fs');

        fs.stat(path, Meteor.bindEnvironment(function (err, stat) {
          if (!err && stat && stat.isFile()) {
            fs.unlink(path, Meteor.bindEnvironment(function () {
              self.getCollection().remove(fileId);
              callback.call(self);
            }));
          }
        }));
      };
      /**
       * Returns the file read stream
       * @param fileId
       * @param file
       * @param options
       * @return {*}
       */


      this.getReadStream = function (fileId, file, options) {
        const fs = Npm.require('fs');

        options = Object.assign({}, options);
        return fs.createReadStream(self.getFilePath(fileId, file), {
          flags: 'r',
          encoding: null,
          autoClose: true,
          start: options.start,
          end: options.end
        });
      };
      /**
       * Returns the file write stream
       * @param fileId
       * @param file
       * @param options
       * @return {*}
       */


      this.getWriteStream = function (fileId, file, options) {
        const fs = Npm.require('fs');

        options = Object.assign({}, options);
        return fs.createWriteStream(self.getFilePath(fileId, file), {
          flags: 'a',
          encoding: null,
          mode: writeMode,
          start: options.start
        });
      };
    }
  }
  /**
   * Returns the file path
   * @param fileId
   * @param file
   * @return {string}
   */


  getFilePath(fileId, file) {
    file = file || this.getCollection().findOne(fileId, {
      fields: {
        extension: 1
      }
    });
    return file && this.getPath(fileId + (file.extension ? ".".concat(file.extension) : ''));
  }

}

// Add store to UFS namespace
UploadFS.store.Local = LocalStore;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/jalik:ufs-local/ufs-local.js");

/* Exports */
Package._define("jalik:ufs-local", exports);

})();

//# sourceURL=meteor://💻app/packages/jalik_ufs-local.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvamFsaWs6dWZzLWxvY2FsL3Vmcy1sb2NhbC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnQiLCJMb2NhbFN0b3JlIiwiVXBsb2FkRlMiLCJsaW5rIiwidiIsIk1ldGVvciIsIlN0b3JlIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwibW9kZSIsInBhdGgiLCJ3cml0ZU1vZGUiLCJUeXBlRXJyb3IiLCJzZWxmIiwiaXNTZXJ2ZXIiLCJmcyIsIk5wbSIsInJlcXVpcmUiLCJzdGF0IiwiZXJyIiwibWtkaXJwIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsImluZm8iLCJjaG1vZCIsImdldFBhdGgiLCJmaWxlIiwiZGVsZXRlIiwiZmlsZUlkIiwiY2FsbGJhY2siLCJnZXRGaWxlUGF0aCIsImJpbmRFbnZpcm9ubWVudCIsImlzRmlsZSIsInVubGluayIsImdldENvbGxlY3Rpb24iLCJyZW1vdmUiLCJjYWxsIiwiZ2V0UmVhZFN0cmVhbSIsImNyZWF0ZVJlYWRTdHJlYW0iLCJmbGFncyIsImVuY29kaW5nIiwiYXV0b0Nsb3NlIiwic3RhcnQiLCJlbmQiLCJnZXRXcml0ZVN0cmVhbSIsImNyZWF0ZVdyaXRlU3RyZWFtIiwiZmluZE9uZSIsImZpZWxkcyIsImV4dGVuc2lvbiIsInN0b3JlIiwiTG9jYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjO0FBQUNDLFlBQVUsRUFBQyxNQUFJQTtBQUFoQixDQUFkO0FBQTJDLElBQUlDLFFBQUo7QUFBYUgsTUFBTSxDQUFDSSxJQUFQLENBQVksa0JBQVosRUFBK0I7QUFBQ0QsVUFBUSxDQUFDRSxDQUFELEVBQUc7QUFBQ0YsWUFBUSxHQUFDRSxDQUFUO0FBQVc7O0FBQXhCLENBQS9CLEVBQXlELENBQXpEO0FBQTRELElBQUlDLE1BQUo7QUFBV04sTUFBTSxDQUFD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MEkvQztBQUNBakQsUUFBUSxDQUFDa0QsS0FBVCxDQUFlQyxLQUFmLEdBQXVCcEQsVUFBdkIsQyIsImZpbGUiOiIvcGFja2FnZXMvamFsaWtfdWZzLWxvY2FsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBLYXJsIFNURUlOXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuaW1wb3J0IHsgVXBsb2FkRlMgfSBmcm9tICdtZXRlb3IvamFsaWs6dWZzJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG4vKipcbiAqIEZpbGUgc3lzdGVtIHN0b3JlXG4gKiBAcGFyYW0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlIGV4dGVuZHMgVXBsb2FkRlMuU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAvLyBEZWZhdWx0IG9wdGlvbnNcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtb2RlOiAnMDc0NCcsXG4gICAgICBwYXRoOiAndWZzL3VwbG9hZHMnLFxuICAgICAgd3JpdGVNb2RlOiAnMDc0NCcsXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICAvLyBDaGVjayBvcHRpb25zXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm1vZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdMb2NhbFN0b3JlOiBtb2RlIGlzIG5vdCBhIHN0cmluZycpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0xvY2FsU3RvcmU6IHBhdGggaXMgbm90IGEgc3RyaW5nJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy53cml0ZU1vZGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdMb2NhbFN0b3JlOiB3cml0ZU1vZGUgaXMgbm90IGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gUHJpdmF0ZSBhdHRyaWJ1dGVzXG4gICAgbGV0IG1vZGUgPSBvcHRpb25zLm1vZGU7XG4gICAgbGV0IHBhdGggPSBvcHRpb25zLnBhdGg7XG4gICAgbGV0IHdyaXRlTW9kZSA9IG9wdGlvbnMud3JpdGVNb2RlO1xuXG4gICAgaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAgICAgY29uc3QgZnMgPSBOcG0ucmVxdWlyZSgnZnMnKTtcblxuICAgICAgZnMuc3RhdChwYXRoLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjb25zdCBta2RpcnAgPSBOcG0ucmVxdWlyZSgnbWtkaXJwJyk7XG5cbiAgICAgICAgICAvLyBDcmVhdGUgdGhlIGRpcmVjdG9yeVxuICAgICAgICAgIG1rZGlycChwYXRoLCB7IG1vZGU6IG1vZGUgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBMb2NhbFN0b3JlOiBjYW5ub3QgY3JlYXRlIHN0b3JlIGF0ICR7cGF0aH0gKCR7ZXJyLm1lc3NhZ2V9KWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBMb2NhbFN0b3JlOiBzdG9yZSBjcmVhdGVkIGF0ICR7cGF0aH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZXQgZGlyZWN0b3J5IHBlcm1pc3Npb25zXG4gICAgICAgICAgZnMuY2htb2QocGF0aCwgbW9kZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZXJyICYmIGNvbnNvbGUuZXJyb3IoYExvY2FsU3RvcmU6IGNhbm5vdCBzZXQgc3RvcmUgcGVybWlzc2lvbnMgJHttb2RlfSAoJHtlcnIubWVzc2FnZX0pYCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBhdGggb3Igc3ViIHBhdGhcbiAgICAgKiBAcGFyYW0gZmlsZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmdldFBhdGggPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgcmV0dXJuIHBhdGggKyAoZmlsZSA/IGAvJHtmaWxlfWAgOiAnJyk7XG4gICAgfTtcblxuICAgIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlcyB0aGUgZmlsZVxuICAgICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gKGZpbGVJZCwgY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmdldEZpbGVQYXRoKGZpbGVJZCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZXJyICYmIGNvbnNvbGUuZXJyb3IoYExvY2FsU3RvcmU6IGNhbm5vdCBkZWxldGUgZmlsZSBcIiR7ZmlsZUlkfVwiIGF0ICR7cGF0aH0gKCR7ZXJyLm1lc3NhZ2V9KWApO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnMgPSBOcG0ucmVxdWlyZSgnZnMnKTtcbiAgICAgICAgZnMuc3RhdChwYXRoLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uIChlcnIsIHN0YXQpIHtcbiAgICAgICAgICBpZiAoIWVyciAmJiBzdGF0ICYmIHN0YXQuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIGZzLnVubGluayhwYXRoLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZi5nZXRDb2xsZWN0aW9uKCkucmVtb3ZlKGZpbGVJZCk7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoc2VsZik7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIGZpbGUgcmVhZCBzdHJlYW1cbiAgICAgICAqIEBwYXJhbSBmaWxlSWRcbiAgICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAgICogQHJldHVybiB7Kn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5nZXRSZWFkU3RyZWFtID0gZnVuY3Rpb24gKGZpbGVJZCwgZmlsZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBmcyA9IE5wbS5yZXF1aXJlKCdmcycpO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBmcy5jcmVhdGVSZWFkU3RyZWFtKHNlbGYuZ2V0RmlsZVBhdGgoZmlsZUlkLCBmaWxlKSwge1xuICAgICAgICAgIGZsYWdzOiAncicsXG4gICAgICAgICAgZW5jb2Rpbmc6IG51bGwsXG4gICAgICAgICAgYXV0b0Nsb3NlOiB0cnVlLFxuICAgICAgICAgIHN0YXJ0OiBvcHRpb25zLnN0YXJ0LFxuICAgICAgICAgIGVuZDogb3B0aW9ucy5lbmQsXG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm5zIHRoZSBmaWxlIHdyaXRlIHN0cmVhbVxuICAgICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAgICogQHBhcmFtIGZpbGVcbiAgICAgICAqIEBwYXJhbSBvcHRpb25zXG4gICAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAgICovXG4gICAgICB0aGlzLmdldFdyaXRlU3RyZWFtID0gZnVuY3Rpb24gKGZpbGVJZCwgZmlsZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCBmcyA9IE5wbS5yZXF1aXJlKCdmcycpO1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBmcy5jcmVhdGVXcml0ZVN0cmVhbShzZWxmLmdldEZpbGVQYXRoKGZpbGVJZCwgZmlsZSksIHtcbiAgICAgICAgICBmbGFnczogJ2EnLFxuICAgICAgICAgIGVuY29kaW5nOiBudWxsLFxuICAgICAgICAgIG1vZGU6IHdyaXRlTW9kZSxcbiAgICAgICAgICBzdGFydDogb3B0aW9ucy5zdGFydCxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaWxlIHBhdGhcbiAgICogQHBhcmFtIGZpbGVJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRGaWxlUGF0aChmaWxlSWQsIGZpbGUpIHtcbiAgICBmaWxlID0gZmlsZSB8fCB0aGlzLmdldENvbGxlY3Rpb24oKS5maW5kT25lKGZpbGVJZCwgeyBmaWVsZHM6IHsgZXh0ZW5zaW9uOiAxIH0gfSk7XG4gICAgcmV0dXJuIGZpbGUgJiYgdGhpcy5nZXRQYXRoKGZpbGVJZCArIChmaWxlLmV4dGVuc2lvbiA/IGAuJHtmaWxlLmV4dGVuc2lvbn1gIDogJycpKTtcbiAgfVxufVxuXG4vLyBBZGQgc3RvcmUgdG8gVUZTIG5hbWVzcGFjZVxuVXBsb2FkRlMuc3RvcmUuTG9jYWwgPSBMb2NhbFN0b3JlO1xuIl19

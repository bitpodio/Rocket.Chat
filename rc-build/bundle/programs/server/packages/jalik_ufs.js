(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var check = Package.check.check;
var Match = Package.check.Match;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var WebApp = Package.webapp.WebApp;
var WebAppInternals = Package.webapp.WebAppInternals;
var main = Package.webapp.main;
var meteorInstall = Package.modules.meteorInstall;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var extension, options, path;

var require = meteorInstall({"node_modules":{"meteor":{"jalik:ufs":{"ufs.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs.js                                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
!function (module1) {
  module1.export({
    UploadFS: () => UploadFS
  });
  let Meteor;
  module1.link("meteor/meteor", {
    Meteor(v) {
      Meteor = v;
    }

  }, 0);
  let Random;
  module1.link("meteor/random", {
    Random(v) {
      Random = v;
    }

  }, 1);
  let Config;
  module1.link("./ufs-config", {
    Config(v) {
      Config = v;
    }

  }, 2);
  let Filter;
  module1.link("./ufs-filter", {
    Filter(v) {
      Filter = v;
    }

  }, 3);
  let MIME;
  module1.link("./ufs-mime", {
    MIME(v) {
      MIME = v;
    }

  }, 4);
  let Store;
  module1.link("./ufs-store", {
    Store(v) {
      Store = v;
    }

  }, 5);
  let StorePermissions;
  module1.link("./ufs-store-permissions", {
    StorePermissions(v) {
      StorePermissions = v;
    }

  }, 6);
  let Tokens;
  module1.link("./ufs-tokens", {
    Tokens(v) {
      Tokens = v;
    }

  }, 7);
  let Uploader;
  module1.link("./ufs-uploader", {
    Uploader(v) {
      Uploader = v;
    }

  }, 8);
  const stores = {};
  const UploadFS = {
    /**
      * Contains all stores
      */
    store: {},

    /**
      * Collection of tokens
      */
    tokens: Tokens,

    /**
      * Adds the "etag" attribute to files
      * @param where
      */
    addETagAttributeToFiles(where) {
      this.getStores().forEach(store => {
        const files = store.getCollection(); // By default update only files with no path set

        files.find(where || {
          etag: null
        }, {
          fields: {
            _id: 1
          }
        }).forEach(file => {
          files.direct.update(file._id, {
            $set: {
              etag: this.generateEtag()
            }
          });
        });
      });
    },

    /**
      * Adds the MIME type for an extension
      * @param extension
      * @param mime
      */
    addMimeType(extension, mime) {
      MIME[extension.toLowerCase()] = mime;
    },

    /**
      * Adds the "path" attribute to files
      * @param where
      */
    addPathAttributeToFiles(where) {
      this.getStores().forEach(store => {
        const files = store.getCollection(); // By default update only files with no path set

        files.find(where || {
          path: null
        }, {
          fields: {
            _id: 1
          }
        }).forEach(file => {
          files.direct.update(file._id, {
            $set: {
              path: store.getFileRelativeURL(file._id)
            }
          });
        });
      });
    },

    /**
      * Registers the store
      * @param store
      */
    addStore(store) {
      if (!(store instanceof Store)) {
        throw new TypeError('ufs: store is not an instance of UploadFS.Store.');
      }

      stores[store.getName()] = store;
    },

    /**
      * Generates a unique ETag
      * @return {string}
      */
    generateEtag() {
      return Random.id();
    },

    /**
      * Returns the MIME type of the extension
      * @param extension
      * @returns {*}
      */
    getMimeType(extension) {
      extension = extension.toLowerCase();
      return MIME[extension];
    },

    /**
      * Returns all MIME types
      */
    getMimeTypes() {
      return MIME;
    },

    /**
      * Returns the store by its name
      * @param name
      * @return {UploadFS.Store}
      */
    getStore(name) {
      return stores[name];
    },

    /**
      * Returns all stores
      * @return {object}
      */
    getStores() {
      return stores;
    },

    /**
      * Returns the temporary file path
      * @param fileId
      * @return {string}
      */
    getTempFilePath(fileId) {
      return "".concat(this.config.tmpDir, "/").concat(fileId);
    },

    /**
      * Imports a file from a URL
      * @param url
      * @param file
      * @param store
      * @param callback
      */
    importFromURL(url, file, store, callback) {
      if (typeof store === 'string') {
        Meteor.call('ufsImportURL', url, file, store, callback);
      } else if (typeof store === 'object') {
        store.importFromURL(url, file, callback);
      }
    },

    /**
      * Returns file and data as ArrayBuffer for each files in the event
      * @deprecated
      * @param event
      * @param callback
      */
    readAsArrayBuffer() {
      console.error('UploadFS.readAsArrayBuffer is deprecated, see https://github.com/jalik/jalik-ufs#uploading-from-a-file');
    },

    /**
      * Opens a dialog to select a single file
      * @param callback
      */
    selectFile(callback) {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = false;

      input.onchange = ev => {
        const {
          files
        } = ev.target;
        callback.call(UploadFS, files[0]);
      }; // Fix for iOS/Safari


      const div = document.createElement('div');
      div.className = 'ufs-file-selector';
      div.style = 'display:none; height:0; width:0; overflow: hidden;';
      div.appendChild(input);
      document.body.appendChild(div); // Trigger file selection

      input.click();
    },

    /**
      * Opens a dialog to select multiple files
      * @param callback
      */
    selectFiles(callback) {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;

      input.onchange = ev => {
        const {
          files
        } = ev.target;

        for (let i = 0; i < files.length; i += 1) {
          callback.call(UploadFS, files[i]);
        }
      }; // Fix for iOS/Safari


      const div = document.createElement('div');
      div.className = 'ufs-file-selector';
      div.style = 'display:none; height:0; width:0; overflow: hidden;';
      div.appendChild(input);
      document.body.appendChild(div); // Trigger file selection

      input.click();
    }

  };

  if (Meteor.isServer) {
    require('./ufs-methods');

    require('./ufs-server');
  }
  /**
   * UploadFS Configuration
   * @type {Config}
   */


  UploadFS.config = new Config(); // Add classes to global namespace

  UploadFS.Config = Config;
  UploadFS.Filter = Filter;
  UploadFS.Store = Store;
  UploadFS.StorePermissions = StorePermissions;
  UploadFS.Uploader = Uploader;

  if (Meteor.isServer) {
    // Expose the module globally
    if (typeof global !== 'undefined') {
      global.UploadFS = UploadFS;
    }
  } else if (Meteor.isClient) {
    // Expose the module globally
    if (typeof window !== 'undefined') {
      window.UploadFS = UploadFS;
    }
  }
}.call(this, module);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-config.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-config.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Config: () => Config
});

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 0);
let StorePermissions;
module.link("./ufs-store-permissions", {
  StorePermissions(v) {
    StorePermissions = v;
  }

}, 1);

class Config {
  constructor(options) {
    // Default options
    options = _.extend({
      defaultStorePermissions: null,
      https: false,
      simulateReadDelay: 0,
      simulateUploadSpeed: 0,
      simulateWriteDelay: 0,
      storesPath: 'ufs',
      tmpDir: '/tmp/ufs',
      tmpDirPermissions: '0700'
    }, options); // Check options

    if (options.defaultStorePermissions && !(options.defaultStorePermissions instanceof StorePermissions)) {
      throw new TypeError('Config: defaultStorePermissions is not an instance of StorePermissions');
    }

    if (typeof options.https !== 'boolean') {
      throw new TypeError('Config: https is not a function');
    }

    if (typeof options.simulateReadDelay !== 'number') {
      throw new TypeError('Config: simulateReadDelay is not a number');
    }

    if (typeof options.simulateUploadSpeed !== 'number') {
      throw new TypeError('Config: simulateUploadSpeed is not a number');
    }

    if (typeof options.simulateWriteDelay !== 'number') {
      throw new TypeError('Config: simulateWriteDelay is not a number');
    }

    if (typeof options.storesPath !== 'string') {
      throw new TypeError('Config: storesPath is not a string');
    }

    if (typeof options.tmpDir !== 'string') {
      throw new TypeError('Config: tmpDir is not a string');
    }

    if (typeof options.tmpDirPermissions !== 'string') {
      throw new TypeError('Config: tmpDirPermissions is not a string');
    }
    /**
       * Default store permissions
       * @type {UploadFS.StorePermissions}
       */


    this.defaultStorePermissions = options.defaultStorePermissions;
    /**
       * Use or not secured protocol in URLS
       * @type {boolean}
       */

    this.https = options.https;
    /**
       * The simulation read delay
       * @type {Number}
       */

    this.simulateReadDelay = parseInt(options.simulateReadDelay);
    /**
       * The simulation upload speed
       * @type {Number}
       */

    this.simulateUploadSpeed = parseInt(options.simulateUploadSpeed);
    /**
       * The simulation write delay
       * @type {Number}
       */

    this.simulateWriteDelay = parseInt(options.simulateWriteDelay);
    /**
       * The URL root path of stores
       * @type {string}
       */

    this.storesPath = options.storesPath;
    /**
       * The temporary directory of uploading files
       * @type {string}
       */

    this.tmpDir = options.tmpDir;
    /**
       * The permissions of the temporary directory
       * @type {string}
       */

    this.tmpDirPermissions = options.tmpDirPermissions;
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-filter.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-filter.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Filter: () => Filter
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 1);

class Filter {
  constructor(options) {
    const self = this; // Default options

    options = _.extend({
      contentTypes: null,
      extensions: null,
      minSize: 1,
      maxSize: 0,
      invalidFileError: () => new Meteor.Error('invalid-file', 'File is not valid'),
      fileTooSmallError: (fileSize, minFileSize) => new Meteor.Error('file-too-small', "File size (size = ".concat(fileSize, ") is too small (min = ").concat(minFileSize, ")")),
      fileTooLargeError: (fileSize, maxFileSize) => new Meteor.Error('file-too-large', "File size (size = ".concat(fileSize, ") is too large (max = ").concat(maxFileSize, ")")),
      invalidFileExtension: (fileExtension, allowedExtensions) => new Meteor.Error('invalid-file-extension', "File extension \"".concat(fileExtension, "\" is not accepted (").concat(allowedExtensions, ")")),
      invalidFileType: (fileType, allowedContentTypes) => new Meteor.Error('invalid-file-type', "File type \"".concat(fileType, "\" is not accepted (").concat(allowedContentTypes, ")")),
      onCheck: this.onCheck
    }, options); // Check options

    if (options.contentTypes && !(options.contentTypes instanceof Array)) {
      throw new TypeError('Filter: contentTypes is not an Array');
    }

    if (options.extensions && !(options.extensions instanceof Array)) {
      throw new TypeError('Filter: extensions is not an Array');
    }

    if (typeof options.minSize !== 'number') {
      throw new TypeError('Filter: minSize is not a number');
    }

    if (typeof options.maxSize !== 'number') {
      throw new TypeError('Filter: maxSize is not a number');
    }

    if (options.onCheck && typeof options.onCheck !== 'function') {
      throw new TypeError('Filter: onCheck is not a function');
    } // Public attributes


    self.options = options;
    ['onCheck'].forEach(method => {
      if (typeof options[method] === 'function') {
        self[method] = options[method];
      }
    });
  }
  /**
    * Checks the file
    * @param file
    */


  check(file) {
    let error = null;

    if (typeof file !== 'object' || !file) {
      error = this.options.invalidFileError();
    } // Check size


    const fileSize = file.size;
    const minSize = this.getMinSize();

    if (fileSize <= 0 || fileSize < minSize) {
      error = this.options.fileTooSmallError(fileSize, minSize);
    }

    const maxSize = this.getMaxSize();

    if (maxSize > 0 && fileSize > maxSize) {
      error = this.options.fileTooLargeError(fileSize, maxSize);
    } // Check extension


    const allowedExtensions = this.getExtensions();
    const fileExtension = file.extension;

    if (allowedExtensions && !allowedExtensions.includes(fileExtension)) {
      error = this.options.invalidFileExtension(fileExtension, allowedExtensions);
    } // Check content type


    const allowedContentTypes = this.getContentTypes();
    const fileTypes = file.type;

    if (allowedContentTypes && !this.isContentTypeInList(fileTypes, allowedContentTypes)) {
      error = this.options.invalidFileType(fileTypes, allowedContentTypes);
    } // Apply custom check


    if (typeof this.onCheck === 'function' && !this.onCheck(file)) {
      error = new Meteor.Error('invalid-file', 'File does not match filter');
    }

    if (error) {
      throw error;
    }
  }
  /**
    * Returns the allowed content types
    * @return {Array}
    */


  getContentTypes() {
    return this.options.contentTypes;
  }
  /**
    * Returns the allowed extensions
    * @return {Array}
    */


  getExtensions() {
    return this.options.extensions;
  }
  /**
    * Returns the maximum file size
    * @return {Number}
    */


  getMaxSize() {
    return this.options.maxSize;
  }
  /**
    * Returns the minimum file size
    * @return {Number}
    */


  getMinSize() {
    return this.options.minSize;
  }
  /**
    * Checks if content type is in the given list
    * @param type
    * @param list
    * @return {boolean}
    */


  isContentTypeInList(type, list) {
    if (typeof type === 'string' && list instanceof Array) {
      if (list.includes(type)) {
        return true;
      }

      const wildCardGlob = '/*';
      const wildcards = list.filter(item => item.indexOf(wildCardGlob) > 0);

      if (wildcards.includes(type.replace(/(\/.*)$/, wildCardGlob))) {
        return true;
      }
    }

    return false;
  }
  /**
    * Checks if the file matches filter
    * @param file
    * @return {boolean}
    */


  isValid(file) {
    let result = true;

    try {
      this.check(file);
    } catch (err) {
      result = false;
    }

    return result;
  }
  /**
    * Executes custom checks
    * @param file
    * @return {boolean}
    */
  // eslint-disable-next-line no-unused-vars


  onCheck(file) {
    return true;
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-methods.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-methods.js                                                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let UploadFS;
module.link("./ufs", {
  UploadFS(v) {
    UploadFS = v;
  }

}, 2);
let Filter;
module.link("./ufs-filter", {
  Filter(v) {
    Filter = v;
  }

}, 3);
let Tokens;
module.link("./ufs-tokens", {
  Tokens(v) {
    Tokens = v;
  }

}, 4);

const fs = Npm.require('fs');

const http = Npm.require('http');

const https = Npm.require('https');

const Future = Npm.require('fibers/future');

if (Meteor.isServer) {
  Meteor.methods({
    /**
       * Completes the file transfer
       * @param fileId
       * @param storeName
       * @param token
       */
    ufsComplete(fileId, storeName, token) {
      check(fileId, String);
      check(storeName, String);
      check(token, String); // Get store

      const store = UploadFS.getStore(storeName);

      if (!store) {
        throw new Meteor.Error('invalid-store', 'Store not found');
      } // Check token


      if (!store.checkToken(token, fileId)) {
        throw new Meteor.Error('invalid-token', 'Token is not valid');
      }

      const fut = new Future();
      const tmpFile = UploadFS.getTempFilePath(fileId);

      const removeTempFile = function () {
        fs.unlink(tmpFile, function (err) {
          err && console.error("ufs: cannot delete temp file \"".concat(tmpFile, "\" (").concat(err.message, ")"));
        });
      };

      try {
        // todo check if temp file exists
        // Get file
        const file = store.getCollection().findOne({
          _id: fileId
        }); // Validate file before moving to the store

        store.validate(file); // Get the temp file

        const rs = fs.createReadStream(tmpFile, {
          flags: 'r',
          encoding: null,
          autoClose: true
        }); // Clean upload if error occurs

        rs.on('error', Meteor.bindEnvironment(function (err) {
          console.error(err);
          store.getCollection().remove({
            _id: fileId
          });
          fut.throw(err);
        })); // Save file in the store

        store.write(rs, fileId, Meteor.bindEnvironment(function (err, file) {
          removeTempFile();

          if (err) {
            fut.throw(err);
          } else {
            // File has been fully uploaded
            // so we don't need to keep the token anymore.
            // Also this ensure that the file cannot be modified with extra chunks later.
            Tokens.remove({
              fileId
            });
            fut.return(file);
          }
        })); // catch will not work if fut.wait() is outside try/catch

        return fut.wait();
      } catch (err) {
        // If write failed, remove the file
        store.getCollection().remove({
          _id: fileId
        }); // removeTempFile(); // todo remove temp file on error or try again ?

        throw new Meteor.Error('ufs: cannot upload file', err);
      }
    },

    /**
       * Creates the file and returns the file upload token
       * @param file
       * @return {{fileId: string, token: *, url: *}}
       */
    ufsCreate(file) {
      check(file, Object);

      if (typeof file.name !== 'string' || !file.name.length) {
        throw new Meteor.Error('invalid-file-name', 'file name is not valid');
      }

      if (typeof file.store !== 'string' || !file.store.length) {
        throw new Meteor.Error('invalid-store', 'store is not valid');
      } // Get store


      const store = UploadFS.getStore(file.store);

      if (!store) {
        throw new Meteor.Error('invalid-store', 'Store not found');
      } // Set default info


      file.complete = false;
      file.uploading = false;
      file.extension = file.name && file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2).toLowerCase(); // Assign file MIME type based on the extension

      if (file.extension && !file.type) {
        file.type = UploadFS.getMimeType(file.extension) || 'application/octet-stream';
      }

      file.progress = 0;
      file.size = parseInt(file.size) || 0;
      file.userId = file.userId || this.userId; // Check if the file matches store filter

      const filter = store.getFilter();

      if (filter instanceof Filter) {
        filter.check(file);
      } // Create the file


      const fileId = store.create(file);
      const token = store.createToken(fileId);
      const uploadUrl = store.getURL("".concat(fileId, "?token=").concat(token));
      return {
        fileId,
        token,
        url: uploadUrl
      };
    },

    /**
       * Deletes a file
       * @param fileId
       * @param storeName
       * @param token
       * @returns {*}
       */
    ufsDelete(fileId, storeName, token) {
      check(fileId, String);
      check(storeName, String);
      check(token, String); // Check store

      const store = UploadFS.getStore(storeName);

      if (!store) {
        throw new Meteor.Error('invalid-store', 'Store not found');
      } // Ignore files that does not exist


      if (store.getCollection().find({
        _id: fileId
      }).count() === 0) {
        return 1;
      } // Check token


      if (!store.checkToken(token, fileId)) {
        throw new Meteor.Error('invalid-token', 'Token is not valid');
      }

      return store.getCollection().remove({
        _id: fileId
      });
    },

    /**
       * Imports a file from the URL
       * @param url
       * @param file
       * @param storeName
       * @return {*}
       */
    ufsImportURL(url, file, storeName) {
      check(url, String);
      check(file, Object);
      check(storeName, String); // Check URL

      if (typeof url !== 'string' || url.length <= 0) {
        throw new Meteor.Error('invalid-url', 'The url is not valid');
      } // Check file


      if (typeof file !== 'object' || file === null) {
        throw new Meteor.Error('invalid-file', 'The file is not valid');
      } // Check store


      const store = UploadFS.getStore(storeName);

      if (!store) {
        throw new Meteor.Error('invalid-store', 'The store does not exist');
      } // Extract file info


      if (!file.name) {
        file.name = url.replace(/\?.*$/, '').split('/').pop();
      }

      if (file.name && !file.extension) {
        file.extension = file.name && file.name.substr((~-file.name.lastIndexOf('.') >>> 0) + 2).toLowerCase();
      }

      if (file.extension && !file.type) {
        // Assign file MIME type based on the extension
        file.type = UploadFS.getMimeType(file.extension) || 'application/octet-stream';
      } // Check if file is valid


      if (store.getFilter() instanceof Filter) {
        store.getFilter().check(file);
      }

      if (file.originalUrl) {
        console.warn('ufs: The "originalUrl" attribute is automatically set when importing a file from a URL');
      } // Add original URL


      file.originalUrl = url; // Create the file

      file.complete = false;
      file.uploading = true;
      file.progress = 0;
      file._id = store.create(file);
      const fut = new Future();
      let proto; // Detect protocol to use

      if (/http:\/\//i.test(url)) {
        proto = http;
      } else if (/https:\/\//i.test(url)) {
        proto = https;
      }

      this.unblock(); // Download file

      proto.get(url, Meteor.bindEnvironment(function (res) {
        // Save the file in the store
        store.write(res, file._id, function (err, file) {
          if (err) {
            fut.throw(err);
          } else {
            fut.return(file);
          }
        });
      })).on('error', function (err) {
        fut.throw(err);
      });
      return fut.wait();
    },

    /**
       * Marks the file uploading as stopped
       * @param fileId
       * @param storeName
       * @param token
       * @returns {*}
       */
    ufsStop(fileId, storeName, token) {
      check(fileId, String);
      check(storeName, String);
      check(token, String); // Check store

      const store = UploadFS.getStore(storeName);

      if (!store) {
        throw new Meteor.Error('invalid-store', 'Store not found');
      } // Check file


      const file = store.getCollection().find({
        _id: fileId
      }, {
        fields: {
          userId: 1
        }
      });

      if (!file) {
        throw new Meteor.Error('invalid-file', 'File not found');
      } // Check token


      if (!store.checkToken(token, fileId)) {
        throw new Meteor.Error('invalid-token', 'Token is not valid');
      }

      return store.getCollection().update({
        _id: fileId
      }, {
        $set: {
          uploading: false
        }
      });
    }

  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-mime.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-mime.js                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  MIME: () => MIME
});
const MIME = {
  // application
  '7z': 'application/x-7z-compressed',
  arc: 'application/octet-stream',
  ai: 'application/postscript',
  bin: 'application/octet-stream',
  bz: 'application/x-bzip',
  bz2: 'application/x-bzip2',
  eps: 'application/postscript',
  exe: 'application/octet-stream',
  gz: 'application/x-gzip',
  gzip: 'application/x-gzip',
  js: 'application/javascript',
  json: 'application/json',
  ogx: 'application/ogg',
  pdf: 'application/pdf',
  ps: 'application/postscript',
  psd: 'application/octet-stream',
  rar: 'application/x-rar-compressed',
  rev: 'application/x-rar-compressed',
  swf: 'application/x-shockwave-flash',
  tar: 'application/x-tar',
  xhtml: 'application/xhtml+xml',
  xml: 'application/xml',
  zip: 'application/zip',
  // audio
  aif: 'audio/aiff',
  aifc: 'audio/aiff',
  aiff: 'audio/aiff',
  au: 'audio/basic',
  flac: 'audio/flac',
  midi: 'audio/midi',
  mp2: 'audio/mpeg',
  mp3: 'audio/mpeg',
  mpa: 'audio/mpeg',
  oga: 'audio/ogg',
  ogg: 'audio/ogg',
  opus: 'audio/ogg',
  ra: 'audio/vnd.rn-realaudio',
  spx: 'audio/ogg',
  wav: 'audio/x-wav',
  weba: 'audio/webm',
  wma: 'audio/x-ms-wma',
  // image
  avs: 'image/avs-video',
  bmp: 'image/x-windows-bmp',
  gif: 'image/gif',
  ico: 'image/vnd.microsoft.icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  mjpg: 'image/x-motion-jpeg',
  pic: 'image/pic',
  png: 'image/png',
  svg: 'image/svg+xml',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  // text
  css: 'text/css',
  csv: 'text/csv',
  html: 'text/html',
  txt: 'text/plain',
  // video
  avi: 'video/avi',
  dv: 'video/x-dv',
  flv: 'video/x-flv',
  mov: 'video/quicktime',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  mpg: 'video/mpg',
  ogv: 'video/ogg',
  vdo: 'video/vdo',
  webm: 'video/webm',
  wmv: 'video/x-ms-wmv',
  // specific to vendors
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  odb: 'application/vnd.oasis.opendocument.database',
  odc: 'application/vnd.oasis.opendocument.chart',
  odf: 'application/vnd.oasis.opendocument.formula',
  odg: 'application/vnd.oasis.opendocument.graphics',
  odi: 'application/vnd.oasis.opendocument.image',
  odm: 'application/vnd.oasis.opendocument.text-master',
  odp: 'application/vnd.oasis.opendocument.presentation',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odt: 'application/vnd.oasis.opendocument.text',
  otg: 'application/vnd.oasis.opendocument.graphics-template',
  otp: 'application/vnd.oasis.opendocument.presentation-template',
  ots: 'application/vnd.oasis.opendocument.spreadsheet-template',
  ott: 'application/vnd.oasis.opendocument.text-template',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-server.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-server.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let WebApp;
module.link("meteor/webapp", {
  WebApp(v) {
    WebApp = v;
  }

}, 1);
let SparkMD5;
module.link("spark-md5", {
  default(v) {
    SparkMD5 = v;
  }

}, 2);
let UploadFS;
module.link("./ufs", {
  UploadFS(v) {
    UploadFS = v;
  }

}, 3);

if (Meteor.isServer) {
  const domain = Npm.require('domain');

  const fs = Npm.require('fs'); // eslint-disable-next-line no-unused-vars


  const http = Npm.require('http'); // eslint-disable-next-line no-unused-vars


  const https = Npm.require('https');

  const mkdirp = Npm.require('mkdirp');

  const stream = Npm.require('stream');

  const URL = Npm.require('url');

  const zlib = Npm.require('zlib');

  Meteor.startup(() => {
    const path = UploadFS.config.tmpDir;
    const mode = UploadFS.config.tmpDirPermissions;
    fs.stat(path, err => {
      if (err) {
        // Create the temp directory
        mkdirp(path, {
          mode
        }, err => {
          if (err) {
            console.error("ufs: cannot create temp directory at \"".concat(path, "\" (").concat(err.message, ")"));
          } else {
            console.log("ufs: temp directory created at \"".concat(path, "\""));
          }
        });
      } else {
        // Set directory permissions
        fs.chmod(path, mode, err => {
          err && console.error("ufs: cannot set temp directory permissions ".concat(mode, " (").concat(err.message, ")"));
        });
      }
    });
  }); // Create domain to handle errors
  // and possibly avoid server crashes.

  const d = domain.create();
  d.on('error', err => {
    console.error("ufs: ".concat(err.message));
  }); // Listen HTTP requests to serve files

  WebApp.connectHandlers.use((req, res, next) => {
    // Quick check to see if request should be caught
    if (!req.url.includes("/".concat(UploadFS.config.storesPath, "/"))) {
      next();
      return;
    } // Remove store path


    const parsedUrl = URL.parse(req.url);
    const path = parsedUrl.pathname.substr(UploadFS.config.storesPath.length + 1);

    const allowCORS = () => {
      // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    };

    if (req.method === 'OPTIONS') {
      const regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)$');
      const match = regExp.exec(path); // Request is not valid

      if (match === null) {
        res.writeHead(400);
        res.end();
        return;
      } // Get store


      const store = UploadFS.getStore(match[1]);

      if (!store) {
        res.writeHead(404);
        res.end();
        return;
      } // If a store is found, go ahead and allow the origin


      allowCORS();
      next();
    } else if (req.method === 'POST') {
      // Get store
      const regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)$');
      const match = regExp.exec(path); // Request is not valid

      if (match === null) {
        res.writeHead(400);
        res.end();
        return;
      } // Get store


      const store = UploadFS.getStore(match[1]);

      if (!store) {
        res.writeHead(404);
        res.end();
        return;
      } // If a store is found, go ahead and allow the origin


      allowCORS(); // Get file

      const fileId = match[2];

      if (store.getCollection().find({
        _id: fileId
      }).count() === 0) {
        res.writeHead(404);
        res.end();
        return;
      } // Check upload token


      if (!store.checkToken(req.query.token, fileId)) {
        res.writeHead(403);
        res.end();
        return;
      } // Check if duplicate


      const unique = function (hash) {
        const originalId = store.getCollection().findOne({
          hash,
          _id: {
            $ne: fileId
          }
        });
        return originalId ? originalId._id : false;
      };

      const spark = new SparkMD5.ArrayBuffer();
      const tmpFile = UploadFS.getTempFilePath(fileId);
      const ws = fs.createWriteStream(tmpFile, {
        flags: 'a'
      });
      const fields = {
        uploading: true
      };
      const progress = parseFloat(req.query.progress);

      if (!isNaN(progress) && progress > 0) {
        fields.progress = Math.min(progress, 1);
      }

      req.on('data', chunk => {
        ws.write(chunk);
        spark.append(chunk);
      }); // eslint-disable-next-line no-unused-vars

      req.on('error', err => {
        res.writeHead(500);
        res.end();
      });
      req.on('end', Meteor.bindEnvironment(() => {
        // Update completed state without triggering hooks
        fields.hash = spark.end();
        fields.originalId = unique(fields.hash);
        store.getCollection().direct.update({
          _id: fileId
        }, {
          $set: fields
        });
        ws.end();
      }));
      ws.on('error', err => {
        console.error("ufs: cannot write chunk of file \"".concat(fileId, "\" (").concat(err.message, ")"));
        fs.unlink(tmpFile, err => {
          err && console.error("ufs: cannot delete temp file \"".concat(tmpFile, "\" (").concat(err.message, ")"));
        });
        res.writeHead(500);
        res.end();
      });
      ws.on('finish', () => {
        res.writeHead(204, {
          'Content-Type': 'text/plain'
        });
        res.end();
      });
    } else if (req.method === 'GET') {
      // Get store, file Id and file name
      const regExp = new RegExp('^\/([^\/\?]+)\/([^\/\?]+)(?:\/([^\/\?]+))?$');
      const match = regExp.exec(path); // Avoid 504 Gateway timeout error
      // if file is not handled by UploadFS.

      if (match === null) {
        next();
        return;
      } // Get store


      const storeName = match[1];
      const store = UploadFS.getStore(storeName);

      if (!store) {
        res.writeHead(404);
        res.end();
        return;
      }

      if (store.onRead !== null && store.onRead !== undefined && typeof store.onRead !== 'function') {
        console.error("ufs: Store.onRead is not a function in store \"".concat(storeName, "\""));
        res.writeHead(500);
        res.end();
        return;
      } // Remove file extension from file Id


      const index = match[2].indexOf('.');
      const fileId = index !== -1 ? match[2].substr(0, index) : match[2]; // Get file from database

      const file = store.getCollection().findOne({
        _id: fileId
      });

      if (!file) {
        res.writeHead(404);
        res.end();
        return;
      } // Simulate read speed


      if (UploadFS.config.simulateReadDelay) {
        Meteor._sleepForMs(UploadFS.config.simulateReadDelay);
      }

      d.run(() => {
        // Check if the file can be accessed
        if (store.onRead.call(store, fileId, file, req, res) !== false) {
          const options = {};
          let status = 200; // Prepare response headers

          const headers = {
            'Content-Type': file.type,
            'Content-Length': file.size
          }; // Add ETag header

          if (typeof file.etag === 'string') {
            headers.ETag = file.etag;
          } // Add Last-Modified header


          if (file.modifiedAt instanceof Date) {
            headers['Last-Modified'] = file.modifiedAt.toUTCString();
          } else if (file.uploadedAt instanceof Date) {
            headers['Last-Modified'] = file.uploadedAt.toUTCString();
          } // Parse request headers


          if (typeof req.headers === 'object') {
            // Compare ETag
            if (req.headers['if-none-match']) {
              if (file.etag === req.headers['if-none-match']) {
                res.writeHead(304); // Not Modified

                res.end();
                return;
              }
            } // Compare file modification date


            if (req.headers['if-modified-since']) {
              const modifiedSince = new Date(req.headers['if-modified-since']);

              if (file.modifiedAt instanceof Date && file.modifiedAt > modifiedSince || // eslint-disable-next-line no-mixed-operators
              file.uploadedAt instanceof Date && file.uploadedAt > modifiedSince) {
                res.writeHead(304); // Not Modified

                res.end();
                return;
              }
            } // Support range request


            if (typeof req.headers.range === 'string') {
              const {
                range
              } = req.headers; // Range is not valid

              if (!range) {
                res.writeHead(416);
                res.end();
                return;
              }

              const total = file.size;
              const unit = range.substr(0, range.indexOf('='));

              if (unit !== 'bytes') {
                res.writeHead(416);
                res.end();
                return;
              }

              const ranges = range.substr(unit.length).replace(/[^0-9\-,]/, '').split(',');

              if (ranges.length > 1) {// todo: support multipart ranges: https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
              } else {
                const r = ranges[0].split('-');
                const start = parseInt(r[0], 10);
                const end = r[1] ? parseInt(r[1], 10) : total - 1; // Range is not valid

                if (start < 0 || end >= total || start > end) {
                  res.writeHead(416);
                  res.end();
                  return;
                } // Update headers


                headers['Content-Range'] = "bytes ".concat(start, "-").concat(end, "/").concat(total);
                headers['Content-Length'] = end - start + 1;
                options.start = start;
                options.end = end;
              }

              status = 206; // partial content
            }
          } else {
            headers['Accept-Ranges'] = 'bytes';
          } // Open the file stream


          const rs = store.getReadStream(fileId, file, options);
          const ws = new stream.PassThrough();
          rs.on('error', Meteor.bindEnvironment(err => {
            store.onReadError.call(store, err, fileId, file);
            res.end();
          }));
          ws.on('error', Meteor.bindEnvironment(err => {
            store.onReadError.call(store, err, fileId, file);
            res.end();
          }));
          ws.on('close', () => {
            // Close output stream at the end
            ws.emit('end');
          }); // Transform stream

          store.transformRead(rs, ws, fileId, file, req, headers); // Parse request headers

          if (typeof req.headers === 'object') {
            // Compress data using if needed (ignore audio/video as they are already compressed)
            if (typeof req.headers['accept-encoding'] === 'string' && !/^(audio|video)/.test(file.type)) {
              const accept = req.headers['accept-encoding']; // Compress with gzip

              if (accept.match(/\bgzip\b/)) {
                headers['Content-Encoding'] = 'gzip';
                delete headers['Content-Length'];
                res.writeHead(status, headers);
                ws.pipe(zlib.createGzip()).pipe(res);
                return;
              } // Compress with deflate


              if (accept.match(/\bdeflate\b/)) {
                headers['Content-Encoding'] = 'deflate';
                delete headers['Content-Length'];
                res.writeHead(status, headers);
                ws.pipe(zlib.createDeflate()).pipe(res);
                return;
              }
            }
          } // Send raw data


          if (!headers['Content-Encoding']) {
            res.writeHead(status, headers);
            ws.pipe(res);
          }
        } else {
          res.end();
        }
      });
    } else {
      next();
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-store-permissions.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-store-permissions.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  StorePermissions: () => StorePermissions
});

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 0);

class StorePermissions {
  constructor(options) {
    // Default options
    options = _.extend({
      insert: null,
      remove: null,
      update: null
    }, options); // Check options

    if (options.insert && typeof options.insert !== 'function') {
      throw new TypeError('StorePermissions: insert is not a function');
    }

    if (options.remove && typeof options.remove !== 'function') {
      throw new TypeError('StorePermissions: remove is not a function');
    }

    if (options.update && typeof options.update !== 'function') {
      throw new TypeError('StorePermissions: update is not a function');
    } // Public attributes


    this.actions = {
      insert: options.insert,
      remove: options.remove,
      update: options.update
    };
  }
  /**
    * Checks the permission for the action
    * @param action
    * @param userId
    * @param file
    * @param fields
    * @param modifiers
    * @return {*}
    */


  check(action, userId, file, fields, modifiers) {
    if (typeof this.actions[action] === 'function') {
      return this.actions[action](userId, file, fields, modifiers);
    }

    return true; // by default allow all
  }
  /**
    * Checks the insert permission
    * @param userId
    * @param file
    * @returns {*}
    */


  checkInsert(userId, file) {
    return this.check('insert', userId, file);
  }
  /**
    * Checks the remove permission
    * @param userId
    * @param file
    * @returns {*}
    */


  checkRemove(userId, file) {
    return this.check('remove', userId, file);
  }
  /**
    * Checks the update permission
    * @param userId
    * @param file
    * @param fields
    * @param modifiers
    * @returns {*}
    */


  checkUpdate(userId, file, fields, modifiers) {
    return this.check('update', userId, file, fields, modifiers);
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-store.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-store.js                                                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
let _objectWithoutProperties;

module.link("@babel/runtime/helpers/objectWithoutProperties", {
  default(v) {
    _objectWithoutProperties = v;
  }

}, 0);
module.export({
  Store: () => Store
});
let check;
module.link("meteor/check", {
  check(v) {
    check = v;
  }

}, 0);
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 1);
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 2);

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 3);
let UploadFS;
module.link("./ufs", {
  UploadFS(v) {
    UploadFS = v;
  }

}, 4);
let Filter;
module.link("./ufs-filter", {
  Filter(v) {
    Filter = v;
  }

}, 5);
let StorePermissions;
module.link("./ufs-store-permissions", {
  StorePermissions(v) {
    StorePermissions = v;
  }

}, 6);
let Tokens;
module.link("./ufs-tokens", {
  Tokens(v) {
    Tokens = v;
  }

}, 7);

class Store {
  constructor(options) {
    const self = this; // Default options

    options = _.extend({
      collection: null,
      filter: null,
      name: null,
      onCopyError: this.onCopyError,
      onFinishUpload: this.onFinishUpload,
      onRead: this.onRead,
      onReadError: this.onReadError,
      onValidate: this.onValidate,
      onWriteError: this.onWriteError,
      permissions: null,
      transformRead: null,
      transformWrite: null
    }, options); // Check options

    if (!(options.collection instanceof Mongo.Collection)) {
      throw new TypeError('Store: collection is not a Mongo.Collection');
    }

    if (options.filter && !(options.filter instanceof Filter)) {
      throw new TypeError('Store: filter is not a UploadFS.Filter');
    }

    if (typeof options.name !== 'string') {
      throw new TypeError('Store: name is not a string');
    }

    if (UploadFS.getStore(options.name)) {
      throw new TypeError('Store: name already exists');
    }

    if (options.onCopyError && typeof options.onCopyError !== 'function') {
      throw new TypeError('Store: onCopyError is not a function');
    }

    if (options.onFinishUpload && typeof options.onFinishUpload !== 'function') {
      throw new TypeError('Store: onFinishUpload is not a function');
    }

    if (options.onRead && typeof options.onRead !== 'function') {
      throw new TypeError('Store: onRead is not a function');
    }

    if (options.onReadError && typeof options.onReadError !== 'function') {
      throw new TypeError('Store: onReadError is not a function');
    }

    if (options.onWriteError && typeof options.onWriteError !== 'function') {
      throw new TypeError('Store: onWriteError is not a function');
    }

    if (options.permissions && !(options.permissions instanceof StorePermissions)) {
      throw new TypeError('Store: permissions is not a UploadFS.StorePermissions');
    }

    if (options.transformRead && typeof options.transformRead !== 'function') {
      throw new TypeError('Store: transformRead is not a function');
    }

    if (options.transformWrite && typeof options.transformWrite !== 'function') {
      throw new TypeError('Store: transformWrite is not a function');
    }

    if (options.onValidate && typeof options.onValidate !== 'function') {
      throw new TypeError('Store: onValidate is not a function');
    } // Public attributes


    self.options = options;
    self.permissions = options.permissions;
    ['onCopyError', 'onFinishUpload', 'onRead', 'onReadError', 'onWriteError', 'onValidate'].forEach(method => {
      if (typeof options[method] === 'function') {
        self[method] = options[method];
      }
    }); // Add the store to the list

    UploadFS.addStore(self); // Set default permissions

    if (!(self.permissions instanceof StorePermissions)) {
      // Uses custom default permissions or UFS default permissions
      if (UploadFS.config.defaultStorePermissions instanceof StorePermissions) {
        self.permissions = UploadFS.config.defaultStorePermissions;
      } else {
        self.permissions = new StorePermissions();
        console.warn("ufs: permissions are not defined for store \"".concat(options.name, "\""));
      }
    }

    if (Meteor.isServer) {
      /**
          * Checks token validity
          * @param token
          * @param fileId
          * @returns {boolean}
          */
      self.checkToken = function (token, fileId) {
        check(token, String);
        check(fileId, String);
        return Tokens.find({
          value: token,
          fileId
        }).count() === 1;
      };
      /**
          * Copies the file to a store
          * @param fileId
          * @param store
          * @param callback
          */


      self.copy = function (fileId, store, callback) {
        check(fileId, String);

        if (!(store instanceof Store)) {
          throw new TypeError('store is not an instance of UploadFS.Store');
        } // Get original file


        const file = self.getCollection().findOne({
          _id: fileId
        });

        if (!file) {
          throw new Meteor.Error('file-not-found', 'File not found');
        } // Silently ignore the file if it does not match filter


        const filter = store.getFilter();

        if (filter instanceof Filter && !filter.isValid(file)) {
          return;
        } // Prepare copy


        const {
          _id,
          url
        } = file,
              copy = _objectWithoutProperties(file, ["_id", "url"]);

        copy.originalStore = self.getName();
        copy.originalId = fileId; // Create the copy

        const copyId = store.create(copy); // Get original stream

        const rs = self.getReadStream(fileId, file); // Catch errors to avoid app crashing

        rs.on('error', Meteor.bindEnvironment(function (err) {
          callback.call(self, err, null);
        })); // Copy file data

        store.write(rs, copyId, Meteor.bindEnvironment(function (err) {
          if (err) {
            self.getCollection().remove({
              _id: copyId
            });
            self.onCopyError.call(self, err, fileId, file);
          }

          if (typeof callback === 'function') {
            callback.call(self, err, copyId, copy, store);
          }
        }));
      };
      /**
          * Creates the file in the collection
          * @param file
          * @param callback
          * @return {string}
          */


      self.create = function (file, callback) {
        check(file, Object);
        file.store = self.options.name; // assign store to file

        return self.getCollection().insert(file, callback);
      };
      /**
          * Creates a token for the file (only needed for client side upload)
          * @param fileId
          * @returns {*}
          */


      self.createToken = function (fileId) {
        const token = self.generateToken(); // Check if token exists

        if (Tokens.find({
          fileId
        }).count()) {
          Tokens.update({
            fileId
          }, {
            $set: {
              createdAt: new Date(),
              value: token
            }
          });
        } else {
          Tokens.insert({
            createdAt: new Date(),
            fileId,
            value: token
          });
        }

        return token;
      };
      /**
          * Writes the file to the store
          * @param rs
          * @param fileId
          * @param callback
          */


      self.write = function (rs, fileId, callback) {
        const file = self.getCollection().findOne({
          _id: fileId
        });
        const errorHandler = Meteor.bindEnvironment(function (err) {
          self.onWriteError.call(self, err, fileId, file);
          callback.call(self, err);
        });
        const finishHandler = Meteor.bindEnvironment(function () {
          let size = 0;
          const readStream = self.getReadStream(fileId, file);
          readStream.on('error', Meteor.bindEnvironment(function (error) {
            callback.call(self, error, null);
          }));
          readStream.on('data', Meteor.bindEnvironment(function (data) {
            size += data.length;
          }));
          readStream.on('end', Meteor.bindEnvironment(function () {
            // Set file attribute
            file.complete = true;
            file.etag = UploadFS.generateEtag();
            file.path = self.getFileRelativeURL(fileId);
            file.progress = 1;
            file.size = size;
            file.token = self.generateToken();
            file.uploading = false;
            file.uploadedAt = new Date();
            file.url = self.getFileURL(fileId); // Execute callback

            if (typeof self.onFinishUpload === 'function') {
              self.onFinishUpload.call(self, file);
            } // Sets the file URL when file transfer is complete,
            // this way, the image will loads entirely.


            self.getCollection().direct.update({
              _id: fileId
            }, {
              $set: {
                complete: file.complete,
                etag: file.etag,
                path: file.path,
                progress: file.progress,
                size: file.size,
                token: file.token,
                uploading: file.uploading,
                uploadedAt: file.uploadedAt,
                url: file.url
              }
            }); // Return file info

            callback.call(self, null, file); // Simulate write speed

            if (UploadFS.config.simulateWriteDelay) {
              Meteor._sleepForMs(UploadFS.config.simulateWriteDelay);
            } // Copy file to other stores


            if (self.options.copyTo instanceof Array) {
              for (let i = 0; i < self.options.copyTo.length; i += 1) {
                const store = self.options.copyTo[i];

                if (!store.getFilter() || store.getFilter().isValid(file)) {
                  self.copy(fileId, store);
                }
              }
            }
          }));
        });
        const ws = self.getWriteStream(fileId, file);
        ws.on('error', errorHandler);
        ws.on('finish', finishHandler); // Execute transformation

        self.transformWrite(rs, ws, fileId, file);
      };
    }

    if (Meteor.isServer) {
      // eslint-disable-next-line no-undef
      const fs = Npm.require('fs');

      const collection = self.getCollection(); // Code executed after removing file

      collection.after.remove(function (userId, file) {
        // Remove associated tokens
        Tokens.remove({
          fileId: file._id
        });

        if (self.options.copyTo instanceof Array) {
          for (let i = 0; i < self.options.copyTo.length; i += 1) {
            // Remove copies in stores
            self.options.copyTo[i].getCollection().remove({
              originalId: file._id
            });
          }
        }
      }); // Code executed before inserting file

      collection.before.insert(function (userId, file) {
        if (!self.permissions.checkInsert(userId, file)) {
          throw new Meteor.Error('forbidden', 'Forbidden');
        }
      }); // Code executed before updating file

      collection.before.update(function (userId, file, fields, modifiers) {
        if (!self.permissions.checkUpdate(userId, file, fields, modifiers)) {
          throw new Meteor.Error('forbidden', 'Forbidden');
        }
      }); // Code executed before removing file

      collection.before.remove(function (userId, file) {
        if (!self.permissions.checkRemove(userId, file)) {
          throw new Meteor.Error('forbidden', 'Forbidden');
        } // Delete the physical file in the store


        self.delete(file._id);
        const tmpFile = UploadFS.getTempFilePath(file._id); // Delete the temp file

        fs.stat(tmpFile, function (err) {
          !err && fs.unlink(tmpFile, function (err) {
            err && console.error("ufs: cannot delete temp file at ".concat(tmpFile, " (").concat(err.message, ")"));
          });
        });
      });
    }
  }
  /**
    * Deletes a file async
    * @param fileId
    * @param callback
    */
  // eslint-disable-next-line no-unused-vars


  delete(fileId, callback) {
    throw new Error('delete is not implemented');
  }
  /**
    * Generates a random token
    * @param pattern
    * @return {string}
    */


  generateToken(pattern) {
    return (pattern || 'xyxyxyxyxy').replace(/[xy]/g, c => {
      // eslint-disable-next-line no-mixed-operators
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : r & 0x3 | 0x8;
      const s = v.toString(16);
      return Math.round(Math.random()) ? s.toUpperCase() : s;
    });
  }
  /**
    * Returns the collection
    * @return {Mongo.Collection}
    */


  getCollection() {
    return this.options.collection;
  }
  /**
    * Returns the file URL
    * @param fileId
    * @return {string|null}
    */


  getFileRelativeURL(fileId) {
    const file = this.getCollection().findOne(fileId, {
      fields: {
        name: 1
      }
    });
    return file ? this.getRelativeURL("".concat(fileId, "/").concat(file.name)) : null;
  }
  /**
    * Returns the file URL
    * @param fileId
    * @return {string|null}
    */


  getFileURL(fileId) {
    const file = this.getCollection().findOne(fileId, {
      fields: {
        name: 1
      }
    });
    return file ? this.getURL("".concat(fileId, "/").concat(file.name)) : null;
  }
  /**
    * Returns the file filter
    * @return {UploadFS.Filter}
    */


  getFilter() {
    return this.options.filter;
  }
  /**
    * Returns the store name
    * @return {string}
    */


  getName() {
    return this.options.name;
  }
  /**
    * Returns the file read stream
    * @param fileId
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  getReadStream(fileId, file) {
    throw new Error('Store.getReadStream is not implemented');
  }
  /**
    * Returns the store relative URL
    * @param path
    * @return {string}
    */


  getRelativeURL(path) {
    const rootUrl = Meteor.absoluteUrl().replace(/\/+$/, '');
    const rootPath = rootUrl.replace(/^[a-z]+:\/\/[^/]+\/*/gi, '');
    const storeName = this.getName();
    path = String(path).replace(/\/$/, '').trim();
    return encodeURI("".concat(rootPath, "/").concat(UploadFS.config.storesPath, "/").concat(storeName, "/").concat(path));
  }
  /**
    * Returns the store absolute URL
    * @param path
    * @return {string}
    */


  getURL(path) {
    const rootUrl = Meteor.absoluteUrl({
      secure: UploadFS.config.https
    }).replace(/\/+$/, '');
    const storeName = this.getName();
    path = String(path).replace(/\/$/, '').trim();
    return encodeURI("".concat(rootUrl, "/").concat(UploadFS.config.storesPath, "/").concat(storeName, "/").concat(path));
  }
  /**
    * Returns the file write stream
    * @param fileId
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  getWriteStream(fileId, file) {
    throw new Error('getWriteStream is not implemented');
  }
  /**
    * Completes the file upload
    * @param url
    * @param file
    * @param callback
    */


  importFromURL(url, file, callback) {
    Meteor.call('ufsImportURL', url, file, this.getName(), callback);
  }
  /**
    * Called when a copy error happened
    * @param err
    * @param fileId
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onCopyError(err, fileId, file) {
    console.error("ufs: cannot copy file \"".concat(fileId, "\" (").concat(err.message, ")"), err);
  }
  /**
    * Called when a file has been uploaded
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onFinishUpload(file) {}
  /**
    * Called when a file is read from the store
    * @param fileId
    * @param file
    * @param request
    * @param response
    * @return boolean
    */
  // eslint-disable-next-line no-unused-vars


  onRead(fileId, file, request, response) {
    return true;
  }
  /**
    * Called when a read error happened
    * @param err
    * @param fileId
    * @param file
    * @return boolean
    */
  // eslint-disable-next-line no-unused-vars


  onReadError(err, fileId, file) {
    console.error("ufs: cannot read file \"".concat(fileId, "\" (").concat(err.message, ")"), err);
  }
  /**
    * Called when file is being validated
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onValidate(file) {}
  /**
    * Called when a write error happened
    * @param err
    * @param fileId
    * @param file
    * @return boolean
    */
  // eslint-disable-next-line no-unused-vars


  onWriteError(err, fileId, file) {
    console.error("ufs: cannot write file \"".concat(fileId, "\" (").concat(err.message, ")"), err);
  }
  /**
    * Sets the store permissions
    * @param permissions
    */


  setPermissions(permissions) {
    if (!(permissions instanceof StorePermissions)) {
      throw new TypeError('Permissions is not an instance of UploadFS.StorePermissions');
    }

    this.permissions = permissions;
  }
  /**
    * Transforms the file on reading
    * @param readStream
    * @param writeStream
    * @param fileId
    * @param file
    * @param request
    * @param headers
    */


  transformRead(readStream, writeStream, fileId, file, request, headers) {
    if (typeof this.options.transformRead === 'function') {
      this.options.transformRead.call(this, readStream, writeStream, fileId, file, request, headers);
    } else {
      readStream.pipe(writeStream);
    }
  }
  /**
    * Transforms the file on writing
    * @param readStream
    * @param writeStream
    * @param fileId
    * @param file
    */


  transformWrite(readStream, writeStream, fileId, file) {
    if (typeof this.options.transformWrite === 'function') {
      this.options.transformWrite.call(this, readStream, writeStream, fileId, file);
    } else {
      readStream.pipe(writeStream);
    }
  }
  /**
    * Validates the file
    * @param file
    */


  validate(file) {
    if (typeof this.onValidate === 'function') {
      this.onValidate(file);
    }
  }

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-tokens.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-tokens.js                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Tokens: () => Tokens
});
let Mongo;
module.link("meteor/mongo", {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Tokens = new Mongo.Collection('ufsTokens');
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"ufs-uploader.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/jalik_ufs/ufs-uploader.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.export({
  Uploader: () => Uploader
});
let Meteor;
module.link("meteor/meteor", {
  Meteor(v) {
    Meteor = v;
  }

}, 0);

let _;

module.link("meteor/underscore", {
  _(v) {
    _ = v;
  }

}, 1);
let Store;
module.link("./ufs-store", {
  Store(v) {
    Store = v;
  }

}, 2);

class Uploader {
  constructor(options) {
    const self = this; // Set default options

    options = _.extend({
      adaptive: true,
      capacity: 0.9,
      chunkSize: 16 * 1024,
      data: null,
      file: null,
      maxChunkSize: 4 * 1024 * 1000,
      maxTries: 5,
      onAbort: this.onAbort,
      onComplete: this.onComplete,
      onCreate: this.onCreate,
      onError: this.onError,
      onProgress: this.onProgress,
      onStart: this.onStart,
      onStop: this.onStop,
      retryDelay: 2000,
      store: null,
      transferDelay: 100
    }, options); // Check options

    if (typeof options.adaptive !== 'boolean') {
      throw new TypeError('adaptive is not a number');
    }

    if (typeof options.capacity !== 'number') {
      throw new TypeError('capacity is not a number');
    }

    if (options.capacity <= 0 || options.capacity > 1) {
      throw new RangeError('capacity must be a float between 0.1 and 1.0');
    }

    if (typeof options.chunkSize !== 'number') {
      throw new TypeError('chunkSize is not a number');
    }

    if (!(options.data instanceof Blob) && !(options.data instanceof File)) {
      throw new TypeError('data is not an Blob or File');
    }

    if (options.file === null || typeof options.file !== 'object') {
      throw new TypeError('file is not an object');
    }

    if (typeof options.maxChunkSize !== 'number') {
      throw new TypeError('maxChunkSize is not a number');
    }

    if (typeof options.maxTries !== 'number') {
      throw new TypeError('maxTries is not a number');
    }

    if (typeof options.retryDelay !== 'number') {
      throw new TypeError('retryDelay is not a number');
    }

    if (typeof options.transferDelay !== 'number') {
      throw new TypeError('transferDelay is not a number');
    }

    if (typeof options.onAbort !== 'function') {
      throw new TypeError('onAbort is not a function');
    }

    if (typeof options.onComplete !== 'function') {
      throw new TypeError('onComplete is not a function');
    }

    if (typeof options.onCreate !== 'function') {
      throw new TypeError('onCreate is not a function');
    }

    if (typeof options.onError !== 'function') {
      throw new TypeError('onError is not a function');
    }

    if (typeof options.onProgress !== 'function') {
      throw new TypeError('onProgress is not a function');
    }

    if (typeof options.onStart !== 'function') {
      throw new TypeError('onStart is not a function');
    }

    if (typeof options.onStop !== 'function') {
      throw new TypeError('onStop is not a function');
    }

    if (typeof options.store !== 'string' && !(options.store instanceof Store)) {
      throw new TypeError('store must be the name of the store or an instance of UploadFS.Store');
    } // Public attributes


    self.adaptive = options.adaptive;
    self.capacity = parseFloat(options.capacity);
    self.chunkSize = parseInt(options.chunkSize);
    self.maxChunkSize = parseInt(options.maxChunkSize);
    self.maxTries = parseInt(options.maxTries);
    self.retryDelay = parseInt(options.retryDelay);
    self.transferDelay = parseInt(options.transferDelay);
    self.onAbort = options.onAbort;
    self.onComplete = options.onComplete;
    self.onCreate = options.onCreate;
    self.onError = options.onError;
    self.onProgress = options.onProgress;
    self.onStart = options.onStart;
    self.onStop = options.onStop; // Private attributes

    let {
      store
    } = options;
    const {
      data
    } = options;
    const capacityMargin = 0.1;
    let {
      file
    } = options;
    let fileId = null;
    let offset = 0;
    let loaded = 0;
    const total = data.size;
    let tries = 0;
    let postUrl = null;
    let token = null;
    let complete = false;
    let uploading = false;
    let timeA = null;
    let timeB = null;
    let elapsedTime = 0;
    let startTime = 0; // Keep only the name of the store

    if (store instanceof Store) {
      store = store.getName();
    } // Assign file to store


    file.store = store;

    function finish() {
      // Finish the upload by telling the store the upload is complete
      Meteor.call('ufsComplete', fileId, store, token, function (err, uploadedFile) {
        if (err) {
          self.onError(err, file);
          self.abort();
        } else if (uploadedFile) {
          uploading = false;
          complete = true;
          file = uploadedFile;
          self.onComplete(uploadedFile);
        }
      });
    }
    /**
       * Aborts the current transfer
       */


    self.abort = function () {
      // Remove the file from database
      // eslint-disable-next-line no-unused-vars
      Meteor.call('ufsDelete', fileId, store, token, function (err, result) {
        if (err) {
          self.onError(err, file);
        }
      }); // Reset uploader status

      uploading = false;
      fileId = null;
      offset = 0;
      tries = 0;
      loaded = 0;
      complete = false;
      startTime = null;
      self.onAbort(file);
    };
    /**
       * Returns the average speed in bytes per second
       * @returns {number}
       */


    self.getAverageSpeed = function () {
      const seconds = self.getElapsedTime() / 1000;
      return self.getLoaded() / seconds;
    };
    /**
       * Returns the elapsed time in milliseconds
       * @returns {number}
       */


    self.getElapsedTime = function () {
      if (startTime && self.isUploading()) {
        return elapsedTime + (Date.now() - startTime);
      }

      return elapsedTime;
    };
    /**
       * Returns the file
       * @return {object}
       */


    self.getFile = function () {
      return file;
    };
    /**
       * Returns the loaded bytes
       * @return {number}
       */


    self.getLoaded = function () {
      return loaded;
    };
    /**
       * Returns current progress
       * @return {number}
       */


    self.getProgress = function () {
      return Math.min(loaded / total * 100 / 100, 1.0);
    };
    /**
       * Returns the remaining time in milliseconds
       * @returns {number}
       */


    self.getRemainingTime = function () {
      const averageSpeed = self.getAverageSpeed();
      const remainingBytes = total - self.getLoaded();
      return averageSpeed && remainingBytes ? Math.max(remainingBytes / averageSpeed, 0) : 0;
    };
    /**
       * Returns the upload speed in bytes per second
       * @returns {number}
       */


    self.getSpeed = function () {
      if (timeA && timeB && self.isUploading()) {
        const seconds = (timeB - timeA) / 1000;
        return self.chunkSize / seconds;
      }

      return 0;
    };
    /**
       * Returns the total bytes
       * @return {number}
       */


    self.getTotal = function () {
      return total;
    };
    /**
       * Checks if the transfer is complete
       * @return {boolean}
       */


    self.isComplete = function () {
      return complete;
    };
    /**
       * Checks if the transfer is active
       * @return {boolean}
       */


    self.isUploading = function () {
      return uploading;
    };
    /**
       * Reads a portion of file
       * @param start
       * @param length
       * @param callback
       * @returns {Blob}
       */


    self.readChunk = function (start, length, callback) {
      if (typeof callback !== 'function') {
        throw new Error('readChunk is missing callback');
      }

      try {
        let end; // Calculate the chunk size

        if (length && start + length > total) {
          end = total;
        } else {
          end = start + length;
        } // Get chunk


        const chunk = data.slice(start, end); // Pass chunk to callback

        callback.call(self, null, chunk);
      } catch (err) {
        console.error('read error', err); // Retry to read chunk

        Meteor.setTimeout(function () {
          if (tries < self.maxTries) {
            tries += 1;
            self.readChunk(start, length, callback);
          }
        }, self.retryDelay);
      }
    };
    /**
       * Sends a file chunk to the store
       */


    self.sendChunk = function () {
      if (!complete && startTime !== null) {
        if (offset < total) {
          let {
            chunkSize
          } = self; // Use adaptive length

          if (self.adaptive && timeA && timeB && timeB > timeA) {
            const duration = (timeB - timeA) / 1000;
            const max = self.capacity * (1 + capacityMargin);
            const min = self.capacity * (1 - capacityMargin);

            if (duration >= max) {
              chunkSize = Math.abs(Math.round(chunkSize * (max - duration)));
            } else if (duration < min) {
              chunkSize = Math.round(chunkSize * (min / duration));
            } // Limit to max chunk size


            if (self.maxChunkSize > 0 && chunkSize > self.maxChunkSize) {
              chunkSize = self.maxChunkSize;
            }
          } // Reduce chunk size to fit total


          if (offset + chunkSize > total) {
            chunkSize = total - offset;
          } // Prepare the chunk


          self.readChunk(offset, chunkSize, function (err, chunk) {
            if (err) {
              self.onError(err, file);
              return;
            }

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if ([200, 201, 202, 204].includes(xhr.status)) {
                  timeB = Date.now();
                  offset += chunkSize;
                  loaded += chunkSize; // Send next chunk

                  self.onProgress(file, self.getProgress()); // Finish upload

                  if (loaded >= total) {
                    elapsedTime = Date.now() - startTime;
                    finish();
                  } else {
                    Meteor.setTimeout(self.sendChunk, self.transferDelay);
                  }
                } else if (![402, 403, 404, 500].includes(xhr.status)) {
                  // Retry until max tries is reach
                  // But don't retry if these errors occur
                  if (tries <= self.maxTries) {
                    tries += 1; // Wait before retrying

                    Meteor.setTimeout(self.sendChunk, self.retryDelay);
                  } else {
                    self.abort();
                  }
                } else {
                  self.abort();
                }
              }
            }; // Calculate upload progress


            const progress = (offset + chunkSize) / total; // let formData = new FormData();
            // formData.append('progress', progress);
            // formData.append('chunk', chunk);

            const url = "".concat(postUrl, "&progress=").concat(progress);
            timeA = Date.now();
            timeB = null;
            uploading = true; // Send chunk to the store

            xhr.open('POST', url, true);
            xhr.send(chunk);
          });
        }
      }
    };
    /**
       * Starts or resumes the transfer
       */


    self.start = function () {
      if (!fileId) {
        // Create the file document and get the token
        // that allows the user to send chunks to the store.
        Meteor.call('ufsCreate', _.extend({}, file), function (err, result) {
          if (err) {
            self.onError(err, file);
          } else if (result) {
            token = result.token;
            postUrl = result.url;
            fileId = result.fileId;
            file._id = result.fileId;
            self.onCreate(file);
            tries = 0;
            startTime = Date.now();
            self.onStart(file);
            self.sendChunk();
          }
        });
      } else if (!uploading && !complete) {
        // Resume uploading
        tries = 0;
        startTime = Date.now();
        self.onStart(file);
        self.sendChunk();
      }
    };
    /**
       * Stops the transfer
       */


    self.stop = function () {
      if (uploading) {
        // Update elapsed time
        elapsedTime = Date.now() - startTime;
        startTime = null;
        uploading = false;
        self.onStop(file); // eslint-disable-next-line no-unused-vars

        Meteor.call('ufsStop', fileId, store, token, function (err, result) {
          if (err) {
            self.onError(err, file);
          }
        });
      }
    };
  }
  /**
    * Called when the file upload is aborted
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onAbort(file) {}
  /**
    * Called when the file upload is complete
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onComplete(file) {}
  /**
    * Called when the file is created in the collection
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onCreate(file) {}
  /**
    * Called when an error occurs during file upload
    * @param err
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onError(err, file) {
    console.error("ufs: ".concat(err.message));
  }
  /**
    * Called when a file chunk has been sent
    * @param file
    * @param progress is a float from 0.0 to 1.0
    */
  // eslint-disable-next-line no-unused-vars


  onProgress(file, progress) {}
  /**
    * Called when the file upload starts
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onStart(file) {}
  /**
    * Called when the file upload stops
    * @param file
    */
  // eslint-disable-next-line no-unused-vars


  onStop(file) {}

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"spark-md5":{"package.json":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/jalik_ufs/node_modules/spark-md5/package.json                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.exports = {
  "name": "spark-md5",
  "version": "3.0.0",
  "main": "spark-md5.js"
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"spark-md5.js":function module(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// node_modules/meteor/jalik_ufs/node_modules/spark-md5/spark-md5.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
module.useNode();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/jalik:ufs/ufs.js");

/* Exports */
Package._define("jalik:ufs", exports);

})();

//# sourceURL=meteor://💻app/packages/jalik_ufs.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvamFsaWs6dWZzL3Vmcy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvamFsaWs6dWZzL3Vmcy1jb25maWcuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2phbGlrOnVmcy91ZnMtZmlsdGVyLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9qYWxpazp1ZnMvdWZzLW1ldGhvZHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2phbGlrOnVmcy91ZnMtbWltZS5qcyIsIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvamFsaWs6dWZzL3Vmcy1zZXJ2ZXIuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2phbGlrOnVmcy91ZnMtc3RvcmUtcGVybWlzc2lvbnMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2phbGlrOnVmcy91ZnMtc3RvcmUuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3BhY2thZ2VzL2phbGlrOnVmcy91ZnMtdG9rZW5zLmpzIiwibWV0ZW9yOi8v8J+Su2FwcC9wYWNrYWdlcy9qYWxpazp1ZnMvdWZzLXVwbG9hZGVyLmpzIl0sIm5hbWVzIjpbIm1vZHVsZTEiLCJleHBvcnQiLCJVcGxvYWRGUyIsIk1ldGVvciIsImxpbmsiLCJ2IiwiUmFuZG9tIiwiQ29uZmlnIiwiRmlsdGVyIiwiTUlNRSIsIlN0b3JlIiwiU3RvcmVQZXJtaXNzaW9ucyIsIlRva2VucyIsIlVwbG9hZGVyIiwic3RvcmVzIiwic3RvcmUiLCJ0b2tlbnMiLCJhZGRFVGFnQXR0cmlidXRlVG9GaWxlcyIsIndoZXJlIiwiZ2V0U3RvcmVzIiwiZm9yRWFjaCIsImZpbGVzIiwiZ2V0Q29sbGVjdGlvbiIsImZpbmQiLCJldGFnIiwiZmllbGRzIiwiX2lkIiwiZmlsZSIsImRpcmVjdCIsInVwZGF0ZSIsIiRzZXQiLCJnZW5lcmF0ZUV0YWciLCJhZGRNaW1lVHlwZSIsImV4dGVuc2lvbiIsIm1pbWUiLCJ0b0xvd2VyQ2FzZSIsImFkZFBhdGhBdHRyaWJ1dGVUb0ZpbGVzIiwicGF0aCIsImdldEZpbGVSZWxhdGl2ZVVSTCIsImFkZFN0b3JlIiwiVHlwZUVycm9yIiwiZ2V0TmFtZSIsImlkIiwiZ2V0TWltZVR5cGUiLCJnZXRNaW1lVHlwZXMiLCJnZXRTdG9yZSIsIm5hbWUiLCJnZXRUZW1wRmlsZVBhdGgiLCJmaWxlSWQiLCJjb25maWciLCJ0bXBEaXIiLCJpbXBvcnRGcm9tVVJMIiwidXJsIiwiY2FsbGJhY2siLCJjYWxsIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJjb25zb2xlIiwiZXJyb3IiLCJzZWxlY3RGaWxlIiwiaW5wdXQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwibXVsdGlwbGUiLCJvbmNoYW5nZSIsImV2IiwidGFyZ2V0IiwiZGl2IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJjbGljayIsInNlbGVjdEZpbGVzIiwiaSIsImxlbmd0aCIsImlzU2VydmVyIiwicmVxdWlyZSIsImdsb2JhbCIsImlzQ2xpZW50Iiwid2luZG93IiwibW9kdWxlIiwiXyIsImNvbnN0cnVjdG9yIiwib3B0aW9ucyIsImV4dGVuZCIsImRlZmF1bHRTdG9yZVBlcm1pc3Npb25zIiwiaHR0cHMiLCJzaW11bGF0ZVJlYWREZWxheSIsInNpbXVsYXRlVXBsb2FkU3BlZWQiLCJzaW11bGF0ZVdyaXRlRGVsYXkiLCJzdG9yZXNQYXRoIiwidG1wRGlyUGVybWlzc2lvbnMiLCJwYXJzZUludCIsInNlbGYiLCJjb250ZW50VHlwZXMiLCJleHRlbnNpb25zIiwibWluU2l6ZSIsIm1heFNpemUiLCJpbnZhbGlkRmlsZUVycm9yIiwiRXJyb3IiLCJmaWxlVG9vU21hbGxFcnJvciIsImZpbGVTaXplIiwibWluRmlsZVNpemUiLCJmaWxlVG9vTGFyZ2VFcnJvciIsIm1heEZpbGVTaXplIiwiaW52YWxpZEZpbGVFeHRlbnNpb24iLCJmaWxlRXh0ZW5zaW9uIiwiYWxsb3dlZEV4dGVuc2lvbnMiLCJpbnZhbGlkRmlsZVR5cGUiLCJmaWxlVHlwZSIsImFsbG93ZWRDb250ZW50VHlwZXMiLCJvbkNoZWNrIiwiQXJyYXkiLCJtZXRob2QiLCJjaGVjayIsInNpemUiLCJnZXRNaW5TaXplIiwiZ2V0TWF4U2l6ZSIsImdldEV4dGVuc2lvbnMiLCJpbmNsdWRlcyIsImdldENvbnRlbnRUeXBlcyIsImZpbGVUeXBlcyIsImlzQ29udGVudFR5cGVJbkxpc3QiLCJsaXN0Iiwid2lsZENhcmRHbG9iIiwid2lsZGNhcmRzIiwiZmlsdGVyIiwiaXRlbSIsImluZGV4T2YiLCJyZXBsYWNlIiwiaXNWYWxpZCIsInJlc3VsdCIsImVyciIsImZzIiwiTnBtIiwiaHR0cCIsIkZ1dHVyZSIsIm1ldGhvZHMiLCJ1ZnNDb21wbGV0ZSIsInN0b3JlTmFtZSIsInRva2VuIiwiU3RyaW5nIiwiY2hlY2tUb2tlbiIsImZ1dCIsInRtcEZpbGUiLCJyZW1vdmVUZW1wRmlsZSIsInVubGluayIsIm1lc3NhZ2UiLCJmaW5kT25lIiwidmFsaWRhdGUiLCJycyIsImNyZWF0ZVJlYWRTdHJlYW0iLCJmbGFncyIsImVuY29kaW5nIiwiYXV0b0Nsb3NlIiwib24iLCJiaW5kRW52aXJvbm1lbnQiLCJyZW1vdmUiLCJ0aHJvdyIsIndyaXRlIiwicmV0dXJuIiwid2FpdCIsInVmc0NyZWF0ZSIsIk9iamVjdCIsImNvbXBsZXRlIiwidXBsb2FkaW5nIiwic3Vic3RyIiwibGFzdEluZGV4T2YiLCJwcm9ncmVzcyIsInVzZXJJZCIsImdldEZpbHRlciIsImNyZWF0ZSIsImNyZWF0ZVRva2VuIiwidXBsb2FkVXJsIiwiZ2V0VVJMIiwidWZzRGVsZXRlIiwiY291bnQiLCJ1ZnNJbXBvcnRVUkwiLCJzcGxpdCIsInBvcCIsIm9yaWdpbmFsVXJsIiwid2FybiIsInByb3RvIiwidGVzdCIsInVuYmxvY2siLCJnZXQiLCJyZXMiLCJ1ZnNTdG9wIiwiYXJjIiwiYWkiLCJiaW4iLCJieiIsImJ6MiIsImVwcyIsImV4ZSIsImd6IiwiZ3ppcCIsImpzIiwianNvbiIsIm9neCIsInBkZiIsInBzIiwicHNkIiwicmFyIiwicmV2Iiwic3dmIiwidGFyIiwieGh0bWwiLCJ4bWwiLCJ6aXAiLCJhaWYiLCJhaWZjIiwiYWlmZiIsImF1IiwiZmxhYyIsIm1pZGkiLCJtcDIiLCJtcDMiLCJtcGEiLCJvZ2EiLCJvZ2ciLCJvcHVzIiwicmEiLCJzcHgiLCJ3YXYiLCJ3ZWJhIiwid21hIiwiYXZzIiwiYm1wIiwiZ2lmIiwiaWNvIiwianBlZyIsImpwZyIsIm1qcGciLCJwaWMiLCJwbmciLCJzdmciLCJ0aWYiLCJ0aWZmIiwiY3NzIiwiY3N2IiwiaHRtbCIsInR4dCIsImF2aSIsImR2IiwiZmx2IiwibW92IiwibXA0IiwibXBlZyIsIm1wZyIsIm9ndiIsInZkbyIsIndlYm0iLCJ3bXYiLCJkb2MiLCJkb2N4Iiwib2RiIiwib2RjIiwib2RmIiwib2RnIiwib2RpIiwib2RtIiwib2RwIiwib2RzIiwib2R0Iiwib3RnIiwib3RwIiwib3RzIiwib3R0IiwicHB0IiwicHB0eCIsInhscyIsInhsc3giLCJXZWJBcHAiLCJTcGFya01ENSIsImRlZmF1bHQiLCJkb21haW4iLCJta2RpcnAiLCJzdHJlYW0iLCJVUkwiLCJ6bGliIiwic3RhcnR1cCIsIm1vZGUiLCJzdGF0IiwibG9nIiwiY2htb2QiLCJkIiwiY29ubmVjdEhhbmRsZXJzIiwidXNlIiwicmVxIiwibmV4dCIsInBhcnNlZFVybCIsInBhcnNlIiwicGF0aG5hbWUiLCJhbGxvd0NPUlMiLCJzZXRIZWFkZXIiLCJyZWdFeHAiLCJSZWdFeHAiLCJtYXRjaCIsImV4ZWMiLCJ3cml0ZUhlYWQiLCJlbmQiLCJxdWVyeSIsInVuaXF1ZSIsImhhc2giLCJvcmlnaW5hbElkIiwiJG5lIiwic3BhcmsiLCJBcnJheUJ1ZmZlciIsIndzIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJwYXJzZUZsb2F0IiwiaXNOYU4iLCJNYXRoIiwibWluIiwiY2h1bmsiLCJhcHBlbmQiLCJvblJlYWQiLCJ1bmRlZmluZWQiLCJpbmRleCIsIl9zbGVlcEZvck1zIiwicnVuIiwic3RhdHVzIiwiaGVhZGVycyIsIkVUYWciLCJtb2RpZmllZEF0IiwiRGF0ZSIsInRvVVRDU3RyaW5nIiwidXBsb2FkZWRBdCIsIm1vZGlmaWVkU2luY2UiLCJyYW5nZSIsInRvdGFsIiwidW5pdCIsInJhbmdlcyIsInIiLCJzdGFydCIsImdldFJlYWRTdHJlYW0iLCJQYXNzVGhyb3VnaCIsIm9uUmVhZEVycm9yIiwiZW1pdCIsInRyYW5zZm9ybVJlYWQiLCJhY2NlcHQiLCJwaXBlIiwiY3JlYXRlR3ppcCIsImNyZWF0ZURlZmxhdGUiLCJpbnNlcnQiLCJhY3Rpb25zIiwiYWN0aW9uIiwibW9kaWZpZXJzIiwiY2hlY2tJbnNlcnQiLCJjaGVja1JlbW92ZSIsImNoZWNrVXBkYXRlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiTW9uZ28iLCJjb2xsZWN0aW9uIiwib25Db3B5RXJyb3IiLCJvbkZpbmlzaFVwbG9hZCIsIm9uVmFsaWRhdGUiLCJvbldyaXRlRXJyb3IiLCJwZXJtaXNzaW9ucyIsInRyYW5zZm9ybVdyaXRlIiwiQ29sbGVjdGlvbiIsInZhbHVlIiwiY29weSIsIm9yaWdpbmFsU3RvcmUiLCJjb3B5SWQiLCJnZW5lcmF0ZVRva2VuIiwiY3JlYXRlZEF0IiwiZXJyb3JIYW5kbGVyIiwiZmluaXNoSGFuZGxlciIsInJlYWRTdHJlYW0iLCJkYXRhIiwiZ2V0RmlsZVVSTCIsImNvcHlUbyIsImdldFdyaXRlU3RyZWFtIiwiYWZ0ZXIiLCJiZWZvcmUiLCJkZWxldGUiLCJwYXR0ZXJuIiwiYyIsInJhbmRvbSIsInMiLCJ0b1N0cmluZyIsInJvdW5kIiwidG9VcHBlckNhc2UiLCJnZXRSZWxhdGl2ZVVSTCIsInJvb3RVcmwiLCJhYnNvbHV0ZVVybCIsInJvb3RQYXRoIiwidHJpbSIsImVuY29kZVVSSSIsInNlY3VyZSIsInJlcXVlc3QiLCJyZXNwb25zZSIsInNldFBlcm1pc3Npb25zIiwid3JpdGVTdHJlYW0iLCJhZGFwdGl2ZSIsImNhcGFjaXR5IiwiY2h1bmtTaXplIiwibWF4Q2h1bmtTaXplIiwibWF4VHJpZXMiLCJvbkFib3J0Iiwib25Db21wbGV0ZSIsIm9uQ3JlYXRlIiwib25FcnJvciIsIm9uUHJvZ3Jlc3MiLCJvblN0YXJ0Iiwib25TdG9wIiwicmV0cnlEZWxheSIsInRyYW5zZmVyRGVsYXkiLCJSYW5nZUVycm9yIiwiQmxvYiIsIkZpbGUiLCJjYXBhY2l0eU1hcmdpbiIsIm9mZnNldCIsImxvYWRlZCIsInRyaWVzIiwicG9zdFVybCIsInRpbWVBIiwidGltZUIiLCJlbGFwc2VkVGltZSIsInN0YXJ0VGltZSIsImZpbmlzaCIsInVwbG9hZGVkRmlsZSIsImFib3J0IiwiZ2V0QXZlcmFnZVNwZWVkIiwic2Vjb25kcyIsImdldEVsYXBzZWRUaW1lIiwiZ2V0TG9hZGVkIiwiaXNVcGxvYWRpbmciLCJub3ciLCJnZXRGaWxlIiwiZ2V0UHJvZ3Jlc3MiLCJnZXRSZW1haW5pbmdUaW1lIiwiYXZlcmFnZVNwZWVkIiwicmVtYWluaW5nQnl0ZXMiLCJtYXgiLCJnZXRTcGVlZCIsImdldFRvdGFsIiwiaXNDb21wbGV0ZSIsInJlYWRDaHVuayIsInNsaWNlIiwic2V0VGltZW91dCIsInNlbmRDaHVuayIsImR1cmF0aW9uIiwiYWJzIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwib3BlbiIsInNlbmQiLCJzdG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLFNBQU8sQ0FBQ0MsTUFBUixDQUFlO0FBQUNDLFlBQVEsRUFBQyxNQUFJQTtBQUFkLEdBQWY7QUFBd0MsTUFBSUMsTUFBSjtBQUFXSCxTQUFPLENBQUNJLElBQVIsQ0FBYSxlQUFiLEVBQTZCO0FBQUNELFVBQU0sQ0FBQ0UsQ0FBRCxFQUFHO0FBQUNGLFlBQU0sR0FBQ0UsQ0FBUDtBQUFTOztBQUFwQixHQUE3QixFQUFtRCxDQUFuRDtBQUFzRCxNQUFJQyxNQUFKO0FBQVdOLFNBQU8sQ0FBQ0ksSUFBUixDQUFh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SSxRQUFQLEVBQWlCLENBQzFCO0FBRUQ7QUFDRDtBQUNBO0FBQ0E7QUFDQzs7O0FBQ0E4TyxTQUFPLENBQUM1WCxJQUFELEVBQU8sQ0FDYjtBQUVEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0M7OztBQUNBNlgsUUFBTSxDQUFDN1gsSUFBRCxFQUFPLENBQ1o7O0FBemVvQixDIiwiZmlsZSI6Ii9wYWNrYWdlcy9qYWxpa191ZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tICdtZXRlb3IvcmFuZG9tJztcblxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi91ZnMtY29uZmlnJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vdWZzLWZpbHRlcic7XG5pbXBvcnQgeyBNSU1FIH0gZnJvbSAnLi91ZnMtbWltZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJy4vdWZzLXN0b3JlJztcbmltcG9ydCB7IFN0b3JlUGVybWlzc2lvbnMgfSBmcm9tICcuL3Vmcy1zdG9yZS1wZXJtaXNzaW9ucyc7XG5pbXBvcnQgeyBUb2tlbnMgfSBmcm9tICcuL3Vmcy10b2tlbnMnO1xuaW1wb3J0IHsgVXBsb2FkZXIgfSBmcm9tICcuL3Vmcy11cGxvYWRlcic7XG5cbmNvbnN0IHN0b3JlcyA9IHt9O1xuXG5leHBvcnQgY29uc3QgVXBsb2FkRlMgPSB7XG5cblx0LyoqXG4gICAqIENvbnRhaW5zIGFsbCBzdG9yZXNcbiAgICovXG5cdHN0b3JlOiB7fSxcblxuXHQvKipcbiAgICogQ29sbGVjdGlvbiBvZiB0b2tlbnNcbiAgICovXG5cdHRva2VuczogVG9rZW5zLFxuXG5cdC8qKlxuICAgKiBBZGRzIHRoZSBcImV0YWdcIiBhdHRyaWJ1dGUgdG8gZmlsZXNcbiAgICogQHBhcmFtIHdoZXJlXG4gICAqL1xuXHRhZGRFVGFnQXR0cmlidXRlVG9GaWxlcyh3aGVyZSkge1xuXHRcdHRoaXMuZ2V0U3RvcmVzKCkuZm9yRWFjaCgoc3RvcmUpID0+IHtcblx0XHRcdGNvbnN0IGZpbGVzID0gc3RvcmUuZ2V0Q29sbGVjdGlvbigpO1xuXG5cdFx0XHQvLyBCeSBkZWZhdWx0IHVwZGF0ZSBvbmx5IGZpbGVzIHdpdGggbm8gcGF0aCBzZXRcblx0XHRcdGZpbGVzLmZpbmQod2hlcmUgfHwgeyBldGFnOiBudWxsIH0sIHsgZmllbGRzOiB7IF9pZDogMSB9IH0pLmZvckVhY2goKGZpbGUpID0+IHtcblx0XHRcdFx0ZmlsZXMuZGlyZWN0LnVwZGF0ZShmaWxlLl9pZCwgeyAkc2V0OiB7IGV0YWc6IHRoaXMuZ2VuZXJhdGVFdGFnKCkgfSB9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAgKiBBZGRzIHRoZSBNSU1FIHR5cGUgZm9yIGFuIGV4dGVuc2lvblxuICAgKiBAcGFyYW0gZXh0ZW5zaW9uXG4gICAqIEBwYXJhbSBtaW1lXG4gICAqL1xuXHRhZGRNaW1lVHlwZShleHRlbnNpb24sIG1pbWUpIHtcblx0XHRNSU1FW2V4dGVuc2lvbi50b0xvd2VyQ2FzZSgpXSA9IG1pbWU7XG5cdH0sXG5cblx0LyoqXG4gICAqIEFkZHMgdGhlIFwicGF0aFwiIGF0dHJpYnV0ZSB0byBmaWxlc1xuICAgKiBAcGFyYW0gd2hlcmVcbiAgICovXG5cdGFkZFBhdGhBdHRyaWJ1dGVUb0ZpbGVzKHdoZXJlKSB7XG5cdFx0dGhpcy5nZXRTdG9yZXMoKS5mb3JFYWNoKChzdG9yZSkgPT4ge1xuXHRcdFx0Y29uc3QgZmlsZXMgPSBzdG9yZS5nZXRDb2xsZWN0aW9uKCk7XG5cblx0XHRcdC8vIEJ5IGRlZmF1bHQgdXBkYXRlIG9ubHkgZmlsZXMgd2l0aCBubyBwYXRoIHNldFxuXHRcdFx0ZmlsZXMuZmluZCh3aGVyZSB8fCB7IHBhdGg6IG51bGwgfSwgeyBmaWVsZHM6IHsgX2lkOiAxIH0gfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xuXHRcdFx0XHRmaWxlcy5kaXJlY3QudXBkYXRlKGZpbGUuX2lkLCB7ICRzZXQ6IHsgcGF0aDogc3RvcmUuZ2V0RmlsZVJlbGF0aXZlVVJMKGZpbGUuX2lkKSB9IH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgc3RvcmVcbiAgICogQHBhcmFtIHN0b3JlXG4gICAqL1xuXHRhZGRTdG9yZShzdG9yZSkge1xuXHRcdGlmICghKHN0b3JlIGluc3RhbmNlb2YgU3RvcmUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCd1ZnM6IHN0b3JlIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBVcGxvYWRGUy5TdG9yZS4nKTtcblx0XHR9XG5cdFx0c3RvcmVzW3N0b3JlLmdldE5hbWUoKV0gPSBzdG9yZTtcblx0fSxcblxuXHQvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlIEVUYWdcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblx0Z2VuZXJhdGVFdGFnKCkge1xuXHRcdHJldHVybiBSYW5kb20uaWQoKTtcblx0fSxcblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgTUlNRSB0eXBlIG9mIHRoZSBleHRlbnNpb25cbiAgICogQHBhcmFtIGV4dGVuc2lvblxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG5cdGdldE1pbWVUeXBlKGV4dGVuc2lvbikge1xuXHRcdGV4dGVuc2lvbiA9IGV4dGVuc2lvbi50b0xvd2VyQ2FzZSgpO1xuXHRcdHJldHVybiBNSU1FW2V4dGVuc2lvbl07XG5cdH0sXG5cblx0LyoqXG4gICAqIFJldHVybnMgYWxsIE1JTUUgdHlwZXNcbiAgICovXG5cdGdldE1pbWVUeXBlcygpIHtcblx0XHRyZXR1cm4gTUlNRTtcblx0fSxcblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgc3RvcmUgYnkgaXRzIG5hbWVcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHJldHVybiB7VXBsb2FkRlMuU3RvcmV9XG4gICAqL1xuXHRnZXRTdG9yZShuYW1lKSB7XG5cdFx0cmV0dXJuIHN0b3Jlc1tuYW1lXTtcblx0fSxcblxuXHQvKipcbiAgICogUmV0dXJucyBhbGwgc3RvcmVzXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICovXG5cdGdldFN0b3JlcygpIHtcblx0XHRyZXR1cm4gc3RvcmVzO1xuXHR9LFxuXG5cdC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZW1wb3JhcnkgZmlsZSBwYXRoXG4gICAqIEBwYXJhbSBmaWxlSWRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblx0Z2V0VGVtcEZpbGVQYXRoKGZpbGVJZCkge1xuXHRcdHJldHVybiBgJHsgdGhpcy5jb25maWcudG1wRGlyIH0vJHsgZmlsZUlkIH1gO1xuXHR9LFxuXG5cdC8qKlxuICAgKiBJbXBvcnRzIGEgZmlsZSBmcm9tIGEgVVJMXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIGZpbGVcbiAgICogQHBhcmFtIHN0b3JlXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cblx0aW1wb3J0RnJvbVVSTCh1cmwsIGZpbGUsIHN0b3JlLCBjYWxsYmFjaykge1xuXHRcdGlmICh0eXBlb2Ygc3RvcmUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRNZXRlb3IuY2FsbCgndWZzSW1wb3J0VVJMJywgdXJsLCBmaWxlLCBzdG9yZSwgY2FsbGJhY2spO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHN0b3JlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0c3RvcmUuaW1wb3J0RnJvbVVSTCh1cmwsIGZpbGUsIGNhbGxiYWNrKTtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG4gICAqIFJldHVybnMgZmlsZSBhbmQgZGF0YSBhcyBBcnJheUJ1ZmZlciBmb3IgZWFjaCBmaWxlcyBpbiB0aGUgZXZlbnRcbiAgICogQGRlcHJlY2F0ZWRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cblx0cmVhZEFzQXJyYXlCdWZmZXIoKSB7XG5cdFx0Y29uc29sZS5lcnJvcignVXBsb2FkRlMucmVhZEFzQXJyYXlCdWZmZXIgaXMgZGVwcmVjYXRlZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYWxpay9qYWxpay11ZnMjdXBsb2FkaW5nLWZyb20tYS1maWxlJyk7XG5cdH0sXG5cblx0LyoqXG4gICAqIE9wZW5zIGEgZGlhbG9nIHRvIHNlbGVjdCBhIHNpbmdsZSBmaWxlXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cblx0c2VsZWN0RmlsZShjYWxsYmFjaykge1xuXHRcdGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRpbnB1dC50eXBlID0gJ2ZpbGUnO1xuXHRcdGlucHV0Lm11bHRpcGxlID0gZmFsc2U7XG5cdFx0aW5wdXQub25jaGFuZ2UgPSAoZXYpID0+IHtcblx0XHRcdGNvbnN0IHsgZmlsZXMgfSA9IGV2LnRhcmdldDtcblx0XHRcdGNhbGxiYWNrLmNhbGwoVXBsb2FkRlMsIGZpbGVzWzBdKTtcblx0XHR9O1xuXHRcdC8vIEZpeCBmb3IgaU9TL1NhZmFyaVxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5jbGFzc05hbWUgPSAndWZzLWZpbGUtc2VsZWN0b3InO1xuXHRcdGRpdi5zdHlsZSA9ICdkaXNwbGF5Om5vbmU7IGhlaWdodDowOyB3aWR0aDowOyBvdmVyZmxvdzogaGlkZGVuOyc7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKGlucHV0KTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cdFx0Ly8gVHJpZ2dlciBmaWxlIHNlbGVjdGlvblxuXHRcdGlucHV0LmNsaWNrKCk7XG5cdH0sXG5cblx0LyoqXG4gICAqIE9wZW5zIGEgZGlhbG9nIHRvIHNlbGVjdCBtdWx0aXBsZSBmaWxlc1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG5cdHNlbGVjdEZpbGVzKGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdGlucHV0LnR5cGUgPSAnZmlsZSc7XG5cdFx0aW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuXHRcdGlucHV0Lm9uY2hhbmdlID0gKGV2KSA9PiB7XG5cdFx0XHRjb25zdCB7IGZpbGVzIH0gPSBldi50YXJnZXQ7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0Y2FsbGJhY2suY2FsbChVcGxvYWRGUywgZmlsZXNbaV0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0Ly8gRml4IGZvciBpT1MvU2FmYXJpXG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmNsYXNzTmFtZSA9ICd1ZnMtZmlsZS1zZWxlY3Rvcic7XG5cdFx0ZGl2LnN0eWxlID0gJ2Rpc3BsYXk6bm9uZTsgaGVpZ2h0OjA7IHdpZHRoOjA7IG92ZXJmbG93OiBoaWRkZW47Jztcblx0XHRkaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHQvLyBUcmlnZ2VyIGZpbGUgc2VsZWN0aW9uXG5cdFx0aW5wdXQuY2xpY2soKTtcblx0fSxcbn07XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0cmVxdWlyZSgnLi91ZnMtbWV0aG9kcycpO1xuXHRyZXF1aXJlKCcuL3Vmcy1zZXJ2ZXInKTtcbn1cblxuLyoqXG4gKiBVcGxvYWRGUyBDb25maWd1cmF0aW9uXG4gKiBAdHlwZSB7Q29uZmlnfVxuICovXG5VcGxvYWRGUy5jb25maWcgPSBuZXcgQ29uZmlnKCk7XG5cbi8vIEFkZCBjbGFzc2VzIHRvIGdsb2JhbCBuYW1lc3BhY2VcblVwbG9hZEZTLkNvbmZpZyA9IENvbmZpZztcblVwbG9hZEZTLkZpbHRlciA9IEZpbHRlcjtcblVwbG9hZEZTLlN0b3JlID0gU3RvcmU7XG5VcGxvYWRGUy5TdG9yZVBlcm1pc3Npb25zID0gU3RvcmVQZXJtaXNzaW9ucztcblVwbG9hZEZTLlVwbG9hZGVyID0gVXBsb2FkZXI7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0Ly8gRXhwb3NlIHRoZSBtb2R1bGUgZ2xvYmFsbHlcblx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0Z2xvYmFsLlVwbG9hZEZTID0gVXBsb2FkRlM7XG5cdH1cbn0gZWxzZSBpZiAoTWV0ZW9yLmlzQ2xpZW50KSB7XG5cdC8vIEV4cG9zZSB0aGUgbW9kdWxlIGdsb2JhbGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdHdpbmRvdy5VcGxvYWRGUyA9IFVwbG9hZEZTO1xuXHR9XG59XG4iLCIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnbWV0ZW9yL3VuZGVyc2NvcmUnO1xuXG5pbXBvcnQgeyBTdG9yZVBlcm1pc3Npb25zIH0gZnJvbSAnLi91ZnMtc3RvcmUtcGVybWlzc2lvbnMnO1xuXG4vKipcbiAqIFVwbG9hZEZTIGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZyB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHQvLyBEZWZhdWx0IG9wdGlvbnNcblx0XHRvcHRpb25zID0gXy5leHRlbmQoe1xuXHRcdFx0ZGVmYXVsdFN0b3JlUGVybWlzc2lvbnM6IG51bGwsXG5cdFx0XHRodHRwczogZmFsc2UsXG5cdFx0XHRzaW11bGF0ZVJlYWREZWxheTogMCxcblx0XHRcdHNpbXVsYXRlVXBsb2FkU3BlZWQ6IDAsXG5cdFx0XHRzaW11bGF0ZVdyaXRlRGVsYXk6IDAsXG5cdFx0XHRzdG9yZXNQYXRoOiAndWZzJyxcblx0XHRcdHRtcERpcjogJy90bXAvdWZzJyxcblx0XHRcdHRtcERpclBlcm1pc3Npb25zOiAnMDcwMCcsXG5cdFx0fSwgb3B0aW9ucyk7XG5cblx0XHQvLyBDaGVjayBvcHRpb25zXG5cdFx0aWYgKG9wdGlvbnMuZGVmYXVsdFN0b3JlUGVybWlzc2lvbnMgJiYgIShvcHRpb25zLmRlZmF1bHRTdG9yZVBlcm1pc3Npb25zIGluc3RhbmNlb2YgU3RvcmVQZXJtaXNzaW9ucykpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbmZpZzogZGVmYXVsdFN0b3JlUGVybWlzc2lvbnMgaXMgbm90IGFuIGluc3RhbmNlIG9mIFN0b3JlUGVybWlzc2lvbnMnKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmh0dHBzICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0NvbmZpZzogaHR0cHMgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbXVsYXRlUmVhZERlbGF5ICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ29uZmlnOiBzaW11bGF0ZVJlYWREZWxheSBpcyBub3QgYSBudW1iZXInKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbXVsYXRlVXBsb2FkU3BlZWQgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDb25maWc6IHNpbXVsYXRlVXBsb2FkU3BlZWQgaXMgbm90IGEgbnVtYmVyJyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW11bGF0ZVdyaXRlRGVsYXkgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDb25maWc6IHNpbXVsYXRlV3JpdGVEZWxheSBpcyBub3QgYSBudW1iZXInKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnN0b3Jlc1BhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDb25maWc6IHN0b3Jlc1BhdGggaXMgbm90IGEgc3RyaW5nJyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy50bXBEaXIgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDb25maWc6IHRtcERpciBpcyBub3QgYSBzdHJpbmcnKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnRtcERpclBlcm1pc3Npb25zICE9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ29uZmlnOiB0bXBEaXJQZXJtaXNzaW9ucyBpcyBub3QgYSBzdHJpbmcnKTtcblx0XHR9XG5cblx0XHQvKipcbiAgICAgKiBEZWZhdWx0IHN0b3JlIHBlcm1pc3Npb25zXG4gICAgICogQHR5cGUge1VwbG9hZEZTLlN0b3JlUGVybWlzc2lvbnN9XG4gICAgICovXG5cdFx0dGhpcy5kZWZhdWx0U3RvcmVQZXJtaXNzaW9ucyA9IG9wdGlvbnMuZGVmYXVsdFN0b3JlUGVybWlzc2lvbnM7XG5cdFx0LyoqXG4gICAgICogVXNlIG9yIG5vdCBzZWN1cmVkIHByb3RvY29sIGluIFVSTFNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cblx0XHR0aGlzLmh0dHBzID0gb3B0aW9ucy5odHRwcztcblx0XHQvKipcbiAgICAgKiBUaGUgc2ltdWxhdGlvbiByZWFkIGRlbGF5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cblx0XHR0aGlzLnNpbXVsYXRlUmVhZERlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5zaW11bGF0ZVJlYWREZWxheSk7XG5cdFx0LyoqXG4gICAgICogVGhlIHNpbXVsYXRpb24gdXBsb2FkIHNwZWVkXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cblx0XHR0aGlzLnNpbXVsYXRlVXBsb2FkU3BlZWQgPSBwYXJzZUludChvcHRpb25zLnNpbXVsYXRlVXBsb2FkU3BlZWQpO1xuXHRcdC8qKlxuICAgICAqIFRoZSBzaW11bGF0aW9uIHdyaXRlIGRlbGF5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cblx0XHR0aGlzLnNpbXVsYXRlV3JpdGVEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuc2ltdWxhdGVXcml0ZURlbGF5KTtcblx0XHQvKipcbiAgICAgKiBUaGUgVVJMIHJvb3QgcGF0aCBvZiBzdG9yZXNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuXHRcdHRoaXMuc3RvcmVzUGF0aCA9IG9wdGlvbnMuc3RvcmVzUGF0aDtcblx0XHQvKipcbiAgICAgKiBUaGUgdGVtcG9yYXJ5IGRpcmVjdG9yeSBvZiB1cGxvYWRpbmcgZmlsZXNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuXHRcdHRoaXMudG1wRGlyID0gb3B0aW9ucy50bXBEaXI7XG5cdFx0LyoqXG4gICAgICogVGhlIHBlcm1pc3Npb25zIG9mIHRoZSB0ZW1wb3JhcnkgZGlyZWN0b3J5XG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cblx0XHR0aGlzLnRtcERpclBlcm1pc3Npb25zID0gb3B0aW9ucy50bXBEaXJQZXJtaXNzaW9ucztcblx0fVxufVxuIiwiLypcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNyBLYXJsIFNURUlOXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqXG4gKi9cbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgXyB9IGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBGaWxlIGZpbHRlclxuICovXG5leHBvcnQgY2xhc3MgRmlsdGVyIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly8gRGVmYXVsdCBvcHRpb25zXG5cdFx0b3B0aW9ucyA9IF8uZXh0ZW5kKHtcblx0XHRcdGNvbnRlbnRUeXBlczogbnVsbCxcblx0XHRcdGV4dGVuc2lvbnM6IG51bGwsXG5cdFx0XHRtaW5TaXplOiAxLFxuXHRcdFx0bWF4U2l6ZTogMCxcblx0XHRcdGludmFsaWRGaWxlRXJyb3I6ICgpID0+IG5ldyBNZXRlb3IuRXJyb3IoJ2ludmFsaWQtZmlsZScsICdGaWxlIGlzIG5vdCB2YWxpZCcpLFxuXHRcdFx0ZmlsZVRvb1NtYWxsRXJyb3I6IChmaWxlU2l6ZSwgbWluRmlsZVNpemUpID0+IG5ldyBNZXRlb3IuRXJyb3IoJ2ZpbGUtdG9vLXNtYWxsJywgYEZpbGUgc2l6ZSAoc2l6ZSA9ICR7IGZpbGVTaXplIH0pIGlzIHRvbyBzbWFsbCAobWluID0gJHsgbWluRmlsZVNpemUgfSlgKSxcblx0XHRcdGZpbGVUb29MYXJnZUVycm9yOiAoZmlsZVNpemUsIG1heEZpbGVTaXplKSA9PiBuZXcgTWV0ZW9yLkVycm9yKCdmaWxlLXRvby1sYXJnZScsIGBGaWxlIHNpemUgKHNpemUgPSAkeyBmaWxlU2l6ZSB9KSBpcyB0b28gbGFyZ2UgKG1heCA9ICR7IG1heEZpbGVTaXplIH0pYCksXG5cdFx0XHRpbnZhbGlkRmlsZUV4dGVuc2lvbjogKGZpbGVFeHRlbnNpb24sIGFsbG93ZWRFeHRlbnNpb25zKSA9PiBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWZpbGUtZXh0ZW5zaW9uJywgYEZpbGUgZXh0ZW5zaW9uIFwiJHsgZmlsZUV4dGVuc2lvbiB9XCIgaXMgbm90IGFjY2VwdGVkICgkeyBhbGxvd2VkRXh0ZW5zaW9ucyB9KWApLFxuXHRcdFx0aW52YWxpZEZpbGVUeXBlOiAoZmlsZVR5cGUsIGFsbG93ZWRDb250ZW50VHlwZXMpID0+IG5ldyBNZXRlb3IuRXJyb3IoJ2ludmFsaWQtZmlsZS10eXBlJywgYEZpbGUgdHlwZSBcIiR7IGZpbGVUeXBlIH1cIiBpcyBub3QgYWNjZXB0ZWQgKCR7IGFsbG93ZWRDb250ZW50VHlwZXMgfSlgKSxcblx0XHRcdG9uQ2hlY2s6IHRoaXMub25DaGVjayxcblx0XHR9LCBvcHRpb25zKTtcblxuXHRcdC8vIENoZWNrIG9wdGlvbnNcblx0XHRpZiAob3B0aW9ucy5jb250ZW50VHlwZXMgJiYgIShvcHRpb25zLmNvbnRlbnRUeXBlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmlsdGVyOiBjb250ZW50VHlwZXMgaXMgbm90IGFuIEFycmF5Jyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmV4dGVuc2lvbnMgJiYgIShvcHRpb25zLmV4dGVuc2lvbnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpbHRlcjogZXh0ZW5zaW9ucyBpcyBub3QgYW4gQXJyYXknKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLm1pblNpemUgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdGaWx0ZXI6IG1pblNpemUgaXMgbm90IGEgbnVtYmVyJyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhTaXplICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRmlsdGVyOiBtYXhTaXplIGlzIG5vdCBhIG51bWJlcicpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5vbkNoZWNrICYmIHR5cGVvZiBvcHRpb25zLm9uQ2hlY2sgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpbHRlcjogb25DaGVjayBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdC8vIFB1YmxpYyBhdHRyaWJ1dGVzXG5cdFx0c2VsZi5vcHRpb25zID0gb3B0aW9ucztcblx0XHRbJ29uQ2hlY2snXS5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uc1ttZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHNlbGZbbWV0aG9kXSA9IG9wdGlvbnNbbWV0aG9kXTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuICAgKiBDaGVja3MgdGhlIGZpbGVcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG5cdGNoZWNrKGZpbGUpIHtcblx0XHRsZXQgZXJyb3IgPSBudWxsO1xuXHRcdGlmICh0eXBlb2YgZmlsZSAhPT0gJ29iamVjdCcgfHwgIWZpbGUpIHtcblx0XHRcdGVycm9yID0gdGhpcy5vcHRpb25zLmludmFsaWRGaWxlRXJyb3IoKTtcblx0XHR9XG5cdFx0Ly8gQ2hlY2sgc2l6ZVxuXHRcdGNvbnN0IGZpbGVTaXplID0gZmlsZS5zaXplO1xuXHRcdGNvbnN0IG1pblNpemUgPSB0aGlzLmdldE1pblNpemUoKTtcblx0XHRpZiAoZmlsZVNpemUgPD0gMCB8fCBmaWxlU2l6ZSA8IG1pblNpemUpIHtcblx0XHRcdGVycm9yID0gdGhpcy5vcHRpb25zLmZpbGVUb29TbWFsbEVycm9yKGZpbGVTaXplLCBtaW5TaXplKTtcblx0XHR9XG5cdFx0Y29uc3QgbWF4U2l6ZSA9IHRoaXMuZ2V0TWF4U2l6ZSgpO1xuXHRcdGlmIChtYXhTaXplID4gMCAmJiBmaWxlU2l6ZSA+IG1heFNpemUpIHtcblx0XHRcdGVycm9yID0gdGhpcy5vcHRpb25zLmZpbGVUb29MYXJnZUVycm9yKGZpbGVTaXplLCBtYXhTaXplKTtcblx0XHR9XG5cdFx0Ly8gQ2hlY2sgZXh0ZW5zaW9uXG5cdFx0Y29uc3QgYWxsb3dlZEV4dGVuc2lvbnMgPSB0aGlzLmdldEV4dGVuc2lvbnMoKTtcblx0XHRjb25zdCBmaWxlRXh0ZW5zaW9uID0gZmlsZS5leHRlbnNpb247XG5cdFx0aWYgKGFsbG93ZWRFeHRlbnNpb25zICYmICFhbGxvd2VkRXh0ZW5zaW9ucy5pbmNsdWRlcyhmaWxlRXh0ZW5zaW9uKSkge1xuXHRcdFx0ZXJyb3IgPSB0aGlzLm9wdGlvbnMuaW52YWxpZEZpbGVFeHRlbnNpb24oZmlsZUV4dGVuc2lvbiwgYWxsb3dlZEV4dGVuc2lvbnMpO1xuXHRcdH1cblx0XHQvLyBDaGVjayBjb250ZW50IHR5cGVcblx0XHRjb25zdCBhbGxvd2VkQ29udGVudFR5cGVzID0gdGhpcy5nZXRDb250ZW50VHlwZXMoKTtcblx0XHRjb25zdCBmaWxlVHlwZXMgPSBmaWxlLnR5cGU7XG5cdFx0aWYgKGFsbG93ZWRDb250ZW50VHlwZXMgJiYgIXRoaXMuaXNDb250ZW50VHlwZUluTGlzdChmaWxlVHlwZXMsIGFsbG93ZWRDb250ZW50VHlwZXMpKSB7XG5cdFx0XHRlcnJvciA9IHRoaXMub3B0aW9ucy5pbnZhbGlkRmlsZVR5cGUoZmlsZVR5cGVzLCBhbGxvd2VkQ29udGVudFR5cGVzKTtcblx0XHR9XG5cdFx0Ly8gQXBwbHkgY3VzdG9tIGNoZWNrXG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9uQ2hlY2sgPT09ICdmdW5jdGlvbicgJiYgIXRoaXMub25DaGVjayhmaWxlKSkge1xuXHRcdFx0ZXJyb3IgPSBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWZpbGUnLCAnRmlsZSBkb2VzIG5vdCBtYXRjaCBmaWx0ZXInKTtcblx0XHR9XG5cblx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhbGxvd2VkIGNvbnRlbnQgdHlwZXNcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuXHRnZXRDb250ZW50VHlwZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jb250ZW50VHlwZXM7XG5cdH1cblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgYWxsb3dlZCBleHRlbnNpb25zXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cblx0Z2V0RXh0ZW5zaW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmV4dGVuc2lvbnM7XG5cdH1cblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgbWF4aW11bSBmaWxlIHNpemVcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cblx0Z2V0TWF4U2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1heFNpemU7XG5cdH1cblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgbWluaW11bSBmaWxlIHNpemVcbiAgICogQHJldHVybiB7TnVtYmVyfVxuICAgKi9cblx0Z2V0TWluU2l6ZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1pblNpemU7XG5cdH1cblxuXHQvKipcbiAgICogQ2hlY2tzIGlmIGNvbnRlbnQgdHlwZSBpcyBpbiB0aGUgZ2l2ZW4gbGlzdFxuICAgKiBAcGFyYW0gdHlwZVxuICAgKiBAcGFyYW0gbGlzdFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblx0aXNDb250ZW50VHlwZUluTGlzdCh0eXBlLCBsaXN0KSB7XG5cdFx0aWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyAmJiBsaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdGlmIChsaXN0LmluY2x1ZGVzKHR5cGUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgd2lsZENhcmRHbG9iID0gJy8qJztcblx0XHRcdGNvbnN0IHdpbGRjYXJkcyA9IGxpc3QuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmluZGV4T2Yod2lsZENhcmRHbG9iKSA+IDApO1xuXG5cdFx0XHRpZiAod2lsZGNhcmRzLmluY2x1ZGVzKHR5cGUucmVwbGFjZSgvKFxcLy4qKSQvLCB3aWxkQ2FyZEdsb2IpKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZmlsZSBtYXRjaGVzIGZpbHRlclxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblx0aXNWYWxpZChmaWxlKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRydWU7XG5cdFx0dHJ5IHtcblx0XHRcdHRoaXMuY2hlY2soZmlsZSk7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRyZXN1bHQgPSBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuICAgKiBFeGVjdXRlcyBjdXN0b20gY2hlY2tzXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25DaGVjayhmaWxlKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG4vKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcblxuaW1wb3J0IHsgVXBsb2FkRlMgfSBmcm9tICcuL3Vmcyc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuL3Vmcy1maWx0ZXInO1xuaW1wb3J0IHsgVG9rZW5zIH0gZnJvbSAnLi91ZnMtdG9rZW5zJztcblxuY29uc3QgZnMgPSBOcG0ucmVxdWlyZSgnZnMnKTtcbmNvbnN0IGh0dHAgPSBOcG0ucmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgaHR0cHMgPSBOcG0ucmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IEZ1dHVyZSA9IE5wbS5yZXF1aXJlKCdmaWJlcnMvZnV0dXJlJyk7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0TWV0ZW9yLm1ldGhvZHMoe1xuXG5cdFx0LyoqXG4gICAgICogQ29tcGxldGVzIHRoZSBmaWxlIHRyYW5zZmVyXG4gICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWVcbiAgICAgKiBAcGFyYW0gdG9rZW5cbiAgICAgKi9cblx0XHR1ZnNDb21wbGV0ZShmaWxlSWQsIHN0b3JlTmFtZSwgdG9rZW4pIHtcblx0XHRcdGNoZWNrKGZpbGVJZCwgU3RyaW5nKTtcblx0XHRcdGNoZWNrKHN0b3JlTmFtZSwgU3RyaW5nKTtcblx0XHRcdGNoZWNrKHRva2VuLCBTdHJpbmcpO1xuXG5cdFx0XHQvLyBHZXQgc3RvcmVcblx0XHRcdGNvbnN0IHN0b3JlID0gVXBsb2FkRlMuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdGlmICghc3RvcmUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC1zdG9yZScsICdTdG9yZSBub3QgZm91bmQnKTtcblx0XHRcdH1cblx0XHRcdC8vIENoZWNrIHRva2VuXG5cdFx0XHRpZiAoIXN0b3JlLmNoZWNrVG9rZW4odG9rZW4sIGZpbGVJZCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC10b2tlbicsICdUb2tlbiBpcyBub3QgdmFsaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnV0ID0gbmV3IEZ1dHVyZSgpO1xuXHRcdFx0Y29uc3QgdG1wRmlsZSA9IFVwbG9hZEZTLmdldFRlbXBGaWxlUGF0aChmaWxlSWQpO1xuXG5cdFx0XHRjb25zdCByZW1vdmVUZW1wRmlsZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRmcy51bmxpbmsodG1wRmlsZSwgZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0ZXJyICYmIGNvbnNvbGUuZXJyb3IoYHVmczogY2Fubm90IGRlbGV0ZSB0ZW1wIGZpbGUgXCIkeyB0bXBGaWxlIH1cIiAoJHsgZXJyLm1lc3NhZ2UgfSlgKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyB0b2RvIGNoZWNrIGlmIHRlbXAgZmlsZSBleGlzdHNcblxuXHRcdFx0XHQvLyBHZXQgZmlsZVxuXHRcdFx0XHRjb25zdCBmaWxlID0gc3RvcmUuZ2V0Q29sbGVjdGlvbigpLmZpbmRPbmUoeyBfaWQ6IGZpbGVJZCB9KTtcblxuXHRcdFx0XHQvLyBWYWxpZGF0ZSBmaWxlIGJlZm9yZSBtb3ZpbmcgdG8gdGhlIHN0b3JlXG5cdFx0XHRcdHN0b3JlLnZhbGlkYXRlKGZpbGUpO1xuXG5cdFx0XHRcdC8vIEdldCB0aGUgdGVtcCBmaWxlXG5cdFx0XHRcdGNvbnN0IHJzID0gZnMuY3JlYXRlUmVhZFN0cmVhbSh0bXBGaWxlLCB7XG5cdFx0XHRcdFx0ZmxhZ3M6ICdyJyxcblx0XHRcdFx0XHRlbmNvZGluZzogbnVsbCxcblx0XHRcdFx0XHRhdXRvQ2xvc2U6IHRydWUsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIENsZWFuIHVwbG9hZCBpZiBlcnJvciBvY2N1cnNcblx0XHRcdFx0cnMub24oJ2Vycm9yJywgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGVycik7XG5cdFx0XHRcdFx0c3RvcmUuZ2V0Q29sbGVjdGlvbigpLnJlbW92ZSh7IF9pZDogZmlsZUlkIH0pO1xuXHRcdFx0XHRcdGZ1dC50aHJvdyhlcnIpO1xuXHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0Ly8gU2F2ZSBmaWxlIGluIHRoZSBzdG9yZVxuXHRcdFx0XHRzdG9yZS53cml0ZShycywgZmlsZUlkLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKGVyciwgZmlsZSkge1xuXHRcdFx0XHRcdHJlbW92ZVRlbXBGaWxlKCk7XG5cblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRmdXQudGhyb3coZXJyKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gRmlsZSBoYXMgYmVlbiBmdWxseSB1cGxvYWRlZFxuXHRcdFx0XHRcdFx0Ly8gc28gd2UgZG9uJ3QgbmVlZCB0byBrZWVwIHRoZSB0b2tlbiBhbnltb3JlLlxuXHRcdFx0XHRcdFx0Ly8gQWxzbyB0aGlzIGVuc3VyZSB0aGF0IHRoZSBmaWxlIGNhbm5vdCBiZSBtb2RpZmllZCB3aXRoIGV4dHJhIGNodW5rcyBsYXRlci5cblx0XHRcdFx0XHRcdFRva2Vucy5yZW1vdmUoeyBmaWxlSWQgfSk7XG5cdFx0XHRcdFx0XHRmdXQucmV0dXJuKGZpbGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8vIGNhdGNoIHdpbGwgbm90IHdvcmsgaWYgZnV0LndhaXQoKSBpcyBvdXRzaWRlIHRyeS9jYXRjaFxuXHRcdFx0XHRyZXR1cm4gZnV0LndhaXQoKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBJZiB3cml0ZSBmYWlsZWQsIHJlbW92ZSB0aGUgZmlsZVxuXHRcdFx0XHRzdG9yZS5nZXRDb2xsZWN0aW9uKCkucmVtb3ZlKHsgX2lkOiBmaWxlSWQgfSk7XG5cdFx0XHRcdC8vIHJlbW92ZVRlbXBGaWxlKCk7IC8vIHRvZG8gcmVtb3ZlIHRlbXAgZmlsZSBvbiBlcnJvciBvciB0cnkgYWdhaW4gP1xuXHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCd1ZnM6IGNhbm5vdCB1cGxvYWQgZmlsZScsIGVycik7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIGZpbGUgYW5kIHJldHVybnMgdGhlIGZpbGUgdXBsb2FkIHRva2VuXG4gICAgICogQHBhcmFtIGZpbGVcbiAgICAgKiBAcmV0dXJuIHt7ZmlsZUlkOiBzdHJpbmcsIHRva2VuOiAqLCB1cmw6ICp9fVxuICAgICAqL1xuXHRcdHVmc0NyZWF0ZShmaWxlKSB7XG5cdFx0XHRjaGVjayhmaWxlLCBPYmplY3QpO1xuXG5cdFx0XHRpZiAodHlwZW9mIGZpbGUubmFtZSAhPT0gJ3N0cmluZycgfHwgIWZpbGUubmFtZS5sZW5ndGgpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC1maWxlLW5hbWUnLCAnZmlsZSBuYW1lIGlzIG5vdCB2YWxpZCcpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBmaWxlLnN0b3JlICE9PSAnc3RyaW5nJyB8fCAhZmlsZS5zdG9yZS5sZW5ndGgpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC1zdG9yZScsICdzdG9yZSBpcyBub3QgdmFsaWQnKTtcblx0XHRcdH1cblx0XHRcdC8vIEdldCBzdG9yZVxuXHRcdFx0Y29uc3Qgc3RvcmUgPSBVcGxvYWRGUy5nZXRTdG9yZShmaWxlLnN0b3JlKTtcblx0XHRcdGlmICghc3RvcmUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC1zdG9yZScsICdTdG9yZSBub3QgZm91bmQnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGRlZmF1bHQgaW5mb1xuXHRcdFx0ZmlsZS5jb21wbGV0ZSA9IGZhbHNlO1xuXHRcdFx0ZmlsZS51cGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdGZpbGUuZXh0ZW5zaW9uID0gZmlsZS5uYW1lICYmIGZpbGUubmFtZS5zdWJzdHIoKH4tZmlsZS5uYW1lLmxhc3RJbmRleE9mKCcuJykgPj4+IDApICsgMikudG9Mb3dlckNhc2UoKTtcblx0XHRcdC8vIEFzc2lnbiBmaWxlIE1JTUUgdHlwZSBiYXNlZCBvbiB0aGUgZXh0ZW5zaW9uXG5cdFx0XHRpZiAoZmlsZS5leHRlbnNpb24gJiYgIWZpbGUudHlwZSkge1xuXHRcdFx0XHRmaWxlLnR5cGUgPSBVcGxvYWRGUy5nZXRNaW1lVHlwZShmaWxlLmV4dGVuc2lvbikgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG5cdFx0XHR9XG5cdFx0XHRmaWxlLnByb2dyZXNzID0gMDtcblx0XHRcdGZpbGUuc2l6ZSA9IHBhcnNlSW50KGZpbGUuc2l6ZSkgfHwgMDtcblx0XHRcdGZpbGUudXNlcklkID0gZmlsZS51c2VySWQgfHwgdGhpcy51c2VySWQ7XG5cblx0XHRcdC8vIENoZWNrIGlmIHRoZSBmaWxlIG1hdGNoZXMgc3RvcmUgZmlsdGVyXG5cdFx0XHRjb25zdCBmaWx0ZXIgPSBzdG9yZS5nZXRGaWx0ZXIoKTtcblx0XHRcdGlmIChmaWx0ZXIgaW5zdGFuY2VvZiBGaWx0ZXIpIHtcblx0XHRcdFx0ZmlsdGVyLmNoZWNrKGZpbGUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDcmVhdGUgdGhlIGZpbGVcblx0XHRcdGNvbnN0IGZpbGVJZCA9IHN0b3JlLmNyZWF0ZShmaWxlKTtcblx0XHRcdGNvbnN0IHRva2VuID0gc3RvcmUuY3JlYXRlVG9rZW4oZmlsZUlkKTtcblx0XHRcdGNvbnN0IHVwbG9hZFVybCA9IHN0b3JlLmdldFVSTChgJHsgZmlsZUlkIH0/dG9rZW49JHsgdG9rZW4gfWApO1xuXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRmaWxlSWQsXG5cdFx0XHRcdHRva2VuLFxuXHRcdFx0XHR1cmw6IHVwbG9hZFVybCxcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdC8qKlxuICAgICAqIERlbGV0ZXMgYSBmaWxlXG4gICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWVcbiAgICAgKiBAcGFyYW0gdG9rZW5cbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cblx0XHR1ZnNEZWxldGUoZmlsZUlkLCBzdG9yZU5hbWUsIHRva2VuKSB7XG5cdFx0XHRjaGVjayhmaWxlSWQsIFN0cmluZyk7XG5cdFx0XHRjaGVjayhzdG9yZU5hbWUsIFN0cmluZyk7XG5cdFx0XHRjaGVjayh0b2tlbiwgU3RyaW5nKTtcblxuXHRcdFx0Ly8gQ2hlY2sgc3RvcmVcblx0XHRcdGNvbnN0IHN0b3JlID0gVXBsb2FkRlMuZ2V0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdGlmICghc3RvcmUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC1zdG9yZScsICdTdG9yZSBub3QgZm91bmQnKTtcblx0XHRcdH1cblx0XHRcdC8vIElnbm9yZSBmaWxlcyB0aGF0IGRvZXMgbm90IGV4aXN0XG5cdFx0XHRpZiAoc3RvcmUuZ2V0Q29sbGVjdGlvbigpLmZpbmQoeyBfaWQ6IGZpbGVJZCB9KS5jb3VudCgpID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQ2hlY2sgdG9rZW5cblx0XHRcdGlmICghc3RvcmUuY2hlY2tUb2tlbih0b2tlbiwgZmlsZUlkKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLXRva2VuJywgJ1Rva2VuIGlzIG5vdCB2YWxpZCcpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0b3JlLmdldENvbGxlY3Rpb24oKS5yZW1vdmUoeyBfaWQ6IGZpbGVJZCB9KTtcblx0XHR9LFxuXG5cdFx0LyoqXG4gICAgICogSW1wb3J0cyBhIGZpbGUgZnJvbSB0aGUgVVJMXG4gICAgICogQHBhcmFtIHVybFxuICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICogQHBhcmFtIHN0b3JlTmFtZVxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICovXG5cdFx0dWZzSW1wb3J0VVJMKHVybCwgZmlsZSwgc3RvcmVOYW1lKSB7XG5cdFx0XHRjaGVjayh1cmwsIFN0cmluZyk7XG5cdFx0XHRjaGVjayhmaWxlLCBPYmplY3QpO1xuXHRcdFx0Y2hlY2soc3RvcmVOYW1lLCBTdHJpbmcpO1xuXG5cdFx0XHQvLyBDaGVjayBVUkxcblx0XHRcdGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJyB8fCB1cmwubGVuZ3RoIDw9IDApIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC11cmwnLCAnVGhlIHVybCBpcyBub3QgdmFsaWQnKTtcblx0XHRcdH1cblx0XHRcdC8vIENoZWNrIGZpbGVcblx0XHRcdGlmICh0eXBlb2YgZmlsZSAhPT0gJ29iamVjdCcgfHwgZmlsZSA9PT0gbnVsbCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWZpbGUnLCAnVGhlIGZpbGUgaXMgbm90IHZhbGlkJyk7XG5cdFx0XHR9XG5cdFx0XHQvLyBDaGVjayBzdG9yZVxuXHRcdFx0Y29uc3Qgc3RvcmUgPSBVcGxvYWRGUy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0aWYgKCFzdG9yZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLXN0b3JlJywgJ1RoZSBzdG9yZSBkb2VzIG5vdCBleGlzdCcpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBFeHRyYWN0IGZpbGUgaW5mb1xuXHRcdFx0aWYgKCFmaWxlLm5hbWUpIHtcblx0XHRcdFx0ZmlsZS5uYW1lID0gdXJsLnJlcGxhY2UoL1xcPy4qJC8sICcnKS5zcGxpdCgnLycpLnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpbGUubmFtZSAmJiAhZmlsZS5leHRlbnNpb24pIHtcblx0XHRcdFx0ZmlsZS5leHRlbnNpb24gPSBmaWxlLm5hbWUgJiYgZmlsZS5uYW1lLnN1YnN0cigofi1maWxlLm5hbWUubGFzdEluZGV4T2YoJy4nKSA+Pj4gMCkgKyAyKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpbGUuZXh0ZW5zaW9uICYmICFmaWxlLnR5cGUpIHtcblx0XHRcdFx0Ly8gQXNzaWduIGZpbGUgTUlNRSB0eXBlIGJhc2VkIG9uIHRoZSBleHRlbnNpb25cblx0XHRcdFx0ZmlsZS50eXBlID0gVXBsb2FkRlMuZ2V0TWltZVR5cGUoZmlsZS5leHRlbnNpb24pIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQ2hlY2sgaWYgZmlsZSBpcyB2YWxpZFxuXHRcdFx0aWYgKHN0b3JlLmdldEZpbHRlcigpIGluc3RhbmNlb2YgRmlsdGVyKSB7XG5cdFx0XHRcdHN0b3JlLmdldEZpbHRlcigpLmNoZWNrKGZpbGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmlsZS5vcmlnaW5hbFVybCkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ3VmczogVGhlIFwib3JpZ2luYWxVcmxcIiBhdHRyaWJ1dGUgaXMgYXV0b21hdGljYWxseSBzZXQgd2hlbiBpbXBvcnRpbmcgYSBmaWxlIGZyb20gYSBVUkwnKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG9yaWdpbmFsIFVSTFxuXHRcdFx0ZmlsZS5vcmlnaW5hbFVybCA9IHVybDtcblxuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaWxlXG5cdFx0XHRmaWxlLmNvbXBsZXRlID0gZmFsc2U7XG5cdFx0XHRmaWxlLnVwbG9hZGluZyA9IHRydWU7XG5cdFx0XHRmaWxlLnByb2dyZXNzID0gMDtcblx0XHRcdGZpbGUuX2lkID0gc3RvcmUuY3JlYXRlKGZpbGUpO1xuXG5cdFx0XHRjb25zdCBmdXQgPSBuZXcgRnV0dXJlKCk7XG5cdFx0XHRsZXQgcHJvdG87XG5cblx0XHRcdC8vIERldGVjdCBwcm90b2NvbCB0byB1c2Vcblx0XHRcdGlmICgvaHR0cDpcXC9cXC8vaS50ZXN0KHVybCkpIHtcblx0XHRcdFx0cHJvdG8gPSBodHRwO1xuXHRcdFx0fSBlbHNlIGlmICgvaHR0cHM6XFwvXFwvL2kudGVzdCh1cmwpKSB7XG5cdFx0XHRcdHByb3RvID0gaHR0cHM7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudW5ibG9jaygpO1xuXG5cdFx0XHQvLyBEb3dubG9hZCBmaWxlXG5cdFx0XHRwcm90by5nZXQodXJsLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0XHQvLyBTYXZlIHRoZSBmaWxlIGluIHRoZSBzdG9yZVxuXHRcdFx0XHRzdG9yZS53cml0ZShyZXMsIGZpbGUuX2lkLCBmdW5jdGlvbihlcnIsIGZpbGUpIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRmdXQudGhyb3coZXJyKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZnV0LnJldHVybihmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSkpLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRmdXQudGhyb3coZXJyKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIGZ1dC53YWl0KCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuICAgICAqIE1hcmtzIHRoZSBmaWxlIHVwbG9hZGluZyBhcyBzdG9wcGVkXG4gICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWVcbiAgICAgKiBAcGFyYW0gdG9rZW5cbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cblx0XHR1ZnNTdG9wKGZpbGVJZCwgc3RvcmVOYW1lLCB0b2tlbikge1xuXHRcdFx0Y2hlY2soZmlsZUlkLCBTdHJpbmcpO1xuXHRcdFx0Y2hlY2soc3RvcmVOYW1lLCBTdHJpbmcpO1xuXHRcdFx0Y2hlY2sodG9rZW4sIFN0cmluZyk7XG5cblx0XHRcdC8vIENoZWNrIHN0b3JlXG5cdFx0XHRjb25zdCBzdG9yZSA9IFVwbG9hZEZTLmdldFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2ludmFsaWQtc3RvcmUnLCAnU3RvcmUgbm90IGZvdW5kJyk7XG5cdFx0XHR9XG5cdFx0XHQvLyBDaGVjayBmaWxlXG5cdFx0XHRjb25zdCBmaWxlID0gc3RvcmUuZ2V0Q29sbGVjdGlvbigpLmZpbmQoeyBfaWQ6IGZpbGVJZCB9LCB7IGZpZWxkczogeyB1c2VySWQ6IDEgfSB9KTtcblx0XHRcdGlmICghZmlsZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdpbnZhbGlkLWZpbGUnLCAnRmlsZSBub3QgZm91bmQnKTtcblx0XHRcdH1cblx0XHRcdC8vIENoZWNrIHRva2VuXG5cdFx0XHRpZiAoIXN0b3JlLmNoZWNrVG9rZW4odG9rZW4sIGZpbGVJZCkpIHtcblx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignaW52YWxpZC10b2tlbicsICdUb2tlbiBpcyBub3QgdmFsaWQnKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHN0b3JlLmdldENvbGxlY3Rpb24oKS51cGRhdGUoeyBfaWQ6IGZpbGVJZCB9LCB7XG5cdFx0XHRcdCRzZXQ6IHsgdXBsb2FkaW5nOiBmYWxzZSB9LFxuXHRcdFx0fSk7XG5cdFx0fSxcblx0fSk7XG59XG4iLCIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG4vKipcbiAqIE1JTUUgdHlwZXMgYW5kIGV4dGVuc2lvbnNcbiAqL1xuZXhwb3J0IGNvbnN0IE1JTUUgPSB7XG5cblx0Ly8gYXBwbGljYXRpb25cblx0Jzd6JzogJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG5cdGFyYzogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG5cdGFpOiAnYXBwbGljYXRpb24vcG9zdHNjcmlwdCcsXG5cdGJpbjogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG5cdGJ6OiAnYXBwbGljYXRpb24veC1iemlwJyxcblx0YnoyOiAnYXBwbGljYXRpb24veC1iemlwMicsXG5cdGVwczogJ2FwcGxpY2F0aW9uL3Bvc3RzY3JpcHQnLFxuXHRleGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuXHRnejogJ2FwcGxpY2F0aW9uL3gtZ3ppcCcsXG5cdGd6aXA6ICdhcHBsaWNhdGlvbi94LWd6aXAnLFxuXHRqczogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnLFxuXHRqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG5cdG9neDogJ2FwcGxpY2F0aW9uL29nZycsXG5cdHBkZjogJ2FwcGxpY2F0aW9uL3BkZicsXG5cdHBzOiAnYXBwbGljYXRpb24vcG9zdHNjcmlwdCcsXG5cdHBzZDogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG5cdHJhcjogJ2FwcGxpY2F0aW9uL3gtcmFyLWNvbXByZXNzZWQnLFxuXHRyZXY6ICdhcHBsaWNhdGlvbi94LXJhci1jb21wcmVzc2VkJyxcblx0c3dmOiAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnLFxuXHR0YXI6ICdhcHBsaWNhdGlvbi94LXRhcicsXG5cdHhodG1sOiAnYXBwbGljYXRpb24veGh0bWwreG1sJyxcblx0eG1sOiAnYXBwbGljYXRpb24veG1sJyxcblx0emlwOiAnYXBwbGljYXRpb24vemlwJyxcblxuXHQvLyBhdWRpb1xuXHRhaWY6ICdhdWRpby9haWZmJyxcblx0YWlmYzogJ2F1ZGlvL2FpZmYnLFxuXHRhaWZmOiAnYXVkaW8vYWlmZicsXG5cdGF1OiAnYXVkaW8vYmFzaWMnLFxuXHRmbGFjOiAnYXVkaW8vZmxhYycsXG5cdG1pZGk6ICdhdWRpby9taWRpJyxcblx0bXAyOiAnYXVkaW8vbXBlZycsXG5cdG1wMzogJ2F1ZGlvL21wZWcnLFxuXHRtcGE6ICdhdWRpby9tcGVnJyxcblx0b2dhOiAnYXVkaW8vb2dnJyxcblx0b2dnOiAnYXVkaW8vb2dnJyxcblx0b3B1czogJ2F1ZGlvL29nZycsXG5cdHJhOiAnYXVkaW8vdm5kLnJuLXJlYWxhdWRpbycsXG5cdHNweDogJ2F1ZGlvL29nZycsXG5cdHdhdjogJ2F1ZGlvL3gtd2F2Jyxcblx0d2ViYTogJ2F1ZGlvL3dlYm0nLFxuXHR3bWE6ICdhdWRpby94LW1zLXdtYScsXG5cblx0Ly8gaW1hZ2Vcblx0YXZzOiAnaW1hZ2UvYXZzLXZpZGVvJyxcblx0Ym1wOiAnaW1hZ2UveC13aW5kb3dzLWJtcCcsXG5cdGdpZjogJ2ltYWdlL2dpZicsXG5cdGljbzogJ2ltYWdlL3ZuZC5taWNyb3NvZnQuaWNvbicsXG5cdGpwZWc6ICdpbWFnZS9qcGVnJyxcblx0anBnOiAnaW1hZ2UvanBnJyxcblx0bWpwZzogJ2ltYWdlL3gtbW90aW9uLWpwZWcnLFxuXHRwaWM6ICdpbWFnZS9waWMnLFxuXHRwbmc6ICdpbWFnZS9wbmcnLFxuXHRzdmc6ICdpbWFnZS9zdmcreG1sJyxcblx0dGlmOiAnaW1hZ2UvdGlmZicsXG5cdHRpZmY6ICdpbWFnZS90aWZmJyxcblxuXHQvLyB0ZXh0XG5cdGNzczogJ3RleHQvY3NzJyxcblx0Y3N2OiAndGV4dC9jc3YnLFxuXHRodG1sOiAndGV4dC9odG1sJyxcblx0dHh0OiAndGV4dC9wbGFpbicsXG5cblx0Ly8gdmlkZW9cblx0YXZpOiAndmlkZW8vYXZpJyxcblx0ZHY6ICd2aWRlby94LWR2Jyxcblx0Zmx2OiAndmlkZW8veC1mbHYnLFxuXHRtb3Y6ICd2aWRlby9xdWlja3RpbWUnLFxuXHRtcDQ6ICd2aWRlby9tcDQnLFxuXHRtcGVnOiAndmlkZW8vbXBlZycsXG5cdG1wZzogJ3ZpZGVvL21wZycsXG5cdG9ndjogJ3ZpZGVvL29nZycsXG5cdHZkbzogJ3ZpZGVvL3ZkbycsXG5cdHdlYm06ICd2aWRlby93ZWJtJyxcblx0d212OiAndmlkZW8veC1tcy13bXYnLFxuXG5cdC8vIHNwZWNpZmljIHRvIHZlbmRvcnNcblx0ZG9jOiAnYXBwbGljYXRpb24vbXN3b3JkJyxcblx0ZG9jeDogJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50Jyxcblx0b2RiOiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5kYXRhYmFzZScsXG5cdG9kYzogJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuY2hhcnQnLFxuXHRvZGY6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmZvcm11bGEnLFxuXHRvZGc6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzJyxcblx0b2RpOiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5pbWFnZScsXG5cdG9kbTogJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQudGV4dC1tYXN0ZXInLFxuXHRvZHA6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnByZXNlbnRhdGlvbicsXG5cdG9kczogJ2FwcGxpY2F0aW9uL3ZuZC5vYXNpcy5vcGVuZG9jdW1lbnQuc3ByZWFkc2hlZXQnLFxuXHRvZHQ6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuXHRvdGc6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LmdyYXBoaWNzLXRlbXBsYXRlJyxcblx0b3RwOiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24tdGVtcGxhdGUnLFxuXHRvdHM6ICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0LXRlbXBsYXRlJyxcblx0b3R0OiAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0LXRlbXBsYXRlJyxcblx0cHB0OiAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuXHRwcHR4OiAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG5cdHhsczogJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG5cdHhsc3g6ICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC5zaGVldCcsXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbi8qXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgS2FybCBTVEVJTlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICovXG5pbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IFdlYkFwcCB9IGZyb20gJ21ldGVvci93ZWJhcHAnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnJlc29sdmVkXG5pbXBvcnQgU3BhcmtNRDUgZnJvbSAnc3BhcmstbWQ1JztcblxuaW1wb3J0IHsgVXBsb2FkRlMgfSBmcm9tICcuL3Vmcyc7XG5cbmlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0Y29uc3QgZG9tYWluID0gTnBtLnJlcXVpcmUoJ2RvbWFpbicpO1xuXHRjb25zdCBmcyA9IE5wbS5yZXF1aXJlKCdmcycpO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0Y29uc3QgaHR0cCA9IE5wbS5yZXF1aXJlKCdodHRwJyk7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRjb25zdCBodHRwcyA9IE5wbS5yZXF1aXJlKCdodHRwcycpO1xuXHRjb25zdCBta2RpcnAgPSBOcG0ucmVxdWlyZSgnbWtkaXJwJyk7XG5cdGNvbnN0IHN0cmVhbSA9IE5wbS5yZXF1aXJlKCdzdHJlYW0nKTtcblx0Y29uc3QgVVJMID0gTnBtLnJlcXVpcmUoJ3VybCcpO1xuXHRjb25zdCB6bGliID0gTnBtLnJlcXVpcmUoJ3psaWInKTtcblxuXHRNZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG5cdFx0Y29uc3QgcGF0aCA9IFVwbG9hZEZTLmNvbmZpZy50bXBEaXI7XG5cdFx0Y29uc3QgbW9kZSA9IFVwbG9hZEZTLmNvbmZpZy50bXBEaXJQZXJtaXNzaW9ucztcblxuXHRcdGZzLnN0YXQocGF0aCwgKGVycikgPT4ge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIHRlbXAgZGlyZWN0b3J5XG5cdFx0XHRcdG1rZGlycChwYXRoLCB7IG1vZGUgfSwgKGVycikgPT4ge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoYHVmczogY2Fubm90IGNyZWF0ZSB0ZW1wIGRpcmVjdG9yeSBhdCBcIiR7IHBhdGggfVwiICgkeyBlcnIubWVzc2FnZSB9KWApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdWZzOiB0ZW1wIGRpcmVjdG9yeSBjcmVhdGVkIGF0IFwiJHsgcGF0aCB9XCJgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gU2V0IGRpcmVjdG9yeSBwZXJtaXNzaW9uc1xuXHRcdFx0XHRmcy5jaG1vZChwYXRoLCBtb2RlLCAoZXJyKSA9PiB7XG5cdFx0XHRcdFx0ZXJyICYmIGNvbnNvbGUuZXJyb3IoYHVmczogY2Fubm90IHNldCB0ZW1wIGRpcmVjdG9yeSBwZXJtaXNzaW9ucyAkeyBtb2RlIH0gKCR7IGVyci5tZXNzYWdlIH0pYCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBDcmVhdGUgZG9tYWluIHRvIGhhbmRsZSBlcnJvcnNcblx0Ly8gYW5kIHBvc3NpYmx5IGF2b2lkIHNlcnZlciBjcmFzaGVzLlxuXHRjb25zdCBkID0gZG9tYWluLmNyZWF0ZSgpO1xuXG5cdGQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuXHRcdGNvbnNvbGUuZXJyb3IoYHVmczogJHsgZXJyLm1lc3NhZ2UgfWApO1xuXHR9KTtcblxuXHQvLyBMaXN0ZW4gSFRUUCByZXF1ZXN0cyB0byBzZXJ2ZSBmaWxlc1xuXHRXZWJBcHAuY29ubmVjdEhhbmRsZXJzLnVzZSgocmVxLCByZXMsIG5leHQpID0+IHtcblx0XHQvLyBRdWljayBjaGVjayB0byBzZWUgaWYgcmVxdWVzdCBzaG91bGQgYmUgY2F1Z2h0XG5cdFx0aWYgKCFyZXEudXJsLmluY2x1ZGVzKGAvJHsgVXBsb2FkRlMuY29uZmlnLnN0b3Jlc1BhdGggfS9gKSkge1xuXHRcdFx0bmV4dCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSBzdG9yZSBwYXRoXG5cdFx0Y29uc3QgcGFyc2VkVXJsID0gVVJMLnBhcnNlKHJlcS51cmwpO1xuXHRcdGNvbnN0IHBhdGggPSBwYXJzZWRVcmwucGF0aG5hbWUuc3Vic3RyKFVwbG9hZEZTLmNvbmZpZy5zdG9yZXNQYXRoLmxlbmd0aCArIDEpO1xuXG5cdFx0Y29uc3QgYWxsb3dDT1JTID0gKCkgPT4ge1xuXHRcdFx0Ly8gcmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgcmVxLmhlYWRlcnMub3JpZ2luKTtcblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnUE9TVCcpO1xuXHRcdFx0cmVzLnNldEhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKTtcblx0XHRcdHJlcy5zZXRIZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLCAnQ29udGVudC1UeXBlJyk7XG5cdFx0fTtcblxuXHRcdGlmIChyZXEubWV0aG9kID09PSAnT1BUSU9OUycpIHtcblx0XHRcdGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ15cXC8oW15cXC9cXD9dKylcXC8oW15cXC9cXD9dKykkJyk7XG5cdFx0XHRjb25zdCBtYXRjaCA9IHJlZ0V4cC5leGVjKHBhdGgpO1xuXG5cdFx0XHQvLyBSZXF1ZXN0IGlzIG5vdCB2YWxpZFxuXHRcdFx0aWYgKG1hdGNoID09PSBudWxsKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDAwKTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBzdG9yZVxuXHRcdFx0Y29uc3Qgc3RvcmUgPSBVcGxvYWRGUy5nZXRTdG9yZShtYXRjaFsxXSk7XG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA0KTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgc3RvcmUgaXMgZm91bmQsIGdvIGFoZWFkIGFuZCBhbGxvdyB0aGUgb3JpZ2luXG5cdFx0XHRhbGxvd0NPUlMoKTtcblxuXHRcdFx0bmV4dCgpO1xuXHRcdH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XG5cdFx0XHQvLyBHZXQgc3RvcmVcblx0XHRcdGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ15cXC8oW15cXC9cXD9dKylcXC8oW15cXC9cXD9dKykkJyk7XG5cdFx0XHRjb25zdCBtYXRjaCA9IHJlZ0V4cC5leGVjKHBhdGgpO1xuXG5cdFx0XHQvLyBSZXF1ZXN0IGlzIG5vdCB2YWxpZFxuXHRcdFx0aWYgKG1hdGNoID09PSBudWxsKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDAwKTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBzdG9yZVxuXHRcdFx0Y29uc3Qgc3RvcmUgPSBVcGxvYWRGUy5nZXRTdG9yZShtYXRjaFsxXSk7XG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA0KTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgc3RvcmUgaXMgZm91bmQsIGdvIGFoZWFkIGFuZCBhbGxvdyB0aGUgb3JpZ2luXG5cdFx0XHRhbGxvd0NPUlMoKTtcblxuXHRcdFx0Ly8gR2V0IGZpbGVcblx0XHRcdGNvbnN0IGZpbGVJZCA9IG1hdGNoWzJdO1xuXHRcdFx0aWYgKHN0b3JlLmdldENvbGxlY3Rpb24oKS5maW5kKHsgX2lkOiBmaWxlSWQgfSkuY291bnQoKSA9PT0gMCkge1xuXHRcdFx0XHRyZXMud3JpdGVIZWFkKDQwNCk7XG5cdFx0XHRcdHJlcy5lbmQoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayB1cGxvYWQgdG9rZW5cblx0XHRcdGlmICghc3RvcmUuY2hlY2tUb2tlbihyZXEucXVlcnkudG9rZW4sIGZpbGVJZCkpIHtcblx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MDMpO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgZHVwbGljYXRlXG5cdFx0XHRjb25zdCB1bmlxdWUgPSBmdW5jdGlvbihoYXNoKSB7XG5cdFx0XHRcdGNvbnN0IG9yaWdpbmFsSWQgPSBzdG9yZS5nZXRDb2xsZWN0aW9uKCkuZmluZE9uZSh7IGhhc2gsIF9pZDogeyAkbmU6IGZpbGVJZCB9IH0pO1xuXHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxJZCA/IG9yaWdpbmFsSWQuX2lkIDogZmFsc2U7XG5cdFx0XHR9O1xuXG5cdFx0XHRjb25zdCBzcGFyayA9IG5ldyBTcGFya01ENS5BcnJheUJ1ZmZlcigpO1xuXHRcdFx0Y29uc3QgdG1wRmlsZSA9IFVwbG9hZEZTLmdldFRlbXBGaWxlUGF0aChmaWxlSWQpO1xuXHRcdFx0Y29uc3Qgd3MgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbSh0bXBGaWxlLCB7IGZsYWdzOiAnYScgfSk7XG5cdFx0XHRjb25zdCBmaWVsZHMgPSB7IHVwbG9hZGluZzogdHJ1ZSB9O1xuXHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSBwYXJzZUZsb2F0KHJlcS5xdWVyeS5wcm9ncmVzcyk7XG5cdFx0XHRpZiAoIWlzTmFOKHByb2dyZXNzKSAmJiBwcm9ncmVzcyA+IDApIHtcblx0XHRcdFx0ZmllbGRzLnByb2dyZXNzID0gTWF0aC5taW4ocHJvZ3Jlc3MsIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXEub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcblx0XHRcdFx0d3Mud3JpdGUoY2h1bmspO1xuXHRcdFx0XHRzcGFyay5hcHBlbmQoY2h1bmspO1xuXHRcdFx0fSk7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0XHRcdHJlcS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNTAwKTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXEub24oJ2VuZCcsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoKCkgPT4ge1xuXHRcdFx0XHQvLyBVcGRhdGUgY29tcGxldGVkIHN0YXRlIHdpdGhvdXQgdHJpZ2dlcmluZyBob29rc1xuXHRcdFx0XHRmaWVsZHMuaGFzaCA9IHNwYXJrLmVuZCgpO1xuXHRcdFx0XHRmaWVsZHMub3JpZ2luYWxJZCA9IHVuaXF1ZShmaWVsZHMuaGFzaCk7XG5cdFx0XHRcdHN0b3JlLmdldENvbGxlY3Rpb24oKS5kaXJlY3QudXBkYXRlKHsgX2lkOiBmaWxlSWQgfSwgeyAkc2V0OiBmaWVsZHMgfSk7XG5cdFx0XHRcdHdzLmVuZCgpO1xuXHRcdFx0fSkpO1xuXHRcdFx0d3Mub24oJ2Vycm9yJywgKGVycikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGB1ZnM6IGNhbm5vdCB3cml0ZSBjaHVuayBvZiBmaWxlIFwiJHsgZmlsZUlkIH1cIiAoJHsgZXJyLm1lc3NhZ2UgfSlgKTtcblx0XHRcdFx0ZnMudW5saW5rKHRtcEZpbGUsIChlcnIpID0+IHtcblx0XHRcdFx0XHRlcnIgJiYgY29uc29sZS5lcnJvcihgdWZzOiBjYW5ub3QgZGVsZXRlIHRlbXAgZmlsZSBcIiR7IHRtcEZpbGUgfVwiICgkeyBlcnIubWVzc2FnZSB9KWApO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmVzLndyaXRlSGVhZCg1MDApO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHR9KTtcblx0XHRcdHdzLm9uKCdmaW5pc2gnLCAoKSA9PiB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoMjA0LCB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicgfSk7XG5cdFx0XHRcdHJlcy5lbmQoKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcblx0XHRcdC8vIEdldCBzdG9yZSwgZmlsZSBJZCBhbmQgZmlsZSBuYW1lXG5cdFx0XHRjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKCdeXFwvKFteXFwvXFw/XSspXFwvKFteXFwvXFw/XSspKD86XFwvKFteXFwvXFw/XSspKT8kJyk7XG5cdFx0XHRjb25zdCBtYXRjaCA9IHJlZ0V4cC5leGVjKHBhdGgpO1xuXG5cdFx0XHQvLyBBdm9pZCA1MDQgR2F0ZXdheSB0aW1lb3V0IGVycm9yXG5cdFx0XHQvLyBpZiBmaWxlIGlzIG5vdCBoYW5kbGVkIGJ5IFVwbG9hZEZTLlxuXHRcdFx0aWYgKG1hdGNoID09PSBudWxsKSB7XG5cdFx0XHRcdG5leHQoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgc3RvcmVcblx0XHRcdGNvbnN0IHN0b3JlTmFtZSA9IG1hdGNoWzFdO1xuXHRcdFx0Y29uc3Qgc3RvcmUgPSBVcGxvYWRGUy5nZXRTdG9yZShzdG9yZU5hbWUpO1xuXG5cdFx0XHRpZiAoIXN0b3JlKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA0KTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdG9yZS5vblJlYWQgIT09IG51bGwgJiYgc3RvcmUub25SZWFkICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHN0b3JlLm9uUmVhZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGB1ZnM6IFN0b3JlLm9uUmVhZCBpcyBub3QgYSBmdW5jdGlvbiBpbiBzdG9yZSBcIiR7IHN0b3JlTmFtZSB9XCJgKTtcblx0XHRcdFx0cmVzLndyaXRlSGVhZCg1MDApO1xuXHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGZpbGUgZXh0ZW5zaW9uIGZyb20gZmlsZSBJZFxuXHRcdFx0Y29uc3QgaW5kZXggPSBtYXRjaFsyXS5pbmRleE9mKCcuJyk7XG5cdFx0XHRjb25zdCBmaWxlSWQgPSBpbmRleCAhPT0gLTEgPyBtYXRjaFsyXS5zdWJzdHIoMCwgaW5kZXgpIDogbWF0Y2hbMl07XG5cblx0XHRcdC8vIEdldCBmaWxlIGZyb20gZGF0YWJhc2Vcblx0XHRcdGNvbnN0IGZpbGUgPSBzdG9yZS5nZXRDb2xsZWN0aW9uKCkuZmluZE9uZSh7IF9pZDogZmlsZUlkIH0pO1xuXHRcdFx0aWYgKCFmaWxlKSB7XG5cdFx0XHRcdHJlcy53cml0ZUhlYWQoNDA0KTtcblx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNpbXVsYXRlIHJlYWQgc3BlZWRcblx0XHRcdGlmIChVcGxvYWRGUy5jb25maWcuc2ltdWxhdGVSZWFkRGVsYXkpIHtcblx0XHRcdFx0TWV0ZW9yLl9zbGVlcEZvck1zKFVwbG9hZEZTLmNvbmZpZy5zaW11bGF0ZVJlYWREZWxheSk7XG5cdFx0XHR9XG5cblx0XHRcdGQucnVuKCgpID0+IHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIGZpbGUgY2FuIGJlIGFjY2Vzc2VkXG5cdFx0XHRcdGlmIChzdG9yZS5vblJlYWQuY2FsbChzdG9yZSwgZmlsZUlkLCBmaWxlLCByZXEsIHJlcykgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHt9O1xuXHRcdFx0XHRcdGxldCBzdGF0dXMgPSAyMDA7XG5cblx0XHRcdFx0XHQvLyBQcmVwYXJlIHJlc3BvbnNlIGhlYWRlcnNcblx0XHRcdFx0XHRjb25zdCBoZWFkZXJzID0ge1xuXHRcdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6IGZpbGUudHlwZSxcblx0XHRcdFx0XHRcdCdDb250ZW50LUxlbmd0aCc6IGZpbGUuc2l6ZSxcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Ly8gQWRkIEVUYWcgaGVhZGVyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBmaWxlLmV0YWcgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRoZWFkZXJzLkVUYWcgPSBmaWxlLmV0YWc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQWRkIExhc3QtTW9kaWZpZWQgaGVhZGVyXG5cdFx0XHRcdFx0aWYgKGZpbGUubW9kaWZpZWRBdCBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdFx0XHRcdGhlYWRlcnNbJ0xhc3QtTW9kaWZpZWQnXSA9IGZpbGUubW9kaWZpZWRBdC50b1VUQ1N0cmluZygpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZmlsZS51cGxvYWRlZEF0IGluc3RhbmNlb2YgRGF0ZSkge1xuXHRcdFx0XHRcdFx0aGVhZGVyc1snTGFzdC1Nb2RpZmllZCddID0gZmlsZS51cGxvYWRlZEF0LnRvVVRDU3RyaW5nKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUGFyc2UgcmVxdWVzdCBoZWFkZXJzXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiByZXEuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdC8vIENvbXBhcmUgRVRhZ1xuXHRcdFx0XHRcdFx0aWYgKHJlcS5oZWFkZXJzWydpZi1ub25lLW1hdGNoJ10pIHtcblx0XHRcdFx0XHRcdFx0aWYgKGZpbGUuZXRhZyA9PT0gcmVxLmhlYWRlcnNbJ2lmLW5vbmUtbWF0Y2gnXSkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoMzA0KTsgLy8gTm90IE1vZGlmaWVkXG5cdFx0XHRcdFx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBDb21wYXJlIGZpbGUgbW9kaWZpY2F0aW9uIGRhdGVcblx0XHRcdFx0XHRcdGlmIChyZXEuaGVhZGVyc1snaWYtbW9kaWZpZWQtc2luY2UnXSkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBtb2RpZmllZFNpbmNlID0gbmV3IERhdGUocmVxLmhlYWRlcnNbJ2lmLW1vZGlmaWVkLXNpbmNlJ10pO1xuXG5cdFx0XHRcdFx0XHRcdGlmICgoZmlsZS5tb2RpZmllZEF0IGluc3RhbmNlb2YgRGF0ZSAmJiBmaWxlLm1vZGlmaWVkQXQgPiBtb2RpZmllZFNpbmNlKVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1taXhlZC1vcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB8fCBmaWxlLnVwbG9hZGVkQXQgaW5zdGFuY2VvZiBEYXRlICYmIGZpbGUudXBsb2FkZWRBdCA+IG1vZGlmaWVkU2luY2UpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXMud3JpdGVIZWFkKDMwNCk7IC8vIE5vdCBNb2RpZmllZFxuXHRcdFx0XHRcdFx0XHRcdHJlcy5lbmQoKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydCByYW5nZSByZXF1ZXN0XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHJlcS5oZWFkZXJzLnJhbmdlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB7IHJhbmdlIH0gPSByZXEuaGVhZGVycztcblxuXHRcdFx0XHRcdFx0XHQvLyBSYW5nZSBpcyBub3QgdmFsaWRcblx0XHRcdFx0XHRcdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDE2KTtcblx0XHRcdFx0XHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgdG90YWwgPSBmaWxlLnNpemU7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHVuaXQgPSByYW5nZS5zdWJzdHIoMCwgcmFuZ2UuaW5kZXhPZignPScpKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAodW5pdCAhPT0gJ2J5dGVzJykge1xuXHRcdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoNDE2KTtcblx0XHRcdFx0XHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgcmFuZ2VzID0gcmFuZ2Uuc3Vic3RyKHVuaXQubGVuZ3RoKS5yZXBsYWNlKC9bXjAtOVxcLSxdLywgJycpLnNwbGl0KCcsJyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHJhbmdlcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gdG9kbzogc3VwcG9ydCBtdWx0aXBhcnQgcmFuZ2VzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL1JhbmdlX3JlcXVlc3RzXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgciA9IHJhbmdlc1swXS5zcGxpdCgnLScpO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHN0YXJ0ID0gcGFyc2VJbnQoclswXSwgMTApO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGVuZCA9IHJbMV0gPyBwYXJzZUludChyWzFdLCAxMCkgOiB0b3RhbCAtIDE7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBSYW5nZSBpcyBub3QgdmFsaWRcblx0XHRcdFx0XHRcdFx0XHRpZiAoc3RhcnQgPCAwIHx8IGVuZCA+PSB0b3RhbCB8fCBzdGFydCA+IGVuZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZCg0MTYpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdC8vIFVwZGF0ZSBoZWFkZXJzXG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1SYW5nZSddID0gYGJ5dGVzICR7IHN0YXJ0IH0tJHsgZW5kIH0vJHsgdG90YWwgfWA7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IGVuZCAtIHN0YXJ0ICsgMTtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLnN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5lbmQgPSBlbmQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0c3RhdHVzID0gMjA2OyAvLyBwYXJ0aWFsIGNvbnRlbnRcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aGVhZGVyc1snQWNjZXB0LVJhbmdlcyddID0gJ2J5dGVzJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPcGVuIHRoZSBmaWxlIHN0cmVhbVxuXHRcdFx0XHRcdGNvbnN0IHJzID0gc3RvcmUuZ2V0UmVhZFN0cmVhbShmaWxlSWQsIGZpbGUsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdGNvbnN0IHdzID0gbmV3IHN0cmVhbS5QYXNzVGhyb3VnaCgpO1xuXG5cdFx0XHRcdFx0cnMub24oJ2Vycm9yJywgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0XHRzdG9yZS5vblJlYWRFcnJvci5jYWxsKHN0b3JlLCBlcnIsIGZpbGVJZCwgZmlsZSk7XG5cdFx0XHRcdFx0XHRyZXMuZW5kKCk7XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHRcdHdzLm9uKCdlcnJvcicsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoKGVycikgPT4ge1xuXHRcdFx0XHRcdFx0c3RvcmUub25SZWFkRXJyb3IuY2FsbChzdG9yZSwgZXJyLCBmaWxlSWQsIGZpbGUpO1xuXHRcdFx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHR3cy5vbignY2xvc2UnLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBDbG9zZSBvdXRwdXQgc3RyZWFtIGF0IHRoZSBlbmRcblx0XHRcdFx0XHRcdHdzLmVtaXQoJ2VuZCcpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Ly8gVHJhbnNmb3JtIHN0cmVhbVxuXHRcdFx0XHRcdHN0b3JlLnRyYW5zZm9ybVJlYWQocnMsIHdzLCBmaWxlSWQsIGZpbGUsIHJlcSwgaGVhZGVycyk7XG5cblx0XHRcdFx0XHQvLyBQYXJzZSByZXF1ZXN0IGhlYWRlcnNcblx0XHRcdFx0XHRpZiAodHlwZW9mIHJlcS5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0Ly8gQ29tcHJlc3MgZGF0YSB1c2luZyBpZiBuZWVkZWQgKGlnbm9yZSBhdWRpby92aWRlbyBhcyB0aGV5IGFyZSBhbHJlYWR5IGNvbXByZXNzZWQpXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHJlcS5oZWFkZXJzWydhY2NlcHQtZW5jb2RpbmcnXSA9PT0gJ3N0cmluZycgJiYgIS9eKGF1ZGlvfHZpZGVvKS8udGVzdChmaWxlLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGFjY2VwdCA9IHJlcS5oZWFkZXJzWydhY2NlcHQtZW5jb2RpbmcnXTtcblxuXHRcdFx0XHRcdFx0XHQvLyBDb21wcmVzcyB3aXRoIGd6aXBcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdC5tYXRjaCgvXFxiZ3ppcFxcYi8pKSB7XG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1FbmNvZGluZyddID0gJ2d6aXAnO1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBoZWFkZXJzWydDb250ZW50LUxlbmd0aCddO1xuXHRcdFx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoc3RhdHVzLCBoZWFkZXJzKTtcblx0XHRcdFx0XHRcdFx0XHR3cy5waXBlKHpsaWIuY3JlYXRlR3ppcCgpKS5waXBlKHJlcyk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIENvbXByZXNzIHdpdGggZGVmbGF0ZVxuXHRcdFx0XHRcdFx0XHRpZiAoYWNjZXB0Lm1hdGNoKC9cXGJkZWZsYXRlXFxiLykpIHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzWydDb250ZW50LUVuY29kaW5nJ10gPSAnZGVmbGF0ZSc7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIGhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ107XG5cdFx0XHRcdFx0XHRcdFx0cmVzLndyaXRlSGVhZChzdGF0dXMsIGhlYWRlcnMpO1xuXHRcdFx0XHRcdFx0XHRcdHdzLnBpcGUoemxpYi5jcmVhdGVEZWZsYXRlKCkpLnBpcGUocmVzKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBTZW5kIHJhdyBkYXRhXG5cdFx0XHRcdFx0aWYgKCFoZWFkZXJzWydDb250ZW50LUVuY29kaW5nJ10pIHtcblx0XHRcdFx0XHRcdHJlcy53cml0ZUhlYWQoc3RhdHVzLCBoZWFkZXJzKTtcblx0XHRcdFx0XHRcdHdzLnBpcGUocmVzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzLmVuZCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmV4dCgpO1xuXHRcdH1cblx0fSk7XG59XG4iLCIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnbWV0ZW9yL3VuZGVyc2NvcmUnO1xuXG4vKipcbiAqIFN0b3JlIHBlcm1pc3Npb25zXG4gKi9cbmV4cG9ydCBjbGFzcyBTdG9yZVBlcm1pc3Npb25zIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRcdG9wdGlvbnMgPSBfLmV4dGVuZCh7XG5cdFx0XHRpbnNlcnQ6IG51bGwsXG5cdFx0XHRyZW1vdmU6IG51bGwsXG5cdFx0XHR1cGRhdGU6IG51bGwsXG5cdFx0fSwgb3B0aW9ucyk7XG5cblx0XHQvLyBDaGVjayBvcHRpb25zXG5cdFx0aWYgKG9wdGlvbnMuaW5zZXJ0ICYmIHR5cGVvZiBvcHRpb25zLmluc2VydCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignU3RvcmVQZXJtaXNzaW9uczogaW5zZXJ0IGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLnJlbW92ZSAmJiB0eXBlb2Ygb3B0aW9ucy5yZW1vdmUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlUGVybWlzc2lvbnM6IHJlbW92ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy51cGRhdGUgJiYgdHlwZW9mIG9wdGlvbnMudXBkYXRlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZVBlcm1pc3Npb25zOiB1cGRhdGUgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cblx0XHQvLyBQdWJsaWMgYXR0cmlidXRlc1xuXHRcdHRoaXMuYWN0aW9ucyA9IHtcblx0XHRcdGluc2VydDogb3B0aW9ucy5pbnNlcnQsXG5cdFx0XHRyZW1vdmU6IG9wdGlvbnMucmVtb3ZlLFxuXHRcdFx0dXBkYXRlOiBvcHRpb25zLnVwZGF0ZSxcblx0XHR9O1xuXHR9XG5cblx0LyoqXG4gICAqIENoZWNrcyB0aGUgcGVybWlzc2lvbiBmb3IgdGhlIGFjdGlvblxuICAgKiBAcGFyYW0gYWN0aW9uXG4gICAqIEBwYXJhbSB1c2VySWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICogQHBhcmFtIGZpZWxkc1xuICAgKiBAcGFyYW0gbW9kaWZpZXJzXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuXHRjaGVjayhhY3Rpb24sIHVzZXJJZCwgZmlsZSwgZmllbGRzLCBtb2RpZmllcnMpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMuYWN0aW9uc1thY3Rpb25dID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5hY3Rpb25zW2FjdGlvbl0odXNlcklkLCBmaWxlLCBmaWVsZHMsIG1vZGlmaWVycyk7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlOyAvLyBieSBkZWZhdWx0IGFsbG93IGFsbFxuXHR9XG5cblx0LyoqXG4gICAqIENoZWNrcyB0aGUgaW5zZXJ0IHBlcm1pc3Npb25cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG5cdGNoZWNrSW5zZXJ0KHVzZXJJZCwgZmlsZSkge1xuXHRcdHJldHVybiB0aGlzLmNoZWNrKCdpbnNlcnQnLCB1c2VySWQsIGZpbGUpO1xuXHR9XG5cblx0LyoqXG4gICAqIENoZWNrcyB0aGUgcmVtb3ZlIHBlcm1pc3Npb25cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG5cdGNoZWNrUmVtb3ZlKHVzZXJJZCwgZmlsZSkge1xuXHRcdHJldHVybiB0aGlzLmNoZWNrKCdyZW1vdmUnLCB1c2VySWQsIGZpbGUpO1xuXHR9XG5cblx0LyoqXG4gICAqIENoZWNrcyB0aGUgdXBkYXRlIHBlcm1pc3Npb25cbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcGFyYW0gZmllbGRzXG4gICAqIEBwYXJhbSBtb2RpZmllcnNcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuXHRjaGVja1VwZGF0ZSh1c2VySWQsIGZpbGUsIGZpZWxkcywgbW9kaWZpZXJzKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2hlY2soJ3VwZGF0ZScsIHVzZXJJZCwgZmlsZSwgZmllbGRzLCBtb2RpZmllcnMpO1xuXHR9XG59XG4iLCIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuaW1wb3J0IHsgY2hlY2sgfSBmcm9tICdtZXRlb3IvY2hlY2snO1xuaW1wb3J0IHsgTWV0ZW9yIH0gZnJvbSAnbWV0ZW9yL21ldGVvcic7XG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5pbXBvcnQgeyBfIH0gZnJvbSAnbWV0ZW9yL3VuZGVyc2NvcmUnO1xuXG5pbXBvcnQgeyBVcGxvYWRGUyB9IGZyb20gJy4vdWZzJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vdWZzLWZpbHRlcic7XG5pbXBvcnQgeyBTdG9yZVBlcm1pc3Npb25zIH0gZnJvbSAnLi91ZnMtc3RvcmUtcGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgVG9rZW5zIH0gZnJvbSAnLi91ZnMtdG9rZW5zJztcblxuLyoqXG4gKiBGaWxlIHN0b3JlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdG9yZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRjb25zdCBzZWxmID0gdGhpcztcblxuXHRcdC8vIERlZmF1bHQgb3B0aW9uc1xuXHRcdG9wdGlvbnMgPSBfLmV4dGVuZCh7XG5cdFx0XHRjb2xsZWN0aW9uOiBudWxsLFxuXHRcdFx0ZmlsdGVyOiBudWxsLFxuXHRcdFx0bmFtZTogbnVsbCxcblx0XHRcdG9uQ29weUVycm9yOiB0aGlzLm9uQ29weUVycm9yLFxuXHRcdFx0b25GaW5pc2hVcGxvYWQ6IHRoaXMub25GaW5pc2hVcGxvYWQsXG5cdFx0XHRvblJlYWQ6IHRoaXMub25SZWFkLFxuXHRcdFx0b25SZWFkRXJyb3I6IHRoaXMub25SZWFkRXJyb3IsXG5cdFx0XHRvblZhbGlkYXRlOiB0aGlzLm9uVmFsaWRhdGUsXG5cdFx0XHRvbldyaXRlRXJyb3I6IHRoaXMub25Xcml0ZUVycm9yLFxuXHRcdFx0cGVybWlzc2lvbnM6IG51bGwsXG5cdFx0XHR0cmFuc2Zvcm1SZWFkOiBudWxsLFxuXHRcdFx0dHJhbnNmb3JtV3JpdGU6IG51bGwsXG5cdFx0fSwgb3B0aW9ucyk7XG5cblx0XHQvLyBDaGVjayBvcHRpb25zXG5cdFx0aWYgKCEob3B0aW9ucy5jb2xsZWN0aW9uIGluc3RhbmNlb2YgTW9uZ28uQ29sbGVjdGlvbikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiBjb2xsZWN0aW9uIGlzIG5vdCBhIE1vbmdvLkNvbGxlY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuZmlsdGVyICYmICEob3B0aW9ucy5maWx0ZXIgaW5zdGFuY2VvZiBGaWx0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZTogZmlsdGVyIGlzIG5vdCBhIFVwbG9hZEZTLkZpbHRlcicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMubmFtZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiBuYW1lIGlzIG5vdCBhIHN0cmluZycpO1xuXHRcdH1cblx0XHRpZiAoVXBsb2FkRlMuZ2V0U3RvcmUob3B0aW9ucy5uYW1lKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignU3RvcmU6IG5hbWUgYWxyZWFkeSBleGlzdHMnKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMub25Db3B5RXJyb3IgJiYgdHlwZW9mIG9wdGlvbnMub25Db3B5RXJyb3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiBvbkNvcHlFcnJvciBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5vbkZpbmlzaFVwbG9hZCAmJiB0eXBlb2Ygb3B0aW9ucy5vbkZpbmlzaFVwbG9hZCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignU3RvcmU6IG9uRmluaXNoVXBsb2FkIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLm9uUmVhZCAmJiB0eXBlb2Ygb3B0aW9ucy5vblJlYWQgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiBvblJlYWQgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMub25SZWFkRXJyb3IgJiYgdHlwZW9mIG9wdGlvbnMub25SZWFkRXJyb3IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiBvblJlYWRFcnJvciBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy5vbldyaXRlRXJyb3IgJiYgdHlwZW9mIG9wdGlvbnMub25Xcml0ZUVycm9yICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZTogb25Xcml0ZUVycm9yIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLnBlcm1pc3Npb25zICYmICEob3B0aW9ucy5wZXJtaXNzaW9ucyBpbnN0YW5jZW9mIFN0b3JlUGVybWlzc2lvbnMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZTogcGVybWlzc2lvbnMgaXMgbm90IGEgVXBsb2FkRlMuU3RvcmVQZXJtaXNzaW9ucycpO1xuXHRcdH1cblx0XHRpZiAob3B0aW9ucy50cmFuc2Zvcm1SZWFkICYmIHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybVJlYWQgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0b3JlOiB0cmFuc2Zvcm1SZWFkIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLnRyYW5zZm9ybVdyaXRlICYmIHR5cGVvZiBvcHRpb25zLnRyYW5zZm9ybVdyaXRlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZTogdHJhbnNmb3JtV3JpdGUgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMub25WYWxpZGF0ZSAmJiB0eXBlb2Ygb3B0aW9ucy5vblZhbGlkYXRlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTdG9yZTogb25WYWxpZGF0ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdC8vIFB1YmxpYyBhdHRyaWJ1dGVzXG5cdFx0c2VsZi5vcHRpb25zID0gb3B0aW9ucztcblx0XHRzZWxmLnBlcm1pc3Npb25zID0gb3B0aW9ucy5wZXJtaXNzaW9ucztcblx0XHRbXG5cdFx0XHQnb25Db3B5RXJyb3InLFxuXHRcdFx0J29uRmluaXNoVXBsb2FkJyxcblx0XHRcdCdvblJlYWQnLFxuXHRcdFx0J29uUmVhZEVycm9yJyxcblx0XHRcdCdvbldyaXRlRXJyb3InLFxuXHRcdFx0J29uVmFsaWRhdGUnLFxuXHRcdF0uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIG9wdGlvbnNbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRzZWxmW21ldGhvZF0gPSBvcHRpb25zW21ldGhvZF07XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgdGhlIHN0b3JlIHRvIHRoZSBsaXN0XG5cdFx0VXBsb2FkRlMuYWRkU3RvcmUoc2VsZik7XG5cblx0XHQvLyBTZXQgZGVmYXVsdCBwZXJtaXNzaW9uc1xuXHRcdGlmICghKHNlbGYucGVybWlzc2lvbnMgaW5zdGFuY2VvZiBTdG9yZVBlcm1pc3Npb25zKSkge1xuXHRcdFx0Ly8gVXNlcyBjdXN0b20gZGVmYXVsdCBwZXJtaXNzaW9ucyBvciBVRlMgZGVmYXVsdCBwZXJtaXNzaW9uc1xuXHRcdFx0aWYgKFVwbG9hZEZTLmNvbmZpZy5kZWZhdWx0U3RvcmVQZXJtaXNzaW9ucyBpbnN0YW5jZW9mIFN0b3JlUGVybWlzc2lvbnMpIHtcblx0XHRcdFx0c2VsZi5wZXJtaXNzaW9ucyA9IFVwbG9hZEZTLmNvbmZpZy5kZWZhdWx0U3RvcmVQZXJtaXNzaW9ucztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGYucGVybWlzc2lvbnMgPSBuZXcgU3RvcmVQZXJtaXNzaW9ucygpO1xuXHRcdFx0XHRjb25zb2xlLndhcm4oYHVmczogcGVybWlzc2lvbnMgYXJlIG5vdCBkZWZpbmVkIGZvciBzdG9yZSBcIiR7IG9wdGlvbnMubmFtZSB9XCJgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoTWV0ZW9yLmlzU2VydmVyKSB7XG5cdFx0XHQvKipcbiAgICAgICAqIENoZWNrcyB0b2tlbiB2YWxpZGl0eVxuICAgICAgICogQHBhcmFtIHRva2VuXG4gICAgICAgKiBAcGFyYW0gZmlsZUlkXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAqL1xuXHRcdFx0c2VsZi5jaGVja1Rva2VuID0gZnVuY3Rpb24odG9rZW4sIGZpbGVJZCkge1xuXHRcdFx0XHRjaGVjayh0b2tlbiwgU3RyaW5nKTtcblx0XHRcdFx0Y2hlY2soZmlsZUlkLCBTdHJpbmcpO1xuXHRcdFx0XHRyZXR1cm4gVG9rZW5zLmZpbmQoeyB2YWx1ZTogdG9rZW4sIGZpbGVJZCB9KS5jb3VudCgpID09PSAxO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG4gICAgICAgKiBDb3BpZXMgdGhlIGZpbGUgdG8gYSBzdG9yZVxuICAgICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAgICogQHBhcmFtIHN0b3JlXG4gICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgICAqL1xuXHRcdFx0c2VsZi5jb3B5ID0gZnVuY3Rpb24oZmlsZUlkLCBzdG9yZSwgY2FsbGJhY2spIHtcblx0XHRcdFx0Y2hlY2soZmlsZUlkLCBTdHJpbmcpO1xuXG5cdFx0XHRcdGlmICghKHN0b3JlIGluc3RhbmNlb2YgU3RvcmUpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RvcmUgaXMgbm90IGFuIGluc3RhbmNlIG9mIFVwbG9hZEZTLlN0b3JlJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gR2V0IG9yaWdpbmFsIGZpbGVcblx0XHRcdFx0Y29uc3QgZmlsZSA9IHNlbGYuZ2V0Q29sbGVjdGlvbigpLmZpbmRPbmUoeyBfaWQ6IGZpbGVJZCB9KTtcblx0XHRcdFx0aWYgKCFmaWxlKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IE1ldGVvci5FcnJvcignZmlsZS1ub3QtZm91bmQnLCAnRmlsZSBub3QgZm91bmQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBTaWxlbnRseSBpZ25vcmUgdGhlIGZpbGUgaWYgaXQgZG9lcyBub3QgbWF0Y2ggZmlsdGVyXG5cdFx0XHRcdGNvbnN0IGZpbHRlciA9IHN0b3JlLmdldEZpbHRlcigpO1xuXHRcdFx0XHRpZiAoZmlsdGVyIGluc3RhbmNlb2YgRmlsdGVyICYmICFmaWx0ZXIuaXNWYWxpZChmaWxlKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByZXBhcmUgY29weVxuXHRcdFx0XHRjb25zdCB7IF9pZCwgdXJsLCAuLi5jb3B5IH0gPSBmaWxlO1xuXHRcdFx0XHRjb3B5Lm9yaWdpbmFsU3RvcmUgPSBzZWxmLmdldE5hbWUoKTtcblx0XHRcdFx0Y29weS5vcmlnaW5hbElkID0gZmlsZUlkO1xuXG5cdFx0XHRcdC8vIENyZWF0ZSB0aGUgY29weVxuXHRcdFx0XHRjb25zdCBjb3B5SWQgPSBzdG9yZS5jcmVhdGUoY29weSk7XG5cblx0XHRcdFx0Ly8gR2V0IG9yaWdpbmFsIHN0cmVhbVxuXHRcdFx0XHRjb25zdCBycyA9IHNlbGYuZ2V0UmVhZFN0cmVhbShmaWxlSWQsIGZpbGUpO1xuXG5cdFx0XHRcdC8vIENhdGNoIGVycm9ycyB0byBhdm9pZCBhcHAgY3Jhc2hpbmdcblx0XHRcdFx0cnMub24oJ2Vycm9yJywgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHNlbGYsIGVyciwgbnVsbCk7XG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvLyBDb3B5IGZpbGUgZGF0YVxuXHRcdFx0XHRzdG9yZS53cml0ZShycywgY29weUlkLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRcdHNlbGYuZ2V0Q29sbGVjdGlvbigpLnJlbW92ZSh7IF9pZDogY29weUlkIH0pO1xuXHRcdFx0XHRcdFx0c2VsZi5vbkNvcHlFcnJvci5jYWxsKHNlbGYsIGVyciwgZmlsZUlkLCBmaWxlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChzZWxmLCBlcnIsIGNvcHlJZCwgY29weSwgc3RvcmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG4gICAgICAgKiBDcmVhdGVzIHRoZSBmaWxlIGluIHRoZSBjb2xsZWN0aW9uXG4gICAgICAgKiBAcGFyYW0gZmlsZVxuICAgICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgKi9cblx0XHRcdHNlbGYuY3JlYXRlID0gZnVuY3Rpb24oZmlsZSwgY2FsbGJhY2spIHtcblx0XHRcdFx0Y2hlY2soZmlsZSwgT2JqZWN0KTtcblx0XHRcdFx0ZmlsZS5zdG9yZSA9IHNlbGYub3B0aW9ucy5uYW1lOyAvLyBhc3NpZ24gc3RvcmUgdG8gZmlsZVxuXHRcdFx0XHRyZXR1cm4gc2VsZi5nZXRDb2xsZWN0aW9uKCkuaW5zZXJ0KGZpbGUsIGNhbGxiYWNrKTtcblx0XHRcdH07XG5cblx0XHRcdC8qKlxuICAgICAgICogQ3JlYXRlcyBhIHRva2VuIGZvciB0aGUgZmlsZSAob25seSBuZWVkZWQgZm9yIGNsaWVudCBzaWRlIHVwbG9hZClcbiAgICAgICAqIEBwYXJhbSBmaWxlSWRcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG5cdFx0XHRzZWxmLmNyZWF0ZVRva2VuID0gZnVuY3Rpb24oZmlsZUlkKSB7XG5cdFx0XHRcdGNvbnN0IHRva2VuID0gc2VsZi5nZW5lcmF0ZVRva2VuKCk7XG5cblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdG9rZW4gZXhpc3RzXG5cdFx0XHRcdGlmIChUb2tlbnMuZmluZCh7IGZpbGVJZCB9KS5jb3VudCgpKSB7XG5cdFx0XHRcdFx0VG9rZW5zLnVwZGF0ZSh7IGZpbGVJZCB9LCB7XG5cdFx0XHRcdFx0XHQkc2V0OiB7XG5cdFx0XHRcdFx0XHRcdGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHRva2VuLFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRUb2tlbnMuaW5zZXJ0KHtcblx0XHRcdFx0XHRcdGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdGZpbGVJZCxcblx0XHRcdFx0XHRcdHZhbHVlOiB0b2tlbixcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG9rZW47XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcbiAgICAgICAqIFdyaXRlcyB0aGUgZmlsZSB0byB0aGUgc3RvcmVcbiAgICAgICAqIEBwYXJhbSByc1xuICAgICAgICogQHBhcmFtIGZpbGVJZFxuICAgICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICAgKi9cblx0XHRcdHNlbGYud3JpdGUgPSBmdW5jdGlvbihycywgZmlsZUlkLCBjYWxsYmFjaykge1xuXHRcdFx0XHRjb25zdCBmaWxlID0gc2VsZi5nZXRDb2xsZWN0aW9uKCkuZmluZE9uZSh7IF9pZDogZmlsZUlkIH0pO1xuXG5cdFx0XHRcdGNvbnN0IGVycm9ySGFuZGxlciA9IE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0c2VsZi5vbldyaXRlRXJyb3IuY2FsbChzZWxmLCBlcnIsIGZpbGVJZCwgZmlsZSk7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChzZWxmLCBlcnIpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25zdCBmaW5pc2hIYW5kbGVyID0gTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRsZXQgc2l6ZSA9IDA7XG5cdFx0XHRcdFx0Y29uc3QgcmVhZFN0cmVhbSA9IHNlbGYuZ2V0UmVhZFN0cmVhbShmaWxlSWQsIGZpbGUpO1xuXG5cdFx0XHRcdFx0cmVhZFN0cmVhbS5vbignZXJyb3InLCBNZXRlb3IuYmluZEVudmlyb25tZW50KGZ1bmN0aW9uKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHNlbGYsIGVycm9yLCBudWxsKTtcblx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0cmVhZFN0cmVhbS5vbignZGF0YScsIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHRcdFx0c2l6ZSArPSBkYXRhLmxlbmd0aDtcblx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0cmVhZFN0cmVhbS5vbignZW5kJywgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdC8vIFNldCBmaWxlIGF0dHJpYnV0ZVxuXHRcdFx0XHRcdFx0ZmlsZS5jb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRmaWxlLmV0YWcgPSBVcGxvYWRGUy5nZW5lcmF0ZUV0YWcoKTtcblx0XHRcdFx0XHRcdGZpbGUucGF0aCA9IHNlbGYuZ2V0RmlsZVJlbGF0aXZlVVJMKGZpbGVJZCk7XG5cdFx0XHRcdFx0XHRmaWxlLnByb2dyZXNzID0gMTtcblx0XHRcdFx0XHRcdGZpbGUuc2l6ZSA9IHNpemU7XG5cdFx0XHRcdFx0XHRmaWxlLnRva2VuID0gc2VsZi5nZW5lcmF0ZVRva2VuKCk7XG5cdFx0XHRcdFx0XHRmaWxlLnVwbG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0ZmlsZS51cGxvYWRlZEF0ID0gbmV3IERhdGUoKTtcblx0XHRcdFx0XHRcdGZpbGUudXJsID0gc2VsZi5nZXRGaWxlVVJMKGZpbGVJZCk7XG5cblx0XHRcdFx0XHRcdC8vIEV4ZWN1dGUgY2FsbGJhY2tcblx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygc2VsZi5vbkZpbmlzaFVwbG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHRzZWxmLm9uRmluaXNoVXBsb2FkLmNhbGwoc2VsZiwgZmlsZSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIFNldHMgdGhlIGZpbGUgVVJMIHdoZW4gZmlsZSB0cmFuc2ZlciBpcyBjb21wbGV0ZSxcblx0XHRcdFx0XHRcdC8vIHRoaXMgd2F5LCB0aGUgaW1hZ2Ugd2lsbCBsb2FkcyBlbnRpcmVseS5cblx0XHRcdFx0XHRcdHNlbGYuZ2V0Q29sbGVjdGlvbigpLmRpcmVjdC51cGRhdGUoeyBfaWQ6IGZpbGVJZCB9LCB7XG5cdFx0XHRcdFx0XHRcdCRzZXQ6IHtcblx0XHRcdFx0XHRcdFx0XHRjb21wbGV0ZTogZmlsZS5jb21wbGV0ZSxcblx0XHRcdFx0XHRcdFx0XHRldGFnOiBmaWxlLmV0YWcsXG5cdFx0XHRcdFx0XHRcdFx0cGF0aDogZmlsZS5wYXRoLFxuXHRcdFx0XHRcdFx0XHRcdHByb2dyZXNzOiBmaWxlLnByb2dyZXNzLFxuXHRcdFx0XHRcdFx0XHRcdHNpemU6IGZpbGUuc2l6ZSxcblx0XHRcdFx0XHRcdFx0XHR0b2tlbjogZmlsZS50b2tlbixcblx0XHRcdFx0XHRcdFx0XHR1cGxvYWRpbmc6IGZpbGUudXBsb2FkaW5nLFxuXHRcdFx0XHRcdFx0XHRcdHVwbG9hZGVkQXQ6IGZpbGUudXBsb2FkZWRBdCxcblx0XHRcdFx0XHRcdFx0XHR1cmw6IGZpbGUudXJsLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdC8vIFJldHVybiBmaWxlIGluZm9cblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwoc2VsZiwgbnVsbCwgZmlsZSk7XG5cblx0XHRcdFx0XHRcdC8vIFNpbXVsYXRlIHdyaXRlIHNwZWVkXG5cdFx0XHRcdFx0XHRpZiAoVXBsb2FkRlMuY29uZmlnLnNpbXVsYXRlV3JpdGVEZWxheSkge1xuXHRcdFx0XHRcdFx0XHRNZXRlb3IuX3NsZWVwRm9yTXMoVXBsb2FkRlMuY29uZmlnLnNpbXVsYXRlV3JpdGVEZWxheSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIENvcHkgZmlsZSB0byBvdGhlciBzdG9yZXNcblx0XHRcdFx0XHRcdGlmIChzZWxmLm9wdGlvbnMuY29weVRvIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxmLm9wdGlvbnMuY29weVRvLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc3RvcmUgPSBzZWxmLm9wdGlvbnMuY29weVRvW2ldO1xuXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFzdG9yZS5nZXRGaWx0ZXIoKSB8fCBzdG9yZS5nZXRGaWx0ZXIoKS5pc1ZhbGlkKGZpbGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzZWxmLmNvcHkoZmlsZUlkLCBzdG9yZSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSkpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb25zdCB3cyA9IHNlbGYuZ2V0V3JpdGVTdHJlYW0oZmlsZUlkLCBmaWxlKTtcblx0XHRcdFx0d3Mub24oJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0d3Mub24oJ2ZpbmlzaCcsIGZpbmlzaEhhbmRsZXIpO1xuXG5cdFx0XHRcdC8vIEV4ZWN1dGUgdHJhbnNmb3JtYXRpb25cblx0XHRcdFx0c2VsZi50cmFuc2Zvcm1Xcml0ZShycywgd3MsIGZpbGVJZCwgZmlsZSk7XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHRcdFx0Y29uc3QgZnMgPSBOcG0ucmVxdWlyZSgnZnMnKTtcblx0XHRcdGNvbnN0IGNvbGxlY3Rpb24gPSBzZWxmLmdldENvbGxlY3Rpb24oKTtcblxuXHRcdFx0Ly8gQ29kZSBleGVjdXRlZCBhZnRlciByZW1vdmluZyBmaWxlXG5cdFx0XHRjb2xsZWN0aW9uLmFmdGVyLnJlbW92ZShmdW5jdGlvbih1c2VySWQsIGZpbGUpIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIGFzc29jaWF0ZWQgdG9rZW5zXG5cdFx0XHRcdFRva2Vucy5yZW1vdmUoeyBmaWxlSWQ6IGZpbGUuX2lkIH0pO1xuXG5cdFx0XHRcdGlmIChzZWxmLm9wdGlvbnMuY29weVRvIGluc3RhbmNlb2YgQXJyYXkpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYub3B0aW9ucy5jb3B5VG8ubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSBjb3BpZXMgaW4gc3RvcmVzXG5cdFx0XHRcdFx0XHRzZWxmLm9wdGlvbnMuY29weVRvW2ldLmdldENvbGxlY3Rpb24oKS5yZW1vdmUoeyBvcmlnaW5hbElkOiBmaWxlLl9pZCB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBDb2RlIGV4ZWN1dGVkIGJlZm9yZSBpbnNlcnRpbmcgZmlsZVxuXHRcdFx0Y29sbGVjdGlvbi5iZWZvcmUuaW5zZXJ0KGZ1bmN0aW9uKHVzZXJJZCwgZmlsZSkge1xuXHRcdFx0XHRpZiAoIXNlbGYucGVybWlzc2lvbnMuY2hlY2tJbnNlcnQodXNlcklkLCBmaWxlKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2ZvcmJpZGRlbicsICdGb3JiaWRkZW4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENvZGUgZXhlY3V0ZWQgYmVmb3JlIHVwZGF0aW5nIGZpbGVcblx0XHRcdGNvbGxlY3Rpb24uYmVmb3JlLnVwZGF0ZShmdW5jdGlvbih1c2VySWQsIGZpbGUsIGZpZWxkcywgbW9kaWZpZXJzKSB7XG5cdFx0XHRcdGlmICghc2VsZi5wZXJtaXNzaW9ucy5jaGVja1VwZGF0ZSh1c2VySWQsIGZpbGUsIGZpZWxkcywgbW9kaWZpZXJzKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBNZXRlb3IuRXJyb3IoJ2ZvcmJpZGRlbicsICdGb3JiaWRkZW4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENvZGUgZXhlY3V0ZWQgYmVmb3JlIHJlbW92aW5nIGZpbGVcblx0XHRcdGNvbGxlY3Rpb24uYmVmb3JlLnJlbW92ZShmdW5jdGlvbih1c2VySWQsIGZpbGUpIHtcblx0XHRcdFx0aWYgKCFzZWxmLnBlcm1pc3Npb25zLmNoZWNrUmVtb3ZlKHVzZXJJZCwgZmlsZSkpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgTWV0ZW9yLkVycm9yKCdmb3JiaWRkZW4nLCAnRm9yYmlkZGVuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBEZWxldGUgdGhlIHBoeXNpY2FsIGZpbGUgaW4gdGhlIHN0b3JlXG5cdFx0XHRcdHNlbGYuZGVsZXRlKGZpbGUuX2lkKTtcblxuXHRcdFx0XHRjb25zdCB0bXBGaWxlID0gVXBsb2FkRlMuZ2V0VGVtcEZpbGVQYXRoKGZpbGUuX2lkKTtcblxuXHRcdFx0XHQvLyBEZWxldGUgdGhlIHRlbXAgZmlsZVxuXHRcdFx0XHRmcy5zdGF0KHRtcEZpbGUsIGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdCFlcnIgJiYgZnMudW5saW5rKHRtcEZpbGUsIGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdFx0ZXJyICYmIGNvbnNvbGUuZXJyb3IoYHVmczogY2Fubm90IGRlbGV0ZSB0ZW1wIGZpbGUgYXQgJHsgdG1wRmlsZSB9ICgkeyBlcnIubWVzc2FnZSB9KWApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBEZWxldGVzIGEgZmlsZSBhc3luY1xuICAgKiBAcGFyYW0gZmlsZUlkXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGRlbGV0ZShmaWxlSWQsIGNhbGxiYWNrKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdkZWxldGUgaXMgbm90IGltcGxlbWVudGVkJyk7XG5cdH1cblxuXHQvKipcbiAgICogR2VuZXJhdGVzIGEgcmFuZG9tIHRva2VuXG4gICAqIEBwYXJhbSBwYXR0ZXJuXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cdGdlbmVyYXRlVG9rZW4ocGF0dGVybikge1xuXHRcdHJldHVybiAocGF0dGVybiB8fCAneHl4eXh5eHl4eScpLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1taXhlZC1vcGVyYXRvcnNcblx0XHRcdGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwOyBjb25zdCB2ID0gYyA9PT0gJ3gnID8gciA6IHIgJiAweDMgfCAweDg7XG5cdFx0XHRjb25zdCBzID0gdi50b1N0cmluZygxNik7XG5cdFx0XHRyZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSA/IHMudG9VcHBlckNhc2UoKSA6IHM7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgY29sbGVjdGlvblxuICAgKiBAcmV0dXJuIHtNb25nby5Db2xsZWN0aW9ufVxuICAgKi9cblx0Z2V0Q29sbGVjdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNvbGxlY3Rpb247XG5cdH1cblxuXHQvKipcbiAgICogUmV0dXJucyB0aGUgZmlsZSBVUkxcbiAgICogQHBhcmFtIGZpbGVJZFxuICAgKiBAcmV0dXJuIHtzdHJpbmd8bnVsbH1cbiAgICovXG5cdGdldEZpbGVSZWxhdGl2ZVVSTChmaWxlSWQpIHtcblx0XHRjb25zdCBmaWxlID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmluZE9uZShmaWxlSWQsIHsgZmllbGRzOiB7IG5hbWU6IDEgfSB9KTtcblx0XHRyZXR1cm4gZmlsZSA/IHRoaXMuZ2V0UmVsYXRpdmVVUkwoYCR7IGZpbGVJZCB9LyR7IGZpbGUubmFtZSB9YCkgOiBudWxsO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGUgVVJMXG4gICAqIEBwYXJhbSBmaWxlSWRcbiAgICogQHJldHVybiB7c3RyaW5nfG51bGx9XG4gICAqL1xuXHRnZXRGaWxlVVJMKGZpbGVJZCkge1xuXHRcdGNvbnN0IGZpbGUgPSB0aGlzLmdldENvbGxlY3Rpb24oKS5maW5kT25lKGZpbGVJZCwgeyBmaWVsZHM6IHsgbmFtZTogMSB9IH0pO1xuXHRcdHJldHVybiBmaWxlID8gdGhpcy5nZXRVUkwoYCR7IGZpbGVJZCB9LyR7IGZpbGUubmFtZSB9YCkgOiBudWxsO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGUgZmlsdGVyXG4gICAqIEByZXR1cm4ge1VwbG9hZEZTLkZpbHRlcn1cbiAgICovXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcjtcblx0fVxuXG5cdC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdG9yZSBuYW1lXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG5cdGdldE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5uYW1lO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGUgcmVhZCBzdHJlYW1cbiAgICogQHBhcmFtIGZpbGVJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGdldFJlYWRTdHJlYW0oZmlsZUlkLCBmaWxlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdTdG9yZS5nZXRSZWFkU3RyZWFtIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIHN0b3JlIHJlbGF0aXZlIFVSTFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXHRnZXRSZWxhdGl2ZVVSTChwYXRoKSB7XG5cdFx0Y29uc3Qgcm9vdFVybCA9IE1ldGVvci5hYnNvbHV0ZVVybCgpLnJlcGxhY2UoL1xcLyskLywgJycpO1xuXHRcdGNvbnN0IHJvb3RQYXRoID0gcm9vdFVybC5yZXBsYWNlKC9eW2Etel0rOlxcL1xcL1teL10rXFwvKi9naSwgJycpO1xuXHRcdGNvbnN0IHN0b3JlTmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXHRcdHBhdGggPSBTdHJpbmcocGF0aCkucmVwbGFjZSgvXFwvJC8sICcnKS50cmltKCk7XG5cdFx0cmV0dXJuIGVuY29kZVVSSShgJHsgcm9vdFBhdGggfS8keyBVcGxvYWRGUy5jb25maWcuc3RvcmVzUGF0aCB9LyR7IHN0b3JlTmFtZSB9LyR7IHBhdGggfWApO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIHN0b3JlIGFic29sdXRlIFVSTFxuICAgKiBAcGFyYW0gcGF0aFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuXHRnZXRVUkwocGF0aCkge1xuXHRcdGNvbnN0IHJvb3RVcmwgPSBNZXRlb3IuYWJzb2x1dGVVcmwoeyBzZWN1cmU6IFVwbG9hZEZTLmNvbmZpZy5odHRwcyB9KS5yZXBsYWNlKC9cXC8rJC8sICcnKTtcblx0XHRjb25zdCBzdG9yZU5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblx0XHRwYXRoID0gU3RyaW5nKHBhdGgpLnJlcGxhY2UoL1xcLyQvLCAnJykudHJpbSgpO1xuXHRcdHJldHVybiBlbmNvZGVVUkkoYCR7IHJvb3RVcmwgfS8keyBVcGxvYWRGUy5jb25maWcuc3RvcmVzUGF0aCB9LyR7IHN0b3JlTmFtZSB9LyR7IHBhdGggfWApO1xuXHR9XG5cblx0LyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGUgd3JpdGUgc3RyZWFtXG4gICAqIEBwYXJhbSBmaWxlSWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRnZXRXcml0ZVN0cmVhbShmaWxlSWQsIGZpbGUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2dldFdyaXRlU3RyZWFtIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xuXHR9XG5cblx0LyoqXG4gICAqIENvbXBsZXRlcyB0aGUgZmlsZSB1cGxvYWRcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG5cdGltcG9ydEZyb21VUkwodXJsLCBmaWxlLCBjYWxsYmFjaykge1xuXHRcdE1ldGVvci5jYWxsKCd1ZnNJbXBvcnRVUkwnLCB1cmwsIGZpbGUsIHRoaXMuZ2V0TmFtZSgpLCBjYWxsYmFjayk7XG5cdH1cblxuXHQvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBjb3B5IGVycm9yIGhhcHBlbmVkXG4gICAqIEBwYXJhbSBlcnJcbiAgICogQHBhcmFtIGZpbGVJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdG9uQ29weUVycm9yKGVyciwgZmlsZUlkLCBmaWxlKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgdWZzOiBjYW5ub3QgY29weSBmaWxlIFwiJHsgZmlsZUlkIH1cIiAoJHsgZXJyLm1lc3NhZ2UgfSlgLCBlcnIpO1xuXHR9XG5cblx0LyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdG9uRmluaXNoVXBsb2FkKGZpbGUpIHtcblx0fVxuXG5cdC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGZpbGUgaXMgcmVhZCBmcm9tIHRoZSBzdG9yZVxuICAgKiBAcGFyYW0gZmlsZUlkXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEBwYXJhbSByZXF1ZXN0XG4gICAqIEBwYXJhbSByZXNwb25zZVxuICAgKiBAcmV0dXJuIGJvb2xlYW5cbiAgICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRvblJlYWQoZmlsZUlkLCBmaWxlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqXG4gICAqIENhbGxlZCB3aGVuIGEgcmVhZCBlcnJvciBoYXBwZW5lZFxuICAgKiBAcGFyYW0gZXJyXG4gICAqIEBwYXJhbSBmaWxlSWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICogQHJldHVybiBib29sZWFuXG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25SZWFkRXJyb3IoZXJyLCBmaWxlSWQsIGZpbGUpIHtcblx0XHRjb25zb2xlLmVycm9yKGB1ZnM6IGNhbm5vdCByZWFkIGZpbGUgXCIkeyBmaWxlSWQgfVwiICgkeyBlcnIubWVzc2FnZSB9KWAsIGVycik7XG5cdH1cblxuXHQvKipcbiAgICogQ2FsbGVkIHdoZW4gZmlsZSBpcyBiZWluZyB2YWxpZGF0ZWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRvblZhbGlkYXRlKGZpbGUpIHtcblx0fVxuXG5cdC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIHdyaXRlIGVycm9yIGhhcHBlbmVkXG4gICAqIEBwYXJhbSBlcnJcbiAgICogQHBhcmFtIGZpbGVJZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJuIGJvb2xlYW5cbiAgICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRvbldyaXRlRXJyb3IoZXJyLCBmaWxlSWQsIGZpbGUpIHtcblx0XHRjb25zb2xlLmVycm9yKGB1ZnM6IGNhbm5vdCB3cml0ZSBmaWxlIFwiJHsgZmlsZUlkIH1cIiAoJHsgZXJyLm1lc3NhZ2UgfSlgLCBlcnIpO1xuXHR9XG5cblx0LyoqXG4gICAqIFNldHMgdGhlIHN0b3JlIHBlcm1pc3Npb25zXG4gICAqIEBwYXJhbSBwZXJtaXNzaW9uc1xuICAgKi9cblx0c2V0UGVybWlzc2lvbnMocGVybWlzc2lvbnMpIHtcblx0XHRpZiAoIShwZXJtaXNzaW9ucyBpbnN0YW5jZW9mIFN0b3JlUGVybWlzc2lvbnMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQZXJtaXNzaW9ucyBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgVXBsb2FkRlMuU3RvcmVQZXJtaXNzaW9ucycpO1xuXHRcdH1cblx0XHR0aGlzLnBlcm1pc3Npb25zID0gcGVybWlzc2lvbnM7XG5cdH1cblxuXHQvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgZmlsZSBvbiByZWFkaW5nXG4gICAqIEBwYXJhbSByZWFkU3RyZWFtXG4gICAqIEBwYXJhbSB3cml0ZVN0cmVhbVxuICAgKiBAcGFyYW0gZmlsZUlkXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEBwYXJhbSByZXF1ZXN0XG4gICAqIEBwYXJhbSBoZWFkZXJzXG4gICAqL1xuXHR0cmFuc2Zvcm1SZWFkKHJlYWRTdHJlYW0sIHdyaXRlU3RyZWFtLCBmaWxlSWQsIGZpbGUsIHJlcXVlc3QsIGhlYWRlcnMpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1SZWFkID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMudHJhbnNmb3JtUmVhZC5jYWxsKHRoaXMsIHJlYWRTdHJlYW0sIHdyaXRlU3RyZWFtLCBmaWxlSWQsIGZpbGUsIHJlcXVlc3QsIGhlYWRlcnMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWFkU3RyZWFtLnBpcGUod3JpdGVTdHJlYW0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSBmaWxlIG9uIHdyaXRpbmdcbiAgICogQHBhcmFtIHJlYWRTdHJlYW1cbiAgICogQHBhcmFtIHdyaXRlU3RyZWFtXG4gICAqIEBwYXJhbSBmaWxlSWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG5cdHRyYW5zZm9ybVdyaXRlKHJlYWRTdHJlYW0sIHdyaXRlU3RyZWFtLCBmaWxlSWQsIGZpbGUpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1Xcml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5vcHRpb25zLnRyYW5zZm9ybVdyaXRlLmNhbGwodGhpcywgcmVhZFN0cmVhbSwgd3JpdGVTdHJlYW0sIGZpbGVJZCwgZmlsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlYWRTdHJlYW0ucGlwZSh3cml0ZVN0cmVhbSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgZmlsZVxuICAgKiBAcGFyYW0gZmlsZVxuICAgKi9cblx0dmFsaWRhdGUoZmlsZSkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5vblZhbGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLm9uVmFsaWRhdGUoZmlsZSk7XG5cdFx0fVxuXHR9XG59XG4iLCIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuXG5pbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiB1cGxvYWQgdG9rZW5zXG4gKiBAdHlwZSB7TW9uZ28uQ29sbGVjdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IFRva2VucyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCd1ZnNUb2tlbnMnKTtcbiIsIi8qXG4gKiBUaGUgTUlUIExpY2Vuc2UgKE1JVClcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgS2FybCBTVEVJTlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKlxuICovXG5cbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IHsgXyB9IGZyb20gJ21ldGVvci91bmRlcnNjb3JlJztcblxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICcuL3Vmcy1zdG9yZSc7XG5cbi8qKlxuICogRmlsZSB1cGxvYWRlclxuICovXG5leHBvcnQgY2xhc3MgVXBsb2FkZXIge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyBTZXQgZGVmYXVsdCBvcHRpb25zXG5cdFx0b3B0aW9ucyA9IF8uZXh0ZW5kKHtcblx0XHRcdGFkYXB0aXZlOiB0cnVlLFxuXHRcdFx0Y2FwYWNpdHk6IDAuOSxcblx0XHRcdGNodW5rU2l6ZTogMTYgKiAxMDI0LFxuXHRcdFx0ZGF0YTogbnVsbCxcblx0XHRcdGZpbGU6IG51bGwsXG5cdFx0XHRtYXhDaHVua1NpemU6IDQgKiAxMDI0ICogMTAwMCxcblx0XHRcdG1heFRyaWVzOiA1LFxuXHRcdFx0b25BYm9ydDogdGhpcy5vbkFib3J0LFxuXHRcdFx0b25Db21wbGV0ZTogdGhpcy5vbkNvbXBsZXRlLFxuXHRcdFx0b25DcmVhdGU6IHRoaXMub25DcmVhdGUsXG5cdFx0XHRvbkVycm9yOiB0aGlzLm9uRXJyb3IsXG5cdFx0XHRvblByb2dyZXNzOiB0aGlzLm9uUHJvZ3Jlc3MsXG5cdFx0XHRvblN0YXJ0OiB0aGlzLm9uU3RhcnQsXG5cdFx0XHRvblN0b3A6IHRoaXMub25TdG9wLFxuXHRcdFx0cmV0cnlEZWxheTogMjAwMCxcblx0XHRcdHN0b3JlOiBudWxsLFxuXHRcdFx0dHJhbnNmZXJEZWxheTogMTAwLFxuXHRcdH0sIG9wdGlvbnMpO1xuXG5cdFx0Ly8gQ2hlY2sgb3B0aW9uc1xuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5hZGFwdGl2ZSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdhZGFwdGl2ZSBpcyBub3QgYSBudW1iZXInKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNhcGFjaXR5ICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignY2FwYWNpdHkgaXMgbm90IGEgbnVtYmVyJyk7XG5cdFx0fVxuXHRcdGlmIChvcHRpb25zLmNhcGFjaXR5IDw9IDAgfHwgb3B0aW9ucy5jYXBhY2l0eSA+IDEpIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdjYXBhY2l0eSBtdXN0IGJlIGEgZmxvYXQgYmV0d2VlbiAwLjEgYW5kIDEuMCcpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuY2h1bmtTaXplICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignY2h1bmtTaXplIGlzIG5vdCBhIG51bWJlcicpO1xuXHRcdH1cblx0XHRpZiAoIShvcHRpb25zLmRhdGEgaW5zdGFuY2VvZiBCbG9iKSAmJiAhKG9wdGlvbnMuZGF0YSBpbnN0YW5jZW9mIEZpbGUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdkYXRhIGlzIG5vdCBhbiBCbG9iIG9yIEZpbGUnKTtcblx0XHR9XG5cdFx0aWYgKG9wdGlvbnMuZmlsZSA9PT0gbnVsbCB8fCB0eXBlb2Ygb3B0aW9ucy5maWxlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZmlsZSBpcyBub3QgYW4gb2JqZWN0Jyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhDaHVua1NpemUgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXhDaHVua1NpemUgaXMgbm90IGEgbnVtYmVyJyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5tYXhUcmllcyAhPT0gJ251bWJlcicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ21heFRyaWVzIGlzIG5vdCBhIG51bWJlcicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMucmV0cnlEZWxheSAhPT0gJ251bWJlcicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3JldHJ5RGVsYXkgaXMgbm90IGEgbnVtYmVyJyk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy50cmFuc2ZlckRlbGF5ICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigndHJhbnNmZXJEZWxheSBpcyBub3QgYSBudW1iZXInKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLm9uQWJvcnQgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ29uQWJvcnQgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLm9uQ29tcGxldGUgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ29uQ29tcGxldGUgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLm9uQ3JlYXRlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdvbkNyZWF0ZSBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMub25FcnJvciAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignb25FcnJvciBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMub25Qcm9ncmVzcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignb25Qcm9ncmVzcyBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMub25TdGFydCAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignb25TdGFydCBpcyBub3QgYSBmdW5jdGlvbicpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9wdGlvbnMub25TdG9wICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdvblN0b3AgaXMgbm90IGEgZnVuY3Rpb24nKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLnN0b3JlICE9PSAnc3RyaW5nJyAmJiAhKG9wdGlvbnMuc3RvcmUgaW5zdGFuY2VvZiBTdG9yZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0b3JlIG11c3QgYmUgdGhlIG5hbWUgb2YgdGhlIHN0b3JlIG9yIGFuIGluc3RhbmNlIG9mIFVwbG9hZEZTLlN0b3JlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gUHVibGljIGF0dHJpYnV0ZXNcblx0XHRzZWxmLmFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZTtcblx0XHRzZWxmLmNhcGFjaXR5ID0gcGFyc2VGbG9hdChvcHRpb25zLmNhcGFjaXR5KTtcblx0XHRzZWxmLmNodW5rU2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMuY2h1bmtTaXplKTtcblx0XHRzZWxmLm1heENodW5rU2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMubWF4Q2h1bmtTaXplKTtcblx0XHRzZWxmLm1heFRyaWVzID0gcGFyc2VJbnQob3B0aW9ucy5tYXhUcmllcyk7XG5cdFx0c2VsZi5yZXRyeURlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5yZXRyeURlbGF5KTtcblx0XHRzZWxmLnRyYW5zZmVyRGVsYXkgPSBwYXJzZUludChvcHRpb25zLnRyYW5zZmVyRGVsYXkpO1xuXHRcdHNlbGYub25BYm9ydCA9IG9wdGlvbnMub25BYm9ydDtcblx0XHRzZWxmLm9uQ29tcGxldGUgPSBvcHRpb25zLm9uQ29tcGxldGU7XG5cdFx0c2VsZi5vbkNyZWF0ZSA9IG9wdGlvbnMub25DcmVhdGU7XG5cdFx0c2VsZi5vbkVycm9yID0gb3B0aW9ucy5vbkVycm9yO1xuXHRcdHNlbGYub25Qcm9ncmVzcyA9IG9wdGlvbnMub25Qcm9ncmVzcztcblx0XHRzZWxmLm9uU3RhcnQgPSBvcHRpb25zLm9uU3RhcnQ7XG5cdFx0c2VsZi5vblN0b3AgPSBvcHRpb25zLm9uU3RvcDtcblxuXHRcdC8vIFByaXZhdGUgYXR0cmlidXRlc1xuXHRcdGxldCB7IHN0b3JlIH0gPSBvcHRpb25zO1xuXHRcdGNvbnN0IHsgZGF0YSB9ID0gb3B0aW9ucztcblx0XHRjb25zdCBjYXBhY2l0eU1hcmdpbiA9IDAuMTtcblx0XHRsZXQgeyBmaWxlIH0gPSBvcHRpb25zO1xuXHRcdGxldCBmaWxlSWQgPSBudWxsO1xuXHRcdGxldCBvZmZzZXQgPSAwO1xuXHRcdGxldCBsb2FkZWQgPSAwO1xuXHRcdGNvbnN0IHRvdGFsID0gZGF0YS5zaXplO1xuXHRcdGxldCB0cmllcyA9IDA7XG5cdFx0bGV0IHBvc3RVcmwgPSBudWxsO1xuXHRcdGxldCB0b2tlbiA9IG51bGw7XG5cdFx0bGV0IGNvbXBsZXRlID0gZmFsc2U7XG5cdFx0bGV0IHVwbG9hZGluZyA9IGZhbHNlO1xuXG5cdFx0bGV0IHRpbWVBID0gbnVsbDtcblx0XHRsZXQgdGltZUIgPSBudWxsO1xuXG5cdFx0bGV0IGVsYXBzZWRUaW1lID0gMDtcblx0XHRsZXQgc3RhcnRUaW1lID0gMDtcblxuXHRcdC8vIEtlZXAgb25seSB0aGUgbmFtZSBvZiB0aGUgc3RvcmVcblx0XHRpZiAoc3RvcmUgaW5zdGFuY2VvZiBTdG9yZSkge1xuXHRcdFx0c3RvcmUgPSBzdG9yZS5nZXROYW1lKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQXNzaWduIGZpbGUgdG8gc3RvcmVcblx0XHRmaWxlLnN0b3JlID0gc3RvcmU7XG5cblx0XHRmdW5jdGlvbiBmaW5pc2goKSB7XG5cdFx0XHQvLyBGaW5pc2ggdGhlIHVwbG9hZCBieSB0ZWxsaW5nIHRoZSBzdG9yZSB0aGUgdXBsb2FkIGlzIGNvbXBsZXRlXG5cdFx0XHRNZXRlb3IuY2FsbCgndWZzQ29tcGxldGUnLCBmaWxlSWQsIHN0b3JlLCB0b2tlbiwgZnVuY3Rpb24oZXJyLCB1cGxvYWRlZEZpbGUpIHtcblx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdHNlbGYub25FcnJvcihlcnIsIGZpbGUpO1xuXHRcdFx0XHRcdHNlbGYuYWJvcnQoKTtcblx0XHRcdFx0fSBlbHNlIGlmICh1cGxvYWRlZEZpbGUpIHtcblx0XHRcdFx0XHR1cGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRjb21wbGV0ZSA9IHRydWU7XG5cdFx0XHRcdFx0ZmlsZSA9IHVwbG9hZGVkRmlsZTtcblx0XHRcdFx0XHRzZWxmLm9uQ29tcGxldGUodXBsb2FkZWRGaWxlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAgICogQWJvcnRzIHRoZSBjdXJyZW50IHRyYW5zZmVyXG4gICAgICovXG5cdFx0c2VsZi5hYm9ydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBmaWxlIGZyb20gZGF0YWJhc2Vcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRcdFx0TWV0ZW9yLmNhbGwoJ3Vmc0RlbGV0ZScsIGZpbGVJZCwgc3RvcmUsIHRva2VuLCBmdW5jdGlvbihlcnIsIHJlc3VsdCkge1xuXHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0c2VsZi5vbkVycm9yKGVyciwgZmlsZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBSZXNldCB1cGxvYWRlciBzdGF0dXNcblx0XHRcdHVwbG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0ZmlsZUlkID0gbnVsbDtcblx0XHRcdG9mZnNldCA9IDA7XG5cdFx0XHR0cmllcyA9IDA7XG5cdFx0XHRsb2FkZWQgPSAwO1xuXHRcdFx0Y29tcGxldGUgPSBmYWxzZTtcblx0XHRcdHN0YXJ0VGltZSA9IG51bGw7XG5cdFx0XHRzZWxmLm9uQWJvcnQoZmlsZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuICAgICAqIFJldHVybnMgdGhlIGF2ZXJhZ2Ugc3BlZWQgaW4gYnl0ZXMgcGVyIHNlY29uZFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cdFx0c2VsZi5nZXRBdmVyYWdlU3BlZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IHNlY29uZHMgPSBzZWxmLmdldEVsYXBzZWRUaW1lKCkgLyAxMDAwO1xuXHRcdFx0cmV0dXJuIHNlbGYuZ2V0TG9hZGVkKCkgLyBzZWNvbmRzO1xuXHRcdH07XG5cblx0XHQvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGFwc2VkIHRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblx0XHRzZWxmLmdldEVsYXBzZWRUaW1lID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoc3RhcnRUaW1lICYmIHNlbGYuaXNVcGxvYWRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm4gZWxhcHNlZFRpbWUgKyAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZWxhcHNlZFRpbWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZpbGVcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAgICovXG5cdFx0c2VsZi5nZXRGaWxlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZmlsZTtcblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogUmV0dXJucyB0aGUgbG9hZGVkIGJ5dGVzXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXHRcdHNlbGYuZ2V0TG9hZGVkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gbG9hZGVkO1xuXHRcdH07XG5cblx0XHQvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgcHJvZ3Jlc3NcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cdFx0c2VsZi5nZXRQcm9ncmVzcyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIE1hdGgubWluKChsb2FkZWQgLyB0b3RhbCkgKiAxMDAgLyAxMDAsIDEuMCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlbWFpbmluZyB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cdFx0c2VsZi5nZXRSZW1haW5pbmdUaW1lID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRjb25zdCBhdmVyYWdlU3BlZWQgPSBzZWxmLmdldEF2ZXJhZ2VTcGVlZCgpO1xuXHRcdFx0Y29uc3QgcmVtYWluaW5nQnl0ZXMgPSB0b3RhbCAtIHNlbGYuZ2V0TG9hZGVkKCk7XG5cdFx0XHRyZXR1cm4gYXZlcmFnZVNwZWVkICYmIHJlbWFpbmluZ0J5dGVzID8gTWF0aC5tYXgocmVtYWluaW5nQnl0ZXMgLyBhdmVyYWdlU3BlZWQsIDApIDogMDtcblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogUmV0dXJucyB0aGUgdXBsb2FkIHNwZWVkIGluIGJ5dGVzIHBlciBzZWNvbmRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXHRcdHNlbGYuZ2V0U3BlZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aW1lQSAmJiB0aW1lQiAmJiBzZWxmLmlzVXBsb2FkaW5nKCkpIHtcblx0XHRcdFx0Y29uc3Qgc2Vjb25kcyA9ICh0aW1lQiAtIHRpbWVBKSAvIDEwMDA7XG5cdFx0XHRcdHJldHVybiBzZWxmLmNodW5rU2l6ZSAvIHNlY29uZHM7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogUmV0dXJucyB0aGUgdG90YWwgYnl0ZXNcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cdFx0c2VsZi5nZXRUb3RhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRvdGFsO1xuXHRcdH07XG5cblx0XHQvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHRyYW5zZmVyIGlzIGNvbXBsZXRlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblx0XHRzZWxmLmlzQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBjb21wbGV0ZTtcblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0cmFuc2ZlciBpcyBhY3RpdmVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXHRcdHNlbGYuaXNVcGxvYWRpbmcgPSBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB1cGxvYWRpbmc7XG5cdFx0fTtcblxuXHRcdC8qKlxuICAgICAqIFJlYWRzIGEgcG9ydGlvbiBvZiBmaWxlXG4gICAgICogQHBhcmFtIHN0YXJ0XG4gICAgICogQHBhcmFtIGxlbmd0aFxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHtCbG9ifVxuICAgICAqL1xuXHRcdHNlbGYucmVhZENodW5rID0gZnVuY3Rpb24oc3RhcnQsIGxlbmd0aCwgY2FsbGJhY2spIHtcblx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdyZWFkQ2h1bmsgaXMgbWlzc2luZyBjYWxsYmFjaycpO1xuXHRcdFx0fVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bGV0IGVuZDtcblxuXHRcdFx0XHQvLyBDYWxjdWxhdGUgdGhlIGNodW5rIHNpemVcblx0XHRcdFx0aWYgKGxlbmd0aCAmJiBzdGFydCArIGxlbmd0aCA+IHRvdGFsKSB7XG5cdFx0XHRcdFx0ZW5kID0gdG90YWw7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBsZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gR2V0IGNodW5rXG5cdFx0XHRcdGNvbnN0IGNodW5rID0gZGF0YS5zbGljZShzdGFydCwgZW5kKTtcblx0XHRcdFx0Ly8gUGFzcyBjaHVuayB0byBjYWxsYmFja1xuXHRcdFx0XHRjYWxsYmFjay5jYWxsKHNlbGYsIG51bGwsIGNodW5rKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdyZWFkIGVycm9yJywgZXJyKTtcblx0XHRcdFx0Ly8gUmV0cnkgdG8gcmVhZCBjaHVua1xuXHRcdFx0XHRNZXRlb3Iuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAodHJpZXMgPCBzZWxmLm1heFRyaWVzKSB7XG5cdFx0XHRcdFx0XHR0cmllcyArPSAxO1xuXHRcdFx0XHRcdFx0c2VsZi5yZWFkQ2h1bmsoc3RhcnQsIGxlbmd0aCwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSwgc2VsZi5yZXRyeURlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogU2VuZHMgYSBmaWxlIGNodW5rIHRvIHRoZSBzdG9yZVxuICAgICAqL1xuXHRcdHNlbGYuc2VuZENodW5rID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIWNvbXBsZXRlICYmIHN0YXJ0VGltZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRpZiAob2Zmc2V0IDwgdG90YWwpIHtcblx0XHRcdFx0XHRsZXQgeyBjaHVua1NpemUgfSA9IHNlbGY7XG5cblx0XHRcdFx0XHQvLyBVc2UgYWRhcHRpdmUgbGVuZ3RoXG5cdFx0XHRcdFx0aWYgKHNlbGYuYWRhcHRpdmUgJiYgdGltZUEgJiYgdGltZUIgJiYgdGltZUIgPiB0aW1lQSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZHVyYXRpb24gPSAodGltZUIgLSB0aW1lQSkgLyAxMDAwO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWF4ID0gc2VsZi5jYXBhY2l0eSAqICgxICsgY2FwYWNpdHlNYXJnaW4pO1xuXHRcdFx0XHRcdFx0Y29uc3QgbWluID0gc2VsZi5jYXBhY2l0eSAqICgxIC0gY2FwYWNpdHlNYXJnaW4pO1xuXG5cdFx0XHRcdFx0XHRpZiAoZHVyYXRpb24gPj0gbWF4KSB7XG5cdFx0XHRcdFx0XHRcdGNodW5rU2l6ZSA9IE1hdGguYWJzKE1hdGgucm91bmQoY2h1bmtTaXplICogKG1heCAtIGR1cmF0aW9uKSkpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChkdXJhdGlvbiA8IG1pbikge1xuXHRcdFx0XHRcdFx0XHRjaHVua1NpemUgPSBNYXRoLnJvdW5kKGNodW5rU2l6ZSAqIChtaW4gLyBkdXJhdGlvbikpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gTGltaXQgdG8gbWF4IGNodW5rIHNpemVcblx0XHRcdFx0XHRcdGlmIChzZWxmLm1heENodW5rU2l6ZSA+IDAgJiYgY2h1bmtTaXplID4gc2VsZi5tYXhDaHVua1NpemUpIHtcblx0XHRcdFx0XHRcdFx0Y2h1bmtTaXplID0gc2VsZi5tYXhDaHVua1NpemU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUmVkdWNlIGNodW5rIHNpemUgdG8gZml0IHRvdGFsXG5cdFx0XHRcdFx0aWYgKG9mZnNldCArIGNodW5rU2l6ZSA+IHRvdGFsKSB7XG5cdFx0XHRcdFx0XHRjaHVua1NpemUgPSB0b3RhbCAtIG9mZnNldDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBQcmVwYXJlIHRoZSBjaHVua1xuXHRcdFx0XHRcdHNlbGYucmVhZENodW5rKG9mZnNldCwgY2h1bmtTaXplLCBmdW5jdGlvbihlcnIsIGNodW5rKSB7XG5cdFx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGYub25FcnJvcihlcnIsIGZpbGUpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoWzIwMCwgMjAxLCAyMDIsIDIwNF0uaW5jbHVkZXMoeGhyLnN0YXR1cykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRpbWVCID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHRcdFx0XHRcdG9mZnNldCArPSBjaHVua1NpemU7XG5cdFx0XHRcdFx0XHRcdFx0XHRsb2FkZWQgKz0gY2h1bmtTaXplO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBTZW5kIG5leHQgY2h1bmtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbGYub25Qcm9ncmVzcyhmaWxlLCBzZWxmLmdldFByb2dyZXNzKCkpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBGaW5pc2ggdXBsb2FkXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobG9hZGVkID49IHRvdGFsKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZmluaXNoKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRNZXRlb3Iuc2V0VGltZW91dChzZWxmLnNlbmRDaHVuaywgc2VsZi50cmFuc2ZlckRlbGF5KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCFbNDAyLCA0MDMsIDQwNCwgNTAwXS5pbmNsdWRlcyh4aHIuc3RhdHVzKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gUmV0cnkgdW50aWwgbWF4IHRyaWVzIGlzIHJlYWNoXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBCdXQgZG9uJ3QgcmV0cnkgaWYgdGhlc2UgZXJyb3JzIG9jY3VyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodHJpZXMgPD0gc2VsZi5tYXhUcmllcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0cmllcyArPSAxO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBXYWl0IGJlZm9yZSByZXRyeWluZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRNZXRlb3Iuc2V0VGltZW91dChzZWxmLnNlbmRDaHVuaywgc2VsZi5yZXRyeURlbGF5KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGYuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsZi5hYm9ydCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FsY3VsYXRlIHVwbG9hZCBwcm9ncmVzc1xuXHRcdFx0XHRcdFx0Y29uc3QgcHJvZ3Jlc3MgPSAob2Zmc2V0ICsgY2h1bmtTaXplKSAvIHRvdGFsO1xuXHRcdFx0XHRcdFx0Ly8gbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cdFx0XHRcdFx0XHQvLyBmb3JtRGF0YS5hcHBlbmQoJ3Byb2dyZXNzJywgcHJvZ3Jlc3MpO1xuXHRcdFx0XHRcdFx0Ly8gZm9ybURhdGEuYXBwZW5kKCdjaHVuaycsIGNodW5rKTtcblx0XHRcdFx0XHRcdGNvbnN0IHVybCA9IGAkeyBwb3N0VXJsIH0mcHJvZ3Jlc3M9JHsgcHJvZ3Jlc3MgfWA7XG5cblx0XHRcdFx0XHRcdHRpbWVBID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHRcdHRpbWVCID0gbnVsbDtcblx0XHRcdFx0XHRcdHVwbG9hZGluZyA9IHRydWU7XG5cblx0XHRcdFx0XHRcdC8vIFNlbmQgY2h1bmsgdG8gdGhlIHN0b3JlXG5cdFx0XHRcdFx0XHR4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR4aHIuc2VuZChjaHVuayk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogU3RhcnRzIG9yIHJlc3VtZXMgdGhlIHRyYW5zZmVyXG4gICAgICovXG5cdFx0c2VsZi5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCFmaWxlSWQpIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSBmaWxlIGRvY3VtZW50IGFuZCBnZXQgdGhlIHRva2VuXG5cdFx0XHRcdC8vIHRoYXQgYWxsb3dzIHRoZSB1c2VyIHRvIHNlbmQgY2h1bmtzIHRvIHRoZSBzdG9yZS5cblx0XHRcdFx0TWV0ZW9yLmNhbGwoJ3Vmc0NyZWF0ZScsIF8uZXh0ZW5kKHt9LCBmaWxlKSwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcblx0XHRcdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdFx0XHRzZWxmLm9uRXJyb3IoZXJyLCBmaWxlKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHJlc3VsdCkge1xuXHRcdFx0XHRcdFx0dG9rZW4gPSByZXN1bHQudG9rZW47XG5cdFx0XHRcdFx0XHRwb3N0VXJsID0gcmVzdWx0LnVybDtcblx0XHRcdFx0XHRcdGZpbGVJZCA9IHJlc3VsdC5maWxlSWQ7XG5cdFx0XHRcdFx0XHRmaWxlLl9pZCA9IHJlc3VsdC5maWxlSWQ7XG5cdFx0XHRcdFx0XHRzZWxmLm9uQ3JlYXRlKGZpbGUpO1xuXHRcdFx0XHRcdFx0dHJpZXMgPSAwO1xuXHRcdFx0XHRcdFx0c3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdFx0XHRcdHNlbGYub25TdGFydChmaWxlKTtcblx0XHRcdFx0XHRcdHNlbGYuc2VuZENodW5rKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoIXVwbG9hZGluZyAmJiAhY29tcGxldGUpIHtcblx0XHRcdFx0Ly8gUmVzdW1lIHVwbG9hZGluZ1xuXHRcdFx0XHR0cmllcyA9IDA7XG5cdFx0XHRcdHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cdFx0XHRcdHNlbGYub25TdGFydChmaWxlKTtcblx0XHRcdFx0c2VsZi5zZW5kQ2h1bmsoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG4gICAgICogU3RvcHMgdGhlIHRyYW5zZmVyXG4gICAgICovXG5cdFx0c2VsZi5zdG9wID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAodXBsb2FkaW5nKSB7XG5cdFx0XHRcdC8vIFVwZGF0ZSBlbGFwc2VkIHRpbWVcblx0XHRcdFx0ZWxhcHNlZFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuXHRcdFx0XHRzdGFydFRpbWUgPSBudWxsO1xuXHRcdFx0XHR1cGxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0c2VsZi5vblN0b3AoZmlsZSk7XG5cblx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdFx0XHRcdE1ldGVvci5jYWxsKCd1ZnNTdG9wJywgZmlsZUlkLCBzdG9yZSwgdG9rZW4sIGZ1bmN0aW9uKGVyciwgcmVzdWx0KSB7XG5cdFx0XHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRcdFx0c2VsZi5vbkVycm9yKGVyciwgZmlsZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBmaWxlIHVwbG9hZCBpcyBhYm9ydGVkXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25BYm9ydChmaWxlKSB7XG5cdH1cblxuXHQvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGZpbGUgdXBsb2FkIGlzIGNvbXBsZXRlXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25Db21wbGV0ZShmaWxlKSB7XG5cdH1cblxuXHQvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGZpbGUgaXMgY3JlYXRlZCBpbiB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gZmlsZVxuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdG9uQ3JlYXRlKGZpbGUpIHtcblx0fVxuXG5cdC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIGZpbGUgdXBsb2FkXG4gICAqIEBwYXJhbSBlcnJcbiAgICogQHBhcmFtIGZpbGVcbiAgICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRvbkVycm9yKGVyciwgZmlsZSkge1xuXHRcdGNvbnNvbGUuZXJyb3IoYHVmczogJHsgZXJyLm1lc3NhZ2UgfWApO1xuXHR9XG5cblx0LyoqXG4gICAqIENhbGxlZCB3aGVuIGEgZmlsZSBjaHVuayBoYXMgYmVlbiBzZW50XG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEBwYXJhbSBwcm9ncmVzcyBpcyBhIGZsb2F0IGZyb20gMC4wIHRvIDEuMFxuICAgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdG9uUHJvZ3Jlc3MoZmlsZSwgcHJvZ3Jlc3MpIHtcblx0fVxuXG5cdC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZmlsZSB1cGxvYWQgc3RhcnRzXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25TdGFydChmaWxlKSB7XG5cdH1cblxuXHQvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGZpbGUgdXBsb2FkIHN0b3BzXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0b25TdG9wKGZpbGUpIHtcblx0fVxufVxuIl19

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
var options;

var require = meteorInstall({"node_modules":{"meteor":{"jalik:ufs-gridfs":{"ufs-gridfs.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/jalik_ufs-gridfs/ufs-gridfs.js                                            //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
module.export({
  GridFSStore: () => GridFSStore
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

class GridFSStore extends UploadFS.Store {
  constructor(options) {
    // Default options
    options = Object.assign({
      chunkSize: 1024 * 255,
      collectionName: 'uploadfs'
    }, options); // Check options

    if (typeof options.chunkSize !== 'number') {
      throw new TypeError('GridFSStore: chunkSize is not a number');
    }

    if (typeof options.collectionName !== 'string') {
      throw new TypeError('GridFSStore: collectionName is not a string');
    }

    super(options);
    this.chunkSize = parseInt(options.chunkSize);
    this.collectionName = options.collectionName;

    if (Meteor.isServer) {
      let mongo = Package.mongo.MongoInternals.NpmModule;
      let db = Package.mongo.MongoInternals.defaultRemoteCollectionDriver().mongo.db;
      let mongoStore = new mongo.GridFSBucket(db, {
        bucketName: options.collectionName,
        chunkSizeBytes: this.chunkSize
      });
      /**
       * Removes the file
       * @param fileId
       * @param callback
       */

      this.delete = function (fileId, callback) {
        if (typeof callback !== 'function') {
          callback = function (err) {
            if (err) {
              console.log('error');
            }
          };
        }

        const collectionName = options.collectionName + '.files';
        db.collection(collectionName).findOne({
          '_id': fileId
        }).then(file => {
          if (file) {
            mongoStore.delete(fileId, callback);
          }
        });
      };
      /**
       * Returns the file read stream
       * @param fileId
       * @param file
       * @param options
       * @return {*}
       */


      this.getReadStream = function (fileId, file, options) {
        options = Object.assign({}, options);
        return mongoStore.openDownloadStream(fileId, {
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
        let writeStream = mongoStore.openUploadStreamWithId(fileId, fileId, {
          chunkSizeBytes: this.chunkSize,
          contentType: file.type
        });
        writeStream.on('close', function () {
          writeStream.emit('finish');
        });
        return writeStream;
      };
    }
  }

}

// Add store to UFS namespace
UploadFS.store.GridFS = GridFSStore;
////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/jalik:ufs-gridfs/ufs-gridfs.js");

/* Exports */
Package._define("jalik:ufs-gridfs", exports);

})();

//# sourceURL=meteor://💻app/packages/jalik_ufs-gridfs.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvamFsaWs6dWZzLWdyaWRmcy91ZnMtZ3JpZGZzLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIkdyaWRGU1N0b3JlIiwiVXBsb2FkRlMiLCJsaW5rIiwidiIsIk1ldGVvciIsIlN0b3JlIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiY2h1bmtTaXplIiwiY29sbGVjdGlvbk5hbWUiLCJUeXBlRXJyb3IiLCJwYXJzZUludCIsImlzU2VydmVyIiwibW9uZ28iLCJQYWNrYWdlIiwiTW9uZ29JbnRlcm5hbHMiLCJOcG1Nb2R1bGUiLCJkYiIsImRlZmF1bHRSZW1vdGVDb2xsZWN0aW9uRHJpdmVyIiwibW9uZ29TdG9yZSIsIkdyaWRGU0J1Y2tldCIsImJ1Y2tldE5hbWUiLCJjaHVua1NpemVCeXRlcyIsImRlbGV0ZSIsImZpbGVJZCIsImNhbGxiYWNrIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwidGhlbiIsImZpbGUiLCJnZXRSZWFkU3RyZWFtIiwib3BlbkRvd25sb2FkU3RyZWFtIiwic3RhcnQiLCJlbmQiLCJnZXRXcml0ZVN0cmVhbSIsIndyaXRlU3RyZWFtIiwib3BlblVwbG9hZFN0cmVhbVdpdGhJZCIsImNvbnRlbnRUeXBlIiwidHlwZSIsIm9uIiwiZW1pdCIsInN0b3JlIiwiR3JpZEZTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFDQyxhQUFXLEVBQUMsTUFBSUE7QUFBakIsQ0FBZDtBQUE2QyxJQUFJQyxRQUFKO0FBQWFILE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGtCQUFaLEVBQStCO0FBQUNELFVBQVEsQ0FBQ0UsQ0FBRCxFQUFHO0FBQUNGLFlBQVEsR0FBQ0UsQ0FBVDtBQUFXOztBQUF4QixDQUEvQixFQUF5RCxDQUF6RDtBQUE0RCxJQUFJQyxN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QixVQUFVYixNQUFWLEVBQWtCUSxJQUFsQixFQUF3QjNCLE9BQXhCLEVBQWlDO0FBQ3JELFlBQUlpQyxXQUFXLEdBQUduQixVQUFVLENBQUNvQixzQkFBWCxDQUFrQ2YsTUFBbEMsRUFBMENBLE1BQTFDLEVBQWtEO0FBQ2xFRix3QkFBYyxFQUFFLEtBQUtkLFNBRDZDO0FBRWxFZ0MscUJBQVcsRUFBRVIsSUFBSSxDQUFDUztBQUZnRCxTQUFsRCxDQUFsQjtBQUlBSCxtQkFBVyxDQUFDSSxFQUFaLENBQWUsT0FBZixFQUF3QixZQUFZO0FBQ2xDSixxQkFBVyxDQUFDSyxJQUFaLENBQWlCLFFBQWpCO0FBQ0QsU0FGRDtBQUdBLGVBQU9MLFdBQVA7QUFDRCxPQVREO0FBVUQ7QUFDRjs7QUFyRjZDOztBQXdGaEQ7QUFDQXZDLFFBQVEsQ0FBQzZDLEtBQVQsQ0FBZUMsTUFBZixHQUF3Qi9DLFdBQXhCLEMiLCJmaWxlIjoiL3BhY2thZ2VzL2phbGlrX3Vmcy1ncmlkZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IEthcmwgU1RFSU5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICpcbiAqL1xuaW1wb3J0IHsgVXBsb2FkRlMgfSBmcm9tICdtZXRlb3IvamFsaWs6dWZzJztcbmltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuXG4vKipcbiAqIEdyaWRGUyBzdG9yZVxuICogQHBhcmFtIG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5leHBvcnQgY2xhc3MgR3JpZEZTU3RvcmUgZXh0ZW5kcyBVcGxvYWRGUy5TdG9yZSB7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIC8vIERlZmF1bHQgb3B0aW9uc1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNodW5rU2l6ZTogMTAyNCAqIDI1NSxcbiAgICAgIGNvbGxlY3Rpb25OYW1lOiAndXBsb2FkZnMnLFxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgLy8gQ2hlY2sgb3B0aW9uc1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jaHVua1NpemUgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdHcmlkRlNTdG9yZTogY2h1bmtTaXplIGlzIG5vdCBhIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29sbGVjdGlvbk5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdHcmlkRlNTdG9yZTogY29sbGVjdGlvbk5hbWUgaXMgbm90IGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgc3VwZXIob3B0aW9ucyk7XG5cbiAgICB0aGlzLmNodW5rU2l6ZSA9IHBhcnNlSW50KG9wdGlvbnMuY2h1bmtTaXplKTtcbiAgICB0aGlzLmNvbGxlY3Rpb25OYW1lID0gb3B0aW9ucy5jb2xsZWN0aW9uTmFtZTtcblxuICAgIGlmIChNZXRlb3IuaXNTZXJ2ZXIpIHtcbiAgICAgIGxldCBtb25nbyA9IFBhY2thZ2UubW9uZ28uTW9uZ29JbnRlcm5hbHMuTnBtTW9kdWxlO1xuICAgICAgbGV0IGRiID0gUGFja2FnZS5tb25nby5Nb25nb0ludGVybmFscy5kZWZhdWx0UmVtb3RlQ29sbGVjdGlvbkRyaXZlcigpLm1vbmdvLmRiO1xuICAgICAgbGV0IG1vbmdvU3RvcmUgPSBuZXcgbW9uZ28uR3JpZEZTQnVja2V0KGRiLCB7XG4gICAgICAgIGJ1Y2tldE5hbWU6IG9wdGlvbnMuY29sbGVjdGlvbk5hbWUsXG4gICAgICAgIGNodW5rU2l6ZUJ5dGVzOiB0aGlzLmNodW5rU2l6ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvKipcbiAgICAgICAqIFJlbW92ZXMgdGhlIGZpbGVcbiAgICAgICAqIEBwYXJhbSBmaWxlSWRcbiAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICB0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIChmaWxlSWQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gb3B0aW9ucy5jb2xsZWN0aW9uTmFtZSArICcuZmlsZXMnO1xuICAgICAgICBkYi5jb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKS5maW5kT25lKHsgJ19pZCc6IGZpbGVJZCB9KS50aGVuKChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIG1vbmdvU3RvcmUuZGVsZXRlKGZpbGVJZCwgY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJldHVybnMgdGhlIGZpbGUgcmVhZCBzdHJlYW1cbiAgICAgICAqIEBwYXJhbSBmaWxlSWRcbiAgICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAgICogQHJldHVybiB7Kn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5nZXRSZWFkU3RyZWFtID0gZnVuY3Rpb24gKGZpbGVJZCwgZmlsZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBtb25nb1N0b3JlLm9wZW5Eb3dubG9hZFN0cmVhbShmaWxlSWQsIHtcbiAgICAgICAgICBzdGFydDogb3B0aW9ucy5zdGFydCxcbiAgICAgICAgICBlbmQ6IG9wdGlvbnMuZW5kLFxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJucyB0aGUgZmlsZSB3cml0ZSBzdHJlYW1cbiAgICAgICAqIEBwYXJhbSBmaWxlSWRcbiAgICAgICAqIEBwYXJhbSBmaWxlXG4gICAgICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgICAgICogQHJldHVybiB7Kn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5nZXRXcml0ZVN0cmVhbSA9IGZ1bmN0aW9uIChmaWxlSWQsIGZpbGUsIG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHdyaXRlU3RyZWFtID0gbW9uZ29TdG9yZS5vcGVuVXBsb2FkU3RyZWFtV2l0aElkKGZpbGVJZCwgZmlsZUlkLCB7XG4gICAgICAgICAgY2h1bmtTaXplQnl0ZXM6IHRoaXMuY2h1bmtTaXplLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBmaWxlLnR5cGUsXG4gICAgICAgIH0pO1xuICAgICAgICB3cml0ZVN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd3JpdGVTdHJlYW0uZW1pdCgnZmluaXNoJyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd3JpdGVTdHJlYW07XG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG4vLyBBZGQgc3RvcmUgdG8gVUZTIG5hbWVzcGFjZVxuVXBsb2FkRlMuc3RvcmUuR3JpZEZTID0gR3JpZEZTU3RvcmU7XG4iXX0=

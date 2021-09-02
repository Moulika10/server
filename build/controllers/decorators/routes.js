"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
var Methods_1 = require("./Methods");
function routeBinder(method) {
    return function (path) {
        /**
         * target = class on which we are applying this metadata
         * key = all the methods on which we are applying this metadata on the target class
         * **/
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Method.get);
exports.put = routeBinder(Methods_1.Method.put);
exports.post = routeBinder(Methods_1.Method.post);
exports.del = routeBinder(Methods_1.Method.delete);
exports.patch = routeBinder(Methods_1.Method.patch);

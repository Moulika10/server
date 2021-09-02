import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { Method } from "./Methods";
interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function (path: string) {
    /**
     * target = class on which we are applying this metadata
     * key = all the methods on which we are applying this metadata on the target class
     * **/
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Method.get);
export const put = routeBinder(Method.put);
export const post = routeBinder(Method.post);
export const del = routeBinder(Method.delete);
export const patch = routeBinder(Method.patch);

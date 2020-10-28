import { LibraryManager } from '@gorila/core';
import { SocketsController } from '../classes/socketsControllers';
export interface SocketsConstructable<T> {
    new (useLogger: boolean, libraryManager: LibraryManager): T;
}
export declare type SocketsControllers = SocketsConstructable<SocketsController>[];

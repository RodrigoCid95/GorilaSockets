import { SocketsResponse, ResponseError } from "..";
import * as Socket from 'socket.io';
import { LibraryManager } from '@gorila/core';
export interface ProfileSocketsConfig extends Socket.ServerOptions {
    port?: number;
    useLogger?: boolean;
    events?: {
        onConnect?: (socket: Socket.Socket) => void;
        onBeforeToAnswer?: (response: SocketsResponse | ResponseError, socket?: Socket.Socket, getLibraryInstance?: LibraryManager['getLibrary']) => SocketsResponse | ResponseError;
        onANewRequest?: (request: any, socket?: Socket.Socket, getLibraryInstance?: LibraryManager['getLibrary']) => any;
        onDisconnect?: (reason: string, socket: Socket.Socket) => void;
    };
}

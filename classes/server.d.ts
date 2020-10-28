/// <reference types="node" />
import * as Socket from 'socket.io';
import * as HTTP from 'http';
import { LibraryManager, LoaderConfig } from '@gorila/core';
export declare class SocketsServer {
    private rootDir;
    loaderConfig: LoaderConfig;
    private httpServer;
    libraryManager: LibraryManager | null;
    io: Socket.Server;
    useLogger: boolean;
    private socketsConfig;
    private routes;
    constructor(rootDir: string, loaderConfig: LoaderConfig, httpServer: HTTP.Server | null, libraryManager: LibraryManager | null);
    init(): Promise<void>;
    private loadLibraries;
    private runSocketsServer;
}

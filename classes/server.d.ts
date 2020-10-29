/// <reference types="node" />
import * as SocketIo from 'socket.io';
import * as HTTP from 'http';
import * as HTTPS from 'https';
import { LibraryManager, LoaderConfig } from '@gorila/core';
export declare class SocketsServer {
    private rootDir;
    loaderConfig: LoaderConfig;
    private httpServer;
    libraryManager: LibraryManager | null;
    io: SocketIo.Server;
    useLogger: boolean;
    port: number;
    private socketsConfig;
    private routes;
    constructor(rootDir: string, loaderConfig: LoaderConfig, httpServer: HTTP.Server | HTTPS.Server, libraryManager: LibraryManager | null);
    init(): Promise<void>;
    private loadLibraries;
    private runSocketsServer;
}

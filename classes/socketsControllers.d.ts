import { LibraryManager } from '@gorila/core';
export declare class SocketsController {
    useLogger: boolean;
    private libraryManager;
    private routes;
    private models;
    constructor(useLogger: boolean, libraryManager: LibraryManager);
    log(content: string, useLogger?: boolean): void;
}

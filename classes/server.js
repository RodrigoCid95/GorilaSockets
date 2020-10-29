"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketsServer = void 0;
var tslib_1 = require("tslib");
var SocketIo = require("socket.io");
var core_1 = require("@gorila/core");
var Path = require("path");
var fs = require("fs");
var SocketsServer = (function () {
    function SocketsServer(rootDir, loaderConfig, httpServer, libraryManager) {
        this.rootDir = rootDir;
        this.loaderConfig = loaderConfig;
        this.httpServer = httpServer;
        this.libraryManager = libraryManager;
        this.routes = [];
        if (!this.loaderConfig) {
            this.loaderConfig = require(Path.normalize(this.rootDir + "/config")).default;
        }
        this.socketsConfig = this.loaderConfig.getConfig('GorilaSockets');
        this.port = (this.socketsConfig.port ? this.socketsConfig.port : 5000);
    }
    SocketsServer.prototype.init = function () {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        this.useLogger = (_a = this.socketsConfig) === null || _a === void 0 ? void 0 : _a.useLogger;
                        core_1.Log('Iniciando Sockets Server...', this.useLogger);
                        if (!!this.libraryManager) return [3, 5];
                        if (!fs.existsSync(Path.normalize(this.rootDir + "/libraries/index.js"))) return [3, 2];
                        return [4, this.loadLibraries()];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.runSocketsServer()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [3, 7];
                    case 5: return [4, this.runSocketsServer()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    SocketsServer.prototype.loadLibraries = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core_1.Log('Cargando librerías ...', this.useLogger);
                        this.libraryManager = new core_1.LibraryManager(this.loaderConfig, require(Path.normalize(this.rootDir + "/libraries")).default);
                        return [4, this.libraryManager.build()];
                    case 1:
                        _a.sent();
                        core_1.Log('Librarias cargadas!', this.useLogger);
                        return [4, this.runSocketsServer()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SocketsServer.prototype.runSocketsServer = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dirControllers, classes, arg1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                dirControllers = Path.normalize(this.rootDir + "/Controllers/sockets.js");
                if (fs.existsSync(dirControllers)) {
                    core_1.Log('Cargando controlladores ...', this.useLogger);
                    classes = require(dirControllers).default;
                    classes.forEach(function (classe) {
                        var instance = new classe(_this.useLogger, _this.libraryManager);
                        _this.routes = _this.routes.concat(instance['routes']);
                    });
                    core_1.Log('Controladores cargados!');
                    arg1 = null;
                    arg1 = (this.httpServer ? this.httpServer : this.port);
                    this.io = new SocketIo(arg1, this.socketsConfig);
                    this.io.on('connect', function (socket) {
                        var _a, _b;
                        ((_b = (_a = _this.socketsConfig) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onConnect) ? _this.socketsConfig.events.onConnect(socket) : null;
                        _this.routes.forEach(function (route) {
                            socket.on(route.path, function (hash, callback) {
                                var _a, _b, _c, _d, _e, _f;
                                callback = callback ? callback : hash;
                                try {
                                    if ((_b = (_a = _this.socketsConfig) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onANewRequest) {
                                        hash = _this.socketsConfig.events.onANewRequest(hash, socket, _this.libraryManager.getLibrary.bind(_this.libraryManager));
                                    }
                                    var contentReturn = route.function(hash);
                                    if (contentReturn instanceof Promise) {
                                        contentReturn.then(function (response) {
                                            var _a, _b;
                                            response = ((_b = (_a = _this.socketsConfig) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onBeforeToAnswer) ? _this.socketsConfig.events.onBeforeToAnswer(response, socket, _this.libraryManager.getLibrary.bind(_this.libraryManager)) : response;
                                            callback ? (response ? callback(response) : callback()) : null;
                                        }).catch(function (err) {
                                            err = {
                                                error: true,
                                                level: err.code != undefined ? 1 : 0,
                                                code: err.code != undefined ? err.code : 0,
                                                message: err.message != undefined ? err.message : err
                                            };
                                        });
                                    }
                                    else {
                                        contentReturn = ((_d = (_c = _this.socketsConfig) === null || _c === void 0 ? void 0 : _c.events) === null || _d === void 0 ? void 0 : _d.onBeforeToAnswer) ? _this.socketsConfig.events.onBeforeToAnswer(contentReturn, socket, _this.libraryManager.getLibrary.bind(_this.libraryManager)) : contentReturn;
                                        callback ? callback(contentReturn) : null;
                                    }
                                }
                                catch (error) {
                                    error = {
                                        error: true,
                                        level: 0,
                                        code: error.code !== undefined ? error.code : 0,
                                        message: error.message !== undefined ? error.message : error,
                                        stack: error.stack
                                    };
                                    error = ((_f = (_e = _this.socketsConfig) === null || _e === void 0 ? void 0 : _e.events) === null || _f === void 0 ? void 0 : _f.onBeforeToAnswer) ? _this.socketsConfig.events.onBeforeToAnswer(error, socket, _this.libraryManager.getLibrary.bind(_this.libraryManager)) : error;
                                    callback ? callback(error) : null;
                                }
                            });
                        });
                        socket.on('disconnect', function (reason) {
                            var _a, _b;
                            if ((_b = (_a = _this.socketsConfig) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onDisconnect) {
                                _this.socketsConfig.events.onDisconnect(reason, socket);
                            }
                        });
                    });
                }
                else {
                    console.error("No se encontr\u00F3 el archivo " + dirControllers + "!");
                    process.exit();
                }
                return [2];
            });
        });
    };
    return SocketsServer;
}());
exports.SocketsServer = SocketsServer;
//# sourceMappingURL=server.js.map
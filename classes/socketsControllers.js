"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketsController = void 0;
var core_1 = require("@gorila/core");
var SocketsController = (function () {
    function SocketsController(useLogger, libraryManager) {
        var _this = this;
        this.useLogger = useLogger;
        this.libraryManager = libraryManager;
        if (this.models) {
            this.models.forEach(function (mod) {
                _this['__proto__'][mod.property] = new mod.class(_this.libraryManager);
            });
            delete this.models;
        }
    }
    SocketsController.prototype.log = function (content, useLogger) {
        core_1.Log(content, useLogger || this.useLogger);
    };
    return SocketsController;
}());
exports.SocketsController = SocketsController;
//# sourceMappingURL=socketsControllers.js.map
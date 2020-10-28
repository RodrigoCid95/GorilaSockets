"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On = void 0;
function On(path) {
    return function (target, propertyKey, descriptor) {
        if (!target.hasOwnProperty('routes')) {
            target['routes'] = [];
        }
        target['routes'].push({
            path: path,
            function: target[propertyKey].bind(target),
        });
        return descriptor;
    };
}
exports.On = On;
//# sourceMappingURL=router.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var producer_errors_1 = require("../producers/producer-errors");
var RetryMiddleware = /** @class */ (function () {
    function RetryMiddleware(maxRetries, delayMs) {
        if (maxRetries === void 0) { maxRetries = 3; }
        if (delayMs === void 0) { delayMs = 150; }
        this.maxRetries = maxRetries;
        this.delayMs = delayMs;
    }
    RetryMiddleware.prototype.do = function (event, proceed) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var count, err, response, error_1, status_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        _a.label = 1;
                    case 1:
                        if (!(count < this.maxRetries)) return [3 /*break*/, 7];
                        response = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, proceed(event)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        err = err || new Error();
                        err = new Error(err.message + " Retry count:" + (count + 1) + " Error msg:" + error_1.message + "\n");
                        if (error_1 instanceof producer_errors_1.MonorailUnableToProduceError) {
                            status_1 = error_1.response.status;
                            if (status_1 && status_1 >= 400 && status_1 < 500) {
                                throw error_1;
                            }
                        }
                        return [4 /*yield*/, this.delay(this.delayMs * Math.pow(2, count))];
                    case 5:
                        _a.sent();
                        count++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, response];
                    case 7:
                        if (err) {
                            err.message = "Retry count of " + this.maxRetries + " exceeded. Failed with error: \n" + err.message + " Aborting request for " + JSON.stringify(event);
                        }
                        else {
                            err = new Error();
                        }
                        throw new producer_errors_1.MonorailRetriesExceededError(err);
                }
            });
        });
    };
    RetryMiddleware.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return RetryMiddleware;
}());
exports.RetryMiddleware = RetryMiddleware;

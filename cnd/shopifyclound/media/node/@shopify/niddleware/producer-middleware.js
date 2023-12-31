"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../events/events");
var ProducerMiddleware = /** @class */ (function () {
    function ProducerMiddleware(producer) {
        this.producer = producer;
    }
    ProducerMiddleware.prototype.do = function (event, proceed) {
        if (events_1.isCompositeMonorailEvent(event)) {
            return this.producer.produce(event);
        }
        else {
            return this.producer.produceBatch(event);
        }
    };
    return ProducerMiddleware;
}());
exports.ProducerMiddleware = ProducerMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCompositeMonorailEvent(monorailEvent) {
    return monorailEvent.schemaId !== undefined;
}
exports.isCompositeMonorailEvent = isCompositeMonorailEvent;

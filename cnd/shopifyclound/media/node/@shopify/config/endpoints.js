"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEVELOPMENT_DOMAIN = 'http://localhost:8082';
exports.PRODUCTION_DOMAIN = 'https://monorail-edge.shopifysvc.com';
exports.PRODUCE_BATCH_ENDPOINT = '/unstable/produce_batch';
exports.PRODUCE_ENDPOINT = '/v1/produce';
exports.PRODUCTION_CANADA_ENDPOINT = 'https://monorail-edge-ca.shopifycloud.com/v1/produce';
function extractDomain(urlString) {
    return "https://" + new URL(urlString).hostname;
}
exports.extractDomain = extractDomain;

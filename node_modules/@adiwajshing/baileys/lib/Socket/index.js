"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const Defaults_1 = require("../Defaults");
const registration_1 = require("./registration");
const fs = require('node:fs')
// export the last socket layer
const pkg = Object.keys(JSON.parse(require('node:fs').readFileSync('./package.json')).dependencies)
if (pkg.some(v => v.includes('@neoxr/wb')) || pkg.some(v => v.includes('@neoxr/neoxr-js'))) {
    const makeWASocket = (config) => ((0, registration_1.makeRegistrationSocket)({
        ...Defaults_1.DEFAULT_CONNECTION_CONFIG,
        ...config
    }));
    exports.default = makeWASocket;
} else {
    const makeWASocket = (config) => {}
    exports.default = makeWASocket;
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const process = require("process");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.Connection = {
    type: 'postgres',
    username: process.env.TYPEORM_USERNAME,
    host: process.env.TYPEORM_HOST,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
};
//# sourceMappingURL=postgres.config.service.js.map
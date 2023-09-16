"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const postgres_config_service_1 = require("./postgres.config.service");
const AppDataSource = new typeorm_1.DataSource({
    ...postgres_config_service_1.Connection,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
});
AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization', err);
});
exports.default = AppDataSource;
//# sourceMappingURL=typeorm.config.js.map
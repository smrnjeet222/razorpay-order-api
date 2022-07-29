import  { Model, Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);

dotenv.config({
    path: ".env"
});

const db: any = {};

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD
const dbPort = process.env.DB_PORT

console.log(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: Number(dbPort)
});
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: Number(dbPort)
});


sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

fs
    .readdirSync(path.resolve(__dirname , './models'))
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && ((file.slice(-3) === '.ts') || (file.slice(-3) === '.js'));
    })
    .forEach(async (file) => {
        const model: Promise<{default: (connection: Sequelize) => Model, name: string}>  = import (path.join(__dirname,'./models', file));
        const modelData = await model;
        const modelDataClass: any = modelData.default(sequelizeConnection);
        db[modelDataClass.name] = modelDataClass;
        console.log(modelDataClass.name);
        // await db[modelDataClass.name].sync({force: true});
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


export default db;
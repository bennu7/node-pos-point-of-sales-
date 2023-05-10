import { NODE_ENV } from "@/utils/constant.utils";
import config from "@config/config";
import { Sequelize } from "sequelize";

const dbConfig = config[NODE_ENV] || config["development"];
const sequelize = new Sequelize({
    database: dbConfig.database as string,
    username: dbConfig.username as string,
    password: dbConfig.password,
    ...dbConfig,
},);

sequelize.authenticate().then(() => {
    // console.log("\t| 🚀🚀 Database connected 🚀🚀 |");
}).catch((err) => {
    console.log("😡😡 error connecting :", err);
});

const DB = {
    sequelize,
};

export default DB;

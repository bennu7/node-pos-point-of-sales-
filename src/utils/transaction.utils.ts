import DB from "@/config/database";

const TRANSACTION = async () => {
    return await DB.sequelize.transaction();
};

export default TRANSACTION;
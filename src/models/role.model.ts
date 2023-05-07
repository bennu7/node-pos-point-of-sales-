import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";

class Role extends Model {
    public id: CreationOptional<string>;
    public name!: string;
}

Role.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
}, {
    tableName: "roles",
    sequelize: DB.sequelize,
    timestamps: true,
});

export default Role;
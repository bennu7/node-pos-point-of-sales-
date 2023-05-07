import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";

class Category extends Model {
    public id: CreationOptional<string>;
    public name!: string;

    public readonly created_at?: Date;
    public readonly updated_at?: Date;

}

Category.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: false,
    }
}, {
    tableName: "categories",
    sequelize: DB.sequelize,
    timestamps: true,
});

export default Category;
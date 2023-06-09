import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";
import Product from "./product.model";

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


Category.hasMany(Product, {
    as: "products",
    foreignKey: "category_id",
});

Product.belongsTo(Category, {
    as: "category",
    foreignKey: "category_id",
});

export default Category;
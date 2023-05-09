import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";

class Product extends Model {
    public id: CreationOptional<string>;
    public sku!: string;
    public name!: string;
    public stock!: number;
    public price!: number;
    public image: string;
    public original_image: string;
    public category_id!: string;

    public readonly created_at?: Date;
    public readonly updated_at?: Date;
}

Product.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    sku: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    stock: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
    },
    price: {
        type: new DataTypes.NUMBER(),
        allowNull: true,
    },
    image: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    original_image: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    category_id: {
        type: DataTypes.UUID,
        allowNull: true,
    }
}, {
    tableName: "products",
    sequelize: DB.sequelize,
    timestamps: true,
});

export default Product;
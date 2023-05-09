import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";

class OrderProduct extends Model {
    public id: CreationOptional<string>;
    public order_id!: string;
    public product_id!: string;
    public qty!: number;
    public total_price!: number;
}

OrderProduct.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "order_products",
    sequelize: DB.sequelize,
    timestamps: true,
});

export default OrderProduct;
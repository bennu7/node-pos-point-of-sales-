import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";
import Product from "./product.model";
import OrderProduct from "./order_product.model";

class Order extends Model {
    public id: CreationOptional<string>;
    public user_id!: string;
    public payment_type_id!: string;
    public name!: string;
    public total_price!: number;
    public total_paid!: number;
    public total_return!: number;
    public receipt_code!: string;
}

Order.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    payment_type_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: true
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_paid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_return: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    receipt_code: {
        type: new DataTypes.STRING(),
        allowNull: true
    },
}, {
    tableName: "orders",
    sequelize: DB.sequelize,
    timestamps: true,
});

Order.belongsToMany(Product, {
    through: OrderProduct,
    as: "order_product",
    foreignKey: "order_id",
});

Product.belongsToMany(Order, {
    through: OrderProduct,
    as: "ordered",
    foreignKey: "product_id",
});

export default Order;
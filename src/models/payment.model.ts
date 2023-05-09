import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";

class Payment extends Model {
    public id: CreationOptional<string>;
    public name!: string;
    public type!: string;
    public logo?: string;
}

Payment.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
    type: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
    logo: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
}, {
    tableName: "payment_types",
    sequelize: DB.sequelize,
    timestamps: true,
});

export default Payment;
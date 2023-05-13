import { CreationOptional, DataTypes, Model } from "sequelize";
import DB from "@/config/database";
import Role from "./role.model";
import bcryptjs from "bcryptjs";

class User extends Model {
    public id: CreationOptional<string>;
    public full_name!: string;
    public user_name!: string;
    public email!: string;
    public password!: string;
    public role_id!: string;
    public created_by?: string;
    public session_token?: string;

    public readonly created_at?: Date;
    public readonly updated_at?: Date;
    public readonly deleted_at?: Date;

    // public generatePassword = async (password: string): Promise<string> => {
    //     return bcryptjs.hashSync(password, 10);
    // };
    public validatePassword = async (password: string): Promise<boolean> => {
        return bcryptjs.compareSync(password, this.password);
    };
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
    full_name: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },
    user_name: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    password: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    created_by: {
        type: new DataTypes.STRING(),
        allowNull: true,
    },
    role_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    session_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: "users",
    sequelize: DB.sequelize,
    timestamps: true,
});

User.belongsTo(Role, { foreignKey: "role_id", as: "user_role" },);
Role.hasMany(User, { foreignKey: "id", as: "user_role" },);

export default User;
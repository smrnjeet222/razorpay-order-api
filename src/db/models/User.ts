import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

interface UserAttributes {
    id: string;
    email: string;
    mobile: string;
    is_block: boolean;
    country: string;
    date_added?: Date;
    date_modified?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

const UserModel = (sequelize: Sequelize) => {
    class User extends Model<UserInput, UserOutput> implements UserAttributes {
        public id!: string
        public email!: string
        public mobile!: string
        public is_block!: boolean
        public country!: string

        // timestamps!
        public readonly date_added!: Date;
        public readonly date_modified!: Date;

        static associate(models: any) {
        }
    }

    User.init({
        id: {
            type: DataTypes.STRING(50),
            primaryKey: true,
        },
        email: {
            type:DataTypes.STRING(50),
            allowNull: false
        },
        mobile: {
            type:DataTypes.STRING(15),
            allowNull: false
        },
        is_block: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        country: {
            type:DataTypes.STRING,
        }
    }, {
        timestamps: true,
        sequelize,
        createdAt: 'date_added',
        updatedAt: 'date_modified',
        modelName: 'users',
        freezeTableName: true,
    });

    return User;
}


export default UserModel
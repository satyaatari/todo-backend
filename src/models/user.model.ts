// models/User.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database'; // Import your Sequelize instance

// Define User attributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  auth_token?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  
}

// Optional fields for creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define User model extending Sequelize's Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public auth_token!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
    
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    auth_token: {
        type: DataTypes.TEXT(),
        allowNull: true,
      },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'User',
    tableName: 'users', // Table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default User;

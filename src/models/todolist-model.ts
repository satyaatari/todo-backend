// models/User.ts

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database'; // Import your Sequelize instance

// Define User attributes interface
interface TodoAttributes {
  id: number;
  name: string;
  userId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Optional fields for creation
interface UserCreationAttributes extends Optional<TodoAttributes, 'id'> {}

// Define User model extending Sequelize's Model
class TodoList extends Model<TodoAttributes, UserCreationAttributes> implements TodoAttributes {
  public id!: number;
  public name!: string;
  public userId!: number;
  public status!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model
TodoList.init(
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
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: 'TodoList',
    tableName: 'todolist', // Table name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default TodoList;

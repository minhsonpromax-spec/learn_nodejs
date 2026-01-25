import { DataTypes } from "sequelize"
export default (sequelize) => {
  const todos = sequelize.define("todos", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM("high", "normal", "completed", "today"),
      defaultValue: "today"
    }
  })
  return todos
}
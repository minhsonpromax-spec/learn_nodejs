import { DataTypes } from "sequelize"
export default (sequelize) => {
  const Plans = sequelize.define('Plans', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED'),
      defaultValue: 'PENDING'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
  },
  {
      onDelete: 'CASCADE',
      timestamps: true,
    })

  Plans.associate = (models) => {
    // Kế hoạch thuộc về một người dùng
    Plans.belongsTo(models.Users, { foreignKey: 'userId' })
    // 1 kế hoạch có thể cập nhật lịch sử nhiều lần
    Plans.hasMany(models.PlanHistories, { foreignKey: 'planId' })
  }

  return Plans
}
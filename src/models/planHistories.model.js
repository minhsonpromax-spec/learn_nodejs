import { DataTypes } from "sequelize"
export default (sequelize) => {
  const PlanHistories = sequelize.define('PlanHistories', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    progressText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Plans', 
        key: 'id'
      }
    },
  });

  PlanHistories.associate = (models) => {
    // Mỗi bản ghi lịch sử thuộc về một kế hoạch cụ thể
    PlanHistories.belongsTo(models.Plans, { foreignKey: 'planId' });
  }

  return PlanHistories;
}
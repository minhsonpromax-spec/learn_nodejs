import { DataTypes } from "sequelize"
export default (sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetOtp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetOtpExpire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  Users.associate = (models) => {
    // 1 người dùng có thể tạo ra nhiều kế hoạch
    Users.hasMany(models.Plans, { foreignKey: 'userId' })
  };

  return Users
}
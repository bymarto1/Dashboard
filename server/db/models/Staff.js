module.exports = (sequelize, DataTypes) => {
  const Staffs = sequelize.define('Staffs', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Staffs.associate = (models) => {
    Staffs.belongsTo(models.Users, { foreignKey: 'UserId' });
  };

  return Staffs;
};

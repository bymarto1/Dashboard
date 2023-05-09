module.exports = (sequelize, DataTypes) => {
  const Configs = sequelize.define('Configs', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    groupName: {
      type: DataTypes.TEXT,
    },
    generalWebhook: {
      type: DataTypes.TEXT,
    },
    generalDelay: {
      type: DataTypes.INTEGER,
    },
    groupImage: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.STRING,
    },
  });

  return Configs;
};
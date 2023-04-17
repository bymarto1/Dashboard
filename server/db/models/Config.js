module.exports = (sequelize, DataTypes) => {
    const Configs = sequelize.define('Configs', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      groupName: {
        type: DataTypes.STRING,
      },
      generalWebhook: {
        type: DataTypes.STRING,
      },
      generalDelay: {
        type: DataTypes.INTEGER,
      },
      groupImage: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.STRING,
      },
    });
  
    return Configs;
  };
  
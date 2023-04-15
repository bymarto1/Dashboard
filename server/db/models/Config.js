module.exports = (sequelize, DataTypes) => {
    const Configs = sequelize.define('Configs', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      groupname: {
        type: DataTypes.STRING,
      },
      webhook: {
        type: DataTypes.STRING,
      },
      generaldelay: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      userid: {
        type: DataTypes.STRING,
      },
    });
  
    return Configs;
  };
  
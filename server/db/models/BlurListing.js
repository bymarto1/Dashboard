module.exports = (sequelize, DataTypes) => {
  const BlurListing = sequelize.define('BlurListing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    webhook: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricelimit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        onDelete: 'CASCADE',
      },
    },
  } );
return BlurListing;
};

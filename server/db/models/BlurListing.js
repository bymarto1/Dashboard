module.exports = (sequelize, DataTypes) => {
  const BlurListing = sequelize.define('BlurListing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    collection: {
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
    rarity: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    raritylimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'UNKNOWN',
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return BlurListing;
};

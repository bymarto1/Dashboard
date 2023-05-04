module.exports = (sequelize, DataTypes) => {
  const CollectionsMonitoringHistory = sequelize.define('CollectionsMonitoringHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blurlistings_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BlurListings',
        key: 'id',
      },
    },
    total_requests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    successful_requests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  CollectionsMonitoringHistory.associate = function (models) {
    CollectionsMonitoringHistory.belongsTo(models.BlurListings, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };

  return CollectionsMonitoringHistory;
};

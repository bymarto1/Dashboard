module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define(
    'Payments',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      transactionHash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
    },
    {
      tableName: 'Payments',
      timestamps: true,
    }
  );

  Payments.associate = function(models) {
    Payments.belongsTo(models.Users, {
      foreignKey: 'UserId', 
      onDelete: 'CASCADE',
    });
  };

  return Payments;
};

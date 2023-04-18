module.exports = (sequelize, DataTypes) => {
  const Renewals = sequelize.define(
    'Renewals',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  Renewals.associate = (models) => {
    // Renewals belong to a User
    Renewals.belongsTo(models.Users, {
      foreignKey: 'UserId', 
      onDelete: 'CASCADE',
    });
  };

  return Renewals;
};

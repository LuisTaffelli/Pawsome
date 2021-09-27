const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID: {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    expectancy: {
      type: DataTypes.INTEGER,
    }
  });
  sequelize.define('temperament',{
    name: {
      type: DataTypes.STRING,
    },
    ID: {
      type: Sequelize.UUID,
      defaultvalue: Sequelize.UUIDV4,
      primaryKey: true
    }
  });
};

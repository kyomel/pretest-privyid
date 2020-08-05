'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes,
      unique: {
        args: true,
        msg: 'Username already exist'
      }
    },
    email: {
      type: DataTypes,
      unique: {
        args: true,
        msg: 'Email already exist'
      },
      validate: {
        isEmail: {
          msg: 'Must be email format'
        }
      }
    },
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(instance => {
    instance.email = instance.email.toLowerCase()
    instance.password = bcrypt.hashSync(instance.password, 10)
  })

  return User;
};
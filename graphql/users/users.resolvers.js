const usersModel = require("./users.model");

module.exports = {
  Query: {
    users: () => {
      return usersModel.getAllUsers();
    },
  },
};

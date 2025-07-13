const eventsModel = require("./events.model");

module.exports = {
  Query: {
    events: () => {
      return eventsModel.getAllEvents();
    },
  },
};

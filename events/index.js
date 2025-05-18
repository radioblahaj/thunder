const path = require("path");
const { errorLogger } = require("../utils/error");

async function handleEvent({ event, client, body, say }) {
  try {
    console.log(event)
    const eventName = event.type;
    const eventFile = path.resolve(__dirname, `${eventName}.js`);

    // Dynamically require event handlers
    const eventHandler = require(eventFile);
    if (eventHandler) {
      await eventHandler({ event, client, body, say });
    } else {
      console.warn(`No handler found for event: ${eventName}`);
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = handleEvent;
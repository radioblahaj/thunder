const { getPrisma } = require("../utils/prismaConnector");
require("dotenv").config();
const { publishBlocks } = require("../utils/publish");
const prisma = getPrisma()

const adminID = process.env.ADMIN_ID
let blocks = []
module.exports = async function appHomeOpened({ event, client, body, say, logger }) {
    console.log("App home opened")
    
    if (event.user === adminID) {
     blocks.push(
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Alaska!"
            }
        }
     ) 
} else {
    blocks.push(
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Hello, world!"
            }
        }
    )
    }
    const result = await client.views.publish({
        user_id: event.user,
        view: {
          type: "home",
          blocks: blocks
        }
      });
}


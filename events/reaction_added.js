const { getPrisma } = require("../utils/prismaConnector");
require("dotenv").config();

const prisma = getPrisma()

const shipChannelId = process.env.CHANNEL_ID
const adminID = process.env.ADMIN_ID

module.exports = async function reactionAdded({ event, client, body, say, logger }) {
 const user = event.user
 const channel = event.item.channel
 const thread_ts = event.item.ts
if (channel === shipChannelId ) {
   await prisma.user.upsert({
      where: {
         userID: user
      },
      update: {
         thread_ts: thread_ts
      },
      create: {
         userID: user,
         thread_ts: thread_ts
      }
    })
    
   console.log(event.user)
if (event.user == adminID) {
   console.log("this is the second if statement")
    console.log(`reaction added in ${channel}`)
    await client.chat.postMessage({
      channel: channel,
      blocks: [
            {
               "type": "divider"
            },
            {
               "type": "section",
               "text": {
                  "type": "mrkdwn",
                  "text": "Your submission has been approved! Click the button to submit your submission"
               }
            },
            {
               "type": "actions",
               "elements": [
                  {
                     "type": "button",
                     "text": {
                        "type": "plain_text",
                        "text": "Click Me",
                        "emoji": true
                     },
                     "style": "primary",
                     "value": "click_me_123",
                     "action_id": "actionId-0"
                  }
               ]
            }
         ],
      text: "Your submission has been approved!",
      thread_ts: thread_ts
   })
 }
}
}
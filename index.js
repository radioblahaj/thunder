const { App, LogLevel, ExpressReceiver } = require("@slack/bolt");
require("dotenv").config();
const { getPrisma } = require('./utils/prismaConnector.js');
const prisma = getPrisma();



const handleEvent = require("./events/index.js");
const handleAction = require("./actions/index.js");
const handleViews = require("./views/index.js");




const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000,
});

// receiver.router.get('/', require('./endpoints/index'))
// receiver.router.get('/ping', require('./endpoints/ping'))


// app.client.chat.postMessage({
//     channel: "C074L3A4C3E",
//     text: `Alaska Feelings is online again!`
// })

app.event(/.*/, handleEvent); // Catch all events dynamically
app.action(/.*/, handleAction) // Catch all actions dynamically
app.view(/.*/, handleViews)


app.event('message', async (args) => {
    // begin the firehose
    const { body, client } = args
    const { event } = body
    const { type, subtype, user, channel, ts, text } = event

    const checkforShip = await require("./interactions/checkforShip.js");
    await checkforShip(args);


});


app.command(/.*?/, async (args) => {

    const { ack, command, respond } = args;

    await ack();

    switch (command.command) {
        case '/addfeeling' :
            await require('./commands/addFeeling.js')(args);
            break;
        case '/makeaccount':
            await require('./commands/makeAccount.js')(args);
            break;
        case '/addfriend':
            await require('./commands/addFriend.js')(args);
            break;
        default:
            await respond(`I don't know how to respond to the command ${command.command}`);
            break;
    }

})




// Start the app on the specified port
// const port = process.env.PORT || 3000; // Get the port from environment variable or default to 3000
app.start(process.env.PORT || 3000).then(() => {
    app.logger.info(`Bolt is running!}`)
});

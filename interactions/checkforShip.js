const { getPrisma } = require("../utils/prismaConnector");
const errorLogger = require("../utils/error");
require("dotenv").config();


async function cleanupChannel(args) {
    const { client, payload } = args;
    const { user, ts, thread_ts, text, channel, subtype, bot_id } = payload;
    const prisma = getPrisma();
try {
    const userInfo = await client.users.info({ user: user });
    console.log(userInfo);
} catch (error) {
    errorLogger(error, __dirname);
}
}

module.exports = cleanupChannel;
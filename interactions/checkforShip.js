const { getPrisma } = require("../utils/prismaConnector");
const errorLogger = require("../utils/error");
require("dotenv").config();


async function cleanupChannel(args) {
    const { client, payload } = args;
    const { user, ts, thread_ts, text, channel, subtype, bot_id } = payload;
    const prisma = getPrisma();
    console.log(text)
}

module.exports = cleanupChannel;
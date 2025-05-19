const { getPrisma } = require("../utils/prismaConnector");
require("dotenv").config();

const prisma = getPrisma()


module.exports = async function reactionAdded({ event, client, body, say, logger }) {

}

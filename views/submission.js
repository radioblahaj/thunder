const { getThreadts } = require("../events/reaction_added")
const { getPrisma } = require("../utils/prismaConnector")
const prisma = getPrisma()
const { getHackatimeData } = require("../utils/hackatime")

module.exports = async function addFriend({ event, client, body, say, logger, ack }) {
    await ack()
    const projectName = body.view.state.values.project_name["plain_text_input-action"].value
    const githubRepo = body.view.state.values.github_repo["url_text_input-action"].value
    const email = body.view.state.values.email["email_text_input-action"].value
    const projectDesc = body.view.state.values.project_desc["plain_text_input-action"].value
    const channel = body.view.state.values.channel["multi_conversations_select-action"].selected_conversations

    const user = await prisma.user.findFirst({
        where: {
            userID: body.user.id
        }
    })
    const hackatimeData = await getHackatimeData(body.user.id, projectName)
    console.log(hackatimeData)
    const thread_ts = user.thread_ts
    console.log(thread_ts)
    console.log(user)
    if (hackatimeData >= 5) {
        await client.chat.postMessage({
            channel: "C08SQGV4BT6",
            thread_ts: thread_ts,
            text: `New project submission:\n• Project: ${projectName}\n• Repo: ${githubRepo}\n• Email: N/A \n• Description: ${projectDesc}\n• Channel: <#${channel}>`
        })
    } else {
        await client.chat.postMessage({
            channel: "C08SQGV4BT6",
            thread_ts: thread_ts,
            text: `You haven't met the hour requirement for ${projectName}:(, please resubmit when you hit the hour requirement`
        })
    }
}
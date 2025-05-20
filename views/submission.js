const { getThreadts } = require("../events/reaction_added");
const { getPrisma } = require("../utils/prismaConnector");
const prisma = getPrisma();
const { getHackatimeData } = require("../utils/hackatime");
const { updateView } = require("../utils/update");
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

module.exports = async function addFriend({ event, client, body, say, logger, ack }) {
    await ack();

    const projectName = body.view.state.values.project_name["plain_text_input-action"].value;
    const directoryName = body.view.state.values.directory_name["plain_text_input-action"].value;
    const githubRepo = body.view.state.values.github_repo["url_text_input-action"].value;
    const email = body.view.state.values.email["email_text_input-action"].value;
    const projectDesc = body.view.state.values.project_desc["plain_text_input-action"].value;
    const channel = body.view.state.values.channel["multi_conversations_select-action"].selected_conversations;
    const addressLine1 = body.view.state.values.address_line1?.["plain_text_input-action"]?.value;
    const addressLine2 = body.view.state.values.address_line2?.["plain_text_input-action"]?.value;
    const city = body.view.state.values.city?.["plain_text_input-action"]?.value;
    const postalCode = body.view.state.values.postal_code?.["plain_text_input-action"]?.value;
    const state = body.view.state.values.state?.["plain_text_input-action"]?.value;
    const country = body.view.state.values.country?.["plain_text_input-action"]?.value;
    const birthday = body.view.state.values.birthday?.["datepicker-action"]?.selected_date;
    
    // Get the thread information from the view submission
    const metadata = JSON.parse(body.view.private_metadata);
    const thread_ts = metadata.thread_ts;
    const channel_id = metadata.channel;

    const hackatimeData = await getHackatimeData(body.user.id, directoryName);
    console.log(hackatimeData);

    console.log(projectName, githubRepo, email, projectDesc, channel, addressLine1, addressLine2, city, birthday, postalCode, state, country);

    if (hackatimeData >= 5) {
        await client.chat.postMessage({
            channel: "C06V2GEV3MY",
            text: `:yay: <@${body.user.id}> just submitted ${projectName}! You can try it out at <#${channel}> and check out the code at <${githubRepo}>!`
        });
        await client.chat.postMessage({
            channel: channel_id,
            thread_ts: thread_ts,
            text: `:rac_woah: woah!! *${projectName}* is a really awesome project! You should be proud of yourself, <@${body.user.id}>! \n I need to review your submission further and make sure everything checks out! You'll get a DM from <@${process.env.ADMIN_ID}> if there's anything wrong!`
        });
        try {
            console.log("Creating Airtable record...");
            await base("YSWS Project Submission").create([
                {
                    fields: {
                        "Code URL": githubRepo,
                        "Playable URL": `https://hackclub.slack.com/archives/${channel}`,
                        "Email": email,
                        "Description": projectDesc,
                        "Address (Line 1)": addressLine1,
                        "Address (Line 2)": addressLine2,
                        "City": city,
                        "ZIP / Postal Code": postalCode,
                        "State / Province": state,
                        "Country": country,
                        "Birthday": birthday 
                    }
                }
            ]);
            console.log("Airtable record created successfully");
        } catch (error) {
            console.error("Error creating Airtable record:", error);
        }

    } else {
        await client.chat.postMessage({
            channel: channel_id,
            thread_ts: thread_ts,
            text: `You haven't hit the hour requirement yet for ${projectName}:(, please resubmit when you hit the hour requirement`
        });
    }
}
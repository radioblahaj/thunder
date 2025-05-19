const { getHackatimeData } = require("../utils/hackatime")

async function actionId0({ event, client, body, say, logger, ack }) {
    await ack()
    const channel = body.container.channel_id
    const thread_ts = body.container.message_ts
    const user = body.user.id
    console.log("this is working")
    await client.chat.postMessage({
        channel: channel,
        text: "this is working"
    })
    try {
        const result = await client.views.open({
            trigger_id: body.trigger_id,
            view: {
                type: "modal",
                callback_id: "submission",
                title: {
                    type: "plain_text",
                    text: "My App",
                    emoji: true
                },
                submit: {
                    type: "plain_text",
                    text: "Submit",
                    emoji: true
                },
                close: {
                    type: "plain_text",
                    text: "Cancel",
                    emoji: true
                },
                blocks: [
                    {
                        type: "input",
                        block_id: "project_name",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action"
                        },
                        label: {
                            type: "plain_text",
                            text: "Project Name",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "github_repo",
                        element: {
                            type: "url_text_input",
                            action_id: "url_text_input-action"
                        },
                        label: {
                            type: "plain_text",
                            text: "Github repo",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "email",
                        element: {
                            type: "email_text_input",
                            action_id: "email_text_input-action"
                        },
                        label: {
                            type: "plain_text",
                            text: "Email",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "birthday",
                        element: {
                            type: "datepicker",
                            action_id: "datepicker-action",
                            placeholder: {
                                type: "plain_text",
                                text: "Select a date",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Birthday",
                            emoji: true
                        }
                    },
                    {
                        type: "section",
                        block_id: "address_header",
                        text: {
                            type: "mrkdwn",
                            text: "*Shipping Address*"
                        }
                    },
                    {
                        type: "input",
                        block_id: "address_line1",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "Street address",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Address Line 1",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "address_line2",
                        optional: true,
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "Apartment, suite, etc.",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Address Line 2",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "city",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "City",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "City",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "postal_code",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "Postal/ZIP code",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Postal Code",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "state",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "State/Province",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "State/Province",
                            emoji: true
                        }
                    },
                    {
                        type: "input",
                        block_id: "country",
                        element: {
                            type: "plain_text_input",
                            action_id: "plain_text_input-action",
                            placeholder: {
                                type: "plain_text",
                                text: "Country",
                                emoji: true
                            }
                        },
                        label: {
                            type: "plain_text",
                            text: "Country",
                            emoji: true
                        }
                    },
                    {
                        type: "section",
                        block_id: "channel",
                        text: {
                            type: "mrkdwn",
                            text: "Test block with multi conversations select"
                        },
                        accessory: {
                            type: "multi_conversations_select",
                            placeholder: {
                                type: "plain_text",
                                text: "Select conversations",
                                emoji: true
                            },
                            action_id: "multi_conversations_select-action"
                        }
                    },
                    {
                        type: "input",
                        block_id: "project_desc",
                        element: {
                            type: "plain_text_input",
                            multiline: true,
                            action_id: "plain_text_input-action"
                        },
                        label: {
                            type: "plain_text",
                            text: "What did you make and how do I use your bot?",
                            emoji: true
                        }
                    }
                ]
            }
        });
        logger.info("Modal opened: " + result);
    } catch (error) {
        logger.error("Error opening modal: \n" + error);
    }
    await ack()
}

module.exports = actionId0
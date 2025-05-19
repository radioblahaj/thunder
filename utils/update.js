async function updateView (type, userId, client, blocks, callback_id, view_id) {
    try {
     const update = await client.views.update({
         user_id: userId,
         view: {
            view_id: view_id,
            title: {
                type: "plain_text",
                text: "My App"
            },
           type: type,
           blocks: blocks,
           callback_id: callback_id
         }
       });
    } catch(e) {
     console.error(__filename, e)
    }
  }
  module.exports = { updateView };
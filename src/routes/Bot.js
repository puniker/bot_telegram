const PostTwit = require('../controller/PostTwit')
const SendTelegramMsg = require('../controller/SendTelegramMsg')

const Bot = async( msg ) => {

    var tweet_text = `${msg.from.username}: ${msg.text}`
    if ( msg.from.last_name ) {
        var tweet_text = `${msg.from.first_name} ${msg.from.last_name}: ${msg.text}`
    } 
    const PostTwRes = await PostTwit( tweet_text )
    if ( msg.from.username === process.env.MY_CHAT_ID ) {
        SendTelegramMsg(`${msg.from.username} ha publicado un tweet`)
    }
    SendTelegramMsg(PostTwRes, msg.chat.id)

}

module.exports = Bot
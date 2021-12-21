const TelegramConnection = require('../connections/Telegram')

module.exports = (msg = '', to = process.env.MY_CHAT_ID) => {

    TelegramConnection.sendMessage(to, msg)

}

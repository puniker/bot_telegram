const SendTelegramMsg = require('../controller/SendTelegramMsg')

const Start = (msg) => {
    SendTelegramMsg(`
Bienvenido al bot de puniker.
Puedes enviarme un mensaje y lo publicaré en mi Twitter: twitter.com/punikerBot
Para ver más información sobre el bot /info
    `
    , msg.chat.id)
}

module.exports = Start
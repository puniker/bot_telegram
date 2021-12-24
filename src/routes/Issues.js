const SendTelegramMsg = require('../controller/SendTelegramMsg')

const Issues = (msg) => {
SendTelegramMsg(`
Has encontrado algún problema en el funcionamiento del bot? Puedes abrir una nueva indidencia en el respositorio: https://github.com/puniker/bot_telegram/issues
`, msg.chat.id)
}

module.exports = Issues
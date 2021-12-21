const SendTelegramMsg = require('../controller/SendTelegramMsg')

const Info = (msg) => {
SendTelegramMsg(`
Tus datos de usuario pueden ser guardados para mejoras en el bot y comunicación de futuras actualizaciones.
Puedes contribuir con el bot en mi repositorio de Github github.com/puniker/bot_telegram
`, msg.chat.id)
}

module.exports = Info
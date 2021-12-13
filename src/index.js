const express = require('express')
const cors = require('cors')
require('dotenv').config()
const TelegramConnection = require('./connections/Telegram')
const PostTwit = require('./controller/PostTwit')
const SendTelegramMsg = require('./controller/SendTelegramMsg')

TelegramConnection.on('message', async (msg) => {
    
    var tweet_text = msg.from.username + ': ' + msg.text
    if ( msg.from.last_name ) {
        var tweet_text = msg.from.first_name + ' ' + msg.from.last_name + ': ' + msg.text
    } 
    const PostTwRes = await PostTwit( tweet_text )
    SendTelegramMsg(msg.from.username + ' ' + 'ha publicado un tweet')
    SendTelegramMsg(PostTwRes, msg.chat.id)

})



const app = express()
app.use( cors() )

app.get('/', function (req, res) {
  res.json({'status':'Bot levantado'})
})

app.listen(process.env.PORT || 3080) 
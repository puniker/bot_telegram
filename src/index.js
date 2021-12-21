const express = require('express')
const cors = require('cors')
require('dotenv').config()
const TelegramConnection = require('./connections/Telegram')
const {Start, Info, Bot} = require('./routes')


TelegramConnection.on('message', async (msg) => {
    
  if ( msg.text === '/start' || msg.text === '/Start' ) {
    Start(msg)
  } else if ( msg.text === '/info' || msg.text === '/Info' ) {
    Info(msg)
  } else {
    Bot(msg)
  }

})



const app = express()
app.use( cors() )

app.get('/', function (req, res) {
  res.json({'status':'Bot levantado'})
})

app.listen(process.env.PORT || 3080) 
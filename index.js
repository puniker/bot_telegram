const dotenv = require('dotenv').config().parsed
const TelegramBot = require('node-telegram-bot-api')
const Twitter = require('twitter');

const TG_API_KEY = process.env.TG_API_KEY

const bot = new TelegramBot(TG_API_KEY, {polling: true})
const twitter_client = new Twitter({
    consumer_key:        process.env.TW_ACCESS_TOKEN_KEY,
    consumer_secret:     process.env.TW_ACCESS_TOKEN_SECRET_KEY,
    access_token_key:    process.env.TW_CONSUMER_KEY,
    access_token_secret: process.env.TW_CONSUMER_SECRET_KEY
})

// recivo mensaje de Telegram
bot.on('message', (msg) => {
    
    //console.log( msg )

    //console.log(msg.from.username + ': ' + msg.from.id + ' => ' + msg.text)
    var generated_tweet_url = 'https://twitter.com/punikerBot/status/'
    var tweet_text = msg.from.id + ' ' + msg.from.username + ': ' + msg.text
    if ( msg.from.last_name ) {
        var tweet_text = msg.from.id + ' ' + msg.from.first_name + ' ' + msg.from.last_name + ': ' + msg.text
    } 
    // publico tweet
    twitter_client.post('statuses/update', {status: tweet_text}, function(error, tweet, response) {
        
        if (!error) {
            var generated_tweet_url = 'https://twitter.com/punikerBot/status/'+tweet.id
            var respuestaEnChat='Se ha publicado tu tweet. '+ generated_tweet_url
            //console.log(tweet)
        } else {
            var respuestaEnChat='Error al publicar el tweet. Intentelo de nuevo más tarde'
            //console.log(error)
        }
        //console.log( tweet.id )
        
        //bot.sendMessage(dotenv.TG_MY_CHAT_ID, msg.from.username + ' ' + 'ha publicado un tweet')
        bot.sendMessage(msg.chat.id, respuestaEnChat)
    })
    

})
const axios = require('axios')
const request = require('request')
const fs = require('fs')
const {PostTwit, PostTwitterMedia} = require('../controller/TwitterController')
const { GetImageBuffer } = require('../controller/Image')
const SendTelegramMsg = require('../controller/SendTelegramMsg')
const TelegramService = require('../services/TelegramService')

const Bot = async( msg ) => {

    if ( msg.photo ) {
        const posted_img_url = await TelegramService.GetTelegramImage( msg.photo[3].file_id )
        const fileData = await GetImageBuffer(posted_img_url)
        const PostTweetResponse = await PostTwitterMedia( fileData, msg.caption )
        if ( msg.from.username === process.env.MY_CHAT_ID ) {
            SendTelegramMsg(`${msg.from.username} ha publicado un tweet con imagen.`)
        }
        SendTelegramMsg( PostTweetResponse, msg.chat.id )
    } else if ( msg.text ) {
        
        var tweet_text = `${msg.from.username}: ${msg.text}`
        if ( msg.from.last_name ) {
            var tweet_text = `${msg.from.first_name} ${msg.from.last_name}: ${msg.text}`
        } 
        const PostTwRes = await PostTwit( tweet_text )
        if ( msg.from.username === process.env.MY_CHAT_ID ) {
            SendTelegramMsg(`${msg.from.username} ha publicado un tweet.`)
        }
        SendTelegramMsg(PostTwRes, msg.chat.id)

    }


}



module.exports = Bot
const TwitterConnection = require('../connections/Twitter')
const fs = require('fs')

const PostTwit = ( msg ) => {
    
    return new Promise(resolve => {
        TwitterConnection.post('statuses/update', {status: msg}, function(error, tweet, response) {
        
            if (!error) {
                var generated_tweet_url = 'https://twitter.com/punikerBot/status/'+tweet.id_str
                var response='Se ha publicado tu tweet. '+ generated_tweet_url
            } else {
                var response='Error al publicar el tweet. Intentelo de nuevo más tarde'
            }
            resolve(response)
                
        })
    })

}

const PostTwitterMedia = ( fileData, msgText = '' ) => {

    return new Promise(resolve => {
        
        TwitterConnection.post('media/upload', {media: fileData}, function(error, media, response) {
            if (!error) {
                var status = {
                    status: msgText,
                    media_ids: media.media_id_string
                }
                TwitterConnection.post('statuses/update', status, function(error, tweet, response) {
                    if (!error) {
                        var generated_tweet_url = 'https://twitter.com/punikerBot/status/'+tweet.id_str
                        var response='Se ha publicado tu tweet. '+ generated_tweet_url
                    } else {
                        var response='Error al publicar el tweet. Intentelo de nuevo más tarde'
                    }
                    resolve(response)
                })
            }
        })

    })


}

module.exports = {PostTwit, PostTwitterMedia}
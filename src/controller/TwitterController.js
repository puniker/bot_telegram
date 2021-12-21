const TwitterConnection = require('../connections/Twitter')

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

const PostTwitterMedia = ( file ) => {

    //var data = require('fs').readFileSync('image.jpg');

    return new Promise(resolve => {
        
        TwitterConnection.post('media/upload', {media: file}, function(error, media, response) {
    
            if (!error) {
                console.log(media)
                var status = {
                    status: 'tweet con imagen',
                    media_ids: media.media_id_string
                }
            
                TwitterConnection.post('statuses/update', status, function(error, tweet, response) {
                    if (!error) {
                    console.log(tweet)
                    }
                    resolve(response)
                })
        
            }
        })

    })


}

module.exports = {PostTwit, PostTwitterMedia}
const Twitter = require('twitter')

module.exports = new Twitter({
    access_token_key:    process.env.TW_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET_KEY,
    consumer_key:        process.env.TW_CONSUMER_KEY,
    consumer_secret:     process.env.TW_CONSUMER_SECRET_KEY
})

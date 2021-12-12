const config = require('./config')
const axios = require('axios')
const fs = require('fs')
const request = require('request')

const img_id = 'AgACAgQAAxkBAAIBcmGsyaxLWDMMOz4bqnY-dWVdL6vHAAI5tzEbZi5pUbaRiFPyJkqwAQADAgADcwADIgQ'
const getFileRoute = `https://api.telegram.org/bot${config.TG_API_KEY}/getFile?file_id=${img_id}`
const apiRoute = `https://api.telegram.org/bot${config.TG_API_KEY}/getFile`


const develop = (msg) => {
    //console.log(msg)
    if ( msg.photo ) {
        console.log('tiene imagen')
    }
    axios.get(apiRoute, {
        params:{
            file_id: msg.photo[0].file_id
        }
    })
        .then( async(response) => {
            console.log(response.data)
            const path = await downloadFile( response.data.result.file_path, 'jpeg', (vuelta) => { console.log('aaaa') })
            //console.log( path )
        })
        .catch( (error) => {
            console.log(error)
        })
}

function downloadFile ( filePath, fileExtension, callback ) {

    const fullPath = `https://api.telegram.org/file/bot${config.TG_API_KEY}/${filePath}`
    
    request.head(fullPath, function(err, res, body){
        //console.log('content-type:', res.headers['content-type'])
        //console.log('content-length:', res.headers['content-length'])
        
        request(fullPath).pipe(fs.createWriteStream(`prueba.${fileExtension}`)).on('close', callback)
    })

    //return p
    
}


module.exports = develop

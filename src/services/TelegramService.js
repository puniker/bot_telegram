const request = require('request')
const fs = require('fs')
const axios = require('axios')

const DownloadFile = ( filePath, fileExtension, callback ) => {

    const fullPath = `https://api.telegram.org/file/bot${process.env.TG_API_KEY}/${filePath}`
    
    request.head(fullPath, function(err, res, body){
        request(fullPath).pipe(fs.createWriteStream(`prueba.${fileExtension}`)).on('close', callback)
    })
    
}

const GetTelegramImage = (file_id) => {

    //var data = require('fs').readFileSync('image.jpg')

    return new Promise((resolve, reject) => {
        axios.get(`https://api.telegram.org/bot${process.env.TG_API_KEY}/getFile`, {
            params:{
                file_id: file_id
            }
        })
        .then( async(response) => {
            resolve( `https://api.telegram.org/file/bot${process.env.TG_API_KEY}/${response.data.result.file_path}` )
        })
        .catch( (error) => {
            console.log(error)
        })
        
    })

}


module.exports = { GetTelegramImage }
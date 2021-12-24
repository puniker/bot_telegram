const fs = require('fs')
const request = require('request')


const DownloadImage = ( filePath, localName, callback ) => {

    request.head(filePath, (err, res, body) => {
        request(filePath).pipe(fs.createWriteStream( localName )).on('close', callback)
    })
    
}

const GetImageBuffer = async ( fileUrl ) => {
        
    return new Promise(resolve => {
        request.defaults({ encoding: null }).get(fileUrl, function (err, res, body) {
            resolve( body )
        })
    })

}

module.exports = { DownloadImage, GetImageBuffer }
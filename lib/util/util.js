const fs = require('fs');

function readFile(file){
    return new Promise((resolve, reject)=>{
        fs.readFile(file,'utf-8', (err, data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

function writeFile(file, content){
    return new Promise((resolve, reject)=>{
        fs.writeFile(file, JSON.stringify(content), (err)=>{
            if(err){
                reject(err)
            }else{
                resolve({
                    msg: '写入成功'
                })
            }
        })
    })
}



module.exports = {
    readFile,
    writeFile
}
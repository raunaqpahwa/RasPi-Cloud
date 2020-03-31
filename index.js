const express = require('express')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors')
const app = express()
const storageDirectory = './storage/'
const fileIndex = './file-index.json'
const usersFile = './users.json'
app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, storageDirectory)
    },
    filename(request, file, callback) {
        callback(null, file.originalname)
    }
})
const upload = multer({
    storage: storage,
    fileFilter(request, file, callback) {
        if (fs.existsSync(`${storageDirectory}${file.originalname}`)) {
            callback(null, false)
        } else {
            callback(null, true)
        }
    }
})



app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/frontend/public/index.html`)
})


app.get('/list', (request, response) => {
    const fileList = fs.readFileSync(fileIndex, 'utf-8')
    if (!fileList) {
        response.send([])
        return;
    }

    const myFiles = JSON.parse(fileList).files
    response.send(myFiles)
})





app.post('/remove-file', (request, response) => {
    const {
        filename,
        size
    } = request.body;
    fs.readFile(fileIndex, 'utf-8', (error, content) => {
        if (error) {
            console.log(error)
            response.status(500).send({
                err: 'Error deleting file'
            })
        } else {
            fs.unlink(`${__dirname}/storage/${filename}`, err => {
                console.log(err)
                return;
            })
            let existingFiles = JSON.parse(content).files;
            existingFiles = existingFiles.filter(file => file.filename !== filename && file.size !== size)
            const allFiles = `{"files": ${JSON.stringify(existingFiles)}}`
            fs.writeFile(fileIndex, allFiles, 'utf-8', (err) => {
                if (err)
                    console.log(err)
            })
            response.status(200).send({
                msg: 'Deleted file successfully'
            })
        }
    })
})


app.post('/authenticate', (request, response) => {
    const {
        username,
        password
    } = request.body
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8')).users
    for (let user of users) {
        if (user.username === username && user.password === password) {
            response.status(200).send({
                "authenticated": true
            })
            return
        }
    }
    response.status(200).send({
        "authenticated": false
    })
})


app.post('/upload-files', upload.array('files', 10), (request, response) => {
    fs.readFile(fileIndex, 'utf-8', (error, content) => {
        if (error) {
            console.log(error)
        } else {
            let existingFiles;
            if (!content) {
                content = `{
                    "files": []
                }`
            }
            existingFiles = JSON.parse(content)
            newFiles = existingFiles.files.concat(request.files)
            const allFiles = `{"files": ${JSON.stringify(newFiles)}}`
            fs.writeFile(fileIndex, allFiles, 'utf-8', (err) => {
                if (err)
                    console.log(err)
            })
        }
    })
    response.send('Done')
})

app.listen(5000, () => {
    console.log('App running on Port 5000')
})
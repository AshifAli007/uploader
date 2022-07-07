const express = require('express');
const multer = require('multer');
const app = express();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }

})

const upload = multer({storage: fileStorageEngine});



app.get('/status', (req, res)=>{
    res.send('ok');
});

app.post('/single', upload.single('image'),(req, res)=>{
    console.log(req.file);
    if(res.file){
        res.end({status: 'OK', message:'File upload Success', url: req.file.path})
    }
    res.send("image File upload success");
})

app.listen(4000, ()=>{
    console.log('server listening on port 4000');
});
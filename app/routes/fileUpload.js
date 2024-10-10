const express = require('express');
const fileRoute = express.Router();
const { uploadFile } = require('../controllers/fileController');
const multer = require('multer')
const moment = require('moment');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: (req, file, cb) => {
        const formattedDate = moment().format('DD-MM-YYYY');
        cb(null, formattedDate + "_" + file.originalname)
    }
})

const upload = multer({ storage: storage });

fileRoute.post("/file", upload.single('file'), uploadFile)


module.exports = fileRoute;
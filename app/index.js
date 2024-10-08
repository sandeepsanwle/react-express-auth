const bodyParser = require("body-parser");
const express = require('express')
const multer  = require('multer')
const dotenv = require('dotenv');
const moment = require('moment');
const path = require('path');
var cors = require('cors')

const userRoute = require("./routes/user");
const { responseFormatter } = require('./middleware/responseFormatter');
const authMiddleware = require("./middleware/authMiddleware");

const connectDB = require('./db/db');

dotenv.config({ path: './.env' });

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(responseFormatter);
app.use(authMiddleware)

// const storage = multer.diskStorage({
//   destination: (req,file,cb) => {
//      cb(null,path.join(__dirname, './uploads'))
//   },
//   filename: (req,file,cb) => {
//     const formattedDate = moment().format('DD-MM-YYYY');
//     cb(null,formattedDate + "_"+ file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

// app.post('/upload',upload.single("file"),(req,res) => {
    
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }
//   console.log("file : ", req.file);
//   return res.send("Single file uploaded successfully");
  
// })

app.use("/user", userRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
  })
})
const bodyParser = require("body-parser");
const express = require('express')
const dotenv = require('dotenv');
var cors = require('cors')

const userRoute = require("./routes/user");
const fileRoute = require("./routes/fileUpload");
const { responseFormatter } = require('./middleware/responseFormatter');
const authMiddleware = require("./middleware/authMiddleware");

const connectDB = require('./db/db');

dotenv.config({ path: './.env' });

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(responseFormatter);
app.use(authMiddleware)


app.use("/user", userRoute);
app.use("/upload", fileRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB().then(()=>{
  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
  })
})
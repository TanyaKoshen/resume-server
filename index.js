const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/index');
const errorMiddleware = require('./middlewares/error')
//require('dotenv').config();

const app = express();
const port = process.env.PORT || 8020 ;


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://tanyakoshen:W4umPCfl20ZvNd5l@cluster0.qu0uyp9.mongodb.net/server-align',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('db connected'))
    app.listen(port, () => console.log(`server started on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}

start();

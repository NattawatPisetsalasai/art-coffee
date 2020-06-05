const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const generateFile = require('../../configFile/generateConfigFile');

const helpers = require('./helpers/helpers');

const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by');
app.use(multerMid.single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/uploads', async (req, res, next) => {
  try {
    console.log('/update path');
    const myFile = req.file;
    const imageUrl = await helpers.uploadImage(myFile);

    res
      .status(200)
      .json({
        message: 'Upload was successful',
        data: imageUrl
      });
  } catch (error) {
    next(error);
  }
});

app.get('/getImage', async (req, res, next) => {
  try {
    const fileName = req.query.fileName;
    const url = helpers.getImage(fileName);
    res.status(200).send(url);
  } catch (err) {
    next(err);
  }
});

app.get('/listImage/:path', async (req, res, next) => {
  try {
    console.log('req baseurl : ', req.baseUrl);
    console.log('req path : ', req.path);
    console.log('path : ', req.params);
    await helpers.listFile();
    res.status(200).send('ok');
  } catch (err) {
    next(err);
  }
});

app.get('/sendfile', async (req, res, next) => {
  res.download(`https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/Main_1.png`);
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  });
  next();
});

app.listen(9001, () => {
  console.log('app now listening for requests!!!');
});
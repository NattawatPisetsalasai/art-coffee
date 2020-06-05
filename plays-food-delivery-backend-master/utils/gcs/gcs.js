import { Storage } from '@google-cloud/storage';
import path from 'path';
import { format } from 'util';
import { writeFileSync } from 'fs';

const serviceKey = path.join(__dirname, './bucketKey.json');
if (process.env.GCS_SA_KEY) {
  writeFileSync(serviceKey, process.env.GCS_SA_KEY);
}

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCS_PROJECT_ID
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

const gcs = {};

gcs.uploadFile = ({
  file,
  arrFolderName
}) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  let folderPath = '';
  arrFolderName.forEach((folderName) => {
    folderPath += `${folderName}/`;
  });

  const blob = bucket.file(`${folderPath}${originalname.replace(/ /g, '_')}`);
  const blobStream = blob.createWriteStream({
    resumable: false
  });

  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    resolve(publicUrl);
  })
    .on('error', (err) => {
      reject(err);
    })
    .end(buffer);
});

gcs.getPublicUrl = async ({
  file,
  arrFolderName
}) => {
  try {
    let folderPath = '';
    arrFolderName.forEach((folderName) => {
      folderPath += `${folderName}/`;
    });
    const filePath = `${folderPath}${file}`;
    const publicFile = await bucket.file(filePath).makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  } catch (err) {
    throw err;
  }
};

gcs.getSignedUrl = async ({
  file,
  arrFolderName,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0
}) => {
  try {
    let folderPath = '';
    arrFolderName.forEach((folderName) => {
      folderPath += `${folderName}/`;
    });
    const filePath = `${folderPath}${file}`;
    await bucket.file(filePath).makePrivate();

    const dayInMilliSecond = days * 24 * 60 * 60 * 1000;
    const hourInMilliSecond = hours * 60 * 60 * 1000;
    const minuteInMilliSecond = minutes * 60 * 1000;
    const secondInMilliSecond = seconds * 1000;
    const totalTime = dayInMilliSecond + hourInMilliSecond + minuteInMilliSecond + secondInMilliSecond;

    const expires = new Date(new Date().getTime() + totalTime);
    const options = {
      action: 'read',
      expires
    };

    const urlTmp = await bucket.file(filePath).getSignedUrl(options);
    return urlTmp;
  } catch (err) {
    throw err;
  }
};

gcs.deleteFile = async ({
  file,
  arrFolderName
}) => {
  try {
    let folderPath = '';
    arrFolderName.forEach((folderName) => {
      folderPath += `${folderName}/`;
    });
    const filePath = `${folderPath}${file}`;
    const deletedFile = await bucket.file(filePath).delete();
    return deletedFile;
  } catch (err) {
    throw err;
  }
};

gcs.isExists = async ({
  file,
  arrFolderName
}) => {
  try {
    let folderPath = '';
    arrFolderName.forEach((folderName) => {
      folderPath += `${folderName}/`;
    });
    const filePath = `${folderPath}${file}`;
    const fileExists = await bucket.file(filePath).exists();
    return fileExists[0];
  } catch (err) {
    throw err;
  }
};

export default gcs;

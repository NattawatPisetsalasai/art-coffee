const path = require('path');
const fs = require('fs');

const serviceKey = path.join(__dirname, './bucketKey.json');
if (process.env.GCS_SA_KEY) {
  fs.writeFileSync(serviceKey, process.env.GCS_SA_KEY);
}

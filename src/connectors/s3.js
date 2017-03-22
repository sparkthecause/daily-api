const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {
  upload: (name, data) => {

    const params = {
      Bucket: 'cdn.sparkthecause.com',
      Key: `daily/${name}`,
      Body: data
    };

    return new Promise((resolve, reject) => {
      s3.putObject(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

  }
};

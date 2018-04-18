const fileUpload = (filename, stream) => new Promise((resolve, reject) => {
  const writestream = global.gfs.createWriteStream({ filename });
  stream.pipe(writestream);

  writestream.on('error', (err) => {
    reject(err);
  });

  writestream.on('close', (file) => {
    resolve(file);
  });
});

module.exports = fileUpload;

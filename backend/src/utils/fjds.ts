// import path from 'path';
// import multer from 'multer';
// import express from 'express';
// const router = express.Router();
// import { Storage } from '@google-cloud/storage';

// const gc = new Storage({ keyFilename: path.join(__dirname, '../google.json') });

// gc.getBuckets().then((response) => console.log('got some buckets', response));

// const fileStorage = multer.memoryStorage();

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

// const upload = multer({
//   storage: fileStorage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// router.post('/profile', upload.single('image'), (req: any, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const gcsname = Date.now() + req.file.originalname;
//   const file = bucket.file(gcsname);

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype,
//     },
//     resumable: false,
//   });

//   stream.on('error', (err) => {
//     req.file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname;
//     file.makePublic().then(() => {
//       req.file.cloudStoragePublicUrl = 'hfjdshfj';
//       next();
//     });
//   });

//   stream.end(req.file.buffer);

//   res.send(`/${req.file.cloudStoragePublicUrl}`);
// });

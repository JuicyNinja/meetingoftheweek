import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import uploadFile from '../middleware/uploadMiddleware';

const __basedir = path.resolve();

const baseUrl = '/uploads/';

const upload = async (req: Request, res: Response) => {
  try {
    await uploadFile(req, res);
    if (req.file === undefined) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }
    res.status(200).send({
      message: 'Uploaded the file successfully: ',
      filename: res.req.file?.filename
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req: Request, res: Response): void => {
  const directoryPath = path.join(__basedir, 'public/uploads/');
  console.log(directoryPath);
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
      return;
    }

    const fileInfos = files.map(file => ({
      name: file,
      url: baseUrl + file,
    }));

    res.status(200).send(fileInfos);
  });
};

const download = (req: Request, res: Response): void => {
  const fileName = req.params.id;
  const directoryPath = path.join(__basedir, 'public/uploads/');
  res.download(path.join(directoryPath, fileName), fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      });
    }
  });
};

export { upload, getListFiles, download };
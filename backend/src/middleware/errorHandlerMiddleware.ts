import express from 'express';

const errorHandlerMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
};

export default errorHandlerMiddleware;
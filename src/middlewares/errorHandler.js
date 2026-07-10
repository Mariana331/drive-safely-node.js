import { isHttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export default errorHandler;

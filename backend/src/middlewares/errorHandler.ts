import { Request, Response, NextFunction } from "express";
import { constants } from "../../constants";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    res.statusCode !== 200 ? res.statusCode : constants.INTERNAL_SERVER_ERROR;
  let title: string;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      title = "Validation error";
      break;
    case constants.UNAUTHORIZED:
      title = "Unauthorized";
      break;
    case constants.FORBIDDEN:
      title = "Forbidden";
      break;
    case constants.NOT_FOUND:
      title = "Not found";
      break;
    case constants.INTERNAL_SERVER_ERROR:
    default:
      title = "Internal server error";
      break;
  }

  res.status(statusCode).json({
    title: title,
    message: err.message || "Internal server error",
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default errorHandler;

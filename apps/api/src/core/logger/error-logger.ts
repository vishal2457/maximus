import { BaseLogger } from "./base-logger";

class ErrorLoggerClass extends BaseLogger {
  constructor(filename: string) {
    super(filename, 'error');
  }

  write(data: any) {
    this.logger.error(JSON.stringify(data));
  }
}

const ErrorLogger = new ErrorLoggerClass("error.log");
export default ErrorLogger;

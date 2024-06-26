const {
  NODE_ENV = "development",
  PORT = 3000,
  ENCRYPT = false,
  DB_NAME = "greenbowl",
  DB_HOST = "localhost",
  DB_PORT = 3306,
  DB_USERNAME = "root",
  DB_PASSWORD = "",
  DB_SYNC = false,
  NODE_HOST = "localhost",
  AWS_SECRET_KEY = "",
  AWS_ACCESS_KEY = "",
  AWS_REGION = "",
  AWS_BUCKET_NAME = "",
  DEFAULT_IMAGE_QUALITY_REDUCTION,
  SENDER_EMAIL_HOST = "",
  SENDER_EMAIL_PORT,
  SENDER_EMAIL_ID = "",
  SENDER_EMAIL_PASSWORD = "",
  ROOT_DIR = 'apps/api',
  APP_NAME = 'NODE API'
} = process.env;

export const APP_SETTINGS = {
  SENDER_EMAIL_HOST,
  SENDER_EMAIL_PORT: parseInt(SENDER_EMAIL_PORT || '465'),
  SENDER_EMAIL_ID,
  SENDER_EMAIL_PASSWORD,
  NODE_ENV,
  PORT,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SYNC: DB_SYNC === "true",
  ENCRYPT,
  NODE_HOST,
  AWS_ACCESS_KEY,
  AWS_SECRET_KEY,
  AWS_REGION,
  AWS_BUCKET_NAME,
  ROOT_DIR,
  APP_NAME,
  DEFAULT_IMAGE_QUALITY_REDUCTION: parseInt(
    DEFAULT_IMAGE_QUALITY_REDUCTION || "80"
  ),
};

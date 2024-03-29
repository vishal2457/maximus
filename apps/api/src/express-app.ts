import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger';
import { responseHandler } from 'proses-response';
import errorHandler from './core/middlewares/error-handler.middleware';
import modules from './modules/index';
import cors from 'cors';
import path from 'path';
import { APP_SETTINGS } from './core/app-settings';

const app = express();

app
  // swagger docs
  .use(
    '/api-docs/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      swaggerOptions: {
        docExpansions: 'none',
        persistAuthorization: true,
      },
    })
  )
  .use('/static', express.static(path.join(__dirname, '../src/public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors());

//init response settings
configureResponse();

//expose app settings
app.use('/_settings', (req, res) => {
  res.status(200).json({});
});

//init all the modules
(modules as any)(app);

app.use('/', (req, res) => {
  res.send(`<html><title>${APP_SETTINGS.APP_NAME}</title>
  <body style="
    display: flex;
    align-items: center;
    justify-content: center;
  ">
  <div>
  ⚡️[server]: Backend is running on ${req.headers.host} with <a href="http://${req.headers.host}/api-docs/">SwaggerUI docs</a>
  </div>
  </body></html>`);
});

//global error handler
app.use(errorHandler);

export default app;

function configureResponse() {
  responseHandler.registerDialect('mysql');
}

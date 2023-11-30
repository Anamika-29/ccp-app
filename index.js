import express from "express";
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import statusMonitor from 'express-status-monitor';
import Route from './routes/Routes.mjs';

import('./database/db.js').then((module) => {
  const Connection = module.default;

  const app = express();


  app.use(cors());
  app.use(statusMonitor());
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/events", Route);

  app.use('/', Route);

  app.set('port', process.env.PORT || 8000);
console.log("+++++++++++++++" + app.get('port'));

  Connection();
  app.use(express.static('./client/build'));

  
  app.get("*", (req, res) => { //our GET route needs to point to the index.html in our build
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

    app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port'));
  });
});


















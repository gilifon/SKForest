const express = require("express"); //easy routing
//const http = require('http');
const https = require('https');
var fs = require('fs');
const compression = require("compression"); //compress http response
const helmet = require("helmet"); //protect web vulnerabilities
const path = require("path");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");

const app = express();

const privateKey  = fs.readFileSync('sslcert/iarc.key', 'utf8');
const certificate = fs.readFileSync('sslcert/iarc.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

/************************************* Middlewares *********************************/
//use Middleware
app.use(helmet()); //protection
app.use(logger); //log every requst
app.use(compression()); //Compress all routes
app.use(express.json()); //accept json body
app.use(express.urlencoded({ extended: false }));
app.use(cors); //allow cors
/***********************************************************************************/

//use static folder
//app.use(express.static(path.join(__dirname,'ui')));

//api routes
app.use("/api", require("./routes/api/api_sk"));

//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`server running on ${PORT}`);
// });
httpsServer.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

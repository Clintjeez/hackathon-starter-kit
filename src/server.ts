import mongoose from 'mongoose';
import app from './app';
import config from './config';
import errorHandler from "errorhandler";
// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ",
  );
  process.exit();
}


// Connect to our Database and handle any bad connections
mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});



app.use(errorHandler());

const server = app.listen(config.port, () => {
  console.log(`Express running → PORT ${config.port}`);
});

export default server;
import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';


mongoose.connect('mongodb://127.0.0.1:27017/auth', {useNewUrlParser: true});

const app = express();


app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);


const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => console.log(`Backend API listening on port ${port}`));
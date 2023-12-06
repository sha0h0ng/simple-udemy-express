import express from 'express';
import config from 'config';
import cors from 'cors';
import courses from './routes/course.mjs';
import updateCourseCatelog from './udemy_api_calls/courses.mjs';

const PORT = config.get('server.port');
const HOST = config.get('server.host');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/course', courses);

app.get('/', async (request, response) => {
    response.send('This is a demo app').status(200);
});

//updateCourseCatelog();

app.listen(PORT, HOST, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server is running on port: http://${HOST}:${PORT}`);
});

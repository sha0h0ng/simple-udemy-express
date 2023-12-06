import axios from 'axios';
import cron from 'node-cron';

function CoursesJob(schedule) {
    // schedule format should be '*/10 * * * * *' -> every 10 sec
    cron.schedule(schedule, () => {
        console.log('Testing!');
    });
}

export default CoursesJob;

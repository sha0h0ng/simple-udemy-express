import axios from 'axios';
import 'dotenv/config';
import sqlite from '../database_conn/sqlite.mjs';

const token = `${process.env.UDEMY_SECRET_ID}:${process.env.UDEMY_SECRET_KEY}`;
const encodedToken = Buffer.from(token).toString('base64');
const headers = { Authorization: 'Basic ' + encodedToken };

const baseUrl = `https://${process.env.UDEMY_ACCOUNT_NAME}.${process.env.UDEMY_DOMAIN}/api-2.0/organizations/${process.env.UDEMY_ACCOUNT_ID}`;

async function fetch(url) {
    try {
        console.log(url);
        const response = await axios.get(url, {
            headers,
        });
        return response.data;
    } catch (ex) {
        if (
            ex &&
            ex !== undefined &&
            ex.toString &&
            ex.toString !== undefined
        ) {
            // print the general exception
            console.log(ex.toString());
        }
        if (
            ex.response &&
            ex.response !== undefined &&
            ex.response.data &&
            ex.response.data !== undefined
        ) {
            // print the exception message from axios response
            console.log(ex.response.data);
        }
        console.log(ex);
    }
}

async function updateCourseCatelog() {
    const db = sqlite();

    let currentDate = new Date().toJSON().slice(0, 10);
    let url = `${baseUrl}/courses/list/`;
    do {
        let tmp = await fetch(url);
        tmp.results.forEach((course) => {
            db.run(
                'REPLACE INTO courses VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    course.id,
                    course.title,
                    course.description,
                    course.url,
                    course.estimated_content_length,
                    course.num_lectures,
                    course.num_videos,
                    course.promo_video_url[0],
                    course.promo_video_url[1],
                    course.promo_video_url[2],
                    course.promo_video_url[3],
                    course.instructors[0],
                    course.requirements.list[0],
                    course.images.size_48x27,
                    course.images.size_50x50,
                    course.images.size_75x75,
                    course.images.size_96x54,
                    course.images.size_100x100,
                    course.images.size_125_H,
                    course.images.size_200_H,
                    course.images.size_240x135,
                    course.images.size_304x171,
                    course.images.size_480x270,
                    course.images.size_750x422,
                    course.mobile_native_deeplink,
                    course.last_update_date,
                    course.xapi_activity_id,
                    course.is_custom,
                    course.is_imported,
                    course.headline,
                    course.level,
                ],
                (err) => {
                    if (err) {
                        return console.log(err.message, course.id);
                    }
                }
            );
        });
        url = tmp.next;
    } while (url);
}

export default updateCourseCatelog;

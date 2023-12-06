import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express.Router();

const token = `${process.env.UDEMY_SECRET_ID}:${process.env.UDEMY_SECRET_KEY}`;
const encodedToken = Buffer.from(token).toString("base64");
const headers = { Authorization: "Basic " + encodedToken };

const baseUrl = `https://${process.env.UDEMY_ACCOUNT_NAME}.udemy.com/api-2.0/organizations/${process.env.UDEMY_ACCOUNT_ID}/analytics`;

async function fetchUserActivity() {
    try {
        const response = await axios.get(`${baseUrl}/user-activity/`, {
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

router.get("/", async (request, response) => {
    let tmp = await fetchUserActivity();
    response.send(tmp).status(200);
});

export default router;

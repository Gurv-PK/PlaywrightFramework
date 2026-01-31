//@ts-check
import dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.ENV || 'qa'}`
});

/** @type {Object.<string, {url: string, apiurl: string}>} */
const ENV_CONFIG = {
    qa: {
        url: process.env.QA_URL || 'https://www.saucedemo.com/',
        apiurl : 'https://restful-booker.herokuapp.com',
    },
    stage: {
        url: process.env.stage_URL || 'https://www.saucedemo.com/',
        apiurl : 'https://restful-booker.herokuapp.com',
    },
    prod: {
        url: process.env.prod_URL || 'https://www.saucedemo.com/',
        apiurl : 'https://restful-booker.herokuapp.com',
    }
};
const currentEnv = process.env.ENV || 'qa';
export default ENV_CONFIG[currentEnv];
const axios = require('axios');
const https = require('https');

// Create an axios instance for the request with basic auth
const basicAuthRequest = (url, method, bodyReq, headers) => {
    const username = process.env.BRIGATE_BASIC_AUTH_USERNAME;
    const password = process.env.BRIGATE_BASIC_AUTH_PASSWORD;

    const base64Auth = btoa(`${username}:${password}`);

    const tempHeaders = headers || {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Authorization': `Basic ${base64Auth}`,
    } ;

    const options = {
        method,
        url,
        mode: 'cors',
        headers: tempHeaders,
        data: bodyReq,
    };

    const axiosReq = axios(options).then((axiosRes ) => {
        return axiosRes.data
    }).catch((err) => {
        return err
    });

    return axiosReq;
}

// Create an axios instance for the request with token auth
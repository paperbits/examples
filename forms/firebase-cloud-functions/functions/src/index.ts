import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const submitForm = functions.https.onRequest(async (request, response) => {
    //get params from request
    const requestToken = request.body.requestToken || request.query.requestToken;
    const _redirect = request.body._redirect || request.query._redirect;
    //allow only GET and POST 
    if (request.method !== "GET" && request.method !== "POST" && !requestToken) {
        response.status(403).send(`Forbidden: method ${request.method} is not allowed`);
    } else {
        const submitTime = new Date().toString();
        try {
            const db = admin.database().ref(`form_submits/${submitTime}`);
            await db.set({ query_params: request.query, body_params: request.body });
            //redirect if _redirect was in request
            if (_redirect) {
                response.redirect(_redirect);
            } else {
                response.status(200).send("request successfully submitted");
            }
        } catch(error) {
            console.log("error:" + error);
            response.status(500).send("Internal server error");
        }
    }
});

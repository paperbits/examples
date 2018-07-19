import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const submitForm = functions.https.onRequest(async (request, response) => {
    // Get params from request
    const requestToken = request.body.requestToken || request.query.requestToken;
    const redirectUrl = request.body._redirect || request.query._redirect;

    // Allow only POST
    if (request.method !== "POST" && !requestToken) {
        response.status(403).send(`Forbidden: method ${request.method} is not allowed.`);
    }
    else {
        const submitTime = new Date().toString();

        try {
            const db = admin.database().ref(`submissions/${submitTime}`);
            await db.set({ query_params: request.query, body_params: request.body });

            if (redirectUrl) {
                response.redirect(redirectUrl);
            } else {
                response.status(200).send("Request successfully submitted.");
            }
        }
        catch (error) {
            console.log("error:" + error);
            response.status(500).send("Internal server error.");
        }
    }
});

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Stripe from "stripe";

admin.initializeApp();

const stripeService = new Stripe(functions.config().stripe.token);

export const submitChargeForm = functions.https.onRequest(async (request, response) => {
    //get params from request
    const requestToken = request.body.requestToken || request.query.requestToken;
    const _redirect = request.body._redirect || request.query._redirect;
    //allow only POST 
    if (request.method !== "POST" && !requestToken) {
        response.status(403).send(`Forbidden: method ${request.method} is not allowed`);
    } else {
        const body = request.body;
        const card_number = body.card_number;
        const card_cvc    = body.card_cvc;

        const exp_data    = body.exp_data.split("/");
        const exp_month   = +exp_data[0];
        const exp_year    = +exp_data[1];
        
        const card_name   = body.cardholder_name;
        const city        = body.city;
        const country     = body.country;
        const address1    = body.address1;
        const address2    = body.address2;
        const state       = body.state;
        const zip         = body.zip;
        
        const amount      = (+body.amount) * 100;
        const email       = body.email;

        const currency    = "usd"; //body.currency

        const submitTime = new Date().toString();
        try {
            const card: Stripe.cards.ISourceCreationOptions = {
                object: "card",
                number: card_number,
                cvc: card_cvc,
                exp_month: exp_month,
                exp_year: exp_year,
                name: card_name,
                address_city:    city,
                address_country: country,
                address_line1:   address1,
                address_line2:   address2,
                address_state:   state,
                address_zip:     zip
            }
            const cardToken = await stripeService.tokens.create({card});
            const charge = await stripeService.charges.create({
                amount,
                currency,
                description: 'Paperbits example',
                source: cardToken.id,
                receipt_email: email
            });
            console.info(`Charge for ${email} successfully submitted`);

            const db = admin.database().ref(`charge_submits/${submitTime}`);
            await db.set({ payer_name: card_name, charge_data: charge });
            //redirect if _redirect was in request
            if (_redirect) {
                response.redirect(_redirect);
            } else {
                response.status(200).send("Charge successfully submitted");
            }
        } catch(error) {
            console.error(error);
            response.status(500).send("Internal server error");
        }
    }
});
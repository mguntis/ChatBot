'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    let speech = "";
    switch (req.body.result.metadata.intentName ) {
        case "workpermit.immigrate_to":
            let country = req.body.result && req.body.result.parameters && req.body.result.parameters.geoCountry ? req.body.result.parameters.geoCountry : "Seems like some problem. Speak again.";

            switch (country) {
                case "United States of America":
                    speech = "Info about immigration to US -> " +
                        "http://www.workpermit.com/immigration/usa";
                    break;
                case "United Kingdom of Great Britain and Northern Ireland":
                    speech = "Info about immigration to UK -> " +
                        "http://www.workpermit.com/immigration/united-kingdom";
                    break;
                    case "Australia":
                    speech = "Info about immigration to Australia -> " +
                        "http://www.workpermit.com/immigration/australia";
                    break;
                    case "Canada":
                    speech = "Info about immigration to Canada -> " +
                        "http://www.workpermit.com/immigration/canada";
                    break;
                default:
                    speech = "We have no information about immigration to " + country;
            }

            return res.json({
                speech: speech,
                displayText: speech,
                source: 'my-first-chatbot'
            });
            break;

        case "workpermit.visa":
            let visa = req.body.result && req.body.result.parameters && req.body.result.parameters.visa ? req.body.result.parameters.visa : "Seems like some problem. Speak again.";
            let visaCountry = req.body.result.parameters.visaCountry;
            if (visaCountry === ""){
                speech = "About which country you need information?"
            } else {
                speech = "You need info about " + visa + "?";
            }

    }
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});

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
        case "workpermit.immigrate_to_context":
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
            break;

        case "workpermit.visa":
        case "workpermit.visa_country":
            let visa = req.body.result && req.body.result.parameters && req.body.result.parameters.visa ? req.body.result.parameters.visa : "this type visa";
            let visaCountry = req.body.result.parameters.visaCountry;
            if (visaCountry === ""){
                switch (visa) {
                    case "visa":
                        speech = "What type of visa?";
                        break;
                    case "Tier 1":
                        speech = visa + " is UK highly skilled worker visa";
                        break;
                    case "Tier 2":
                        speech = visa + " is UK skilled worker visa";
                        break;
                    case "Tier 4":
                        speech = visa + " is UK student visa";
                        break;
                    case "Tier 5":
                        speech = visa + " is UK tempory worker visa";
                        break;
                    default:
                        speech = "About which country you need information?";
                }
            } else {
                switch (visaCountry){
                    case "United Kingdom of Great Britain and Northern Ireland":
                        switch (visa){
                            case "Tier 1":
                                speech = "You mean " + visa + ": highly skilled worker visa?";
                                break;
                            case "Tier 2":
                                speech = "You mean " + visa + ": skilled worker visa?";
                                break;
                            case "Tier 4":
                                speech = "You mean " + visa + ": student visa?";
                                break;
                            case "Tier 5":
                                speech = "You mean " + visa + ": tempory worker visa?";
                                break;
                            default:
                                speech = "At the moment we have information about Tier 1, Tier 2, Tier 4 and Tier 5 visa";
                        }
                        break;
                    case "United States of America":
                        switch (visa){
                            case "E2":
                                speech = "You mean " + visa + ": highly skilled worker visa?";
                                break;
                            case "E1":
                                speech = "You mean " + visa + ": skilled worker visa?";
                                break;
                            case "E3":
                                speech = "You mean " + visa + ": student visa?";
                                break;
                            case "L1":
                                speech = "You mean " + visa + ": tempory worker visa?";
                                break;
                            default:
                                speech = "Sorry we have no information about this visa in this country!";
                        }
                        break;
                    default:
                        speech = "At the moment we have no information about this country visas!";
                }
            }
            break;
    }

    return res.json({
        speech: speech,
        displayText: speech,
        source: 'my-first-chatbot'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});

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
                    speech = "Information about immigration to USA can be found at: " +
                        "http://www.workpermit.com/immigration/usa";
                    break;
                case "United Kingdom of Great Britain and Northern Ireland":
                    speech = "Information about immigration to UK can be found at: " +
                        "http://www.workpermit.com/immigration/united-kingdom";
                    break;
                    case "Australia":
                    speech = "Information about immigration to Australia can be found at: " +
                        "http://www.workpermit.com/immigration/australia";
                    break;
                    case "Canada":
                    speech = "Information about immigration to Canada can be found at: " +
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
                        speech = 'In order to get a Tier 1 visa please contact us at london@workpermit.com '+
                            'or read more about it at https://goo.gl/dgepSH ';
                        break;
                    case "Tier 2":
                        speech = 'In order to get a Tier 2 visa please contact us at london@workpermit.com '+
                            'or read more about it at https://goo.gl/aFktuc ';
                        break;
                    case "Tier 4":
                        speech = 'In order to get a Tier 4 visa please contact us at london@workpermit.com '+
                            'or read more about it at https://goo.gl/mBi7Ro ';
                        break;
                    case "Tier 5":
                        speech = 'In order to get a Tier 5 visa please contact us at london@workpermit.com '+
                            'or read more about it at https://goo.gl/7NRXF1 ';
                        break;
                    default:
                        speech = "About which country you need information?";
                }
            } else {
                switch (visaCountry){
                    case "United Kingdom of Great Britain and Northern Ireland":
                        switch (visa){
                            case "Tier 1":
                            case "highly skilled worker visa":
                                speech = 'In order to get a Tier 1 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/dgepSH ';
                                break;
                            case "Tier 2":
                            case "skilled worker visa":
                                speech = 'In order to get a Tier 2 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/aFktuc ';
                                break;
                            case "Tier 4":
                            case "student visa":
                                speech = 'In order to get a Tier 4 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/mBi7Ro ';
                                break;
                            case "Tier 5":
                            case "tempory worker visa":
                                speech = 'In order to get a Tier 5 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/7NRXF1 ';
                                break;
                            default:
                                speech = "At the moment we have information about Tier 1, Tier 2, Tier 4 and Tier 5 visas";
                        }
                        break;
                    case "United States of America":
                        switch (visa){
                            case "E2":
                                speech = 'In order to get a E2 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/C9aeVn ';
                                break;
                            case "E1":
                                speech = 'In order to get a E1 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/ifAzp7 ';
                                break;
                            case "E3":
                                speech = 'In order to get a E3 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/qrQmuc ';
                                break;
                            case "L1":
                                speech = 'In order to get a L1 visa please contact us at london@workpermit.com '+
                                    'or read more about it at https://goo.gl/SQvXaj ';
                                break;
                            default:
                                speech = "Sorry we have no information about this visa in this country, yet!";
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

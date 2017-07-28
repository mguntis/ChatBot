'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    if (req.body.result.metadata.intentName = "workpermit.immigrate_to") {
        var speech = "";
        var country = req.body.result && req.body.result.parameters && req.body.result.parameters.geoCountry ? req.body.result.parameters.geoCountry : "Seems like some problem. Speak again."

        switch (country) {
            case "United States of America":
                speech = "If you need information about immigration to US please say YES";
                break;
            case "United Kingdom of Great Britain and Northern Ireland":
                speech = "If you need information about immigration to UK please say YES";
                break;
            default:
                speech = "We have't information about immigration to " + country;
        }

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'my-first-chatbot'
        });
    }
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});

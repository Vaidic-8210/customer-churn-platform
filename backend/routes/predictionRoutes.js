const express = require("express");
const router = express.Router();

const {

predictCustomer,
savePrediction,
getDashboard,
getHistory,
getAnalytics

}

=

require(
"../controllers/predictionController"
);


router.post(
"/predict",
predictCustomer
);

router.post(
"/predictions/save",
savePrediction
);

router.get(
"/dashboard",
getDashboard
);

router.get(
"/history",
getHistory
);

router.get(
"/analytics",
getAnalytics
);

module.exports =
router;
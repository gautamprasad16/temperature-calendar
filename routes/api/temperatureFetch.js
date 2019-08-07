const express = require('express');
const router = express.Router();
const request = require('request');


// @route       GET /api/getTemp/:userName
// @desc        get user repos from github
// @access      public
router.get('/:date', async (req, res) => {
    try {
        const options = {
            uri: `http://interview.com360degree.com/api/getWeather?date=${req.params.date}`,
            method: 'POST'
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                res.status(404).json({
                    msg: 'No Temp Record found'
                });
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SERVER ERROR");
    }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const hueService = require('./hue-service')

router.get('/action/light/on/:lightId', async (req, res, next) => {
    const lightId = +req.params.lightId;
    try {
        await hueService.turnLightOn(lightId);
        res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.get('/action/light/off/:lightId', async (req, res, next) => {
    const lightId = +req.params.lightId;
    try {
        await hueService.turnLightOff(lightId);
        res.status(200).send();
    } catch (err) {
        next(err);
    }
});

router.get('/light', async (req, res, next) => {
    try {
        const lights = await hueService.getLights();
        res.json(lights);
    } catch (err) {
        next(err);
    }
});

router.get('/light/:lightId', async (req, res, next) => {
    const lightId = +req.params.lightId;
    try {
        const light = await hueService.getLight(lightId);
        res.json(light);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
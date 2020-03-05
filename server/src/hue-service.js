const v3 = require('node-hue-api').v3;
const discovery = v3.discovery;
const hueApi = v3.api;
const LightState = v3.lightStates.LightState;

class HueService {
    constructor() {
    }

    async getLights() {
        return this.api.lights.getAll();
    }

    async getLight(lightId) {
        return this.api.lights.getLight(lightId).then(light => light._data);
    }

    async turnLightOn(lightId) {
        return this._setLightState(lightId, new LightState().on());
    }

    async turnLightOff(lightId) {
        return this._setLightState(lightId, new LightState().off());
    }

    async _setLightState(lightId, state) {
        const light = await this.api.lights.getLight(lightId);
        return this.api.lights.setLightState(light, state);
    }

    async initialize() {
        const bridgeIp = await this.discoverBridge();
        if (bridgeIp === undefined) {
            throw new Error('Could not find HUE bridge');
        }
        return this.connect(bridgeIp);
    }

    async discoverBridge() {
        const bridges = await discovery.nupnpSearch();

        if (bridges.length === 0) {
            return undefined;
        } else {
            return bridges[0].ipaddress;
        }
    }

    async connect(bridgeIp) {
        this.api = await hueApi
            .createLocal(bridgeIp)
            .connect(process.env.HUE_USER);
    }
}

module.exports = new HueService();
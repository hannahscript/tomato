const endpoint = 'http://localhost:3000';

export async function turnLightOn(lightId) {
    return fetch(`${endpoint}/hue/action/light/on/${lightId}`);
}

export async function turnLightOff(lightId) {
    return fetch(`${endpoint}/hue/action/light/off/${lightId}`);
}

export async function getLight(lightId) {
    return fetch(`${endpoint}/hue/light/${lightId}`).then(r => r.json());
}
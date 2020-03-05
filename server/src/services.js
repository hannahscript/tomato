const hueService = require('./hue-service');

const initialize = () => Promise.all([
    hueService.initialize()
])
.then(() => console.log('Services initialized'))
.catch(error => {
    console.error(error);
    process.exit(1);
});

module.exports = initialize;
const { usingSourcebit } = require('./using-sourcebit');

async function initContent() {
    if (usingSourcebit) {
        const sourcebit = require('sourcebit');
        const sourcebitConfig = require('./sourcebit.js');
        await sourcebit.fetch(sourcebitConfig);
    }
}

module.exports = {
    initContent
};

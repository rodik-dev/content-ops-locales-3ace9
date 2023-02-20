const envValue = process.env.USE_SOURCEBIT;
const usingSourcebit = typeof envValue === 'undefined' || String(envValue).toLowerCase() === 'true';

module.exports = {
    usingSourcebit
};

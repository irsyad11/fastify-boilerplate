// const {logger} = require('./logger');

const aliasMode = {
    local: '.env.local',
};

const options =  (nodeEnv = aliasMode.local) => nodeEnv===aliasMode.local ? {
    logger: JSON.parse(process.env.DEV_CONSOLE_LOGGER),
    ajv: JSON.parse(process.env.AJV_CONFIG),
} : {};

module.exports = { options }
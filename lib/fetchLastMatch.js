const axios = require('axios');
const { resultCodes } = require('./resultCodes');

exports.fetchLastMatch = async function (profileId) {
    const baseUrl = 'https://aoe2.net/api/player/matches?game=aoe2de&count=1&profile_id=';
    try {
        const response = await axios.get(baseUrl + profileId);
        const data = response.data;
        if (Array.isArray(data) && data.length === 1){
            data[0].resultCode = resultCodes.OK;
            return data[0];
        }
        return {resultCode: resultCodes.NOT_FOUND};
    } catch (error) {
        console.error(error);
        return {resultCode: resultCodes.ERROR};
    }
};
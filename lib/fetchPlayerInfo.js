const axios = require('axios');
const { resultCodes } = require('./resultCodes');

exports.fetchPlayerInfo = async function (profileId) {
    const baseUrl = 'https://aoe2.net/api/player/lastmatch?game=aoe2de&profile_id=';
    try {
        const response = await axios.get(baseUrl + profileId);
        const data = response.data;
        if(data.profile_id){
            return {
                profile_id: data.profile_id,
                steam_id: data.steam_id,
                name: data.name,
                clan: data.clan,
                country: data.country,
                last_match_id: data.last_match.match_id,
                resultCode: resultCodes.OK
            };
        }
        return {resultCode: resultCodes.NOT_FOUND};
    } catch (error) {
        console.error(error);
        return {resultCode: resultCodes.ERROR};
    }
};

const axios = require('axios');
const config = require("../config.json");

const formatCoords = (coordinates) => {
    return coordinates[0] + "," + coordinates[1];
}

const postToDiscordWebhook = (incident, distance) => {
    const dispatchTime = incident.receivedTime.toLocaleTimeString("en-us", {
        timeZone: 'America/Los_Angeles',
        timeStyle: "short",
        hour12: false,
    });

    const image = `https://www.mapquestapi.com/staticmap/v5/map?key=${config.credentials.mapQuestKey}&center=${formatCoords(config.alertRegion.center)}&zoom=13&locations=${formatCoords(config.alertRegion.center)}||${formatCoords(incident.coordinates)}|incident-lg&size=600,400&defaultMarker=marker-home&size=600,400&type=dark`
    const embed = {
        title: incident.type,
        description: `**Distance:** ${distance.toFixed(2)} miles\n**Address***: ${incident.address}\n**Time**: ${dispatchTime}n\n*<:greylocation:1198947873702805574>: Your Location | ⚠️: Incident Location*`,
        image: {
            url: image,
        },
        thumbnail: {
            url: `${config.agencyLogoURL}`, // Replace this with the actual URL to the logo
        },
        color: 0x3498db,
    };
    const payload = {
        content: `<@${config.userID}>`,
        embeds: [embed],
    };


    axios.post(`${config.webhookURL}`, payload)
        .then(response => console.log(`Message sent: ${response.data}`))
        .catch(error => console.error(`Error sending message: ${error}`));
};

module.exports = postToDiscordWebhook;
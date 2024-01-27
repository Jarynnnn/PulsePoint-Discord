const { getIncidents } = require("pulsepoint");
const haversine = require("./math");
const postToDiscordWebhook = require("./webhook");

const config = require("../config.json");

const notified = new Set();

const checkIncidents = async () => {
  const incidents = await getIncidents(config.agencies);

  incidents.active.forEach((incident) => {
    if (notified.has(incident.id)) return;
    const dispatchTime = incident.receivedTime.toLocaleTimeString("en-us", {
      timeZone: 'America/Los_Angeles',
      timeStyle: "short",
      hour12: false,
  });
    const distance = haversine(incident.coordinates, config.alertRegion.center);

    if (distance <= config.alertRegion.radius) {
      console.log(`🚨 Incident ${incident.id} is ${distance} miles away, dispatched at ${dispatchTime}`);

      notified.add(incident.id);
      postToDiscordWebhook(incident, distance);
    }
  });
};

setInterval(checkIncidents, config.checkInterval * 60 * 1000);

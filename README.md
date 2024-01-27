# PulsePoint-Discord
 Get notifications sent to a Discord webhook whenever a PulsePoint incident is created within a certain range.

 Uses a free [MapQuest API](https://developer.mapquest.com/) key to visually map incident locations in relation to the configured alert region.

## Configuration
Set up the app with the following in `config.json`
| Key                        | Value                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `agencies`                 | Array of PulsePoint agency IDs.                                                                                                                        |
| `agencyLogoURL`            | Image URL of the agency's logo.                                                                                                                        |
| `webhookURL`               | URL of your Discord webhook.                                                                                                                           |
| `checkInterval`            | Time in minutes to check for incidents (5-10 min recommended to avoid flooding the API).                                                               |
| `alertRegion.center`       | 2 numbers representing the latitude and longitude of your location.                                                                                    |
| `alertRegion.radius`       | Radius in miles that you would like to get alerted for.                                                                                                |
| `credentials.mapQuestKey`  | Obtainable from MapQuest Developer                                                                                                                     |

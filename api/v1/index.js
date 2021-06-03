const app = require('express')()
const fetch = require('node-fetch');


app.get('/activities/:userName', async ({params: {userName}}, res, next) => {
  let refreshToken
  switch (userName) {
    case 'calvin':
    refreshToken = process.env.STRAVA_REFRESH_TOKEN_CALVIN
    break;
    case 'carson':
      refreshToken = process.env.STRAVA_REFRESH_TOKEN_CARSON
      break;
    case 'aaron':
      refreshToken = process.env.STRAVA_REFRESH_TOKEN_AARON
  }
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
    })

    const reauthorizeResponse = await fetch('https://www.strava.com/oauth/token', {
        method: 'post',
        'headers': headers,
        'body': body
    })

    const reAuthJson = await reauthorizeResponse.json()
    const response = await fetch('https://strava.com/api/v3/athlete/activities?before=1625356800&after=1622592000&access_token=' + reAuthJson.access_token)
    const json = await response.json()
    res.json({data: json })

})


module.exports = app
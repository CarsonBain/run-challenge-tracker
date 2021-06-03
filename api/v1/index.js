const app = require('express')()
const { json } = require('express');
const fetch = require('node-fetch');


// app.get('/users/:userId', async ({ params: { userId } }, res, next) => {
//   try {
//     const user = await API.MWwz(userId, 'psn')
//     res.json({ data: user })
//   } catch (err) {
//     next(err)
//   }
// })

// app.get('/matches/:userId', async ({ params: { userId } }, res, next) => {
//   try {
//     const match = await API.MWcombatwz(userId, 'psn')
//     res.json({ data: match })
//   } catch (err) {
//     next(err)
//   }
// })

app.get('/activities/:userName', async ({params: {userName}}, res, next) => {
  let refreshToken
  switch (userName) {
    case 'calvin':
    refreshToken = process.env.STRAVA_REFRESH_TOKEN_CALVIN
    break;
    case 'carson':
      refreshToken = process.env.STRAVA_REFRESH_TOKEN_CARSON
      break;
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
    const response = await fetch('https://strava.com/api/v3/athlete/activities?before=1622667049&after=1619988649&access_token=' + reAuthJson.access_token)
    const json = await response.json()
    res.json({data: json })

    // try {
    //     const refreshToken = process.env.STRAVA_REFRESH_TOKEN_CALVIN
    //     const callRefresh = `https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`
    //     console.log(callRefresh);
    //     await fetch(callRefresh, {
    //         method: 'POST'
    //     })
    //     .then(response1 => {
    //         console.log(response1);
    //     })
    //     .then(result => {
    //         console.log(result);
    //         // calvins athlete id 16318930
    //         // carsons athlete id 8772317
    //         const finalResponse = await fetch('https://strava.com/api/v3/athletes/16318930/stats?access_token=' + result.access_token).then(response2 => response2.json());
    //         res.json({ data: finalResponse.all_run_totals })
    //     })
    // } catch(err) {
    //     next(err)
    // }
})


module.exports = app
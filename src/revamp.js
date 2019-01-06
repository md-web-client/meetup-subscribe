
import axios from 'axios'
const { concat, pipe, join, map, toPairs, split, fromPairs } = require('ramda')

// // begin fetchToken

const createQueryStringFromObject = pipe(toPairs(),map(join('=')), join('&'), concat('?'))

const fetchTokenUrl = (MEETUP_CLIENT_ID,MEETUP_REDIRECT_URI) => {
  const oauthTwoRequest = `https://secure.meetup.com/oauth2/authorize?client_id=${MEETUP_CLIENT_ID}&response_type=token&redirect_uri=${MEETUP_REDIRECT_URI}`;
  return oauthTwoRequest;
}

const fetchValuesFromResulHash = pipe(split('&'), map(split('=')),fromPairs())

// const shouldRenewToken = (state, timeNowInSeconds) => {
export const shouldRenewToken = (state) => {
  const expiresAt = state.session.expiresAt;
  const timeNowInSeconds = new Date() / 1000 // in seconds

  console.info('token will expire in', (expiresAt - timeNowInSeconds) / 60, 'minutes')
  return timeNowInSeconds > expiresAt ? true : false
}

export function currentTimeLeft(expires_in){
  return ((new Date() / 1000) + expires_in)
}

// // end fetchToken

export const fetchName = (token) => {
  const nameConfig = {
    url: 'https://api.meetup.com/members/self',
    params: {
    access_token: token
    }
  }
  return axios(nameConfig)
  .catch(err => { return 'error, probably 429' })
  .then(res => { return res});
}

export const fetchMeetup = (token) => {
  const meetupConfig = {
      url: 'https://api.meetup.com/self/events',
      params: {
        page: 20,
        status: 'upcoming',
        access_token: token
      }
  }
  return axios(meetupConfig)
  .catch(err => { return 'error, probably 429' })
  .then(res => { return res});
}

// https://www.meetup.com/meetup_api/docs/batch/
export const rsvp = (token, id, attendValue) => {
  const config = {
    method: 'POST',
    url: 'https://api.meetup.com/2/rsvp',
    params: {
      rsvp: attendValue, //'yes/ no' 
      event_id: `${id}`,
      access_token: token,
    }, 
    headers: {
      "Accept": "*/*"
    }
  };
  return axios(config)
  .catch(err => { return 'error, probably 429' })
  .then(res => { return res});
}

    // case LOAD_DATA:
    // console.log('loading data from session storage')
    //   session: {
    //     expiresAt: +sessionStorage.getItem('sessionExpiresAt'),
    //     accessToken: sessionStorage.getItem('sessionAccessToken')
    //   }


    // case SAVE_SESSION:
    // const expiresAt = (new Date() / 1000) + +action.oauthResponse.expires_in
    // sessionStorage.setItem('sessionExpiresAt', expiresAt)
    // sessionStorage.setItem('sessionAccessToken', action.oauthResponse.access_token)
    // session: {
    //   accessToken: action.oauthResponse.access_token,
    //   expiresAt: expiresAt
    // }
    
// not needed, it is not that hard to change params on a querystring.
// createQueryStringFromObject = pipe(
//   toPairs(),
//   map(join('=')), 
//   join('&'), 
//   concat('?')
// )

// const fetchTokenUrlFromObject = () => {
//   const params = {
//     client_id: MEETUP_CLIENT_ID,
//     response_type: 'token',
//     redirect_uri: MEETUP_REDIRECT_URI
//   }
//   const oauthTwoRequest = 'https://secure.meetup.com/oauth2/authorize' + createQueryStringFromObject(params)
// }

import axios from 'axios'
// const { concat, pipe, join, map, toPairs, split, fromPairs } = require('ramda')

// // begin fetchToken

// const createQueryStringFromObject = pipe(toPairs(),map(join('=')), join('&'), concat('?'))

// const fetchTokenUrl = (MEETUP_CLIENT_ID,MEETUP_REDIRECT_URI) => {
//   const oauthTwoRequest = `https://secure.meetup.com/oauth2/authorize?client_id=${MEETUP_CLIENT_ID}&response_type=token&redirect_uri=${MEETUP_REDIRECT_URI}`;
//   return oauthTwoRequest;
// }

// const fetchValuesFromResulHash = pipe(split('&'), map(split('=')),fromPairs())

const timeNowInSeconds = new Date() / 1000

// const shouldRenewToken = (state, timeNowInSeconds) => {
export const shouldRenewToken = (state) => {
  const expiresAt = state.session.expiresAt;
   // in seconds
  console.info('token will expire in', getTimeLeft({expiresAt}), 'minutes')
  return timeNowInSeconds > expiresAt ? true : false
}
export const getTimeLeft = ({expiresAt}) => {
  return (expiresAt - timeNowInSeconds) / 60
}
export function currentTimeLeft(expires_in){
  return ((new Date() / 1000) + expires_in)
}

// // end fetchToken
export const decideErrorRedirect = ( err, history) => {
  const corsCheck = JSON.stringify( err.request.toString() ) === '"[object XMLHttpRequest]"'; 
  if(corsCheck){
    history.push('error'); console.log('error, probably 429');
  } else{
    console.log('error, probably NOT 429'); }; 
  return 'error, probably 429'  
}

export const fetchName = (token, history) => {
  const nameConfig = {
    url: 'https://api.meetup.com/members/self',
    params: {
    access_token: token
    }
  }
  return axios(nameConfig)
  .then(res => { return res})
  .catch(err => { decideErrorRedirect(err, history)} )
}


export const fetchMeetup = (token, additionalParams, history) => {
  const meetupConfig = {
      url: 'https://api.meetup.com/self/events',
      params: {
        page: 200,
        status: 'upcoming',
        access_token: token
      },
      headers: {
        "Accept": "*/*"
      }
  }
  return axios(meetupConfig) 
  .then(res => { console.log({data: res.data}); return res.data})
  .catch(err => {decideErrorRedirect(err, history)} )
}

export const fetchSpecificGroupMeetup = (token, additionalParams, groupName,history) => {
  groupName = groupName.replace(/(#+)|([!].+)/g, '')
  groupName = groupName.replace(/[^0-9a-zA-Z]+/g, '-')
  const meetupConfig = {
      url: 'https://api.meetup.com/2/events',
      params: {
        access_token: token,
        page: 200,
        status: 'upcoming'
      },
      headers: {
        "Accept": "*/*"
      }
  }
  additionalParams={...additionalParams, group_urlname: groupName}
  meetupConfig.params = {...additionalParams, ...meetupConfig.params}
  
  return axios(meetupConfig)
  .then(res => { return res.data.results; })
  .catch(err => { decideErrorRedirect(err, history)} )
}

export const fetchGroups = (token, additionalParams, history) => {
  const groupConfig = {
      url: 'https://api.meetup.com/self/groups',
      params: {
        page: 200,
        access_token: token,
        only:'name'
      },
      headers: {
        "Accept": "*/*"
      }
  }
  return axios(groupConfig) 
  .then(res => { return res.data})
  .catch(err => { decideErrorRedirect(err, history)} )
}

// https://www.meetup.com/meetup_api/docs/batch/
export const rsvp = (token, id, attendValue,history) => {
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
  return axios(config).then(res => {
    return res
  })
  .catch(err => {
    decideErrorRedirect(err, history)} )
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
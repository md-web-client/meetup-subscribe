
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
//   const nameConfig = {
//     url: 'https://api.meetup.com/gql',
//     params: {
//       access_token: token
//     },
//     body: JSON.stringify({
//       query: `
//         query event {
//           event(id: "276754274") {
//             title
//             description
//             host {
//               email
//               name
//             }
//             dateTime
//           }
//         }
//         `,
//       variables: {
//         now: new Date().toISOString(),
//       },
//     }),
//   }
//   fetch("https://api.meetup.com/gql", {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "en-US,en;q=0.9,ja;q=0.8",
//     "content-type": "application/json",
//     "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrer": "https://www.meetup.com/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"query\":\"\\n  query($eventId: ID) {\\n    event(id: $eventId) {\\n      title\\n      description\\n      dateTime\\n    }\\n  }\\n  \",\"variables\":{\"eventId\":\"296153162\"}}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// })
// fetch("https://www.meetup.com/gql2", {
//     "headers": {
//       "accept": "*/*",
//       "accept-language": "en-US",
//       "apollographql-client-name": "nextjs-web",
//       "cache-control": "no-cache",
//       "content-type": "application/json",
//       "pragma": "no-cache",
//       "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"macOS\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-meetup-view-id": "05a33758-5b4c-465b-bfaf-85592e388bd1"
//     },
//     "referrer": "http://127.0.0.1:3000",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": JSON.stringify({
//       "operationName": "getUpcomingGroupEvents",
//         variables: { 
//           "urlname": "jax-code-and-coffee"
//         },
//         "extensions":{
//           "persistedQuery":{
//             "version":1,
//             "sha256Hash": "68fc2b5c7f53b5a810cb732718beb15d96695a483c07579cf902aa7e607d0fe6"
//           }
//         }
//     }),
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
//   })
//   .then(res => res.json())
//   .then(res => console.log(res.data))
  // return axios(nameConfig)
  
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
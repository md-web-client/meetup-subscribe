
import axios from 'axios'
let prod
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
  
  return (prod) ? nameConfig : Promise.resolve({data: {name: 'michaeldimmitt'}})
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
  return (prod) ? axios(meetupConfig) : Promise.resolve({ data: meetups})
  .then(res => { return res.data})
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
  
  return (prod) ? axios(meetupConfig) : Promise.resolve({ data: {results: [exampleGroup, ...meetups]}})
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
  return (prod) ? axios(groupConfig) : Promise.resolve({ data: groups})
  .then(res => { console.log({res}); return res.data})
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

// group.name, group.join_mode
// venue.name, venue.repinned
const exampleGroup = {
  name: 'code and coffee stub',
  id: '12332',
  group: {
    name: 'a group',
    join_mode: 'true'
  },
  venue: {
    name: 'a venue',
    repinned: true,
  },
  time: 10,
  description: 'hi', 
}
const groups = [
  exampleGroup,
  {name: 'ruby jax stub', ...exampleGroup},
  {name: '2600 stub', ...exampleGroup},
  {name: 'owasp stub', ...exampleGroup},
  {name: 'ruby jax stub', ...exampleGroup},
  {name: '2600 stub', ...exampleGroup},
]

const meetup = {
  created: 'true', 
  description: 'hi', 
  duration: 10, 
  group: 'ruby jax stub', 
  id: '122323', 
  link: 'http://example.com', 
  local_date: '2109383', 
  local_time: '1209373', 
  name: 'stub name', 
  status: 'pending', 
  time: '1232323', 
  updated: 'false', 
  utc_offset: '+200', 
  venue: {
    name: 'a venue',
    repinned: 'true',
  }, 
  visibility: 'public', 
  waitlist_count: '1', 
  yes_rsvp_count: '1' 
}
const description1 = `
Because Mondays are terrible and coffee and people make them better.

Have a conversation over coffee,
work remotely,
Or just pop in for a visit on your way to the beach/office!
  `
const meetups = [
  {...meetup, description: description1}, 
  meetup,
  meetup
]
  // const {id, venue.name, venue.lat, venue.lon, venue.repinned} = venue
  // const { created, name, id, join_mode, lat } = group


import { fetchName, fetchMeetup, shouldRenewToken } from './revamp'
// import { parseQs } from './lib/queryString'

export const REQUEST_MEETUPS = 'REQUEST_MEETUPS'
export const RECEIVE_MEETUPS = 'RECEIVE_MEETUPS'
export const TO_MEETUP_DETAILS = 'TO_MEETUP_DETAILS'
export const TO_LOGIN = 'TO_LOGIN'
export const SAVE_SESSION = 'SAVE_SESSION'
export const LOAD_DATA = 'LOAD_DATA'

export function loadData() {
  return { type: LOAD_DATA }
}

export function saveSession(resp) {
  console.info('save session', resp)
  return {
    type: SAVE_SESSION,
    oauthResponse: resp
  }
}

export function toMeetupDetails(id) {
  return {
    type: TO_MEETUP_DETAILS,
    id: id
  }
}

export function requestMeetups() {
  return { type: REQUEST_MEETUPS }
}

export function receivedMeetups(json) {
  return {
    type: RECEIVE_MEETUPS,
    meetups: json
  }
}

// https://www.youtube.com/watch?v=3u7kDfEtKfs
export function fetchMeetups(token, history) {

  return async (dispatch, getState) => {
    if (shouldRenewToken(getState())) {
      console.info('need to renew token')
      history.push('login')
    } else {
      console.info('token still good')
      dispatch(requestMeetups())
      history.push('rsvp')
        try{
          let name = (await fetchName(token)).data.name
          let meetups = (await fetchMeetup(token)).data
          meetups.name = name
          
          return dispatch(receivedMeetups(meetups))
        }
        catch(e){
          console.log(e)
          history.push('error') // temporary hack to reset app when request fail due to meetup only allowing cors with valid token
        }
    }
  }
}

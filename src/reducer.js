import { find, propEq /* filter */ } from 'ramda'
import { REQUEST_MEETUPS, RECEIVE_MEETUPS, TO_MEETUP_DETAILS,
  TO_LOGIN, SAVE_SESSION, LOAD_DATA } from './actions'

const initState = {
  session: {
    accessToken: '',
    expiresAt: ''
  },
  meetup: {},
  meetups: [],
  isFetching: false
}

const reducer = (state = initState, action) => {
  switch (action.type) {
  case LOAD_DATA:
    console.log('loading data from session storage')
    return Object.assign({}, state, {
      session: {
        expiresAt: +sessionStorage.getItem('sessionExpiresAt'),
        accessToken: sessionStorage.getItem('sessionAccessToken')
      }
    })
  case SAVE_SESSION:
    const expiresAt = (new Date() / 1000) + +action.oauthResponse.expires_in
    sessionStorage.setItem('sessionExpiresAt', expiresAt)
    sessionStorage.setItem('sessionAccessToken', action.oauthResponse.access_token)
    return Object.assign({}, state, {
      session: {
        accessToken: action.oauthResponse.access_token,
        expiresAt: expiresAt
      }
    })
  case TO_LOGIN:
    console.info('clear session in session storage and state')
    sessionStorage.clear()
    return Object.assign({}, state, {
      // reset token
      session: {
        accessToken: '',
        expiresAt: ''
      }
    })
  case TO_MEETUP_DETAILS:
    return Object.assign({}, state, {
      meetup: find(propEq('id', action.id), state.meetups)
    })
  case REQUEST_MEETUPS:
    return Object.assign({}, state, { isFetching: true })
  case RECEIVE_MEETUPS:
    return Object.assign({}, state, {
      isFetching: false ,
      meetups: action.meetups
    })
  default:
    return state
  }
}

export default reducer

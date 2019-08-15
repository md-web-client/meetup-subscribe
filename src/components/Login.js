import React from 'react'
import { toQs } from '../lib/queryString'
import '../Login.css'
export default class Login extends React.Component {
  
  render() {
    // const MEETUP_CLIENT_ID = 'ndioq3jd0me4s8d65lfp0vv69q'; // this one is for production. https://meetup-oauth2.herokuapp.com/index.html
    // const MEETUP_CLIENT_ID = 'niqkagsfu07kb2coik832vljhm'; // this one is for local dev. http://127.0.0.1:3000
    const MEETUP_CLIENT_ID = 'i1luu3qbht8m2qn7fl1so0aa49'; // this one is for s3.
    const MEETUP_REDIRECT_URI = window.location.href;

    const params = {
      client_id: MEETUP_CLIENT_ID,
      response_type: 'token',
      redirect_uri: MEETUP_REDIRECT_URI
    }

    const url = 'https://secure.meetup.com/oauth2/authorize' + toQs(params)

    const LoginLink = () => <div className="ph-3 justify-end">
      <div id="Login-clickable" className="flex-center" >
        <a href={url} style={{fontSize:"30px"}}>Click to Login</a>
      </div>
    </div>

    return (
      <div id="Login-container" className="pd-w-3 ma-center" >
        <h1 id="Login-header">Meetup Subscribe (for meetup.com)</h1>
        <div id="Login-content" className="pd-w-3">
          look at upcoming events for your meetup groups.<br/><br/>
          filter to look at events for a specific group.<br/><br/>
          rsvp "yes" to the next 10 events for a group.<br/><br/>
          rsvp "no" to the next 10 events for a group.<br/><br/>
          rsvp to 10 events for all groups.<br/><br/>
        </div>
        <div id="Login-footer" className="pd-r-3">
          <div>Login to get started</div>
          <span>Enjoy!</span>
        </div>

        <LoginLink/>
      </div>
    )
  }

}

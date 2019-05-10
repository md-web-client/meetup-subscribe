import React from 'react'
import { toQs } from '../lib/queryString'

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

    const Comp = () => <div className="ph3">
      <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', width:'300px',height:'100px', margin:'200px', backgroundColor:'powderblue'}}>
        <a href={url} style={{fontSize:"30px"}}>Click to Login</a>
      </div>
    </div>

    return <div>
      <Comp/>
    </div>
  }

}

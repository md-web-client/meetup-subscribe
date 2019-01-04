import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, Meetups, MeetupDetails, RsvpComponent } from '../reactLoadable';
import { connect } from 'react-redux'
import { checkOauth } from '../reduxLogic';
import { toMeetupDetails, rsvpMe } from '../actions';
import axios from 'axios'

function mapStateToProps(state) {
  console.info(state)
  return {
    meetups: state.meetups,
    meetup: state.meetup,
    route: state.route,
    session: state.session,
    isFetching: state.isFetching
  }
}

class Routes extends Component {
  constructor(props){
    super(props);
    this.checkOauth = checkOauth
    this.show = this.show.bind(this)
    this.rsvp = this.rsvp.bind(this)
  }

  show(event, id) {
    this.props.dispatch(toMeetupDetails(id))
    this.props.history.push('meetupdetails')
  }
  rsvp(token, id) {
    const config = {
      method: 'POST',
      url: 'https://api.meetup.com/2/rsvp',
      params: {
        rsvp:'no', 
        event_id: id,
        access_token: token,
      },
      
    };
    return axios(config, {headers: {
        "Accept": "*/*",
        "Referer": "http://127.0.0.1:3000/",
        "Origin": "http://127.0.0.1:3000",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "Postman-Token": "c6853dae-c8b5-476a-8818-ba8c84a4d67a"
      }})
    .catch(err => { console.log(err) })
    .then(res => { console.log(res) });
  }

  componentDidMount() {
    this.checkOauth(this.props)
  }

  render() {
    const { meetups, meetup, isFetching, history, session} = this.props
    console.log({history})
    return (
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/login" exact render={(props) => <Login />} />
          <Route path="/meetups" exact render={(props) => <Meetups meetups={meetups} onSelect={this.show} isFetching={isFetching} />} />
          <Route path="/meetupdetails" exact render={(props) => <MeetupDetails meetup={meetup} onBack={this.home} />} />
          <Route path="/rsvp" exact render={(props) => <RsvpComponent meetups={meetups} session={session} rsvp={this.rsvp} />} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
  }
}

export default connect(mapStateToProps)(Routes)

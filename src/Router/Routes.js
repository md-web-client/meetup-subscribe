import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { Error, Login, Meetups, MeetupDetails, RsvpComponent, Complete } from '../reactLoadable';
import { connect } from 'react-redux'
import { checkOauth } from '../reduxLogic';
import { toMeetupDetails } from '../actions';


function mapStateToProps(state) {
  console.info(state)
  return {
    meetups: state.meetups,
    meetup: state.meetup,
    groups: state.groups,
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
  }

  show(event, id) {
    this.props.dispatch(toMeetupDetails(id))
    this.props.history.push('meetupdetails')
  }

  componentDidMount() {
    this.checkOauth(this.props)
  }

  render() {
    const { meetups, meetup, groups, isFetching, session, history} = this.props
    return (
        <Switch>
          <Route path="/error" exact render={(props) => <Error history={history} />} />
          <Route path="/complete" exact render={(props) => <Complete />} />
          <Route path="/login" exact component={ Login } />
          <Route path="/meetups" exact render={(props) => <Meetups meetups={meetups} onSelect={this.show} isFetching={isFetching} />} />
          <Route path="/meetupdetails" exact render={(props) => <MeetupDetails meetup={meetup} onBack={this.home} />} />
          <Route path="/rsvp" exact render={(props) => <RsvpComponent groups={groups} meetups={meetups} history={history} session={session} rsvp={this.rsvp} />} />
          <Route path="/" exact component={ Login } />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
  }
}

export default connect(mapStateToProps)(Routes)

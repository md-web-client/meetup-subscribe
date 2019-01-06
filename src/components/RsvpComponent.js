import React from 'react';
import moment from 'moment'
import { rsvp } from '../revamp'

const buttonStyle = {
  borderRadius: '.5rem',
};

// session: {
//   accessToken: '',

export default class RsvpComponent extends React.Component {
  constructor(props){
    super(props);
    this.rsvpMe = this.rsvpMe.bind(this)
  }

  rsvpMe = (attendValue) => {
    let meetup = this.props.meetups[0]    
    meetup ? this.props.meetups.map(uniqmeetup => rsvp(this.props.session.accessToken, uniqmeetup.id, attendValue)) : console.log('empty')
  }

  render() {
    const Header = () => <div id="Header">Logged In as UserName</div>;

    const RsvpButtons = () => (
      <span id="RsvpButton" style={{ display: 'flex' }}>
        <span style={{ minWidth: '170px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('yes')} >
            Rsvp Yes All
          </button>
        </span>
        <span style={{ minWidth: '104px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('no')}>Rsvp No All</button>
        </span>
        <span style={{ width: '100%', textAlign: 'center' }}>
          Status: So far no rsvp logged
        </span>
      </span>
    );

    const SearchInput = (
      { label } // label
    ) => (
      <div
        id="SearchInput"
        style={{ display: 'flex', padding: '3px 0px 3px 0px' }}
      >
        <span style={{ minWidth: '170px' }}>{label}</span>
        <span style={{ width: '100%' }}>
          <input
            style={{ width: '95%' }}
            type="text"
            name={label}
            placeholder="(provides all meetups results if not modified)"
          />
        </span>
      </div>
    );

    const Results = () => (
      <div id="Results">
        <div>Results</div>
        <hr/>
          <div>
            {this.props.meetups.map( (meetup, index) => { return <div key={index}>
            <div style={{textAlign:'left'}}>{moment(meetup.time).fromNow()}</div>
            <br/>{ meetup.group.name} at { meetup.venue.name}
            <br/><br/>Join Mode: { meetup.group.join_mode}
            <br/><br/>description: { meetup.description.replace(/<\/?[^>]+(>|$)/g, "")} 
            <br/>{ meetup.venue.repinned}
            <hr/>
          </div>} 
          )}
        </div>
      </div>
    );
     
    
    return (
      <section style={{ 
          backgroundColor: 'powderblue', paddingTop: '20px', paddingLeft: '20px',
          minWidth: '466px', minHeight: 'calc(100vh - 36px)',
      }} >
        <Header />
        <br />
        <RsvpButtons />
        <br />
        <SearchInput label="Search Group" />
        <SearchInput label="Search Common Title" />
        <br />
        <div className="flex">
          <button>Search</button>
        </div>
        <br />
        <Results />
      </section>
    );
  }
}

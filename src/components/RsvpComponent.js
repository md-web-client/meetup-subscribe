import React from 'react';
import moment from 'moment'
import { rsvp, fetchMeetup, fetchSpecificGroupMeetup } from '../revamp'

const buttonStyle = {
  borderRadius: '.5rem',
};
export default class RsvpComponent extends React.Component {
  constructor(props){
    super(props);
    this.rsvpMe = this.rsvpMe.bind(this)
    this.rsvp = rsvp.bind(this)
    this.fetchSpecificGroupMeetup = fetchSpecificGroupMeetup.bind(this)
    this.fetchMeetup = fetchMeetup.bind(this)
    this.state={
      meetups:[],
      status:"So far no rsvp logged",
      loading: false
    }
  }
  rsvpMe = (attendValue) => {
    let meetups = this.state.meetups;

    this.setState({status: `Submitting! "${attendValue}" to all of your meetups`, loading: true})
    const process1 = async (meetups) => {
      if(meetups.length > 0) {
        for(let i = 0; i < meetups.length; i++) {
          const uniqmeetup = meetups[i]
          const { event_url, link } = uniqmeetup;
          await new Promise(resolve => setTimeout(resolve, 2000))
          window.open(`${event_url || link}/?action=rsvp&response=${attendValue}`,'_newtab');
        };
      }
    }

    process1(meetups)
    .then(x => {
      window.open(`http://localhost:3000/complete`,'_newtab');
      this.setState({status: `Great Success! "${attendValue}" to all of your meetups`, loading: false})
    })
    .catch(err => {
      window.open(`http://localhost:3000/complete`,'_newtab');
      this.setState({status: `Something went wrong - try again later and open an issue thanks`, loading: false})
    })
  }
  rsvpMeOldBrokenApi = (attendValue) => {
    let meetup = this.state.meetups;

    this.setState({status: `Submitting! "${attendValue}" to all of your meetups`, loading: true})
    const process1 = async (meetup) => {
      if(meetup.length > 1) {
        const [ uniqmeetup, ...restOfMeetups ] = meetup;
        const res = await rsvp(this.props.session.accessToken, uniqmeetup.id, attendValue, this.props.history);
        const remainingRequests = Number(res.headers["x-ratelimit-remaining"]);

        let removed = restOfMeetups.splice(0, remainingRequests);
        const final = removed.pop()
        if(removed.length > 0) {
          await handleChunk(removed)
        }
        if(final){
          const finalRes = await rsvp(this.props.session.accessToken, final.id, attendValue, this.props.history);
          const secondsUntilRefresh = Number(finalRes.headers["x-ratelimit-reset"]);
          const finalRemaining = Number(res.headers["x-ratelimit-remaining"]);
          if(restOfMeetups.length > 0){ // secondsUntilRefresh < 5 &&
            const resolveAfterTime = () => new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, secondsUntilRefresh * 1000)
            })
            await resolveAfterTime();
            await process1(restOfMeetups)
          }
        }
      }
      if(meetup.length === 1) {
        const [ uniqmeetup, ...restOfMeetups ] = meetup;
        const res = await rsvp(this.props.session.accessToken, uniqmeetup.id, attendValue, this.props.history);
      }
    }
    const handleChunk = async (meetups) => {
      return Promise.all(
        meetups.map( (uniqmeetup) => {
          return rsvp(this.props.session.accessToken, uniqmeetup.id, attendValue, this.props.history);
        })
      )
      .then(res => { return res; })
    }
    process1(meetup)
    .then(x => {
      this.setState({status: `Great Success! "${attendValue}" to all of your meetups`, loading: false})
    })
    .catch(err => {
      this.setState({status: `Something went wrong - try again later and open an issue thanks`, loading: false})
    })
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.meetups !== prevProps.meetups) {
      this.setState({meetups:this.props.meetups})
    }
  }

  render() {
    const Header = () => <div id="Header">Logged In as UserName</div>;

    const RsvpButtons = () => (
      <span id="RsvpButton" style={{ display: 'flex' }}>
        <span style={{ minWidth: '170px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('yes', this.props.history)} >
            Rsvp Yes All
          </button>
        </span>
        <span style={{ minWidth: '104px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('no', this.props.history)}>Rsvp No All</button>
        </span>
        <span style={{ width: '100%', textAlign: 'left' }}>
          {this.state.status}
        </span>
      </span>
    );

    // const SearchInput = (
    //   { label } // label
    // ) => (
    //   <div
    //     id="SearchInput"
    //     style={{ display: 'flex', padding: '3px 0px 3px 0px' }}
    //   >
    //     <span style={{ minWidth: '170px' }}>{label}</span>
    //     <span style={{ width: '100%' }}>
    //       <input
    //         style={{ width: '95%' }}
    //         type="text"
    //         name={label}
    //         placeholder="(provides all meetups results if not modified)"
    //       />
    //     </span>
    //   </div>
    // );

    const SearchGroupsUsingButtons = ( {label} ) => {
      return ( <div>
        <div style={{ display: 'flex' }}>
          <span style={{minWidth: '170px' }}>{label}</span>
          <button onClick={() => {
            fetchMeetup(this.props.session.accessToken, {}, this.props.history)
            .then(x => {this.setState({meetups: x})})
          }}>
            Display All Meetups (default behavior)
          </button>
        </div>
        <br/>
        {this.props.meetups.groups ? this.props.meetups.groups.map( (obj, index) => {
          return <button onClick={() => {
              fetchSpecificGroupMeetup(this.props.session.accessToken, {}, obj.name, this.props.history)
              .then(x => {this.setState({meetups: x})})
            }
          } key={index} >{obj.name}</button>
          }) : <div></div>
        }
      </div>
    )
    }

    const Results = () => (
      <div id="Results">
        <div>Results</div>
        <hr/>
          <div>
            { this.state.meetups ? this.state.meetups.map( (meetup, index) => { return <div key={index}>
            <div style={{textAlign:'left'}}>{moment(meetup.time).fromNow()}</div>
            <br/>{ meetup.group.name} at { meetup.venue.name}
            <br/><br/>Join Mode: { meetup.group.join_mode}
            <br/><br/>description: { meetup.description.replace(/<\/?[^>]+(>|$)/g, "")}
            <br/>{ meetup.venue.repinned}
            <hr/>
          </div>}) : <div></div> }
        </div>
      </div>
    );

    return (
      <section style={{
          backgroundColor: 'powderblue', paddingTop: '20px', paddingLeft: '20px',
          minWidth: '466px', minHeight: 'calc(100vh - 36px)',
          pointerEvents: this.state.loading ? 'none' : 'auto'
      }}>
        {
          this.state.loading && <>
            <div className='overlay' >
              <div style={{
                position: 'absolute',
                left: 'calc(50% - 200px)',
                top: '30%',
                borderRadius: '20px',
                backgroundColor: 'white',
                width: '400px',
                height: '150px'
              }}>
                <h1 style={{margin: '2rem'}}>
                  Loading, please be patient
                </h1>
              </div>
            </div>
          </>
        }
        <Header />
        <br />
        <SearchGroupsUsingButtons label="Search Group" />
        <br />
        <RsvpButtons />
        {/*
        <SearchInput label="Search Group" />
        <SearchInput label="Search Common Title" />
        */}
        {/*
        <br />
        <div className="flex">
          <button>Search</button>
        </div>
        */}
        <br />
        <Results />
      </section>
    );
  }
}

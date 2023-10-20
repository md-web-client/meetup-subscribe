import React from 'react'

const MeetupDetails = ({meetup}) => {
  const {
    created, description,duration,group,
    id,link,local_date,local_time,name,status,
    time,updated, utc_offset, 
    venue, visibility, 
    waitlist_count, yes_rsvp_count 
  } = meetup
  // const {id, venue.name, venue.lat, venue.lon, venue.repinned} = venue
  // const { created, name, id, join_mode, lat } = group
  return <div>
      { created}
      <br/>description: { description}
      <br/>{ duration}
      <br/>{ group.created}
      <br/>{ group.name}
      <br/>{ group.id}
      <br/>{ group.join_mode}
      <br/>{ group.lat}
      <br/>id: { id}
      <br/>{ link}
      <br/>{ local_date}
      <br/>{ local_time}
      <br/>{ name}
      <br/>{ status}
      <br/>{ time}
      <br/>{ updated}
      <br/>{ utc_offset}
      <br/>{ venue.id}
      <br/>{ venue.name}
      <br/>{ venue.lat}
      <br/>{ venue.lon}
      <br/>{ venue.repinned}
      <br/>{ visibility}
      <br/>{ waitlist_count}
      <br/>{ yes_rsvp_count}
  </div>
}

export default MeetupDetails

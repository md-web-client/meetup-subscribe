import React, { Component } from 'react'

export default class Error extends Component {
    constructor(props){
      super(props);
    }

    render() {
      const Comp = () => <div className="ph3" style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{ padding: '20px', width:'300px',height:'100px', marginTop:'200px', backgroundColor:'powderblue'}}>
          <div style={{fontSize:"30px"}}>Updating meetups complete</div>
        </div>
        <br/>
        <div style={{fontSize:"30px"}}>Please close this tab</div>
      </div>

      return <div>
        <Comp/>
      </div>
    }

  }

import React, { Component } from 'react'


export default class Error extends Component {
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this)
  }
  redirect() {
    this.props.history.push('login')
  }

  render() {  
    const Comp = () => <div className="ph3" style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ padding: '20px', width:'300px',height:'100px', marginTop:'200px', backgroundColor:'powderblue'}}>
        <div style={{fontSize:"30px"}}>An Error Occoured probably '429'. Refresh the page in an Hour</div>
      </div>
      <br/>
      <button onClick={() => this.redirect()} style={{textAlign:'left'}}>Click here to redirect to Login</button>
    </div>

    return <div>
      <Comp/>
    </div>
  }

}


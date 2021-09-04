import React, {Component} from 'react'
import Axios from "axios"
import {BACKEND_URL} from '../Constants'

class DonateComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
        apiCallSuccess : false,
        apiCAllFailure : false,
        noResponse : false
    }
    this.confirmation = this.confirmation.bind(this)
  }

  confirmation() {
    Axios.post(`${BACKEND_URL}/${this.props.match.params.username}/${this.props.match.params.comment}`)
    .then( (response) => {
      if(response === '1') {
        console.log('Failed')
        this.setState({
          noResponse:false,
          apiCAllFailure:false,
          apiCallSuccess:true  
        })
      } else {
        this.setState({
          noResponse:false,
          apiCAllFailure:true,
          apiCallSuccess:false  
        })
      }      
    }).catch(() => {
      console.log('API call no response')
      this.setState({
        noResponse:true,
        apiCAllFailure:false,
        apiCallSuccess:false  
      })
    })
  }

  render() {
    return (
      <div className="DonateComponent">
        <button onClick={this.confirmation}>Confirm Donation</button>
        {this.state.apiCAllFailure && <div className="alert alert-warning">Could not match username to donation, please try again.</div>}
        {this.state.apiCallSuccess && <div className="alert alert-warning">Donation Successful!</div>}
        {this.state.noResponse && <div>API call failed, please click to try again.</div>}

      </div>
      
    );
  }

}

export default DonateComponent;
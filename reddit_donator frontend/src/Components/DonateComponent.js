import React, {Component} from 'react'
import {FRONTEND_URL, JUSTGIVINGURL} from '../Constants'


class DonateComponent extends Component {


    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
    return (
        <div className="DonateComponent">
            <a href={JUSTGIVINGURL + "/v1/charity/donate/charityId/924763?reference=donBot&exiturl=" + FRONTEND_URL + "/" + this.props.match.params.username + "/" + this.props.match.params.comment + "?jgDonationId=JUSTGIVING-DONATION-ID"}>Doctors Without Borders</a>
            
            <br/>
            
        </div>
        
        
    );
    
    }
}
export default DonateComponent;
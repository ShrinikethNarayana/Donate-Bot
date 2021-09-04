import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import DonateComponent from './DonateComponent'
import ConfirmationComponent from './ConfirmationComponent'
class DonatorApp extends Component {
    render() {
        return (
            <div className="DonatorApp">
                <header>Reddit Donator</header>
                
                <Router>
                    <>
                        <Switch>
                            <Route path="/donate/:username/:comment" exact component={DonateComponent}/>
                            <Route path="/confirm/:username/:comment" component={ConfirmationComponent}/>
                            
                            {/*<Route component={ErrorComponent}/> */}
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default DonatorApp;
import React, { Component } from 'react'

// Side Bar functionality goes here

export default class Map extends Component {
    render() {
        console.log(this.props);
        return(
            // Side UI goes here
            <div className="side-bar">
                <div className='menu'>

                </div>
                <div className="main-content">
                    <h1>Welcome to the Chicago area</h1><hr></hr>
                        <h3><u>
                            <strong>
                                <em>
                                    Looking for fun in the park? <br></br>
                                    But can't decide where to go?<br></br>
                                    checkout the parks location and photo!!
                                </em>
                            </strong>
                        </u></h3>
                    <input placeholder="search here"></input> 
                    <ul className="list-items">
                    {this.props.venues && this.props.venues.map((venue, index) =>
                        <li key={index}>{venue.name}</li>  )} 
                    </ul>
                </div>
                 
                
            </div>
        )
    }
}
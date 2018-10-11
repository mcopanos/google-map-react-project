import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// Side Bar functionality goes here
export default class Map extends Component {
    state = {
        query: ''
    }

    udateQuery = query => {
        this.setState({ query });
    }

    render() {
        const { venues, markers } = this.props;
        const { query } = this.state;
         let showingVenues;
           
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingVenues = venues.filter(venue => match.test(venue.name));
            console.log();
        } else {
            showingVenues = venues;
        }
        showingVenues.sort(sortBy('name'));

        if (query) {
            const markers = this.props.venues.map(venue => {
                const isMatching = venue.name.toLowerCase()
                .includes(query.toLowerCase());
                const marker = this.props.markers.find(marker => marker.id === venue.id);
                if (isMatching) {
                    marker.isVisible = true;
                } else {
                    marker.isVisible = false;
                }
                return marker;    
            })
            this.props.changeState({ markers });
            // const match = new RegExp(escapeRegExp(query), 'i');
            // let isMatching = venues.find(venue =>  match.test(venue.id));
            // isMatching? markers.isVisible = true : markers.isVisible = false;
            // return isMatching;
            // console.log(match);
        } else {
            console.log('not working');
        }

        return (
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
                    <div>
                        <input 
                            type='text'
                            placeholder="search here"
                            value={this.state.query}
                            // double check this
                            onChange={(event) => this.udateQuery(event.target.value)}
                        />
                    </div> 

                    {showingVenues.length !== venues.length && (
                        <div><span>Now Showing {showingVenues.length} of {venues.length}</span></div>
                    )}

                    <ul className="list-items">
                    {showingVenues
                        .map((venue, index) =>
                        <li key={index} 
                        onClick={() => this.props.listItemEvent(venue)}
                        >
                            {venue.name}
                        </li>)} 
                    </ul>
                </div>      
            </div>
        )
    }
}
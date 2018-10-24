import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// Side Bar functionality goes here
export default class Map extends Component {

    state = {
        query: ''
    }

    isVisible = (status) => {
        const markers = this.props.markers;
          markers.map(marker => {
            marker.isVisible = status
            return marker;
          })
      }

    //   handleChange = (event) => {
    //       this.setState({query: event.target.value});
    //       const markers = this.props.venues.map(venue => {
    //           const isMatching = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
    //           const marker = this.props.markers.find(marker => marker.id === venue.id);
    //           isMatching? console.log('match') : console.log('not matching');
    //         return marker;
    //       })
    //   }

    render() {
        const { venues, query, markers} = this.props;
        //const { query } = this.state;
         let showingVenues;
           
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingVenues = venues.filter(venue =>  match.test(venue.name));
            const marker = markers.filter(marker => {
                const isMatching = showingVenues.find(venue => venue.id === marker.id);
                isMatching? console.log(marker) : console.log('fail')
                return marker;
                
            })
            console.log(showingVenues)
            
            this.isVisible(false)
        } else {
            showingVenues = venues;
            this.isVisible(true)
        }
        showingVenues.sort(sortBy('name'));

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
                        <label htmlFor="namedInput">filter:</label>
                        <input 
                            type="text"
                            placeholder="search here"
                            aria-label="label"
                            aria-required="true"
                            // value={this.state.query}
                            value={this.props.query}
                            name="name"
                            // double check this
                            onChange={(event) => this.props.udateQuery(event.target.value)}
                            // onChange={this.handleChange}
                        />
                    </div> 

                    {/* {showingVenues.length !== venues.length && (
                        <div><span>Now Showing {showingVenues.length} of {venues.length}</span></div>
                    )} */}

                    <ul className="list-items">
                    {
                        //showingVenues
                        this.props.venues
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
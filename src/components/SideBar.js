import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// Side Bar functionality goes here
export default class Map extends Component {
<<<<<<< HEAD

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
=======

    constructor() {
        super();
        this.state = {
            query: ''
        }
    }
    
    
    // Change the visible status of a marker
    udateQuery = event => {
        this.setState({ query: event });

        const { venues, markers } = this.props;
         let showingVenues;

        if (event) {
            const match = new RegExp(escapeRegExp(event), 'i');
            showingVenues = venues.filter(venue => match.test(venue.name));
            console.log(showingVenues);
            const marker = markers.filter(marker => {
                const isMatching = showingVenues.find(venue => venue.id === marker.id)
                isMatching? marker.isVisible = true : marker.isVisible = false;
                console.log(marker.isVisible);
                return marker;
            })

            this.props.updateMarkers(marker);

        } else {
            showingVenues = venues;
            const marker = this.props.markers
            .map(marker => marker.isVisible = true);
             this.props.updateMarkers(marker)
>>>>>>> 6fbfc0119532b05ef94d8b2eba044b75958f66fd
        }
    }

<<<<<<< HEAD
=======
    // Update the state of query
    render() {
        const { venues } = this.props;
        const { query } = this.state;
        let showingVenues;
        
        //  Filter through list of venues
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingVenues = venues.filter(venue => match.test(venue.name));
            console.log(showingVenues);
        } else {
            showingVenues = venues;
        }
        // Sort by alphabetical order
        showingVenues.sort(sortBy('name'));

>>>>>>> 6fbfc0119532b05ef94d8b2eba044b75958f66fd
        return (
            // Sidebar and burger icon
            <Menu>
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
                                value={this.state.query}
                                name="name"
                                // double check this
                                onChange={(event) => this.udateQuery(event.target.value)}
                            />
                        </div> 
                        {/* Display the number of listings showing */}
                        {showingVenues.length !== venues.length && (
                            <div><span>Now Showing {showingVenues.length} of {venues.length}</span></div>
                        )}
                        
                        <ul className="list-items">
                        {showingVenues
                            .map((venue, index) =>
                            <li 
                                key={index} 
                                onClick={() => this.props.listItemEvent(venue)}
                            >
                                {venue.name}
                            </li>)} 
                        </ul>
                        <div>
                            <p>Powered by <i className="fa fa-foursquare" aria-hidden="true">oursquare</i></p>
                        </div>
                    </div>      
                </div>
<<<<<<< HEAD
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
=======
            </Menu>
>>>>>>> 6fbfc0119532b05ef94d8b2eba044b75958f66fd
        )
    }
}
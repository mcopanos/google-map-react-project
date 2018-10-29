import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// Side Bar functionality goes here
export default class Map extends Component {

    constructor() {
        super();
        this.state = {
            query: '',
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
        }
    }

    handleOpen = () => {
        this.setState(state => ({
            isSidebarOpen: !state.isSidebarOpen
        }));
    }

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

        return (
            // Sidebar and burger icon
            <Menu >
                <main type="menu" className="side-bar">
                    {/* <div className='menu'>

                    </div> */}
                    <section className="main-content">
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
                        <section>
                            <label htmlFor="namedInput">filter:</label>
                            <input 
                                type="text"
                                placeholder="search here"
                                aria-label="filter parks"
                                aria-required="true"
                                value={this.state.query}
                                name="name"
                                onChange={(event) => this.udateQuery(event.target.value)}
                            />
                        </section> 
                        {/* Display the number of listings showing */}
                        {showingVenues.length !== venues.length && (
                            <div><span>Now Showing {showingVenues.length} of {venues.length}</span></div>
                        )}
                        
                        <ul className="list-items">
                        {showingVenues
                            .map((venue, index) =>
                            <li 
                                role='list'
                                key={index} 
                                tabIndex='0'
                                onClick={() => this.props.listItemEvent(venue)}
                                onKeyPress={()=> this.props.listItemKeyPress(venue)}
                            >
                                {venue.name}
                            </li>)} 
                        </ul>
                        <div>
                            <p>Powered by <i className="fa fa-foursquare" aria-hidden="true">oursquare</i></p>
                        </div>
                    </section>      
                </main>
            </Menu>
        )
    }
}
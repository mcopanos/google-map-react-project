import React, { Component } from 'react'

class HandleError extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return this.setState({ hasError: true });
      }
    
    render() {

        if (this.state.hasError === true) {
            return <main class="error-handler">
                    <h1><strong>Oops! Something went wrong.</strong></h1>    
                 </main>
        }
        return this.props.children
    }

}

export default HandleError
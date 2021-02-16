import React, { Component } from 'react';
import { Signer, ICredentials } from "@aws-amplify/core";

class AddressLookup extends Component {
    state = { lat: '', long: '', address: '', isHidden: true };
    toggleHidden = () => this.setState((prevState)=>({isHidden: !prevState.isHidden}))

    updateLatitude = event => {
        this.setState({ lat: event.target.value });
    }
    updateLongitude = event => {
        this.setState({ long: event.target.value });
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchAddress();
        } else {
            // console.log('event.key', event.key)
        }
    }

    searchAddress = credentials => () => {
        this.toggleHidden();
        const indexName="explore.place";
        var url = `https://places.geo.us-east-1.amazonaws.com/places/v0/indexes/${indexName}/search/position=${this.state.long}&position=${this.state.lat}`;
        url=Signer.signUrl({url}, {
                access_key: credentials.accessKeyId,
                secret_key: credentials.secretAccessKey,
                session_token: credentials.sessionToken,
            });
        fetch(`${url}`)
            .then(response => response.json())
            .then(json => this.setState({ address: json.Results }))
            .catch(error => alert(error.message));

        //this.props.searchAddress(this.state.addressQuery);
    }

    render () {
        const { credentials } = this.props;

        return (
            <div>
                <p>
                    Latitude
                    <input
                        onChange={this.updateLatitude}
                        onKeyPress={this.handleKeyPress}
                        placeholder='Enter Latitude'
                    />
                </p>
                <p>
                    Longitude
                    <input
                        onChange={this.updateLongitude}
                        onKeyPress={this.handleKeyPress}
                        placeholder='Enter Longitude'
                    />
                </p>
                <button onClick={this.searchAddress(credentials)}>Look Up</button>
                {!this.state.isHidden && <p>Lat,Long: {this.state.lat},{this.state.long}</p>}
                {!this.state.isHidden && <p>Address: {this.state.address}</p>}
            </div>
        );
    }
}

export default AddressLookup;
import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import Location from "aws-sdk/clients/location";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

class AddressLookup extends Component {
    state = { lat: '', long: '', address: '', isHidden: true };
    toggleHidden = () => this.setState((prevState)=>({isHidden: !prevState.isHidden}));

    updateLatitude = event => {
        //this.props.setViewport({ ...viewPort, latitude: event.target.value });
        this.props.setViewport(previousViewport => {return {...previousViewport, latitude: Number(event.target.value)}})
    }
    updateLongitude = event => {
        this.props.setViewport(previousViewport => {return {...previousViewport, longitude: Number(event.target.value)}})
    }
    updateAddress = rsp => {
        const label = rsp.Results[0].Place.Label;
        this.setState({ address: label });
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchAddress();
        } else {
            // console.log('event.key', event.key)
        }
    }

    searchAddress = credentials => async () => {
        // this.setState((prevState)=>({isHidden: !prevState.isHidden}));
        this.toggleHidden();

        const indexName="explore.place";
        const client = new Location({
            credentials,
            region: awsconfig.aws_project_region,
        });

        const rsp = await client.searchPlaceIndexForPosition({
            IndexName: indexName,
            Position: [
                Number(this.props.viewport.longitude),
                Number(this.props.viewport.latitude)
            ]
        }).promise();
        console.log(rsp);
        this.updateAddress(rsp);

        fetch(`https://fazn9f2k1f.execute-api.us-east-1.amazonaws.com/dev`)
            .then(response => console.log(response.json()))
            .then(data => console.log(data));
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
                {<p>Lat,Long: {this.props.viewport.latitude},{this.props.viewport.longitude}</p>}
                {!this.state.isHidden && <p>Address: {this.state.address}</p>}
            </div>
        );
    }
}

export default AddressLookup;
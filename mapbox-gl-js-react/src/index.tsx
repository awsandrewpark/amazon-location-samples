// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { Signer, ICredentials } from "@aws-amplify/core";
import { Auth } from "aws-amplify";
import ReactMapGL, {
  NavigationControl,
  MapRequest,
  ViewportProps,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import AddressLookup from './AddressLookup';

import "./index.css";
import amplifyConfig from "./aws-exports";

Amplify.configure(amplifyConfig);

// Replace with the name of the map that you created on the Amazon Location Service console: https://console.aws.amazon.com/location/maps/home?region=us-east-1#/
const mapName = "explore.map";

/**
 * Sign requests made by Mapbox GL using AWS SigV4.
 */
const transformRequest = (credentials: ICredentials) => (
  url?: string,
  resourceType?: string
): MapRequest => {
  // Resolve to an AWS URL
  if (resourceType === "Style" && !url?.includes("://")) {
    url = `https://maps.geo.${amplifyConfig.aws_project_region}.amazonaws.com/maps/v0/maps/${url}/style-descriptor`;
  }

  // Only sign AWS requests (with the signature as part of the query string)
  if (url?.includes("amazonaws.com")) {
    return {
      url: Signer.signUrl(url, {
        access_key: credentials.accessKeyId,
        secret_key: credentials.secretAccessKey,
        session_token: credentials.sessionToken,
      }),
    };
  }

  // Don't sign
  return { url: url || "" };
};

// const transformPlaceIndexRequest = (credentials: ICredentials) => (
//     url?: string,
//     resourceType?: string
// ): SearchRequest => {
//   // Resolve to an AWS URL
//   if (resourceType === "Style" && !url?.includes("://")) {
//     url = `https://places.geo.${amplifyConfig.aws_project_region}.amazonaws.com/places/v0/indexes/${url}/search/position`;
//   }
//
//   // Only sign AWS requests (with the signature as part of the query string)
//   if (url?.includes("amazonaws.com")) {
//     return {
//       url: Signer.signUrl(url, {
//         access_key: credentials.accessKeyId,
//         secret_key: credentials.secretAccessKey,
//         session_token: credentials.sessionToken,
//       }),
//     };
//   }
//
//   // Don't sign
//   return { url: url || "" };
// };


const App = () => {
  const [credentials, setCredentials] = React.useState<ICredentials | null>(
    null
  );

  const [viewport, setViewport] = React.useState<Partial<ViewportProps>>({
    latitude: 43.6416,
    longitude: -79.39,
    zoom: 15
  });
  React.useEffect(() => {
    /* window navigator logic*/
    window.navigator.geolocation.getCurrentPosition(
        position => {
          setViewport({...viewport, latitude: position.coords.latitude, longitude: position.coords.longitude});
        },
        err => {
          console.log("the error is ", err)
        }
    );
  }, [])

  React.useEffect(() => {
    const fetchCredentials = async () => {
      setCredentials(await Auth.currentUserCredentials());
    };

    fetchCredentials();
  }, []);

  return (

    <div>
      <div className="address">
        <AddressLookup credentials={credentials} setViewport={setViewport} viewport={viewport}/>
      </div>

    <div>
      {credentials ? (
         <ReactMapGL
           {...viewport}
           // width="100%"
           // height="100vh"
           width="90%"
           height="70vh"
           transformRequest={transformRequest(credentials)}
           mapStyle={mapName}
           onViewportChange={setViewport}
         >
           <div style={{ position: "absolute", left: 20, top: 20 }}>
             {/* react-map-gl v5 doesn't support dragging the compass to change bearing */}
             <NavigationControl showCompass={false} />
           </div>
         </ReactMapGL>
       ) : (
         <h1>Loading...</h1>
       )}
    </div>

    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

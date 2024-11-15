"use client";

import { useEffect } from "react";
import UserDetails from "@/app/_components/dates/UserDetails";
import DateDetails from "@/app/_components/dates/DateDetails";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

function Locations() {
  const map = useMap();
  // the case)
  const placesLibrary = useMapsLibrary("places");
  useEffect(() => {
    if (!placesLibrary || !map) return;

    // here you can interact with the imperative maps API
  }, [map]);

  // if (!placesLibrary || !map) return <p>loading</p>;

  return (
    <div className="relative">
      <div className="absolute bottom-0">
        <UserDetails />
      </div>
      <div>
        <DateDetails />
      </div>
      <APIProvider
        apiKey={"AIzaSyAyNQ6g-SMSSaHJpb8GvuThsBl96YfMutA"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
          onClick={(e) => console.log(e)}
        ></Map>
      </APIProvider>
    </div>
  );
}

export default Locations;

// map.panTo(ev.latLng);
// gestureHandling={'greedy'}
// style={{width: '100vw', height: '100vh'}}

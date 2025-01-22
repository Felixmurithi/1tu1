"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap,
  Pin,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import UserDetails from "@/app/_components/dates/UserDetails";
import Button from "../Button";
import getUserLocation from "@/app/_utils/getUserLocation";
import useInputDebounce from "@/app/hooks/useInputDebounce";
import { updateDateLocationAction } from "@/app/_lib/action";

const nairobiCenter = { lat: -1.2767988, lng: 36.8163994 };

function Locations({
  image,
  dateLocation,
  setDateLocation,
  name,
  setUserDetails,
  userDetails,
  userId,
  mobile,
  allDates,
  openMenu,
  setOpenMenu,
  revealUserDetails,
  setRevealUserDetails,
  toast,
  radius,
  refetchAllDates,
  changeTab,
  refetchAllNearbyDates,
}) {
  // will be false initially if the dateLocation is set

  useEffect(() => {
    //if desktop u canb alkways show user details
    if (!mobile) return setRevealUserDetails(true);
    // if mobile but menu is open u cant reveal user
    if (mobile && !openMenu) return setRevealUserDetails(true);
    // else
    if (mobile && openMenu) setRevealUserDetails(false);
  }, [mobile, openMenu]);

  useEffect(() => {
    if (!userDetails && mobile) {
      setOpenMenu(true);
    }
    // if (userDetails && mobile) setOpenMenu(false);
  }, [userDetails, mobile]);

  return (
    <div className="relative h-full max-w-full">
      <div className="hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#434343"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </div>

      {userDetails && revealUserDetails ? (
        <UserDetails
          userDetails={userDetails}
          userId={userId}
          toast={toast}
          setDateLocation={setDateLocation}
          setUserDetails={setUserDetails}
          radius={radius}
          name={name}
          refetchAllDates={refetchAllDates}
          refetchAllNearbyDates={refetchAllNearbyDates}
          changeTab={changeTab}
        />
      ) : null}
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
        // onLoad={() => console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY)}
      >
        <GoogleMaps
          setDateLocation={setDateLocation}
          dateLocation={dateLocation}
          image={image}
          name={name}
          toast={toast}
          userId={userId}
          allDates={allDates}
          setUserDetails={setUserDetails}
          userDetails={userDetails}
        />
      </APIProvider>
    </div>
  );
}

function GoogleMaps({
  setDateLocation,
  dateLocation,
  allDates,
  userId,
  setUserDetails,
  name,
  image,
  userDetails,
  toast,
  radius,
}) {
  const map = useMap();

  const [placesService, setPlacesService] = useState(null);
  const [sessionToken, setSessionToken] = useState();
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [predictionResults, setPredictionResults] = useState([]);
  const [search, setSearch] = useInputDebounce("");
  const [pinSvg, setPinSvg] = useState();
  const [userPinSvg, setUserPinSvg] = useState();
  const [userLocation, setUserLocation] = useState(
    dateLocation?.location?.lat ? dateLocation.location : null
  );

  // the case)
  const placesLibrary = useMapsLibrary("places");
  useEffect(() => {
    if (!placesLibrary || !map) return;
    setPlacesService(new placesLibrary.PlacesService(map));
    setAutocompleteService(new placesLibrary.AutocompleteService());
    setSessionToken(new placesLibrary.AutocompleteSessionToken());

    // here you can interact with the imperative maps API

    // when placesLibrary is loaded, the library can be accessed via the
    // placesLibrary API object
    setPlacesService(new placesLibrary.PlacesService(map));
  }, [map, placesLibrary]);

  useEffect(
    function () {
      if (!autocompleteService || !sessionToken || !search) return;
      async function getPlace() {
        // const request = { input: "harvard", sessionToken };

        // console.log(
        //   userLocation?.[0]
        //     ? { lat: userLocation[0], lng: userLocation[0] }
        //     : nairobiCenter
        // );

        let request = {
          input: search,
          origin: userLocation?.[0]
            ? { lat: userLocation[0], lng: userLocation[0] }
            : nairobiCenter,
          includedPrimaryTypes: ["restaurant"],
          region: "KE",
        };
        if (radius && userLocation[0]) {
          request.locationBias = {
            Circle: {
              center: {
                lat: userLocation[0],
                lng: userLocation[1],
              },
              radius: radius * 1000,
            },
          };
        }
        // Create a session token.
        // Add the token to the request.
        request.sessionToken = sessionToken;
        const response = await autocompleteService.getPlacePredictions(request);
        setPredictionResults(response.predictions);
      }

      getPlace();
    },
    [autocompleteService, sessionToken, radius, userLocation, search]
  );

  const notifyDateLocationUpdated = () =>
    toast.success("Your date location updated successfully");
  const notifyPlacedidUndefined = () =>
    toast.error("Select a named premise or location for  ");

  const onPlaceSelect = useCallback((placeDetails) => {
    const datePlace = {
      name: placeDetails.name,
      location: {
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng(),
      },
      address: placeDetails.formatted_address,
      rating: placeDetails.rating,
      url: placeDetails.url,
      placeid: placeDetails.placeid,
    };
    setUserLocation(datePlace.location);

    async function updateLocation(place) {
      const locationUpdate = { ...place };

      locationUpdate.userid = userId;
      locationUpdate.latlng = `POINT(${locationUpdate.location.lng} ${locationUpdate.location.lat})`;

      delete locationUpdate.location;

      const data = await updateDateLocationAction(locationUpdate);
      if (data) notifyDateLocationUpdated();
    }

    setDateLocation(datePlace);
    updateLocation(datePlace);
  }, []);

  const handleSuggestionClick = useCallback(
    (placeId) => {
      if (!placesLibrary) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address", "rating", "url"],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails) => {
        placeDetails.placeid = placeId;

        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        // setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new placesLibrary.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [placesLibrary, placesService, sessionToken]
  );

  const handlePlaceClick = useCallback(
    (placeId) => {
      if (!placesLibrary || !placesService) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address", "rating", "url"],
        sessionToken,
      };

      const detailsRequestCallback = (placeDetails) => {
        placeDetails.placeid = placeId;

        onPlaceSelect(placeDetails);
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [placesLibrary, placesService]
  );

  useEffect(() => {
    const parser = new DOMParser();

    const pinSvgString = `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill= "#f2f2f2"
      >
       <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      </svg>`;

    const userPinSvgString = `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill= "#9a3412"
      >
       <path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z" />
      </svg>`;

    setPinSvg(
      parser.parseFromString(pinSvgString, "image/svg+xml").documentElement
    );
    setUserPinSvg(
      parser.parseFromString(userPinSvgString, "image/svg+xml").documentElement
    );
  }, []);

  if (!pinSvg || !userPinSvg) return null;

  // if (!placesLibrary || !map) return <p>loading</p>;

  return (
    <>
      {dateLocation?.name ? null : (
        <SearchDateLocations
          setSearch={setSearch}
          setUserLocation={setUserLocation}
          predictionResults={predictionResults}
          handleSuggestionClick={handleSuggestionClick}
          dateLocation={dateLocation}
        />
      )}
      <Map
        defaultZoom={12}
        defaultCenter={nairobiCenter}
        center={userLocation}
        disableDefaultUI={true}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        onCameraChanged={() => setUserLocation()}
        onClick={(e) => {
          if (dateLocation?.name) return e.stop();

          if (!e.detail.placeId) {
            return notifyPlacedidUndefined();
          }
          // stop to show the info window
          e.stop();
          handlePlaceClick(e.detail.placeId);
        }}
      >
        {dateLocation?.location?.lat ? (
          <AdvancedMarker
            position={dateLocation.location}
            onClick={() =>
              setUserDetails({
                ...dateLocation,
                location: dateLocation.name,
                name,
                image,
                user: true,
              })
            }
          >
            <Pin
              background={"#19170e"}
              glyph={userPinSvg}
              scale={1.2}
              borderColor={"#19170e"}
            />
          </AdvancedMarker>
        ) : null}

        {allDates?.[0] &&
          allDates.map((date, i) => (
            <AdvancedMarker
              position={{ lat: date.lat, lng: date.lng }}
              key={i}
              onClick={() => setUserDetails(date)}
            >
              <Pin
                background={"#9a3412"}
                glyph={pinSvg}
                scale={0.9}
                // glyphColor={"#000000"}
              />
            </AdvancedMarker>
          ))}
      </Map>
    </>
  );
}

//center should be state otherwise it will be a problem

function SearchDateLocations({
  setSearch,
  predictionResults,
  handleSuggestionClick,
  dateLocation,
  setUserLocation,
}) {
  if (dateLocation?.name) return null;
  return (
    <div
      className={`z-20 absolute top-1 rounded-lg left-0 right-0  w-fit mx-auto border grid mobile:flex  gap-4 bg-opacity-30 p-2 bg-stone-700 shadow-lg  items-start  `}
    >
      <div className="bg-white flex  p-2 gap-2  rounded">
        <div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 w-40 text-sm"
            placeholder="search a date location"
          />
          {predictionResults.length > 0 && (
            <ul className="grid gap-2">
              {predictionResults.map(({ place_id, description }) => {
                return (
                  <li
                    key={place_id}
                    className="hover:bg-stone-200"
                    onClick={() => handleSuggestionClick(place_id)}
                  >
                    {description}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Button
          onClick={async () => {
            const pos = await getUserLocation();
            if (pos.message) alert(pos.message);
            if (pos.location) {
              setUserLocation(pos.location);
            }
            //latLNG
          }}
          type="icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFF55"
            className="fill-orange-700"
          >
            <path d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default Locations;

// map.panTo(ev.latLng);
// gestureHandling={'greedy'}
// style={{width: '100vw', height: '100vh'}}

/// gemote

// can never use an arry declared in the functiion array in the dependecu

// an async function, like timeout whuch resolves after sometime in the background
// callback hells was where u would need to pass async function to receive the  results of the last async function and use that data in another async function.

// a promise is an object which represents the resolving or rejection of an async operation

// promises resolves an async operation.
// not every function is a promise, when using then u dont need to pass error callback at every level, any error will buble up to the catch. chained promises callbacks must return a value otherwise .

// with promise u do need to pass a callback function but can chain the last functions result to a new async function using then()

// then( ) returns a promise

// promise object using the async timeout functiobn, the value returned by resolve
// function doSomething() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Other things to do before completion of the promise
//       console.log("Did something");
//       // The fulfillment value of the promise
//       resolve("https://example.com/");
//     }, 200);
//   });
// }

//not every request can use abort controller

{
  /*  */
}

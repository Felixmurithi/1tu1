export default function getUserLocation() {
  return new Promise((resolve) => {
    // if geolocation is supported by the users  browser
    // if geolocation is not supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable

          resolve({ location: { lat: latitude, lng: longitude } });
        },

        //latLNG
        // if there was an error getting the users location
        (error) => {
          resolve({ message: "Error getting user location, enable access" });
        }
      );
    } else {
      resolve({ message: "Your broswer doe not support geolocation" });
    }
  });
}

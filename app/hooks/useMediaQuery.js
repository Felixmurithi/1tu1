import { useEffect, useState } from "react";

// export default function useMediaQuery(width) {
export default function useMediaQuery(query) {
  //width
  // const [matches, setMatches] =
  //   useState();
  //   // window.matchMedia(`(max-width: ${width}px)`).matches

  // useEffect(() => {
  //   window
  //     .matchMedia(`(max-width: ${width}px)`)
  //     .addEventListener("change", (e) => setMatches(e.matches));

  //   return window
  //     .matchMedia(`(max-width: ${width}px)`)
  //     .removeEventListener("change", (e) => setMatches(e.matches));
  // }, [width]);

  //QUERY
  const [matches, setMatches] = useState();

  
  const handleChange = (e) => setMatches(e.matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    m.addEventListener("change", handleChange);
    return () => {
      m.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}

// state  does not update the state vallue again whej the same value is passed.
// removing event listner, format includes function why

// const [matches, setMatches] = useState();

//   useEffect(() => {
//     window
//       .matchMedia(`(max-width: ${width}px)`)
//       .addEventListener("change", (e) => setMatches(e.matches));

//   }, [width]);

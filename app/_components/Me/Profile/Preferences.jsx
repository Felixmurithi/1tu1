import { useReducer } from "react";
import Input from "@/app/_components/Input";
import SelectPreference from "@/app/_components/Me/Profile/SelectPreference";

import {
  regions as regionsData,
  counties as countiesData,
  finances as financesData,
  kids as kidsData,
  professions as professionsData,
  ageRanges as ageRangesData,
} from "@/app/_lib/data";
import SectionHeader from "@/app/_components/Me/Profile/SectionHeader";

const initialState = {
  counties: [],
  professions: [],
  kids: false,
  finances: [],
};

function updateStateArray(state, value, payload, max) {
  if (state[value].length >= max)
    return {
      ...state,
      error: `${value} cannot be more than ${max}`,
    };
  else
    return {
      ...state,
      [`${value}`]: [...state[value], payload],
    };
}

function reducer(state, action) {
  switch (action.type) {
    case "rating": {
      return updateStateArray(state, "rating", action.payload, max);
    }
    case "counties": {
      return updateStateArray(state, "counties", action.payload, 5);
    }

    case "professions": {
      return updateStateArray(state, "professions", action.payload, 5);
    }
    case "finances": {
      return updateStateArray(state, "finances", action.payload, 5);
    }
    case "kids": {
      return { ...state, kids: action.payload };
    }
  }
}

export default function Preferences() {
  const [{ counties, professions, kids, finances }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <section className="grid gap-2">
      <SectionHeader>Preferences +</SectionHeader>

      <div className="bg-white grid gap-4 p-4">
        <SelectPreference
          dispatch={dispatch}
          allPreferences={countiesData}
          state={counties}
          dispatchType={"counties"}
        />
        <SelectPreference
          dispatch={dispatch}
          allPreferences={professionsData}
          state={professions}
          dispatchType={"professions"}
        />

        <Input
          type="number"
          onChange={(e) => dispatch({ type: "kids", payload: e.target.value })}
        >
          Kids
        </Input>

        <p></p>
      </div>
    </section>
  );
}

import { useReducer } from "react";
import Input from "../Input";
import SelectPreference from "../Me/SelectPreference";

import {
  regions as regionsData,
  counties as countiesData,
  financeData,
  kidsData,
  professionsData,
  ageRangesData,
  ratingsData,
} from "@/app/_lib/data";

const initialState = {
  rating: [],
  counties: [],
  professions: [],
  kids: false,
  finances: [],
};

function updateStateArray(state, value, payload, max) {
  console.log(value, payload);
  if (value.length >= max)
    return {
      ...state,
      error: `${value} canno be more than ${max}`,
    };
  else
    return {
      ...state,
      [`${value}`]: [...state.value, payload],
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
  const [{ rating, counties, professions, kids, finances }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <div className="grid gap-2">
      <h4 className="font-semibold opacity-50">Preferences +</h4>

      <SelectPreference
        dispatch={dispatch}
        allPreferences={countiesData}
        state={counties}
        dispatchType={"counties"}
      />

      <Input
        type="number"
        onChange={(e) => dispatch({ type: "kids", payload: e.target.value })}
      >
        Kids
      </Input>
    </div>
  );
}

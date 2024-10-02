"use client";

export default function SelectPreference({
  label,
  dispatch,
  state,
  dispatchType,
  allPreferences,
}) {
  console.log(state);
  return (
    <div className="bg-white p-4 grid  gap-6">
      <div className="grid grid-cols-2 w-fit">
        <label htmlFor={`interest`} className="w-min">
          {dispatchType}
        </label>

        <select name="" id="interest-preference" className="px-1 rounde-md">
          <option value="all">All</option>
          {allPreferences.map((int, i) => (
            <option
              value={int}
              key={i}
              onClick={(e) =>
                dispatch({ type: dispatchType, payload: e.target.value })
              }
            >
              {int}
            </option>
          ))}
        </select>
      </div>

      {state[0] && (
        <div className="flex gap-2">
          {state.map((int, i) => (
            <span key={i} className="bg-stone-300 px-2">
              {int}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

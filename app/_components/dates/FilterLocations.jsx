import Select from "@/app/_components/Select";
import Button from "@/app/_components/Button";

function FilterLocations() {
  return (
    <div className="flex px-2">
      <Select
        text={"distance"}
        options={["near me", "5 km", "10km", "20km", "50km"]}
      />
      <Button type="icon">🎬 filters</Button>
    </div>
  );
}

export default FilterLocations;

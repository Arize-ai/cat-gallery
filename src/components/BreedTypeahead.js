import React, { useState, useEffect, useCallback } from "react";
import Typeahead from "./Typeahead";
import catsApi from "../apis/catsApi";
import debounce from "../utils/debounce";

const noneItem = { id: "", name: "none" };

// const debouncedFn = _.debounce(originalFn);
const debouncedBreedsSearch = debounce((search, setBreeds) => {
  catsApi.breedsSearch({ search }).then((data) => {
    setBreeds(data);
  });
}, 500);

const BreedTypeahead = ({ onItemClick }) => {
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState([noneItem]);
  // TODO this is super inefficient, it makes a network call on every keystroke
  // Can we think of different solutions to make this better?
  useEffect(() => {
    debouncedBreedsSearch(search, setBreeds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="filter">
      <label className="filter__label">Breed</label>
      <Typeahead
        onInputChange={setSearch}
        items={breeds}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default BreedTypeahead;


import React from "react";
import Select from "./Select";
import categories from "../data/categories.json";

const noneItem = { id: "", name: "none" };
const CategorySelect = ({ value, onChange }) => {
  return (
    <div className="filter">
      <label className="filter__label" htmlFor="cat-select">
        Category
      </label>
      <Select
        id="cat-select"
        options={[noneItem, ...categories]}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CategorySelect;


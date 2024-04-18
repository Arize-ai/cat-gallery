import React from "react";

export default function Select({ id, options, onChange, value, disabled }) {
  return (
    <select
      id={id}
      className="select"
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}


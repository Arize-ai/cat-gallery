import React, { useState, useRef } from "react";
import "./Typeahead.css";
/**
 * Re-usable typeahead component
 */
const Typeahead = ({
  placeholder = "Start typing",
  onInputChange,
  items = [],
  onItemClick
}) => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  return (
    <div className={`typeahead ${active ? "typeahead--active" : ""}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onInputChange(e.target.value);
        }}
        onFocus={() => {
          setActive(true);
        }}
        onBlur={(e) => {
          setTimeout(() => {
            if (!inputRef.current.focused) {
              setActive(false);
            }
          }, 200);
        }}
      />
      {active ? (
        <div className="typeahead__dropdown">
          {items.length ? (
            <ul>
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    setText(item.name);
                    onItemClick && onItemClick(item.id);
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ) : (
            <span className="typeahead__dropdown__empty">No Values</span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Typeahead;


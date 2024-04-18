import React from "react";

const Cat = ({ url }) => {
  return (
    <div className="cat">
      <div
        className="cat__img"
        style={{
          backgroundImage: `url(${url})`,
        }}
      />
    </div>
  );
};

export default Cat;


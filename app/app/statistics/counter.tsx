"use client";

import React from "react";

const Counter = () => {
  const nextIgniteDate = new Date(2024, 9, 21, 0, 0, 0, 0);

  const calculateDateDiffernnce = () => {
    const nextIgniteTime = nextIgniteDate.getTime();
    const currentTime = new Date().getTime();

    return Math.floor((nextIgniteTime - currentTime) / (24 * 3600 * 1000));
  };

  return (
    <div className="p-6 bg-background-information text-fontSize-8 font-fontWeight-light text-center rounded">
      <span>
        2nd edition of Ignite 2024 will start{" "}
        <span className="font-bold">in {calculateDateDiffernnce()} days</span>!
        You cant still submit your ideas and sign up to teams.
      </span>
    </div>
  );
};

export default Counter;

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
    <div
      className="p-6 bg-background text-2xl text-center scale-blue-200"
      style={{ backgroundColor: "var(--scale-blue-100)" }}
    >
      <span>
        2nd edition of Ignite 2024 will start{" "}
        <span className="font-bold">in {calculateDateDiffernnce()} days</span>!
        You cant still submit your ideas and sign up to teams.
      </span>
    </div>
  );
};

export default Counter;

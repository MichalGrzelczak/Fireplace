"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import SelectComponent from "./SelectComponent";

const Filters = () => {
  const products = [
    { name: "BigPicture", id: "bigpicture" },
    { name: "7pace", id: "7pace" },
  ];
  const technologies = [
    { name: "Angular", id: "angular" },
    { name: "Java", id: "java" },
    { name: "React", id: "react" },
    { name: "Python", id: "python" },
  ];
  const skills = [
    { name: "frontend", id: "frontend" },
    { name: "backned", id: "backned" },
  ];
  const projectStatus = [
    { name: "open", id: "open" },
    { name: "closed", id: "closed" },
  ];

  const handleOnSelectProductClick = (id: string) => {};
  const handleOnSelectTechnologyClick = (id: string) => {};
  const handleOnSelectSkillClick = (id: string) => {};
  const handleOnSelectStatusClick = (id: string) => {};

  const handleShowRequested = () => {};

  return (
    <div className="flex items-center pl-6">
      <SelectComponent
        items={products}
        placeholder="Select a product"
        label="Product"
        onClickCallback={handleOnSelectProductClick}
      ></SelectComponent>
      <SelectComponent
        items={technologies}
        placeholder="Select a techonology"
        label="Technology"
        onClickCallback={handleOnSelectTechnologyClick}
      ></SelectComponent>
      <SelectComponent
        items={skills}
        placeholder="Select a skill"
        label="Needed skills"
        onClickCallback={handleOnSelectSkillClick}
      ></SelectComponent>
      <SelectComponent
        items={projectStatus}
        placeholder="Select a status"
        label="Project status"
        onClickCallback={handleOnSelectStatusClick}
      ></SelectComponent>
      <Button variant="outline" onClick={handleShowRequested}>
        Show requested
      </Button>
    </div>
  );
};

export default Filters;

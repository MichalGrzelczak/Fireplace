"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import FiltersSelect from "./filtersSelect";

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
      <FiltersSelect
        items={products}
        placeholder="Select a product"
        label="Product"
        onClickCallback={handleOnSelectProductClick}
      ></FiltersSelect>
      <FiltersSelect
        items={technologies}
        placeholder="Select a techonology"
        label="Technology"
        onClickCallback={handleOnSelectTechnologyClick}
      ></FiltersSelect>
      <FiltersSelect
        items={skills}
        placeholder="Select a skill"
        label="Needed skills"
        onClickCallback={handleOnSelectSkillClick}
      ></FiltersSelect>
      <FiltersSelect
        items={projectStatus}
        placeholder="Select a status"
        label="Project status"
        onClickCallback={handleOnSelectStatusClick}
      ></FiltersSelect>
      <Button
        variant="outline"
        className="h-full"
        onClick={handleShowRequested}
      >
        Show requested
      </Button>
    </div>
  );
};

export default Filters;

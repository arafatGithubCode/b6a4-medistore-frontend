"use client";

import { getCategoryByIdAction } from "@/actions/category";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/types/category-type";
import { useState } from "react";
import CategoryCard from "./category-card";

const GetCategoryById = () => {
  const [data, setData] = useState<ICategory | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string>("");

  const handleGetCategoryById = async (id: string) => {
    console.log("Fetching category with ID:", id);
    const { data } = await getCategoryByIdAction(id);
    setData(data);
  };
  return (
    <div className="p-4 mt-10">
      <h1>Get Category By ID</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetCategoryById(categoryId);
        }}
        className="flex gap-4 mt-4 w-full max-w-sm"
      >
        <Input
          required
          type="text"
          placeholder="Category ID"
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <Button type="submit">Get Category</Button>
      </form>
      {data ? (
        <div className="my-10">
          <h2 className="mt-6 mb-4">Category Details:</h2>
          <CategoryCard category={data} />
        </div>
      ) : (
        <p className="mt-4">No category found.</p>
      )}
    </div>
  );
};

export default GetCategoryById;

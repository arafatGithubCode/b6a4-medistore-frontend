"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ICategory } from "@/types/category-type";
import { useState } from "react";
import DeleteCategory from "./delete-category";
import UpdateCategory from "./update-category";

const CategoryCard = ({ category }: { category: ICategory }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card key={category.id} className="border-muted w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Slug:</span>{" "}
            {category.slug}
          </p>
          <p>
            <span className="font-medium text-foreground">ID:</span>{" "}
            {category.id}
          </p>
          <p>
            <span className="font-medium text-foreground">Is Active:</span>{" "}
            {category.isActive ? "Yes" : "No"}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Update
          </Button>
          <DeleteCategory id={category.id} />
        </CardFooter>
      </Card>
      {open && <UpdateCategory category={category} onClose={onClose} />}
    </div>
  );
};

export default CategoryCard;

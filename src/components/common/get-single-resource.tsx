"use client";

import { getSingleResourceAction } from "@/actions/common";
import { getErrorMessage } from "@/helpers/get-error";
import { useState } from "react";
import { toast } from "sonner";
import CategoryCard from "../module/category/category-card";
import UserCard from "../module/user/user-card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const GetSingleResource = ({
  path,
  resourceType,
  label,
}: {
  path: string;
  resourceType: string;
  label?: string;
}) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const handleGetSingleResource = async (value: string) => {
    setLoading(true);
    const toastId = toast.loading(`Fetching ${resourceType}...`);

    try {
      const { success, data } = await getSingleResourceAction(
        `${path}/${value}`,
      );

      if (success === false) {
        toast.error(`Failed to fetch ${resourceType}`, {
          id: toastId,
        });
        return;
      }
      setData(data);
      toast.success(`${resourceType} fetched successfully`, {
        id: toastId,
      });
      setValue("");
    } catch (error) {
      toast.error(`${getErrorMessage(error)} ${resourceType}`, {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 mt-10">
      <h1>
        Get {resourceType} By {label === "slug" ? "name" : "ID"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetSingleResource(value);
        }}
        className="flex gap-4 mt-4 w-full max-w-sm"
      >
        <Input
          required
          type="text"
          placeholder={`${resourceType} ${label === "slug" ? "name" : "ID"}`}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">
          {loading ? "Loading..." : `Get ${resourceType}`}
        </Button>
      </form>

      <div className="my-10">
        <h2 className="mt-6 mb-4">{resourceType} Details:</h2>
        {data && resourceType === "category" && (
          <CategoryCard category={data} />
        )}
        {data && resourceType === "user" && <UserCard user={data} />}
        {!data && <div>No {resourceType} data to display.</div>}
      </div>
    </div>
  );
};

export default GetSingleResource;

"use client";

import { updateUserByIdAction } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/helpers/get-error";
import { User } from "@/types/session-type";
import { Edit, Mail, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ProfileDisplay({ user }: { user: User }) {
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const router = useRouter();

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const [editingField, setEditingField] = useState<string | null>(null);

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    label: string,
  ) => {
    e.preventDefault();
    setLoadingField(label);
    const toastId = toast.loading("Updating profile...");
    try {
      const formData = new FormData(e.currentTarget);
      const updatedLabel = formData.get(label) as string;

      const { success, data, message } = await updateUserByIdAction(user.id, {
        [label]: updatedLabel,
      });

      if (success === false) {
        toast.error(message, { id: toastId });
        return;
      }
      toast.success("Profile updated successfully", { id: toastId });
      router.refresh();
      setEditingField(null);
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoadingField(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            You can update your profile details here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/10">
                {initials}
              </AvatarFallback>
            </Avatar>
            {editingField === "name" ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleUpdateUser(e, "name")}
              >
                <Input
                  defaultValue={user.name}
                  type="text"
                  id="name"
                  name="name"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loadingField === "name"}
                    type="submit"
                    className="mr-2"
                  >
                    {loadingField === "name" ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="relative">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <Edit
                    onClick={() => setEditingField("name")}
                    size={16}
                    className="absolute top-0 -right-5 cursor-pointer text-muted-foreground hover:text-primary"
                  />
                </div>
              </>
            )}
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-base font-medium text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            {editingField === "phone" ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleUpdateUser(e, "phone")}
              >
                <Input
                  defaultValue={user.phone || ""}
                  type="text"
                  id="phone"
                  name="phone"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loadingField === "phone"}
                    type="submit"
                    className="mr-2"
                  >
                    {loadingField === "phone" ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="relative">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-base font-medium">
                  {user.phone || "Not provided"}
                </p>
                <Edit
                  onClick={() => setEditingField("phone")}
                  size={16}
                  className="absolute top-0 -right-5 cursor-pointer text-muted-foreground hover:text-primary"
                />
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            {editingField === "address" ? (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleUpdateUser(e, "address")}
              >
                <Input
                  defaultValue={user.address || ""}
                  type="text"
                  id="address"
                  name="address"
                />
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loadingField === "address"}
                    type="submit"
                    className="mr-2"
                  >
                    {loadingField === "address" ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="relative">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-base font-medium">
                  {user.address || "Not provided"}
                </p>
                <Edit
                  onClick={() => setEditingField("address")}
                  size={16}
                  className="absolute top-0 -right-5 cursor-pointer text-muted-foreground hover:text-primary"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

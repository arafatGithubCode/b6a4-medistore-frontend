"use client";

import { authClient } from "@/lib/auth-client";
import { User } from "@/types";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Shield,
  User as UserIcon,
} from "lucide-react";
import DeleteUser from "./delete-user";

const UserCard = ({ user }: { user: User }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFullAddress = () => {
    const parts = [
      user.address,
      user.city,
      user.state,
      user.zipCode,
      user.country,
    ];
    return parts.filter(Boolean).join(", ") || "N/A";
  };

  const { data: session } = authClient.useSession();
  const loggedInUser: User | null = session
    ? (session.user as unknown as User)
    : null;
  const isAdmin = loggedInUser?.role === "ADMIN";

  return (
    <div className="border border-border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm bg-card">
      {/* Header with Avatar */}
      <div className="bg-linear-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary capitalize">
                {user.role.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Email
            </p>
            <p className="text-sm text-foreground break-words">{user.email}</p>
          </div>
        </div>

        {/* Phone */}
        {user.phone && (
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium mb-1">
                Phone
              </p>
              <p className="text-sm text-foreground">{user.phone}</p>
            </div>
          </div>
        )}

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Address
            </p>
            <p className="text-sm text-foreground break-words">
              {getFullAddress()}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">
                Joined
              </p>
              <p className="text-sm text-foreground">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">
                Last Updated
              </p>
              <p className="text-sm text-foreground">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* ID Badge */}
        <div className="pt-4 border-t border-border">
          <div className="bg-muted/50 rounded-md p-3">
            <p className="text-xs text-muted-foreground font-medium mb-1">
              User ID
            </p>
            <p className="text-xs font-mono text-foreground break-all">
              {user.id}
            </p>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="p-6 border-t border-border flex justify-end">
          <DeleteUser userId={user.id} />
        </div>
      )}
    </div>
  );
};

export default UserCard;

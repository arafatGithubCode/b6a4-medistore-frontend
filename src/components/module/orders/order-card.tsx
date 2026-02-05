"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { IOrder, ROLE, User } from "@/types";
import {
  Calendar,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import CancelOrder from "./cancel-order";
import UpdateOrderStatus from "./update-order-status";

interface OrderCardProps {
  order: IOrder;
}

const getStatusVariant = (
  status: string,
):
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning"
  | "info" => {
  const statusMap: Record<string, any> = {
    PENDING: "warning",
    PROCESSING: "info",
    SHIPPED: "info",
    DELIVERED: "success",
    CANCELLED: "destructive",
    REFUNDED: "secondary",
  };
  return statusMap[status] || "default";
};

const formatPaymentMethod = (method: string) => {
  return method
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

export function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items.length;
  const firstItem = order.items[0];

  const { data: session } = authClient.useSession();
  const user: User | null = session ? (session.user as unknown as User) : null;
  const isSeller = user?.role === ROLE.SELLER;
  const isAdmin = user?.role === ROLE.ADMIN;

  const hasActionPermissions = isSeller || isAdmin;

  const isPlaced = order.status === "PLACED";

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order #{order.id.slice(0, 8)}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(order.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items Summary */}
          <div className="flex items-center gap-2 text-sm">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            {firstItem && (
              <span className="text-sm">
                - {firstItem.medicine?.name || "Product"}
                {itemCount > 1 && (
                  <span className="text-muted-foreground">
                    {" "}
                    and {itemCount - 1} more
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Shipping Address */}
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {formatPaymentMethod(order.paymentMethod)}
            </span>
          </div>

          {/* Total Amount */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm font-medium">Total Amount</span>
            <span className="text-lg font-bold">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Action Button */}
          {hasActionPermissions ? (
            <UpdateOrderStatus currentStatus={order.status} id={order.id} />
          ) : (
            <>
              {isPlaced ? (
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline">Awaiting processing by seller</Badge>
                  <CancelOrder orderId={order.id} />
                </div>
              ) : (
                <div>
                  <Badge variant="outline" className="w-full p-2">
                    {`Order is currently ${order.status.toLowerCase()}. `}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    For any inquiries, please contact support.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

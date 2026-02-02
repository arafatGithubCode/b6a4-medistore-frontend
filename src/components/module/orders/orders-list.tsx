"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IOrder } from "@/types";
import { Filter, Package, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { OrderCard } from "./order-card";

interface OrdersListProps {
  orders: IOrder[];
}

type SortOption = "newest" | "oldest" | "highest" | "lowest";
type FilterOption =
  | "all"
  | "PLACED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export function OrdersList({ orders }: OrdersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterStatus, setFilterStatus] = useState<FilterOption>("all");

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    // Filter by search query (order ID or customer name)
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.shippingAddress.fullName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return b.totalAmount - a.totalAmount;
        case "lowest":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, searchQuery, sortBy, filterStatus]);

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "PLACED").length,
      processing: orders.filter((o) => o.status === "PROCESSING").length,
      delivered: orders.filter((o) => o.status === "DELIVERED").length,
      cancel: orders.filter((o) => o.status === "CANCELLED").length,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold">{orderStats.total}</p>
        </div>
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orderStats.pending}
          </p>
        </div>
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="text-2xl font-bold text-blue-600">
            {orderStats.processing}
          </p>
        </div>
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Delivered</p>
          <p className="text-2xl font-bold text-green-600">
            {orderStats.delivered}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value as FilterOption)}
        >
          <SelectTrigger className="w-full sm:w-45">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="PLACED">Pending</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Amount</SelectItem>
            <SelectItem value="lowest">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Grid */}
      {filteredAndSortedOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAndSortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground max-w-md">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You haven't placed any orders yet. Start shopping to see your orders here."}
          </p>
        </div>
      )}
    </div>
  );
}

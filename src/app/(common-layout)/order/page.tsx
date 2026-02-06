import { getAllOrdersOfCustomerAction } from "@/actions/order";
import { OrdersList } from "@/components/module/orders";
import { ShoppingBag } from "lucide-react";

const OrderPage = async () => {
  const { data: orders } = await getAllOrdersOfCustomerAction();
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg">
          <ShoppingBag className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your order history
          </p>
        </div>
      </div>

      {/* Orders List */}
      {orders && orders.length > 0 ? (
        <OrdersList orders={orders} />
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Failed to load orders. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;

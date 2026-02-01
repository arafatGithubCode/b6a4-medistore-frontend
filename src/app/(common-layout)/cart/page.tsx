import { getCurrentUserCartAction } from "@/actions/cart";
import CartWrapper from "@/components/module/cart-page/cart-wrapper";

const CartPage = async () => {
  const { data } = await getCurrentUserCartAction();

  return (
    <div>
      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 text-center shadow-xs">
        <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4">
          Your Shopping Cart
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Review the items in your cart and proceed to checkout when ready.
        </p>
      </div>

      <CartWrapper cart={data} />
    </div>
  );
};

export default CartPage;

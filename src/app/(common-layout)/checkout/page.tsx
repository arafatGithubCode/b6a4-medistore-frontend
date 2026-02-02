import { getCurrentUserCartAction } from "@/actions/cart";
import { CheckoutWrapper } from "@/components/module/checkout/checkout-wrapper";

const CheckoutPage = async () => {
  const { data } = await getCurrentUserCartAction();

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutWrapper cart={data} />
    </div>
  );
};

export default CheckoutPage;

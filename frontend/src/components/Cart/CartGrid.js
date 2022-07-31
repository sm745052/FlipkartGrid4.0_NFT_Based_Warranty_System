import CartItem from "./CartItem";

export default function CartGrid({
  addItemToCart,
  isAuthenticated,
  cartItems,
  vendor
}) {
  return (
    <>
      <CartItem
        isAuthenticated={isAuthenticated}
        vendor={vendor}
        cartItems={cartItems}
        addItemToCart={addItemToCart}
      />
    </>
  );
}

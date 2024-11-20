import CartModal from "./CartModal";
import { useRef } from "react";
import imgLogo from "../assets/logo.jpg";
import { useCart } from "../cart/cart-context";
import CheckoutModal from "./CheckoutModal";

export default function Header() {
  const { cartItems, getTotalItems } = useCart();
  // Ссылки на модальные окна
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();

  function handleOpenCartClick() {
    cartModalRef.current.open();
  }

  function handleOpenCheckoutModal() {
    cartModalRef.current.close(); // Закрываем корзину
    checkoutModalRef.current.open(); // Открываем окно оформления заказа
  }

  return (
    <>
      <CartModal
        ref={cartModalRef}
        title="Your Cart"
        cartItems={cartItems}
        onOpenCheckoutModal={handleOpenCheckoutModal}
      />

      {/* Модальное окно для оформления заказа */}
      <CheckoutModal ref={checkoutModalRef} title="Checkout" />


      
      <header id="main-header">
        <div id="title">
          <img src={imgLogo} alt="Logo" />
          <h1>ReactFood</h1>
        </div>
        <button className="text-button" onClick={handleOpenCartClick}>Cart ({getTotalItems()})</button>
      </header>
    </>
  );
}

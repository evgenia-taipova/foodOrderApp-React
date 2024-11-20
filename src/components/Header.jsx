import imgLogo from "../assets/logo.jpg";

import { useRef } from "react";
import { useCart } from "../cart/cart-context";

import CartModal from "./CartModal";
import CheckoutModal from "./CheckoutModal";
import SuccessModal from "./SuccessModal";

export default function Header() {
  const { cartItems, getTotalItems } = useCart();
  // Ссылки на модальные окна
  const cartModalRef = useRef();
  const checkoutModalRef = useRef();
  const successModalRef = useRef();

  function handleOpenCartClick() {
    cartModalRef.current.open();
  }

  function handleOpenCheckoutModal() {
    cartModalRef.current.close(); // Закрываем корзину
    checkoutModalRef.current.open(); // Открываем окно оформления заказа
  }

  function handleOrderSuccess() {
    successModalRef.current.open(); // Открываем окно успеха
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
      <CheckoutModal
        ref={checkoutModalRef}
        title="Checkout"
        onOrderSuccess={handleOrderSuccess}
      />
      <SuccessModal
        ref={successModalRef}
        title="Success!"
      />

      <header id="main-header">
        <div id="title">
          <img src={imgLogo} alt="Logo" />
          <h1>ReactFood</h1>
        </div>
        <button className="text-button" onClick={handleOpenCartClick}>
          Cart ({getTotalItems()})
        </button>
      </header>
    </>
  );
}

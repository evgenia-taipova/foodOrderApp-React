import CartModal from "./CartModal";
import { useRef } from "react";
import imgLogo from "../assets/logo.jpg";
import { useCart } from "../cart/cart-context";

export default function Header() {
  const { cartItems, getTotalItems } = useCart();
  const modal = useRef();

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" cartItems={cartItems} />
      <header id="main-header">
        <div id="title">
          <img src={imgLogo} alt="Logo" />
          <h1>ReactFood</h1>
        </div>
        <button onClick={handleOpenCartClick}>Cart ({getTotalItems()})</button>
      </header>
    </>
  );
}

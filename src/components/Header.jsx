import { useRef } from "react";
import CartModal from "./CartModal";
import imgLogo from "../assets/logo.jpg";

export default function Header({ cartItems, onAdd, onRemove, totalItems }) {
  const modal = useRef();

  function handleOpenCartClick() {
    modal.current.open();
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your cart"
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
      />
      <header id="main-header">
        <div id="title">
          <img src={imgLogo} alt="Logo" />
          <h1>ReactFood</h1>
        </div>
        <button onClick={handleOpenCartClick}>Cart ({totalItems})</button>
      </header>
    </>
  );
}

import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../cart/cart-context";

const CartModal = forwardRef(function Modal({ title }, ref) {
  const dialog = useRef();
  const { cartItems, addItemToCart, removeItemFromCart, getTotalPrice } =
    useCart();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
  }));

  return createPortal(
    <dialog id="modal" className="modal" ref={dialog}>
      <h2>{title}</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart!</p>
      ) : (
        <div className="cart">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <p>
                  {item.name} - {item.quantity} x ${item.price}
                </p>
                <div className="cart-item-actions">
                  <button onClick={() => removeItemFromCart(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItemToCart(item)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">${getTotalPrice()}</div>
        </div>
      )}
      <form method="dialog" id="modal-actions">
        <button>Close</button>
        <button>Go to Checkout</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;

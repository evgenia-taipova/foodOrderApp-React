import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CartModal = forwardRef(function Modal(
  { title, cartItems, onAdd, onRemove },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
  }));

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart!</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-item-actions">
                <button onClick={() => onRemove(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onAdd(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form method="dialog" id="modal-actions">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;

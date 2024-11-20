import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../cart/cart-context";

const CartModal = forwardRef(function CartModal(
  { title, onOpenCheckoutModal },
  ref
) {
  const dialog = useRef();
  const { addItemToCart, removeItemFromCart, cartItems, totalPrice } =
    useCart();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  const handleCheckoutClick = () => {
    onOpenCheckoutModal(); // Открытие окна оформления заказа
    dialog.current.close(); // Закрытие окна корзины
  };

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
          <div className="cart-total">${totalPrice}</div>
        </div>
      )}
      <form method="dialog" className="modal-actions">
        <button className="text-button">Close</button>
        <button className="button" onClick={handleCheckoutClick}>
          Go to Checkout
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;

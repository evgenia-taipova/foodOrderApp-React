import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../cart/cart-context";

const CheckoutModal = forwardRef(function CheckoutModal({ title }, ref) {
  const dialog = useRef();
  const { totalPrice } = useCart();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  return createPortal(
    <dialog id="checkout-modal" className="modal" ref={dialog}>
      <form>
        <h2>{title}</h2>
        <p>Total Amount: ${totalPrice}</p>
        <div className="control">
          <label>Full Name</label>
          <input />
        </div>
        <div className="control">
          <label>E-Mail Address</label>
          <input />
        </div>
        <div className="control">
          <label>Street</label>
          <input />
        </div>
        <div className="control-row">
          <div className="control">
            <label>Postal Code</label>
            <input />
          </div>
          <div className="control">
            <label>City</label>
            <input />
          </div>
        </div>
        <p>
          <button type="button" onClick={() => dialog.current.close()}>
            Close
          </button>
          <button type="submit">Submit Order</button>
        </p>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CheckoutModal;

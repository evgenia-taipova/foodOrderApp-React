import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../cart/cart-context";

const CheckoutModal = forwardRef(function CheckoutModal(
  { title, onOrderSuccess },
  ref
) {
  const dialog = useRef();
  const { cartItems, totalPrice } = useCart();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const userData = Object.fromEntries(fd.entries());

    // console.log(userData);

    const orderData = {
      order: {
        customer: {
          name: userData["full-name"],
          email: userData["email"],
          street: userData["street"],
          postalCode: userData["postal-code"],
          city: userData["city"],
        },
        items: cartItems,
        totalPrice: totalPrice,
        date: new Date().toISOString(),
      },
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorDetail = await response.json();
        console.error("Error details:", errorDetail);
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      console.log("Order submitted successfully:", result);
      dialog.current.close(); // Close the modal after submitting
      onOrderSuccess();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }

  return createPortal(
    <dialog id="checkout-modal" className="modal" ref={dialog}>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <p>Total Amount: ${totalPrice}</p>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="full-name" name="full-name" required />
        </div>
        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" required />
        </div>
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" id="postal-code" name="postal-code" required />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" required />
          </div>
        </div>
        <p className="modal-actions">
          <button
            className="text-button"
            type="button"
            onClick={() => dialog.current.close()}
          >
            Close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </p>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CheckoutModal;

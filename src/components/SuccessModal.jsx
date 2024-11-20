import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const SuccessModal = forwardRef(function SuccessModal({ title }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
    close: () => dialog.current.close(),
  }));

  return createPortal(
    <dialog id="success-modal" className="modal" ref={dialog}>
      <h2>{title}</h2>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes.
      </p>
      <button
        className="button"
        type="button"
        onClick={() => dialog.current.close()}
      >
        Okay
      </button>
    </dialog>,
    document.getElementById("modal")
  );
});

export default SuccessModal;

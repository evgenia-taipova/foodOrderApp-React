import { useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addItemToCart(item) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }

  function removeItemFromCart(itemId) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function getTotalItems() {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <>
      <Header
        cartItems={cartItems}
        totalItems={getTotalItems()}
        onAdd={addItemToCart}
        onRemove={removeItemFromCart}
      />
      <Products onAddToCart={addItemToCart} />
    </>
  );
}

export default App;

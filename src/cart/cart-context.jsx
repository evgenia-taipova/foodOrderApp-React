import { createContext, useContext, useState } from "react";

// Создаем контекст корзины
export const CartContext = createContext();

// Провайдер для оборачивания приложения и предоставления состояния корзины
export const CartProvider = ({ children }) => {
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

  const totalPrice = cartItems
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        getTotalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста
export const useCart = () => {
  return useContext(CartContext);
};

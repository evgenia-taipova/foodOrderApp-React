import Header from "./components/Header";
import Products from "./components/Products";
import { CartProvider } from "./cart/cart-context";

function App() {
  return (
    <CartProvider>
      <Header />
      <Products />
    </CartProvider>
  );
}
export default App;

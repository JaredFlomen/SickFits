import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider, used to store data (state) and functionality updaters.
  // Anyone can access it via the consumer
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

// Custom hook for accessing the cart local state
function useCart() {
  // Consumer to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };

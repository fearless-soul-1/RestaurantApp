import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    // console.log(item);
    const existingItemIndex = items.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex >= 0) {
      // If item exists, create a new array with updated quantity
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity =
        Number(updatedItems[existingItemIndex].quantity) +
        1;

      setItems(updatedItems);
    } else {
      setItems([...items, item]);
    }

    setTotalAmount(
      (prevTotal) => prevTotal + Number(item.price) * Number(item.quantity)
    );
  };

  const removeItemFromCartHandler = (id) => {
    // console.log(items);
    // console.log(id);
    const existingItemIndex = items.findIndex((item) => item.id === id);
    if (existingItemIndex < 0) return;

    const existingItem = items[existingItemIndex];
    let updatedItems;

    if (existingItem.quantity <= 1) {
      updatedItems = items.filter((item) => item.id !== id);
    } else {
      // Decrease quantity by 1
      updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
    }

    setItems(updatedItems);
    setTotalAmount((prevTotal) => prevTotal - existingItem.price);
  };

  const cartContext = {
    items: items,
    totalAmount: totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

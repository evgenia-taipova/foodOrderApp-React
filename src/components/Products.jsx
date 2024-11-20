import { useState, useEffect } from "react";
import Meal from "./Meal";

async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }
  return resData;
}

export default function Products({ onAddToCart }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const meals = await fetchAvailableMeals();
        setAvailableMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchMeals();
  }, []);

  if (isFetching) {
    return <p>Loading meals...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  // console.log(availableMeals);
  return <Meal meals={availableMeals} onAddToCart={onAddToCart} />;
}

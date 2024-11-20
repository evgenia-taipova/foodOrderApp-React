export default function Meal({ meals, onAddToCart }) {
  return (
    <section>
      <ul id="meals">
        {meals.map((meal) => (
          <li key={meal.id}>
            <article className="meal-item">
              <img
                src={`http://localhost:3000/${meal.image}`}
                alt={meal.name}
              />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">${meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>

              <p className="meal-item-actions">
                <button onClick={() => onAddToCart(meal)}>Add to cart</button>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Meal({ image, title,price, description }) {
  return (
    <div className="meal-item">
      <article>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p className="meal-item-price">{price}</p>
        <p className="meal-item-description">{description}</p>

        <p className="meal-item-actions">
          <button>Add to cart</button>
        </p>
      </article>
    </div>
  );
}

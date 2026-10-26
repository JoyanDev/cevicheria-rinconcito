import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  cart,
  onAgregar,
  onQuitar,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={`${product.categoria}-${product.id}`}
          product={product}
          cart={cart}
          onAgregar={onAgregar}
          onQuitar={onQuitar}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
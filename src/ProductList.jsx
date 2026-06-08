import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./redux/cartSlice";
import "./ProductList.css";
import CartItem from "./CartItem";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  
  const isInCart = (plantName) => {
    return cartItems.some(item => item.id === plantName);
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties.", cost: "$14" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Calming scent, used in aromatherapy.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Sweet fragrance, promotes relaxation.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating scent, often used in cooking.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma, used in teas and cooking.", cost: "$12" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress.", cost: "$14" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant with fragrant scent.", cost: "$22" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "Thrives in low light, minimal watering needed.", cost: "$25" },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg", description: "Tolerates neglect, grows in various conditions.", cost: "$10" },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg", description: "Hardy plant tolerating low light and neglect.", cost: "$20" },
        { name: "Succulents", image: "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg", description: "Drought-tolerant with unique shapes.", cost: "$18" },
        { name: "Aglaonema", image: "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg", description: "Minimal care, adds color to indoor spaces.", cost: "$22" }
      ]
    }
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = () => {
  setShowCart(false);
};

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        id: plant.name,
        name: plant.name,
        price: parseFloat(plant.cost.replace("$", "")),
        image: plant.image,
        quantity: 1,
      })
    );
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar" style={{ backgroundColor: "#4CAF50", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="Logo" style={{ height: "50px" }} />
          <a href="/" onClick={handleHomeClick} style={{ color: "white", textDecoration: "none", marginLeft: "10px" }}>
            <h3 style={{ color: "white", margin: 0 }}>Paradise Nursery</h3>
            <i style={{ color: "white" }}>Where Green Meets Serenity</i>
          </a>
        </div>
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <a href="#" onClick={handlePlantsClick} style={{ color: "white", fontSize: "20px", textDecoration: "none" }}>Plants</a>
          <a href="#" onClick={handleCartClick} style={{ color: "white", fontSize: "20px", textDecoration: "none" }}>
            🛒 Cart
            {cartQuantity > 0 && (
              <span style={{ backgroundColor: "red", borderRadius: "50%", padding: "2px 8px", marginLeft: "5px", fontSize: "12px", color: "white" }}>
                {cartQuantity}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Product Grid or Cart */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, catIndex) => (
            <div key={catIndex} className="category-section">
              <h2 className="category-title">{category.category}</h2>
              <div className="plants-grid">
                {category.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />
                    <h3 className="plant-name">{plant.name}</h3>
                    <p className="plant-description">{plant.description}</p>
                    <p className="plant-cost">{plant.cost}</p>
                    <button
                      className={`add-to-cart-btn ${isInCart(plant.name) ? "added" : ""}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
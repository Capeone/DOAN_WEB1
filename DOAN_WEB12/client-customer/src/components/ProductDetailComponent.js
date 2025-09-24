import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/Mycontext';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  componentDidMount() {
    const { id } = this.props.params;
    this.fetchProductDetails(id);
  }

  fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`/api/customer/products/${id}`);
      this.setState({ product: response.data });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  handleQuantityChange = (event) => {
    const quantity = event.target.value;
    this.setState({ txtQuantity: quantity });
  };

  handleAddToCart = (event) => {
    event.preventDefault();
    const { product, txtQuantity } = this.state;
    const quantity = parseInt(txtQuantity, 10);

    if (quantity > 0) {
      const { mycart, setMycart } = this.context;
      const productIndex = mycart.findIndex(item => item.product._id === product._id);

      if (productIndex === -1) {
        mycart.push({ product, quantity });
      } else {
        mycart[productIndex].quantity += quantity;
      }

      setMycart(mycart);
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } else {
      alert('Vui lòng nhập số lượng hợp lệ.');
    }
  };

  renderProductDetails = () => {
    const { product, txtQuantity } = this.state;

    return (
      <div className="product-detail-container">
        <img
          className="product-image"
          src={`data:image/jpg;base64,${product.image}`}
          alt={product.name}
        />
        <div className="product-info">
          <h2>{product.name}</h2>
          <div className="product-detail-row">
            <span>ID:</span><span>{product._id}</span>
          </div>
          <div className="product-detail-row">
            <span>Price:</span><span>{product.price} VND</span>
          </div>
          <div className="product-detail-row">
            <span>Category:</span><span>{product.category.name}</span>
          </div>
          <div className="product-detail-row">
            <span>Quantity:</span>
            <input
              type="number"
              className="quantity-input"
              min="1"
              max="99"
              value={txtQuantity}
              onChange={this.handleQuantityChange}
            />
          </div>
          <button className="add-to-cart-btn" onClick={this.handleAddToCart}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { product } = this.state;
    return product ? this.renderProductDetails() : <div>Loading...</div>;
  }
}

export default withRouter(ProductDetail);

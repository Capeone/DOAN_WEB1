import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../components/img/logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      discountBanner: false,
      discountDetails: { title: " ", description: " " },
    };
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
    setTimeout(() => {
      this.setState({ discountBanner: true });
    }, 5000); // Display banner after 5 seconds
  }

  // API calls
  apiGetNewProducts() {
    axios
      .get("/api/customer/products/new")
      .then((res) => {
        const result = res.data;
        this.setState({ newprods: result });
      })
      .catch((error) => console.error("Error fetching new products:", error));
  }

  apiGetHotProducts() {
    axios
      .get("/api/customer/products/hot")
      .then((res) => {
        const result = res.data;
        this.setState({ hotprods: result });
      })
      .catch((error) => console.error("Error fetching hot products:", error));
  }

  render() {
    const { newprods, hotprods, discountBanner, discountDetails } = this.state;

    const renderProducts = (products) => {
      return products
        .filter((item) => item && item._id) // Ensure product and _id exist
        .map((item) => (
          <div key={item._id} className="inline product-card">
            <figure>
              <Link to={`/product/${item._id}`}>
                <img
                  src={`data:image/jpg;base64,${item.image}`}
                  width="300px"
                  height="300px"
                  alt={item.name || "Product Image"}
                />
              </Link>
              <figcaption className="text-center">
                <strong>{item.name}</strong>
                <br />
                Giá: {item.price} VND
                <br />
                
                <br />
                
              </figcaption>
            </figure>
          </div>
        ));
    };

    return (
      <div>
        {/* Discount Banner */}
        {discountBanner && (
          <div className="discount-banner">
            <div className="discount-banner-content">
              <h2>{discountDetails.title}</h2>
              <p>{discountDetails.description}</p>
              
            </div>
          </div>
        )}

        {/* New Products Section */}
        <div className="align-center">
          <h2 className="text-center">SẢN PHẨM MỚI</h2>
          {renderProducts(newprods)}
        </div>

        {/* Hot Products Section */}
        {hotprods.length > 0 && (
          <div className="align-center">
            <h2 className="text-center">SẢN PHẨM HOT</h2>
            {renderProducts(hotprods)}
          </div>
        )}

        {/* About Section */}
        <div className="about container">
          <div className="col-left">
            <div className="about-img">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </div>
          <div className="col-right">
              <b>Giới thiệu về Chill & Beer</b>
            
              <h2>
                <i>Nơi trải nghiệm hương vị - Khám phá thế giới qua từng ly đồ uống</i>
              </h2>
              <p>
                Chào mừng bạn đến với Chill & Beer, nơi chúng tôi mang đến cho bạn một 
                hành trình khám phá tuyệt vời qua bộ sưu tập đồ uống phong phú từ khắp 
                nơi trên thế giới. Tại đây, bạn sẽ tìm thấy những loại bia thủ công tinh tế, 
                rượu vang hảo hạng, và những đồ uống độc đáo khác, tất cả đều được tuyển chọn 
                từ những thương hiệu danh tiếng và chất lượng nhất.
              </p>
              <p>
                Chúng tôi không chỉ đơn thuần là một cửa hàng trực tuyến; Chill & Beer là 
                điểm đến cho những ai yêu thích khám phá và thưởng thức. Với cam kết về 
                chất lượng, chúng tôi đảm bảo rằng mỗi sản phẩm đều mang đến cho bạn 
                sự hài lòng và trải nghiệm tốt nhất.
              </p>
              <p>
                Chill & Beer còn tự hào cung cấp dịch vụ khách hàng tận tâm, sẵn sàng lắng nghe 
                và hỗ trợ bạn trong việc lựa chọn sản phẩm phù hợp với khẩu vị và sở thích cá nhân. 
                Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn và chia sẻ những bí quyết thưởng thức, 
                giúp bạn hiểu rõ hơn về từng loại đồ uống mà bạn chọn.
              </p>
              <p>
              Chúng tôi không chỉ muốn bạn mua sắm, mà còn muốn bạn cảm nhận được sự kết nối và đam mê dành 
              cho nghệ thuật pha chế và thưởng thức đồ uống. Chill & Beer là nơi hội tụ của những tín đồ 
              yêu thích đồ uống, nơi bạn có thể khám phá, học hỏi và chia sẻ những trải nghiệm đáng nhớ cùng nhau.
              </p>
          </div>
        </div>

        {/* Contact Section */}
        <section id="contact">
          <div className="contact container">
            <div>
              <h1 className="section-title">Thông tin <span>liên hệ</span></h1>
            </div>
            <div className="contact-items">
              <div className="contact-item">
                <div className="icon">
                  <img src="https://img.icons8.com/bubbles/100/000000/phone.png" alt="Phone Icon" />
                </div>
                <div className="contact-info">
                  <h1>Phone</h1>
                  <h2>+0123 456 789</h2>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon">
                  <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" alt="Email Icon" />
                </div>
                <div className="contact-info">
                  <h1>Email</h1>
                  <h2>chillnbeer@gmail.com</h2>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon">
                  <img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" alt="Location Icon" />
                </div>
                <div className="contact-info">
                  <h1>Address</h1>
                  <h2>Tp Hồ Chí Minh, Việt Nam</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section id="footer">
          <div className="footer container">
            <div className="social-icon">
              <div className="social-item">
                <a href="https://www.facebook.com/nnm2k3">
                  <img src="https://img.icons8.com/bubbles/100/000000/facebook-new.png" alt="Facebook Icon" />
                </a>
              </div>
              <div className="social-item">
                <a href="https://www.instagram.com/nnm.2810/">
                  <img src="https://img.icons8.com/bubbles/100/000000/instagram-new.png" alt="Instagram Icon" />
                </a>
              </div>
            </div>
            <p>Follow us for updates and special offers!</p>
            <p>Copyright © 2024 Chill&Beer . All rights reserved</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;

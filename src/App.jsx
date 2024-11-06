import { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import styled from "styled-components";
import { MdFileDownloadDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { nanoid } from "nanoid";
const FormSelect = styled.select`
  padding: 6px 10px;
  width: 170px;
  border: none;
  margin: 10px;
  font-size: 17px;
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid #d4f6ff;
    box-shadow: 0 0 14px #608bc1;
  }
`;

const Button = styled.button`
  padding: 7px 22px;
  background-color: #7ab2d3;
  font-size: 20px;
  color: aliceblue;
  box-shadow: 0 0 5px #536493;
  border: none;
  border-radius: 5px;
`;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 @keyframes bgAnimation {
  0% {
    background-color: #c5dac5;
    color: black;
  }
  25% {
    background-color: #c5dac5; /* Hafif yeşil */
    color: black;
  }
  50% {
    background-color: #99b999; /* Hafif yeşil */
    color: black;
  }
  75% {
    background-color: rgba(0,85,65,0.8); /* Beyazımsı yeşil */
    color: aliceblue !important;
  }
  100% {
    background-color: rgba(8,100,85,0.8); /* Beyazımsı yeşil */
    color: aliceblue !important;
  }
}
`;

const FormControls = styled.input`
  padding: 5px 13px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  outline: none;
  box-shadow: 0 0 8px #d4f6ff;
`;

const AlerContainer = styled.div`
  width: 550px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  height: 100px;
  padding: 5px;
  box-shadow: 0 0 5px #ff4545;
  color: aliceblue;
  z-index: 3050 !important;
  font-size: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 36%;
`;
const shops = ["Migros", "Teknosa", "Bim", "Şok", "CarrefourSa"];

const categories = ["Elektronik", "Şarküteri", "Oyuncak", "Bakliyat"];

const shopsObj = shops.map((shop, index) => ({
  id: index,
  name: shop,
}));

const categoriesObj = categories.map((kategori, index) => ({
  id: index,
  name: kategori,
}));

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const [error, setError] = useState("");

  const addToShop = () => {
    if (productName.trim() == "") {
      setError("Lütfen Ürün Adını Giriniz");
      return;
    }
    if (productName.length < 3) {
      setError("Ürün Adı En Az 3 Karakterli Olmalıdır");
      return;
    }
    if (productShop == "") {
      setError("Ürünü Almak İstediginiz Marketi seçiniz");
      return;
    }
    if (productCategories == "") {
      setError("Ürünün Kategorisini Seçiniz");
      return;
    }
    const formattedProductName = productName.toUpperCase();
    const newProduct = {
      id: nanoid(7),
      name: formattedProductName,
      shop: shopsObj.find((shop) => shop.id === parseInt(productShop, 10)).name,
      category: categoriesObj.find(
        (kategori) => kategori.id === parseInt(productCategories, 10)
      ).name,
      isBought: false,
    };

    setProducts([...products, newProduct]);
    setProductShop("");
    confetti();
    setProductCategories("");
    setProductName("");
    setError("");
  };

  // Eger Diger ürünler true ise yani alışverişte alınmışsa bizim en son tıkladıgımız ürünü filtreleyip daha sonra find ile bulup onu if kontrolüne sokarak eger false ise onu tam tersine çevirip yani true'ya alarak satın almış oluyoruz yani sepet tamamlanmış oluyor

  const handleIsBought = (id) => {
    setProducts((prevProducts) => {
      const allOtherItemsBought = prevProducts
        .filter((p) => p.id !== id)
        .every((p) => p.isBought);

      const currentItem = prevProducts.find((p) => p.id === id);

      if (allOtherItemsBought && !currentItem.isBought) {
        alert("Alışveriş Tamamlandı! 🎉");
        confetti();
      }

      return prevProducts.map((product) => {
        if (product.id === id) {
          return { ...product, isBought: !product.isBought };
        }
        return product;
      });
    });
  };

  const handleRemoveItem = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(filteredName.toLowerCase());

      if (filteredStatus === "bought") {
        return nameMatch && product.isBought;
      } else if (filteredStatus === "not-bought") {
        return nameMatch && !product.isBought;
      }
      return nameMatch;
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container
        className={`shopping-container ${error ? "container-one" : ""}`}
      >
        <Row>
          <Col xl="8" lg="8" sm="12" md="8">
            <Form className="d-flex flex-row justify-content-center column-gap-3">
              <FormControls
                id="product-name"
                placeholder="Ürün"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <FormSelect
                onChange={(e) => setProductShop(e.target.value)}
                value={productShop}
              >
                <option className="option-item  " defaultValue="All">
                  All Shops
                </option>
                {shopsObj.map((item) => (
                  <option className="option-item" value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </FormSelect>
              <FormSelect
                onChange={(e) => setProductCategories(e.target.value)}
                value={productCategories}
              >
                <option className="option-item  " defaultValue="All">
                  All Categories
                </option>
                {categoriesObj.map((kategori) => (
                  <option
                    className="option-item"
                    value={kategori.id}
                    key={kategori.id}
                  >
                    {kategori.name}
                  </option>
                ))}
              </FormSelect>
              <Button onClick={addToShop} type="button">
                Ekle
              </Button>
            </Form>
          </Col>
        </Row>
        <Container className="d-block">
          <Row className="d-flex justify-content-center ">
            <Col xl="8" lg="8" sm="12" md="8">
              <Form className="filter-search-form">
                <FormControls
                  type="text"
                  placeholder="Arama..."
                  value={filteredName}
                  onChange={(e) => setFilteredName(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  className="radio"
                  name="filter-radio"
                  value="all"
                  onChange={(e) => setFilteredStatus(e.target.value)}
                  id="all-radio"
                  label="Tümü"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  className="radio"
                  name="filter-radio"
                  value="bought"
                  onChange={(e) => setFilteredStatus(e.target.value)}
                  id="bought"
                  label="Alındı"
                />
                <Form.Check
                  type="radio"
                  className="radio"
                  name="filter-radio"
                  value="not-bought"
                  onChange={(e) => setFilteredStatus(e.target.value)}
                  id="not-bought"
                  label="Alınmadı"
                />
              </Form>
            </Col>
            <Col xl="8" lg="8" sm="12" md="8" className="my-1"></Col>
          </Row>
        </Container>
      </Container>

      {error && (
        <AlerContainer
          className={`text-center alert-container ${
            error ? "error-active" : "not-active"
          }`}
        >
          <Alert>{error}</Alert>
        </AlerContainer>
      )}

      <Container
        className={`shopping-container-two m-0 ${error ? "error-active" : ""}`}
        content-table-container
      >
        <Row className="my-5">
          <table>
            <thead>
              <tr className="card-title-head">
                <th>Name</th>
                <th>Category</th>
                <th>Shop</th>
                <th>Id</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {getFilteredProducts().map((product) => (
                <tr
                  key={product.id}
                  style={{
                    animation: product.isBought
                      ? "bgAnimation 3s infinite"
                      : "none",
                    textDecoration: product.isBought ? "line-through" : "none",
                  }}
                >
                  <td className="card-title">
                    <span className="card-span"></span>
                    {product.name}
                  </td>
                  <td className="card-title">
                    <span className="card-span"></span> {product.category}
                  </td>
                  <td className="card-title">
                    <span className="card-span"></span> {product.shop}
                  </td>
                  <td className="card-title">
                    <span className="card-span w-25"></span>
                    {product.id}
                  </td>
                  <td className="card-title">
                    <MdFileDownloadDone
                      className="icon"
                      onClick={() => handleIsBought(product.id)}
                    />
                  </td>
                  <td className="card-title">
                    <MdDelete
                      className="icon"
                      onClick={() => handleRemoveItem(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </Container>
    </>
  );
}

export default App;

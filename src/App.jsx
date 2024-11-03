import { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import styled from "styled-components";
import { MdFileDownloadDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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

const shops = [
  {
    id: 1,
    name: "Migros",
  },
  {
    id: 2,
    name: "Teknosa",
  },
  {
    id: 3,
    name: "Bim",
  },
  {
    id: 4,
    name: "Şok",
  },
  {
    id: 5,
    name: "CarrefourSa",
  },
];
const categories = [
  {
    id: 1,
    categoryName: "Elektronik",
  },
  {
    id: 2,
    categoryName: "Şarküteri",
  },
  {
    id: 3,
    categoryName: "Oyuncak",
  },
  {
    id: 4,
    categoryName: "Bakliyat",
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productShop, setProductShop] = useState("");
  const [productCategories, setProductCategories] = useState("");
  const [error, setError] = useState("");

  const addToShop = () => {
    if (productName.trim() == "") {
      setError("Lütfen Ürün Adını giriniz");
      return;
    }
    if (productName.length < 3) {
      setError("Ürün Adı En Az 3 karakterli olmalıdır");
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
      id: products.length + 1,
      name: formattedProductName,
      shop: productShop,
      category: productCategories,
    };

    setProducts([...products, newProduct]);
    setProductShop("");
    confetti();
    setProductCategories("");
    setProductName("");
    setError("");
  };

  return (
    <>
      <Container
        className={`shopping-container ${error ? "container-one" : ""}`}
      >
        <Row>
          <Col xl="8" lg="8" sm="12" md="8">
            <Form className="d-flex flex-row justify-content-center column-gap-3">
              <FormControls
                id="product-name"
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
                {shops.map((item) => (
                  <option
                    className="option-item"
                    value={item.name}
                    key={item.id}
                  >
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
                {categories.map((kategori) => (
                  <option
                    className="option-item"
                    value={kategori.categoryName}
                    key={kategori.id}
                  >
                    {kategori.categoryName}
                  </option>
                ))}
              </FormSelect>
              <Button onClick={addToShop} type="button">
                Ekle
              </Button>
            </Form>
          </Col>
        </Row>
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
        className={`shopping-container-two mt-5 ${error ? "error-active" : ""}`}
        id
        content-table-container
      >
        <Row className="my-5">
          <table>
            <thead>
              <tr className="card-title-head">
                <th>Id</th>
                <th>Name</th>
                <th>Category</th>
                <th>Shop</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="card-title">
                    <span className="card-span"></span>
                    {product.id}
                  </td>
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
                    <MdFileDownloadDone className="icon" />
                  </td>
                  <td className="card-title">
                    <MdDelete className="icon" />
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

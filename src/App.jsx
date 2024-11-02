import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";

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

  const addToShop = () => {
    if (productName !== null) {
      const formattedProductName = productName.toUpperCase();
      setProducts([...products, formattedProductName]);
      setProductName("");
    }
  };

  console.log(products);

  return (
    <>
      <Container className="shopping-container ">
        <Row>
          <Col xl="8" lg="8" sm="12" md="8">
            <Form className="d-flex flex-row justify-content-center column-gap-3">
              <FormControls
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
                {categories.map((kategori) => (
                  <option
                    className="option-item"
                    value={kategori.id}
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
        <Row className="text-center">
          
        </Row>
      </Container>
    </>
  );
}

export default App;

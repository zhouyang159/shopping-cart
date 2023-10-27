import { useQuery } from 'react-query';
import { Card, Row, Col } from 'antd';
import { Wrapper } from './App.styles';



// {
//   "id": 1,
//   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   "price": 109.95,
//   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   "category": "men's clothing",
//   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   "rating": {
//       "rate": 3.9,
//       "count": 120
//   }
// },


type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}


const fetchProducts = async (): Promise<CartItemType[]> => {

  let response = await fetch('https://fakestoreapi.com/products');
  let products: CartItemType[] = await response.json();
  return products;
}


function App() {


  let { data: products, isLoading, error } = useQuery('products', fetchProducts);
  console.log('products: ', products);


  if (isLoading) return <div>Loading...</div>;


  return (
    <Wrapper>
      <h1>App</h1>
      <Row>
        {
          products?.map((product) => {
            return (
              <Col key={product.id} style={{ margin: 10 }}>
                <Card style={{ border: 2, borderColor: 'black' }}>
                  <div>
                    <img src={product.image} alt={product.title} width={100} />
                  </div>
                  <footer>{product.title}</footer>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </Wrapper>
  );
}

export default App;

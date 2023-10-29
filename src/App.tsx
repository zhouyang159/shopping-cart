import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Row, Col, Drawer, FloatButton } from 'antd';
import { Wrapper } from './App.styles';
import Cart from './components/Cart/Cart';
import Item from './components/Item/Item';





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


export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
}


const fetchProducts = async (): Promise<CartItemType[]> => {

  let response = await fetch('https://fakestoreapi.com/products');
  let products: CartItemType[] = await response.json();
  return products;
}


const App: React.FC = () => {
  const [openCart, setOpenCart] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  let { data: products, isLoading, error } = useQuery<CartItemType[]>('products', fetchProducts);


  const handleAddToCart = (product: CartItemType) => {
    setCartItems((prev) => {
      let isItemInCart = prev.find((item) => item.id === product.id);

      if (isItemInCart) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              amount: item.amount + 1
            }
          }
          return item;
        })
      }

      return [...prev, { ...product, amount: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => {
      return prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }]
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    })
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <h1>App</h1>
      <FloatButton onClick={() => setOpenCart(true)}></FloatButton>
      <Row>
        {
          products?.map((product) => {
            return (
              <Col key={product.id} style={{ margin: 10 }}>
                <Item product={product} handleAddToCart={handleAddToCart}></Item>
              </Col>
            )
          })
        }
      </Row>
      
      <Drawer
        open={openCart}
        title="Shopping Cart"
        placement="right"
        onClose={() => setOpenCart(false)}
      >
        <Cart
          cartItems={cartItems}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        ></Cart>
      </Drawer>
    </Wrapper>
  );
}

export default App;

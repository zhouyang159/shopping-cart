import React from 'react';
import { CartItemType } from '../../App';
import { Button, Card } from 'antd';


type ItemProps = {
  product: CartItemType;
  handleAddToCart: (product: CartItemType) => void;
}

const Item: React.FC<ItemProps> = ({ product, handleAddToCart }) => {

  return <Card style={{ border: '5px solid gray' }}>
    <div>
      <img src={product.image} alt={product.title} width={100} />
    </div>
    <footer>{product.title}</footer>
    <Button style={{ width: '100%' }} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
  </Card>
}

export default Item;

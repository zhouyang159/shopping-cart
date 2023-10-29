import { Button, Card, List } from "antd";
import { CartItemType } from "../../App";
import { Wrapper } from "./Cart.styles";


type CartProps = {
  cartItems: CartItemType[];
  handleAddToCart: (product: CartItemType) => void;
  handleRemoveFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, handleAddToCart, handleRemoveFromCart }) => {



  return <Wrapper>
    {cartItems.length === 0 && <h2>no item in cart</h2>}
    <List>
      {cartItems.map((product) => {
        return <List.Item>
          <Card style={{ border: '5px solid gray', width: '100%' }}>
            <div>
              <img src={product.image} alt={product.title} width={100} />
            </div>
            <div>{product.title}</div>
            <footer>
              <div>Price: {product.price} Amount: {product.amount}</div>
              <div>total: {product.price * product.amount}</div>
              <Button onClick={() => handleRemoveFromCart(product.id)}>-</Button>&nbsp;&nbsp;
              <Button onClick={() => handleAddToCart(product)}>+</Button>
            </footer>
          </Card>
        </List.Item>
      })}
    </List>
  </Wrapper>
}

export default Cart;

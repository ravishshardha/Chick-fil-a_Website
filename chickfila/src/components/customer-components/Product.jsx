import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const Product = ({ product, indId, addProduct}) => {
  return (

    <div id={indId}>
        <Card>
        <Card.Img variant="top" src={product.url}/>
        <Card.Body>
            <Card.Title>{product.text}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
            <Button variant="danger" onClick={() => addProduct(product)}>Order Now</Button>
        </Card.Body>
        </Card>

    </div>
  );
}

export default Product;

import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ShoppingCartElement({orderItem, index, removeItem}) {
  return (
    <Card className="shopping-element-card d-flex flex-row">
      <img alt="menu description" className="shopping-element-img" src={orderItem.url} />
      <div className="d-flex flex-row justify-content-between w-100">
        <div>
          <div>{orderItem.name}</div>
          <div>${orderItem.price}</div>
        </div>
        <div>
          <Button variant="danger" small onClick={() => removeItem(index)}>X</Button>
        </div>
      </div>
  </Card>
  )
}

export default ShoppingCartElement
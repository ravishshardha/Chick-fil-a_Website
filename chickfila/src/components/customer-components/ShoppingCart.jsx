import React from 'react'
import ShoppingCartElement from './ShoppingCartElement'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function getTotal(order)
{
    var total = 0;
    order?.forEach(element => {
        total += element.price;
    });
    return Math.round(total * 100) / 100;
}

function ShoppingCart({ order, setOrder, setShowModal }) {

  const removeItem = (index) => {
    const filteredList = order.filter((_, i) => i !== index);
    setOrder(filteredList);
  };

  const handleClose = () => setShowModal(false);
  const handleCheckout = () => {
    //TODO: This will first send the total and order list to backend
    setOrder([]);
    handleClose();
  };

  return (
    <Modal centered show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart:</Modal.Title>
      </Modal.Header>
      <Modal.Body className="shopping-cart-body">
        <div>
          <div className="d-flex justify-content-between">
            <span>Total: </span>
            <span> ${getTotal(order)}</span>
           </div>
          {(order || []).map((item, index) => (
            <ShoppingCartElement
              orderItem={item}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleCheckout}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingCart
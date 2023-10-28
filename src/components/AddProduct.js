import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddProduct() {
  const [requestPayload, setrequestPayload] = useState({})
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault()
    let form_data = new FormData();

    for ( let key in requestPayload ) {
        form_data.append(key, requestPayload[key]);
    }

    console.log(requestPayload)

    let myHeaders = new Headers();
    myHeaders.append("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNAZ2V0bmFkYS5jb20iLCJpYXQiOjE2OTcyODQ2MjZ9.HfRlbh08Vylja_bolIxQiU5QKe6LlxkJ_3u4aoxeYQo");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: form_data,
        redirect: 'follow'
      };
      
      fetch("http://localhost:8000/api/product/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  };
  const handleChange = (e) => {

    let value = e.target.value

    if(e.target.name === "image") {
        console.log("image")
        value = e.target.files[0]
    }

    setrequestPayload({
        ...requestPayload,
        [e.target.name] : value
    })
  }



  return (
    <div className='float-end'>
      <Button variant="primary" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Control type='text' placeholder='Name' name='name'  onChange={handleChange} />
            <Form.Control type='text' placeholder='Description' name="description" className='mt-4' onChange={handleChange}/>
            <Form.Control type="file" name="image" className='mt-4'onChange={handleChange}/>
            <Button
                  variant="primary"
                  type="submit"
                  className="my-3"
                >
                  Add
            </Button>
        </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddProduct;
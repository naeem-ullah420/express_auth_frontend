import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useCategories } from '../../store/CategoriesContext';

function AddProduct({productAdd}) {
  const { categories } = useCategories()
  const [requestPayload, setrequestPayload] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleChange = (e) => {
    let key   = e.target.name
    let value = e.target.value

    if(key === "image") {
      value = e.target.files[0]
    }

    setrequestPayload({
      ...requestPayload,
      [key]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    console.log(requestPayload)

    const data = new FormData();
    for(let key in requestPayload) {
      console.log(key, requestPayload[key])
      data.append(key, requestPayload[key])
    }

    let config = {
      method: 'post',
      url: 'http://localhost:8000/api/product/create',
      headers: { 
        'token': localStorage.getItem('token'), 
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log(response.data.data.product)
      productAdd(response.data.data.product)
      setShow(false)
    })
    .catch(function (error) {
      console.log(error);
    });



  }


  return (
    <div className='float-end mt-2'>
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
            <Form.Control type='number' placeholder='Price in dollars ($)' name="price" className='mt-4' onChange={handleChange}/>
            <Form.Select aria-label="Default select example" className='mt-4' name="category_id" onChange={handleChange} >
              <option>Select Category</option>
              {categories.map(category => {
                return <option key={category._id} value={category._id}>{category.name}</option>
              })}
            </Form.Select>
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
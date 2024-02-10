import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { useApi } from '../../hooks/useApi';
import { useCategoriesContext } from '../../contexts/CategoriesContext';

function AddProduct({productAdd}) {
  const {categories, addCountOfProductInCategories} = useCategoriesContext()
  const [requestPayload, setrequestPayload] = useState({})
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleChange = (e) => {
    let key   = e.target.name
    let value = e.target.value

    console.log({
      "key": key,
      "value": value,
    })

    if(key === "image") {
      value = e.target.files[0]
    }

    key && setrequestPayload({
      ...requestPayload,
      [key]: value
    })

    // console.log("requestPayload: ", requestPayload)
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
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/create`,
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
      addCountOfProductInCategories(data.get('category_id'))
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
            <Form.Control type='number' placeholder='Price' name="price" className='mt-4' onChange={handleChange}/>
            {categories ? (<Form.Select aria-label="Default select example" name="category_id" className="mt-4" onChange={handleChange}>
              <option value="">Select Category</option>
               {
                categories.map(category => {
                  return <option key={category._id} value={category._id}>{category.name}</option>
                })
              }
            </Form.Select>) : ""}

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
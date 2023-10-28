import React, { useState } from 'react'
import NavBar from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddProduct from '../components/HomePageComponents/AddProduct'
import SideBar from '../components/HomePageComponents/SideBar'


function HomePage() {
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
      axios({
      method: 'get',
      url: 'http://localhost:8000/api/product/read',
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setProducts(response.data.data.products)
    })
    .catch(function (error) {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    });
    
  }, [])

  const productAdd = (product) => {
    setProducts([ product, ...products])
  }


  return (
    <>
    <Container fluid>
        <Row >
            <Col xs={2}>
              <SideBar/>
            </Col>
            <Col md={10}>
              <AddProduct productAdd={productAdd}/>
              <div className='clearfix'></div>
              <Row>
                {loading && <Col md={12}>Loading products....</Col>}
                {!loading && products.map(p => {
                  return (
                    <Col md={3} className='p-2'>
                      <Card>
                        <Card.Img variant="top" style={{height:"200px"}} src={p.image_url} />
                        <Card.Body>
                          <Card.Title>{p.name}</Card.Title>
                          <Card.Text>
                            {p.description}
                          </Card.Text>
                          <Button variant="primary">Add to Cart</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })}
              </Row>

            </Col>
        </Row>
    </Container>
    </>
  )
}

export default HomePage
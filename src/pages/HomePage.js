import React, { useState } from 'react'
import NavBar from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddProduct from '../components/HomePageComponents/AddProduct'
import SideBar from '../components/HomePageComponents/SideBar'
import Pagination from 'react-bootstrap/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function HomePage() {
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)
  let [page, setPage] = useState(1)
  let [pageinationDetail, setPaginationDetail] = useState({
    "current_page": 0,
    "total_count": 0,
    "total_pages": 0,
  })
  let [search, setSearch] = useState("")

  useEffect(() => {
      axios({
      method: 'get',
      url: `http://localhost:8000/api/product/read?page=${page}&search=${search}`,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setProducts(response.data.data.products)
      setPaginationDetail({
        'current_page': response.data.data.current_page,
        'total_count': response.data.data.total_count,
        'total_pages': response.data.data.total_pages,
      })
    })
    .catch(function (error) {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    });
    
  }, [page, search])

  const productAdd = (product) => {
    setProducts([ product, ...products])
    setPage(1)
  }

  const handleSearch = (search_text) => {
    setSearch(search_text)
  }


  return (
    <>
    <Container fluid>
        <Row >
            <Col xs={2}>
              <SideBar handleSearch={handleSearch}/>
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
                {!loading && !products.length && <Col md={12}>No products found</Col>}
                <Col md={12} className='mt-4 d-flex justify-content-end'>
                {!loading && <PaginationControl
                  page={page}
                  between={4}
                  total={pageinationDetail.total_count}
                  limit={10}
                  changePage={(page) => {
                    setPage(page)
                  }}
                  ellipsis={1}
                />}
                  </Col>
              </Row>
            </Col>

        </Row>
    </Container>
    </>
  )
}

export default HomePage
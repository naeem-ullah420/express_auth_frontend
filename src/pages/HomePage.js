import React, { useState } from 'react'
import NavBar from '../components/Nav'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddProduct from '../components/HomePageComponents/AddProduct'
import SideBar from '../components/HomePageComponents/SideBar'
import Product from '../components/HomePageComponents/Product'
import { PaginationControl } from 'react-bootstrap-pagination-control';

function HomePage() {
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(true)
  let [page, setPage] = useState(1)
  let [paginationDetail, setPaginationDetail] = useState({
    "per_page": 10,
    "total": 0,
    "current_page": 1,
    "total_pages": 0
  })
  let [search, setSearch] = useState("")

  useEffect(() => {
    console.log("page: ", page)
      axios({
      method: 'get',
      url: `http://localhost:8000/api/product/read?page=${page}&search=${search}`,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(function (response) {
      setProducts(response.data.data.products)
      setPaginationDetail(response.data.data.pagination)
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      setLoading(false)
    });
    
    
  }, [page, search])

  const productAdd = (product) => {
    setProducts([ product, ...products])
  }


  return (
    <>
    <Container fluid>
        <Row >
            <Col xs={2}>
              <SideBar setSearch={setSearch}/>
            </Col>
            <Col md={10}>
              <AddProduct productAdd={productAdd}/>
              <div className='clearfix'></div>
              <Row>
                {loading && <Col md={12}>Loading products....</Col>}
                {!loading && products.length === 0 && <Col md={12}>No products found</Col>}
                {!loading && products.length > 0 && products.map(p => {
                  return (
                    <Col md={3} className='p-2'>
                      <Product product={p}/>
                    </Col>
                  )
                })}
                {!loading && products.length > 0 && <Col md={12} className='mt-4 d-flex justify-content-end'>
                <PaginationControl
                  page={page}
                  total={paginationDetail.total}
                  limit={paginationDetail.per_page}
                  changePage={(page) => {
                    setPage(page)
                  }}
                  ellipsis={1}
                />
                </Col>}
              </Row>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default HomePage
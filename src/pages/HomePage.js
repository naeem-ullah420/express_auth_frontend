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
import Pagination from 'react-bootstrap/Pagination';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { useContext } from 'react'
import { ProdutContext, useProducts } from '../store/ProductContext'
import useApi from '../hooks/useApi'
import { useCategories } from '../store/CategoriesContext'

function HomePage() {
  const {products, setProducts} = useProducts()
  let [loading, setLoading] = useState(true)
  const {page, setPage} = useProducts()
  const {pageinationDetail, setPaginationDetail} = useProducts()
  const {search, setSearch} = useProducts()
  const {categories, setCategories} = useCategories()

  const {loading: categoryApiLoading, data:categoryApidata, error: categoryApiError} = useApi("GET", "http://localhost:8000/api/categories/read")
  const {loading: productsApiLoading, data:productsApidata, error: productsApiError} = useApi("GET", `http://localhost:8000/api/product/read?page=${page}&search=${search}`)

  useEffect(()=> {
    if(categoryApidata) {
      setCategories(categoryApidata.data.categories)
    }
  }, [categoryApidata])

  useEffect(() => {
    if(productsApidata) {
      setProducts(productsApidata.data.products)
      setPaginationDetail({
        'current_page': productsApidata.data.current_page,
        'total_count': productsApidata.data.total_count,
        'total_pages': productsApidata.data.total_pages,
      })
    }
  }, [productsApidata, page, search])

  const productAdd = (product) => {
    const new_products = [ product, ...products]
    new_products.length >= 10 && new_products.splice(10, 1)
    setProducts(new_products)
    setPage(1)
  }

  const handleSearch = (search_text) => {
    setPage(1)
    setSearch(search_text)
  }


  return (
    <>
    <Container fluid>
        <Row >
            <Col xs={2}>
              <SideBar handleSearch={handleSearch} search_text={search}/>
            </Col>
            <Col md={10}>
              <AddProduct productAdd={productAdd}/>
              <div className='clearfix'></div>
              <Row>
                {productsApiLoading && <Col md={12}>Loading products....</Col>}
                {!productsApiLoading && products.map(p => {
                  return (
                    <Col md={3} className='p-2'>
                      <Product product={p} />
                    </Col>
                  )
                })}
                {!productsApiLoading && !products.length && <Col md={12}>No products found</Col>}
                <Col md={12} className='mt-4 d-flex justify-content-end'>
                {!productsApiLoading && <PaginationControl
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
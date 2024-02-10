import React, { useContext, useState } from 'react'
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
import { ProductContext, useProduct } from '../contexts/ProductContext'
import { useApi } from '../hooks/useApi'
import { useCategoriesContext } from '../contexts/CategoriesContext'

function HomePage() {
  let {loading: categoryApiLoading, data:categoryApiData, error:categoryApiError} = useApi(`${process.env.REACT_APP_BACKEND_URL}/api/categories/read`)

  let {categories, setCategories} = useCategoriesContext()
  // let [products, setProducts] = useState([])
  let {products, setProducts} = useProduct()
  let [loading, setLoading] = useState(true)
  // let [page, setPage] = useState(1)
  let {page, setPage} = useProduct()
  // let [search, setSearch] = useState("")
  let {search, setSearch} = useProduct()

  let {category, setCategory} = useProduct()

  let [paginationDetail, setPaginationDetail] = useState({
    "per_page": 10,
    "total": 0,
    "current_page": 1,
    "total_pages": 0
  })

  useEffect(() => {

    if(!categoryApiLoading && categoryApiData) {
        setCategories([...categoryApiData.data.categories])
    }

}, [categoryApiLoading])

  useEffect(() => {
    console.log("page: ", page)
      axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/read?page=${page}&search=${search}&category_id=${category ? category._id : ""}`,
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
  }, [page, search, category])

  const productAdd = (product) => {
    setPage(1)
    setProducts([ product, ...products])
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
              <SideBar setSearch={handleSearch} search={search}/>
            </Col>
            <Col md={10}>
              <AddProduct productAdd={productAdd}/>
              <div className='clearfix'></div>
              <Row>
                {loading && <Col md={12}>Loading products....</Col>}
                {!loading && !products && <Col md={12}>No products found</Col>}
                {!loading && products && products.map(p => {
                  return (
                    <Col md={3} className='p-2'>
                      <Product product={p}/>
                    </Col>
                  )
                })}
                {!loading && products && <Col md={12} className='mt-4 d-flex justify-content-end'>
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
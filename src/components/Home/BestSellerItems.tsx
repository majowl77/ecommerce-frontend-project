import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProductsThunk } from '../../redux/slices/admin/adminSlice'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function BestSellerItems() {
  const prodcutsList = useSelector((state: RootState) => state.adminR.productItems)
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      dispatch(getAdminProductsThunk())
    }
    fetchProductsData()
  }, [])

  //adding a product to a cart
  function addProductToCart(id: string) {
    const productToAdd = prodcutsList.find((product) => product._id === id)
    if (productToAdd != null) {
      dispatch(cartSliceAction.addCartProduct(productToAdd))
    }
  }
  return (
    <section className="bsetSellerSection">
      <div className="bsetSellerContainer">
        <h1>
          this week's Most Popular <span>and best selling </span>
        </h1>
        <div className="bsetSellerItems">
          {prodcutsList &&
            prodcutsList.length > 0 &&
            prodcutsList.slice(0, 5).map((product) => {
              return (
                <div className="bsetItemsCard" key={product._id}>
                  <div className="HandleTextOfItemsCard">
                    <div className="cardImage">
                      <img src={'/' + product.image} alt={product.name} />
                    </div>
                    <div className="cardFrame">
                      <h6>{product.name}</h6>
                      <p>
                        {product.price}$<span> 48$</span>
                      </p>
                      <div>
                        <button onClick={() => addProductToCart(product._id)}>Add To Cart </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

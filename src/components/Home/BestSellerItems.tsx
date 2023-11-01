import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceAction } from '../../redux/slices/cart/cartSlice'
import { productsActions } from '../../redux/slices/products/productsSlice'
import { AppDispatch, RootState } from '../../redux/store'

export default function BestSellerItems() {
  const prodcutsList = useSelector((state: RootState) => state.productsR.productList)
  const dispatch = useDispatch<AppDispatch>()
  const url = 'public/mock/e-commerce/products.json'

  //fetching the data form JSON file
  useEffect(() => {
    function fetchProductsData() {
      axios
        .get(url)
        .then((response) => dispatch(productsActions.getProductsData(response.data)))
        .catch((error) => dispatch(productsActions.getError(error.message)))
    }
    fetchProductsData()
  }, [])
  //adding a product to a cart
  function addProductToCart(id: number) {
    const productToAdd = prodcutsList.find((product) => product.id === id)
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
            prodcutsList.slice(0, 7).map((product) => {
              return (
                <div className="bsetItemsCard">
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
                        <button onClick={() => addProductToCart(product.id)}>Add To Cart </button>
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

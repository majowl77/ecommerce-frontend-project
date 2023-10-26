import React from 'react'

export default function BestSellerItems() {
  return (
    <section className="bsetSellerSection">
      <div className="bsetSellerContainer">
        <h1>
          this weeks Most Popular <span>and best selling </span>
        </h1>
        <div className="bsetSellerItems">
          <div className="bsetItemsCard">
            <div className="HandleTextOfItemsCard">
              <div className="cardImage">
                <img src="public/images/productImageOne.png" />
              </div>
              <div className="cardFrame">
                <h6> title here</h6>
                <p>
                  36$ <span> 48$</span>
                </p>
                <div>
                  <button>Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bsetItemsCard">
            <div className="HandleTextOfItemsCard">
              <div className="cardImage">
                <img src="public/images/productImageFive.png" />
              </div>
              <div className="cardFrame">
                <h6> title here</h6>
                <p>
                  36$ <span> 48$</span>
                </p>
                <div>
                  <button>Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bsetItemsCard">
            <div className="HandleTextOfItemsCard">
              <div className="cardImage">
                <img src="public/images/productImageFour.png" />
              </div>
              <div className="cardFrame">
                <h6> title here</h6>
                <p>
                  36$ <span> 48$</span>
                </p>
                <div>
                  <button>Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bsetItemsCard">
            <div className="HandleTextOfItemsCard">
              <div className="cardImage">
                <img src="public/images/productImagethree.png" />
              </div>
              <div className="cardFrame">
                <h6> title here</h6>
                <p>
                  36$ <span> 48$</span>
                </p>
                <div>
                  <button>Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bsetItemsCard">
            <div className="HandleTextOfItemsCard">
              <div className="cardImage">
                <img src="public/images/productImagethree.png" />
              </div>
              <div className="cardFrame">
                <h6> title here</h6>
                <p>
                  36$ <span> 48$</span>
                </p>
                <div>
                  <button>Add To Cart </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

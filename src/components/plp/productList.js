import React from 'react';
import ProductCard from '../common/productCard';

const ProductList = ({toShop, toShopSize, loadMoreProducts, limit}) => {

  ;

  const renderCards = () => (
    toShop ? 
    toShop.map( item => (
        <ProductCard key={item._id} productItem={{...item}} />
      ))
    : null
  )

  // todo : loadmoreproducts has error
  const renderLoadMoreButton = () => (
    toShopSize > 0 && toShopSize >= limit ? (
      <div className="row">
        <div className="col-md-12 extra-gutter-right text-center">
          <div className="with-btn margin-bottom-20">
            <button onClick={() => loadMoreProducts()} className="button border medium">More</button>
          </div>
        </div>
      </div>
    ) : null
  )

  return (
    <React.Fragment>
      {renderCards()}
      {renderLoadMoreButton()}
    </React.Fragment>
  );
};

export default ProductList;
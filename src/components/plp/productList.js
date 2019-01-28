import React from 'react';
import ProductCard from '../common/productCard';

const ProductList = ({toShop, loadMoreProducts}) => {

  const renderCards = () => (
    toShop ? 
    toShop.map( item => (
        <ProductCard key={item._id} productItem={{...item}} loadMoreProducts={loadMoreProducts} />
      ))
    : null
  )


  return (
    <React.Fragment>
      {renderCards()}
    </React.Fragment>
  );
};

export default ProductList;
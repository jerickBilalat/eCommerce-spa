
import React from 'react';
import {increaseCartItemQuantity} from "../../actions/cartActions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import { getProductDetail, clearProductDetail } from '../../actions/productActions';


const productCard = ({productItem, dispatch}) => {
	const {_id: id, name, price, images} = productItem;
	const imageLink = images && images.length ? images[1] : "images/shop-01.jpg";
	return (
		<div className="col-md-4 col-xs-12">
				<div className="shop-item">
					<figure>
						<Link to={`/product_detail/${id}`} onClick={()=> dispatch(clearProductDetail())}><img src={`${imageLink}`} alt="" /></Link>
						<figcaption className="item-description">
							<Link to={`/product_detail/${id}`} onClick={()=> dispatch(clearProductDetail())}><h5>{name}</h5></Link>
							<span className="sale"><del>$9</del> <mark>{price}</mark></span>
							<button onClick={()=> dispatch(increaseCartItemQuantity({id, name, price}, 1))} className="button border medium">Add to Cart</button>
						</figcaption>
					</figure>
				</div>
			</div>
	);
};

export default connect()(productCard);
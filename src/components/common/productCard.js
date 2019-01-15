
import React from 'react';
import {increaseCartItemQuantity} from "../../actions/cartActions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const productCard = ({productItem, dispatch}) => {
	return (
		<div className="col-md-4 col-xs-12">
				<div className="shop-item">
					<figure>
						<Link to={`/product_detail/${productItem._id}`} ><img src="images/shop-01.jpg" alt="" /></Link>
						<figcaption className="item-description">
							<a><h5>{productItem.name}</h5></a>
							<span className="sale"><del>$9</del> <mark>{productItem.price}</mark></span>
							<button onClick={()=> dispatch(increaseCartItemQuantity(productItem, 1))} className="button border medium">Add to Cart</button>
						</figcaption>
					</figure>
				</div>
			</div>
	);
};

export default connect()(productCard);

import React from 'react';
import {increaseCartItemQuantity} from "../../actions/cartActions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";


const productCard = ({productItem, dispatch}) => {
	const {_id: id, name, price, images} = productItem;
	const imageLink = images && images.length ? images[1] : "images/shop-01.jpg";
	return (
		<div className="col-md-4 col-xs-12">
				<div className="shop-item">
					<figure>
						<Link to={`/product_detail/${id}`}><img src={`${imageLink}`} alt="" /></Link>
						<figcaption className="item-description">
							<Link to={`/product_detail/${id}`}><h5>{name}</h5></Link>
							<span className="sale"> <mark>${price}</mark></span>
							<button onClick={()=> dispatch(increaseCartItemQuantity({id, name, price}, 1))} className="button gray">Add to Cart</button>
						</figcaption>
					</figure>
				</div>
			</div>
	);
};

export default connect()(productCard);

import React from 'react';
import {increaseCartItemQuantity} from "../../actions/cartActions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

const productCard = (props) => {
	return (
		<div className="col-md-4 col-xs-12">
				<div className="shop-item">
					<figure>
						<Link to={`/product_detail/${props.item._id}`} ><img src="images/shop-01.jpg" alt="" /></Link>
						<figcaption className="item-description">
							<a><h5>{props.item.name}</h5></a>
							<span className="sale"><del>$9</del> <mark>{props.item.price}</mark></span>
							<button onClick={()=> props.dispatch(increaseCartItemQuantity(props.item._id, 1))} className="button border medium">Add to Cart</button>
						</figcaption>
					</figure>
				</div>
			</div>
	);
};

export default connect()(productCard);
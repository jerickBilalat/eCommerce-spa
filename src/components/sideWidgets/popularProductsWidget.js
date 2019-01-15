import React from 'react';

const PopularProductsWidget = () => {
  return (
    <React.Fragment>
      <div className="widget margin-bottom-50">
				<h4>Popular Products</h4>
				<ul className="widget-tabs shop">
					<li>
						<div className="widget-thumb">
							<a href="#"><img src="images/shop-widget-01.jpg" alt="" /></a>
						</div>
						
						<div className="widget-text">
							<h5><a>Pliers</a></h5>
							<span><del>$10</del> <mark>$5</mark></span>
						</div>
						<div className="clearfix"></div>
					</li>
					<li>
						<div className="widget-thumb">
							<a href="#"><img src="images/shop-widget-02.jpg" alt="" /></a>
						</div>
						
						<div className="widget-text">
							<h5><a href="#">Angle Grinder</a></h5>
							<span><del>$129</del> <mark>$99</mark></span>
						</div>
						<div className="clearfix"></div>
					</li>
					<li>
						<div className="widget-thumb">
							<a href="#"><img src="images/shop-widget-03.jpg" alt="" /></a>
						</div>
						<div className="widget-text">
							<h5><a href="#">Screwdriver</a></h5>
							<span>$1</span>
						</div>
						<div className="clearfix"></div>
					</li>
				</ul>
			</div>
    </React.Fragment>
  );
};

export default PopularProductsWidget;
import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  negatePadding: {
    paddingLeft: "-56px"
  }
});

const navigationLinks = [{name: "Home", path:"/"}, { name: "Shop", path: "/shop" }];
const mobileNavigationLinks = [{name: "Home", path:"/"}, { name: "Shop", path: "/shop" }, { name: "Cart", path: "/cart" }];


class navigation extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    selectedIndex: 0
  };

  componentDidMount() {
    let currnentPath = this.props.match.path;
    let linkIndex = {
      "/": 0,
      "/shop": 1
    };
    let selectedIndex = linkIndex[currnentPath];
    this.setState({ selectedIndex });
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  renderQuantity = () => {
    const { cartItemsQuantity } = this.props;
    return cartItemsQuantity > 0 ? (
      <span className="cart-counter">{cartItemsQuantity}</span>
    ) : null;
  };

  renderAppLinks = () => {
    return navigationLinks.map(item => (
      <li key={item.name}>
        <Link
          className={(this.props.match.path === item.path && "current") || " "}
          to={item.path}
        >
          {item.name}
        </Link>
      </li>
    ));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.toggleDrawer("left", false);
  };

  render() {
    const { classes } = this.props;

    const mobileDrawerNavList = (
      <div className={classes.list}>
        <List>
          {mobileNavigationLinks.map((link, index) => (
            <ListItem
              button
              key={link.name}
              component={Link}
              to={link.path}
              selected={this.state.selectedIndex === index}
              onClick={event => this.handleListItemClick(event, index)}
            >
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <Fragment>
        <div className="container">
          <div>
            <Drawer
              open={this.state.left}
              onClose={this.toggleDrawer("left", false)}
            >
              <div tabIndex={0} role="button">
                {mobileDrawerNavList}
              </div>
            </Drawer>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="menu-responsive">
                <i
                  className="fa fa-chevron-circle-right menu-trigger"
                  onClick={this.toggleDrawer("left", true)}
                />
              </div>
              <nav id="navigation">
                <ul className="menu" id="responsive">
                  {this.renderAppLinks()}
                  <li className="current cart-icon">
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart" />
                      {this.renderQuantity()}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="clearfix" />
      </Fragment>
    );
  }
}

const getCartItemCount = state => {
  return state.cart.cartItems.length;
};

function mapStateToProps(state) {
  return {
    cartItemsQuantity: getCartItemCount(state)
  };
}

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(navigation))
);

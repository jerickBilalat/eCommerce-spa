import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
const staticSiteBaseURL = "http://minnesotarec.surge.sh";

const navigationLinks = [{ name: "Shop", path: "/shop" }];
const spoolStaticLinks = [
  {
    text: "Above and Inground Pool Install",
    url: `${staticSiteBaseURL}/swimming-pool-install-service.html`
  },
  {
    text: "Pool opening and closing",
    url: `${staticSiteBaseURL}/swimming-pool-opening-and-closing-services.html`
  },
  {
    text: "Repair or Reaplace Parts",
    url: `${staticSiteBaseURL}/swimming-pool-parts-and-repair-services.html`
  }
];

const billiardStaticLinks = [
  {
    text: "Installation",
    url: `${staticSiteBaseURL}/pool-table-install-service.html`
  },
  {
    text: "Takedown and Move",
    url: `${staticSiteBaseURL}/pool-table-takedown-and-move-service.html`
  },
  {
    text: "Repair or Reaplace Parts",
    url: `${staticSiteBaseURL}/pool-table-parts-and-repair-services.html`
  }
];

class navigation extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    selectedIndex: 0,
    isSpoolDropdownOpen: true,
    isBilliardDropdownOpen: true,
    isSpoolSubMenuOpen: false,
    isPoolSubMenuOpen: false
  };

  closeAllSubMenus = () => {
    return this.setState({isSpoolDropdownOpen: false, isPoolSubMenuOpen: false});
  }
  toggleSpoolSubMenu = subMenu => {
    return this.setState(prevState => ({
      isSpoolSubMenuOpen: !prevState.isSpoolSubMenuOpen,
      isPoolSubMenuOpen: false
    }));
  };
  togglePoolSubMenu = subMenu => {
    return this.setState(prevState => ({
      isPoolSubMenuOpen: !prevState.isPoolSubMenuOpen,
      isSpoolSubMenuOpen: false
    }));
  };
  handleMobileDropdownClick = dropdown => {
    this.setState(state => ({ [dropdown]: !state[dropdown] }));
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
          onClikc={this.closeAllSubMenus}
        >
          {item.name}
        </Link>
      </li>
    ));
  };

  renderMobileStaticLinks = (links, classes) => {
    return links.map(item => (
      <ListItem
        button
        className={classes.nested}
        component="a"
        href={item.url}
        key={item.url}
      >
        <ListItemText primary={item.text} />
      </ListItem>
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
          <ListItem
            button
            component="a"
            href={`${staticSiteBaseURL}/index.html`}
          >
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            button
            onClick={() =>
              this.handleMobileDropdownClick("isSpoolDropdownOpen")
            }
          >
            <ListItemText primary="Swimming Pool" />
            {this.state.isSpoolDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.isSpoolDropdownOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.renderMobileStaticLinks(spoolStaticLinks, classes)}
            </List>
          </Collapse>

          <ListItem
            button
            onClick={() =>
              this.handleMobileDropdownClick("isBilliardDropdownOpen")
            }
          >
            <ListItemText primary="Billiard Table" />
            {this.state.isSpoolDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={this.state.isBilliardDropdownOpen}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {this.renderMobileStaticLinks(billiardStaticLinks, classes)}
            </List>
          </Collapse>

          {navigationLinks.map((link, index) => (
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

    const staticNavList = (
      <Fragment>
        <li>
          <a href={`${staticSiteBaseURL}`}>Home</a>
        </li>
        <li className="dropdown">
          <a href="#" onClick={this.toggleSpoolSubMenu}>
            Swimming Pools{" "}
            <i
              className="fa fa-chevron-down"
              style={{ fontSize: "1rem", color: "#a0a0a0" }}
            />
          </a>
          <ul
            style={
              this.state.isSpoolSubMenuOpen
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <a
                href={`${staticSiteBaseURL}/swimming-pool-install-service.html`}
                onClick={this.toggleSpoolSubMenu}
              >
                Inground and Above ground pool install
              </a>
            </li>
            <li>
              <a
                href={`${staticSiteBaseURL}/swimming-pool-opening-and-closing-services.html`}
                onClick={this.toggleSpoolSubMenu}
              >
                Pool opening and closing
              </a>
            </li>
            <li>
              <a
                href={`${staticSiteBaseURL}/swimming-pool-parts-and-repair-services.html`}
                onClick={this.toggleSpoolSubMenu}
              >
                Repair or Replace parts
              </a>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" onClick={this.togglePoolSubMenu}>
            Billiard Table{" "}
            <i
              className="fa fa-chevron-down"
              style={{ fontSize: "1rem", color: "#a0a0a0" }}
            />
          </a>
          <ul
            style={
              this.state.isPoolSubMenuOpen
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <li>
              <a
                href={`${staticSiteBaseURL}/pool-table-install-service.html`}
                onClick={this.togglePoolSubMenu}
              >
                Install
              </a>
            </li>
            <li>
              <a
                href={`${staticSiteBaseURL}/pool-table-takedown-and-move-service.html`}
                onClick={this.togglePoolSubMenu}
              >
                Takedown and Move
              </a>
            </li>

            <li>
              <a
                href={`${staticSiteBaseURL}/pool-table-parts-and-repair-services.html`}
                onClick={this.togglePoolSubMenu}
              >
                Repair or Replace parts
              </a>
            </li>
          </ul>
        </li>
      </Fragment>
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
                  {staticNavList}
                  {this.renderAppLinks()}
                  <li>
                    <a href={`${staticSiteBaseURL}/contact.html`}>Contact</a>
                  </li>
                  <li className="current cart-icon">
                    <Link to="/cart" onClikc={this.closeAllSubMenus}>
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

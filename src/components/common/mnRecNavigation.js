import React, { Component, Fragment } from 'react';
import {Link, withRouter} from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  negatePadding: {
    paddingLeft: "-56px"
  }
});

const navigationLinks =[
  {name: "Shop", path: "/shop"},
  {name: "Cart", path: "/cart"}
]
const staticSiteBaseURL = "http://minnesotarec.surge.sh";
const spoolStaticLinks = [
  {text: "Above and Inground Pool Install", url:`${staticSiteBaseURL}/swimming-pool-install-service.html`},
  {text: "Pool opening and closing", url:`${staticSiteBaseURL}/swimming-pool-opening-and-closing-services.html`},
  {text: "Repair or Reaplace Parts", url:`${staticSiteBaseURL}/swimming-pool-parts-and-repair-services.html`}
];

const billiardStaticLinks = [
  {text: "Installation", url:`${staticSiteBaseURL}/pool-table-install-service.html`},
  {text: "Takedown and Move", url:`${staticSiteBaseURL}/pool-table-takedown-and-move-service.html`},
  {text: "Repair or Reaplace Parts", url:`${staticSiteBaseURL}/pool-table-parts-and-repair-services.html`}
];


class navigation extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    selectedIndex: 0,
    isSpoolDropdownOpen: true,
    isBilliardDropdownOpen: true
  };

  handleDropdownClick = (dropdown) => {
    this.setState(state => ({ [dropdown]: !state[dropdown] }));
  };
  componentDidMount() {
    let currnentPath = this.props.match.path;
    let linkIndex = {
      "/": 0,
      "/shop": 1
    };
    let selectedIndex = linkIndex[currnentPath];
    this.setState({selectedIndex})
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  renderQuantity = () => {
    const {cartItemsQuantity} = this.props;
    return cartItemsQuantity > 0 ? (<span className="cart-counter">{cartItemsQuantity}</span>) : null
  }

  renderLinks = () => {
    return navigationLinks.map( item => <li key={item.name}><Link className={(this.props.match.path === item.path && "current") || " "} to={item.path}>{item.name}</Link></li>)
  }


  renderStaticLinks = (links, classes) => {
    return links.map( item => (
      <ListItem button className={classes.nested} component="a" href={item.url} key={item.url}>
        <ListItemText primary={item.text} />
      </ListItem>
    ))}
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.toggleDrawer("left", false);
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>

          <ListItem button component="a" href={`${staticSiteBaseURL}/index.html`}>
            <ListItemText primary="Home"/>
          </ListItem>

          <ListItem button onClick={() => this.handleDropdownClick("isSpoolDropdownOpen")}>
            <ListItemText primary="Swimming Pool" />
            {this.state.isSpoolDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.isSpoolDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderStaticLinks( spoolStaticLinks, classes)}
            </List>
          </Collapse>

          <ListItem button onClick={() => this.handleDropdownClick("isBilliardDropdownOpen")}>
            <ListItemText primary="Billiard Table" />
            {this.state.isSpoolDropdownOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.isBilliardDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderStaticLinks( billiardStaticLinks, classes)}
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

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <Fragment>
        <div className="container">
          <div>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
              >
                {sideList}
              </div>
            </Drawer>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              
              <div className="menu-responsive">
                <i className="fa fa-chevron-circle-right menu-trigger" onClick={this.toggleDrawer('left', true)}></i>
              </div>

              <nav id="navigation">

                <ul className="menu" id="responsive">

                  {this.renderLinks()}
                  <li className="current cart-icon">
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart"></i>
                      {this.renderQuantity()}
                    </Link>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </Fragment>
    );
  }
}

const getCartItemCount = (state) => {
  return state.cart.cartItems.length;
}

function mapStateToProps(state) {
  return {
    cartItemsQuantity: getCartItemCount(state)
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(navigation)));


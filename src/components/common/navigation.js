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
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

const InboxIcon = () => <i>Icon</i>;
const MailIcon = () => <i>Mail</i>;


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class navigation extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    selectedIndex: 0,
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
  renderQuantity() {
    const {cartItemsQuantity} = this.props;
    return cartItemsQuantity > 0 ? (<span className="cart-counter">{cartItemsQuantity}</span>) : null
  }

  renderLinks() {
    const navigationLinks =[
      {name: "Home", path: "/"},
      {name: "Shop", path: "/shop"}
    ]
    return navigationLinks.map( item => <li key={item.name}><Link className={(this.props.match.path === item.path && "current") || " "} to={item.path}>{item.name}</Link></li>)
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const navigationLinks =[
      {name: "Home", path: "/"},
      {name: "Shop", path: "/shop"}
    ]
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
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
    console.log(this.state.selectedIndex);
    return (
      <Fragment>
        <div className="container">
          <div>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
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


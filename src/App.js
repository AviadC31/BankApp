import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Statistics from './components/Statistics';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Landing from './components/Landing';
import MenuItem from './components/MenuItem';
import MenuButton from './components/MenuButton';
import Menu from './components/Menu';
import axios from 'axios'
import './App.css';


export class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      balance: 0,
      menuOpen: false
    }
  }
  handleMenuClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  handleLinkClick() {
    this.setState({ menuOpen: false });
  }
  componentDidMount = async () => {
    const transactions = await axios.get("http://localhost:8080/transactions")
    this.setState({ data: transactions.data })
    this.updateBalance()
  }

  deleteTransaction = (id) => {
    const arr = [...this.state.data]
    const found = arr.findIndex(t => t._id === id)
    arr.splice(found, 1)
    this.setState({ data: arr }, () => {
      this.updateBalance()
    })
  }

  money = (arr) => {
    this.setState({ data: arr }, () => {
      this.updateBalance()
    })
  }

  updateBalance = () => {
    let balance = 0
    this.state.data.forEach(t => balance += parseInt(t.amount))
    this.setState({ balance })
  }
  render() {
    const state = this.state
    const styles =
    {
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '99',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        background: '#181820',
        width: '100%',
        color: 'white',
        fontFamily: 'Lobster',
      },
      logo: {
        margin: '1em',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
        height: '3em',
        filter: this.state.menuOpen ? 'blur(2px)' : null,
        transition: 'filter 0.5s ease',
      },
    }
    const menu = ['Home', 'Transactions', 'Operations', 'Statistics']
    const menuItems = menu.map((val, index) => {
      return (
        <MenuItem
          key={index}
          delay={`${index * 0.1}s`}
          onClick={() => { this.handleLinkClick() }}>{val}</MenuItem>)
    });


    return (
      <Router>
        <div>
          <div style={styles.container} >
            <MenuButton open={this.state.menuOpen} onClick={() => this.handleMenuClick()} color='white' />
            <div style={styles.logo} >Log In</div>
            <div style={styles.logo} >Register</div>

          </div>
          <Menu open={this.state.menuOpen}>
            <Link to={"/"}>{menuItems[0]}</Link>
            <Link to={"/transactions"}>{menuItems[1]}</Link>
            <Link to={"/operations"}>{menuItems[2]}</Link>
            <Link to={"/statistics"}>{menuItems[3]}</Link>
          </Menu>
          <div style={styles.body}></div>
        </div>
        {state.data.length >= 0 ?
          <div className="App">
            <div id="home-background">
              <div>
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Lobster&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet"></link>
                <Route  path="/" exact component={Landing} />
                <Route  path="/transactions" exact render={() => <Transactions state={state} deleteTransaction={this.deleteTransaction} />} />
                <Route  path="/operations" exact render={() => <Operations state={state} money={this.money} />} />
                <Route  path="/statistics" exact render={() => <Statistics state={state} />} />
              </div>
            </div>
          </div> : null}
      </ Router>
    )
  }
}
export default App;

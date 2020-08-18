import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';


class Operations extends Component {
  constructor() {
    super()
    this.state = {
      amount: "",
      vendor: "",
      category: "",
      activity: false
    }
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.name === '' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  money = async (e) => {
    const s = this.state
    const transaction = {
      amount: e.target.id === 'add' ? s.amount : -s.amount,
      vendor: s.vendor,
      category: s.category
    }
    const t = await axios.post("http://localhost:8080/transaction", transaction)
    this.props.state.data.push(t.data)
    this.props.money(this.props.state.data)
    this.setState({ activity: true })
  }
  operationAction = () => <p>A new Operation detected, check{' '}
                              <Link to="/transactions">Transactions</Link>{' '}to view
                          </p>
  render() {
    return (
      <div>
        <h1 id="home-title3">Operations</h1>
        <div className="inputsBox">
          <p className="main-directory-text-2">vendor:</p>
          <div className="cover">
            <input className="input"
              name="vendor"
              type="text"
              value={this.state.vendor}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="inputsBox">
          <p className="main-directory-text-2">category:</p>
          <div className="cover">
            <input className="input"
              name="category"
              type="text"
              value={this.state.category}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="inputsBox">
          <p className="main-directory-text-2">amount:</p>
          <div className="cover">
            <input id="amount"
              name="amount"
              type="Number"
              checked={this.state.amount}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <div>
          <p className="main-directory-text-2">Balance: {this.props.state.balance} $</p>
          <button id="add" onClick={this.money}>Deposit</button>
          <button id="dec" onClick={this.money}>Withdraw</button>
          <p className="main-directory-text-2">{this.state.activity ? this.operationAction() : null}</p>
        </div>
        <div className="backBox">
          <p className="back">Back</p>
          <Link to={"/"}>
            <img id="logo" src="https://www.freshbooks.com/wp-content/uploads/2018/08/icon-paidfaster.png" />
          </Link>
        </div>
      </div >

    );
  }
}
export default Operations;
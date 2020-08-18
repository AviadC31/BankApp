import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../transaction.css'
import axios from 'axios';

class Transaction extends Component {

  deleteTransaction = async () =>{
   const id = await axios.delete("http://localhost:8080/transaction", {data: {id:this.props.transaction._id}})
   this.props.deleteT(id)
  }

  render() {
    return (
      <div id="home-container2">
        <div >
          <span className="trans">{this.props.transaction.vendor}</span>
          <span className="price">{this.props.transaction.amount} $</span>
          <span className="trans">{this.props.transaction.category}</span>
        <img id="x"src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" onClick={this.deleteTransaction}/>
        </div>
      </div>
    )
  }
}

export default Transaction
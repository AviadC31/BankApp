const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8080
const transactionSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    vendor: String
})

const Transaction = mongoose.model("Transaction", transactionSchema)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bankapp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.get('/transactions', (req, res) => {
    Transaction.find({}).then(transactions => res.send(transactions))
})

app.get('/statistics', (req, res) => {
    Transaction.aggregate(
        [
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount"
                    },
                },
            }
        ]
    ).sort({ "total": -1 }).then(statistics => res.send(statistics))
})

app.post('/transaction', (req, res) => {
    const transaction = new Transaction(req.body)
    transaction.save().then(transaction => res.send(transaction))
})
app.delete('/transaction', function (req, res) {
    const { id } = req.body
    Transaction.findByIdAndDelete(id)
        .then(transaction => res.send(transaction._id))
        .catch(() => res.end())
})

app.listen(port, () => console.log("server up and running on port " + port))
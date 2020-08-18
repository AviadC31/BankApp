import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import  Doughnut from 'react-chartjs-2';

class Statistics extends Component {
    constructor() {
        super()
        this.state = {
            statistics: [],
            labels: [],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [],
                    hoverBackgroundColor: [],
                    borderWidth: 1,
                    data: []
                }
            ]
        }
    }

    componentDidMount = async () => {
        const state = {
            statistics: await axios.get("http://localhost:8080/statistics"),
            labels: [],
            datasets: [
                {
                    label: 'Rainfall',
                    backgroundColor: [],
                    hoverBackgroundColor: [],
                    borderWidth: 0,
                    data: []
                }
            ]
        }
        let i = state.statistics.data.length
        const letters = '0123456789ABCDEF'
        while (i) {
            let color = '#'
            for (let j = 0; j < 6; j++) color += letters[Math.floor(Math.random() * 16)]
            state.datasets[0].backgroundColor.push(color)
            state.datasets[0].hoverBackgroundColor.push(color)
            i--
        }
        state.statistics.data.map(a => state.datasets[0].data.push(a.total))
        state.statistics.data.map(v => state.labels.push(v._id))
        this.setState(state)
    }

    render() {
    
        return (
            <div>
                <h1 id="home-title3">Statistics</h1>
                <div>
                    {this.state.statistics.data ? this.state.statistics.data.map(t =>
                        <div className="statisticsBox">
                            <p className="main-directory-text-3">{t._id}:</p>
                            <p className="main-directory-text-3">{t.total} $</p>
                        </div>) : null}
                </div>
                <div >
                    <div>
                        <Doughnut
                            data={this.state}
                            options={{
                                title: {
                                    display: true,
                                    text: '',
                                    fontSize: '',
                                },
                                legend: {
                                    display: true,
                                    position: 'left',
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="backBox">
                    <p className="back">Back</p>
                    <Link to={"/"}>
                        <img id="logo" src="https://www.freshbooks.com/wp-content/uploads/2018/08/icon-paidfaster.png" />
                    </Link>
                </div>
            </div>
        )
    }
}

export default Statistics
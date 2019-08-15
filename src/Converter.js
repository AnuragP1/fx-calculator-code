import React, { Component } from "react";

import './Converter.css';

const rates = {
    "AUD": 1 / 0.8371,
    "CAD": 1 / 0.8711,
    "CNY": 6.1715,
    "EUR": 1 / 1.2315,
    "GBP": 1 / 1.5683,
    "USD": 1,
    "NZD": 1 / 0.7750,
    "JPY": 119.95,
    "CZK": 27.6028 / 1.2315,
    "DKK": 7.4405 / 1.2315,
    "NOK": 8.6651 / 1.2315,
}

//Keys of rates mapped
const crNames = Object.keys(rates);

class Converter extends Component {
    state = {
        result: null,
        resultCurrency: null,
        fromCurrency: "AUD",
        toCurrency: "USD",
        amount: 1,
        currencies: [],
    };

    // Add currencies to state
    componentDidMount() {
        this.setState({ currencies: crNames.sort() })
    }

    // Updates the states based on the dropdown that was changed
    convertHandler = () => {
        if (this.state.fromCurrency !== this.state.toCurrency) {
            const result = this.state.amount * (rates[this.state.toCurrency] / rates[this.state.fromCurrency]);
            if (this.state.toCurrency === "JPY") {
                this.setState({ result: Math.round(result) })
            } else {
                this.setState({ result: result.toFixed(2) })
            }
        } else {
            this.setState({ result: this.state.amount })
        }

        this.setState({ resultCurrency: this.state.toCurrency })
    };

    // Event handler for the conversion
    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
        if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div className="Converter">
                <h2><span>Currency </span> Converter </h2>
                <div className="Form">
                    <h4>From:
                    <select
                            name="from"
                            onChange={(event) => this.selectHandler(event)}
                            value={this.state.fromCurrency}
                        >
                            {this.state.currencies.map(cur => (
                                <option key={cur}>{cur}</option>
                            ))}
                        </select>
                        <input
                            name="amount"
                            type="text"
                            value={this.state.amount}
                            onChange={event =>
                                this.setState({ amount: event.target.value })
                            }
                        /></h4>
                    <br />
                    <h4>To:
                    <select
                            name="to"
                            onChange={(event) => this.selectHandler(event)}
                            value={this.state.toCurrency}
                        >
                            {this.state.currencies.map(cur => (
                                <option key={cur}>{cur}</option>
                            ))}
                        </select></h4>
                    <br />
                    <button onClick={this.convertHandler}>Convert</button>
                </div>
                {
                    this.state.result &&
                    <h3>= {this.state.resultCurrency} {this.state.result}</h3>
                }
            </div>
        );
    }
}

export default Converter;
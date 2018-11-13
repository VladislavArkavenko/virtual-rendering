import React, { Component } from 'react';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import loremIpsum from 'lorem-ipsum';
import logo from './logo.svg';
import './App.css';


const listHeight = 600;
const rowCount = 1000;
const rowHeight = 50;
const rowWidth = 800;


class App extends Component {
    constructor() {
        super()

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100
        })

        this.list = Array(rowCount).fill().map((val, idx) => {
            return {
                id: idx,
                name: 'John Doe',
                image: 'http://via.placeholder.com/40',
                text: loremIpsum({
                    count: 1,
                    units: 'sentences',
                    sentenceLowerBound: 10,
                    sentenceUpperBound: 100
                })
            }
        })
    }

    renderRow = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                    <div key={key} style={style} className="row">
                        <div className="image">
                            <img src={this.list[index].image} alt="" />
                        </div>
                        <div className="content">
                            <div>{this.list[index].name}</div>
                            <div>{this.list[index].text}</div>
                        </div>
                    </div>
            </CellMeasurer>
        );
    }

    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <div className="list">
                    <AutoSizer>
                        { ( { width, height } ) => (
                            <List
                                width={width}
                                height={height}
                                deferredMeasurementCache={this.cache}
                                rowHeight={this.cache.rowHeight}
                                rowRenderer={this.renderRow}
                                rowCount={this.list.length}
                                overscanRowCount={3}  />
                        ) }
                    </AutoSizer>
                </div>
            </div>
        )
  }
}

export default App

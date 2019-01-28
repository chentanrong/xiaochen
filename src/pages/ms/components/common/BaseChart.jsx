
import React, { Component } from 'react';
import ResizableComponent from "./ResizableComponent"
import { Chart } from "bizcharts";
class BaseChart extends ResizableComponent {
    constructor(props) {
        super(props);
        this.chartContainerRef = React.createRef();
        this.chartRef = React.createRef();
        this.state = {
            width: this.props.width,
            height: this.props.height
        }
    }
    onWindowResize() {
        super.onWindowResize()
        this.changeHeight()
    }
    componentDidMount() {
        super.componentDidMount()
        if (!this.state.height) {
            setTimeout(() => { this.changeHeight() }, 0)
        }
    }
    changeHeight() {
        let chartContainer = this.chartContainerRef.current
        if (chartContainer && this.chart) {
            let parent = chartContainer.parentNode
            // this.chart.changeSize(parent.clientWidth, parent.clientHeight)
            this.setState({
                width: parent.clientWidth,
                height: parent.clientHeight
            })
        }
    }
    // changeHeight() {
    //     if (this.chart) {
    //         this.chart.changeHeight(this.calculateHeight())
    //         this.chart.forceFit()
    //     }
    // }
    render() {
        let width = this.state.width
        let height = this.state.height
        if (this.props.ratio) {
            let realratio = width / height
            if (this.props.ratio < realratio) {
                width = height * this.props.ratio
            } else {
                height = width/ this.props.ratio
            }
        }
        return (
            <div ref={this.chartContainerRef}>
                <Chart ref={this.chartRef} {...this.props} width={width} height={height}
                    onGetG2Instance={(chart) => { this.chart = chart; if (this.props.onGetG2Instance) this.props.onGetG2Instance(chart) }}>
                </Chart>
            </div>
        )
    }
}
export default BaseChart

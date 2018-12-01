import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import '../App.css';

class Bubble extends React.Component {

    render() {
        return (
            < div className="center" style={{ height: 700, width: '80%' }}>
                <ResponsiveStream
                    data={this.props.data}
                    keys={this.props.keys}
                    margin={{
                        "top": 70,
                        "right": 110,
                        "bottom": 50,
                        "left": 50
                    }}
                    curve='monotoneX'
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legendPosition": "center",
                        "legend": "Weeks Since Project Started",
                        "legendOffset": 40
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "legendPosition": "center",
                        "tickRotation": 0,
                        "legend": this.props.message,
                        "legendOffset": -40
                    }}
                    colors='nivo'
                    offsetType="none"
                    borderColor="#000"
                    order='descending'
                    dotSize={8}
                    dotBorderWidth={2}
                    dotBorderColor="inherit:brighter(0.7)"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legends={[
                        {
                            "anchor": "bottom-right",
                            "direction": "column",
                            "translateX": 100,
                            "itemWidth": 80,
                            "itemHeight": 20,
                            "itemTextColor": "#999",
                            "symbolSize": 12,
                            "symbolShape": "circle",
                            "effects": [
                                {
                                    "on": "hover",
                                    "style": {
                                        "itemTextColor": "#000"
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div >
        )
    }
}

export default Bubble;
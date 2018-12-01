import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import '../App.css';

class Radar extends React.Component {

    render() {
        return (
            < div style={{ height: '100%' }}>
                <div className="chart-title">{this.props.title}</div>
                <ResponsiveRadar
                    data={this.props.data}
                    keys={this.props.keys}
                    indexBy="measure"
                    maxValue="auto"
                    margin={{
                        "top": 20,
                        "right": 80,
                        "bottom": 40,
                        "left": 80
                    }}
                    curve="catmullRomClosed"
                    borderWidth={2}
                    borderColor="inherit"
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={8}
                    dotColor="inherit"
                    dotBorderWidth={0}
                    dotBorderColor="#ffffff"
                    enableDotLabel={true}
                    dotLabel="value"
                    dotLabelYOffset={-12}
                    colors="nivo"
                    colorBy="key"
                    fillOpacity={0.1}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                    isInteractive={true}
                    legends={[
                        {
                            "anchor": "top-left",
                            "direction": "column",
                            "translateX": -50,
                            "translateY": -40,
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

export default Radar;
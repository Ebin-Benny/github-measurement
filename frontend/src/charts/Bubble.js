import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';
import '../App.css';

class Bubble extends React.Component {

    render() {
        return (
            < div style={{ height: '100%' }}>
                <ResponsiveBubble
                    root={this.props.data}
                    margin={{
                        "top": 100,
                        "right": 0,
                        "bottom": 0,
                        "left": 0
                    }}
                    identity="name"
                    value="size"
                    leavesOnly={false}
                    colors="nivo"
                    labelTextColor="#000"
                    labelSkipRadius={6}
                    colorBy="language"
                    padding={3}
                    animate={true}
                    isInteractive={true}
                    borderWidth={2}
                    defs={[
                        {
                            "id": "lines",
                            "type": "patternLines",
                            "background": "none",
                            "color": "inherit",
                            "rotation": -45,
                            "lineWidth": 5,
                            "spacing": 8
                        }
                    ]}
                    fill={[
                        {
                            "match": {
                                "depth": 0
                            },
                            "id": "lines"
                        }
                    ]}
                />
            </div >
        )
    }
}

export default Bubble;
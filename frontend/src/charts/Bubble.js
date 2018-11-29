import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing'

class Bubble extends React.Component {
    render() {
        return (
            < div style={{ height: 600 }}>
                <ResponsiveBubble
                    root={{
                        "name": "nivo",
                        "children": [
                            {
                                "name": "xAxis",
                                "loc": 118342,
                                "language": "Java"
                            },
                            {
                                "loc": 80095,
                                "name": "yAxis",
                                "language": "Typescript"
                            },
                        ],
                    }
                    }
                    identity="name"
                    value="loc"
                    leavesOnly={false}
                    colors="nivo"
                    labelTextColor="#000"
                    labelSkipRadius={12}
                    colorBy="language"
                    padding={3}
                    animate={true}
                    isInteractive={true}
                />
            </div >
        )
    }
}

export default Bubble;
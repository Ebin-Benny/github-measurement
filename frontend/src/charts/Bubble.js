import React from 'react';
import { ResponsiveBubble } from '@nivo/circle-packing';

class Bubble extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            < div style={{ height: 600 }}>
                <ResponsiveBubble
                    root={this.props.data}
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
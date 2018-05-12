import React, { Component } from 'react';
import TitleBar from '../components/TitleBar';
import ToolBar from '../components/ToolBar';
import { DrawingMode } from '../components/Tools';
import { AppColors } from '../data/Colors';

class PedroDraw extends Component {

    state = {
        mode: DrawingMode.Brush,
        color: AppColors.black
    };

    handleModeChange = (mode) => this.setState({ mode });

    handleColorChange = (color) => this.setState({ color });

    handleTitleBarAction = (action) => alert(action);

    render() {
        let { mode, color } = this.state;

        return (
            <div>
                <TitleBar onTitleBarAction={ this.handleTitleBarAction } />
                <ToolBar mode={ mode }
                        onModeChange={ this.handleModeChange }
                        color={ color }
                        colorList={ AppColors }
                        handleColorChange={ this.handleColorChange } />
            </div>
        );
    }

}

export default PedroDraw;

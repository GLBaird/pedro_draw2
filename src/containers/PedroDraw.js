import React, { Component } from 'react';
import TitleBar, { TitleBarActions } from '../components/TitleBar';
import ToolBar from '../components/ToolBar';
import Canvas from '../components/Canvas';
import { DrawingMode } from '../components/Canvas';
import { AppColors } from '../data/Colors';
import styles from './PedroDraw.scss';
import AppEvents, { Events } from '../services/AppEvents'

class PedroDraw extends Component {

    state = {
        mode: DrawingMode.Brush,
        color: AppColors.black
    };

    handleModeChange = (mode) => this.setState({ mode });

    handleColorChange = (color) => this.setState({ color });

    handleTitleBarAction = (action) => {
        let event;
        switch (action) {
            case TitleBarActions.new:
                event = new Event(Events.clearCanvas);
                break;
            case TitleBarActions.save:
                event = new Event(Events.saveFile);
                break;
            case TitleBarActions.open:
                event = new Event(Events.loadFile);
                break;
        }

        AppEvents.shared().dispatchEvent(event);
    };

    render() {
        let { mode, color } = this.state;

        return (
            <div data-tid="PedroDraw" className={styles.container}>
                <TitleBar onTitleBarAction={ this.handleTitleBarAction } />
                <main className={styles.main}>
                    <ToolBar mode={ mode }
                            onModeChange={ this.handleModeChange }
                            color={ color }
                            colorList={ AppColors }
                            handleColorChange={ this.handleColorChange } />
                    <Canvas color={color} mode={mode} />
                </main>
            </div>
        );
    }

}

export default PedroDraw;

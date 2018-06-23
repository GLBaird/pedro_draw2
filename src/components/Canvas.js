import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Canvas.scss';
import AppEvents, { Events } from '../services/AppEvents';

/** @enum {number} */
export const DrawingMode = {
    Brush: 0,
    Box: 1,
    Circle: 2
};

class Canvas extends Component {
    state = {
        drawing: false,
        width: 0,
        height: 0
    };

    componentDidMount() {
        window.addEventListener('resize', this.resizeCanvas);

        AppEvents.shared().addEventListener(Events.clearCanvas, this.onClear);
        AppEvents.shared().addEventListener(Events.loadFile, this.onLoad);
        AppEvents.shared().addEventListener(Events.saveFile, this.onSave);

        this.resizeCanvas();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
        AppEvents.shared().removeEventListener(Events.clearCanvas, this.onClear);
        AppEvents.shared().removeEventListener(Events.loadFile, this.onLoad);
        AppEvents.shared().removeEventListener(Events.saveFile, this.onSave);
    }

    onClear = () => {
        if (confirm('Are you sure?')) {
            this.clearCavnas();
        }
    };

    onSave = () => {
        const a = document.createElement('a');
        a.href = this.canvas.toDataURL('image/jpeg', 0.8);
        a.setAttribute('download', 'my_image');
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    onLoad = () => {

    };

    getMousePosition(event) {
        const { clientX, clientY } = event;
        const { offsetLeft, offsetTop } = event.target;
        return { x: clientX - offsetLeft, y: clientY - offsetTop };
    }

    simpleDraw(event, start=false) {
        const { color } = this.props;
        const {x, y} = this.getMousePosition(event);
        if (start) {
            this.ctx.moveTo(x, y);
        } else {
            this.ctx.lineTo(x, y);
        }
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    clearCavnas = () => {
        this.ctx.fillStyle = 'white';
        const { offsetWidth, offsetHeight } = this.canvas;
        console.log(offsetWidth, offsetHeight);
        this.ctx.fillRect(0, 0, offsetWidth, offsetHeight);
    };

    drawShape(event, fill = false) {
        const { x: x1, y: y1 } = this.startPosition;
        const { x: x2, y: y2 } = this.getMousePosition(event);

        this.ctx.putImageData(this.cachedImage, 0, 0);
        if (this.props.mode === DrawingMode.Box) {
            this.drawBox(x1, y1, x2, y2, fill);
        } else {
            this.drawCircle(x1, y1, x2, y2, fill);
        }
    }

    drawBox(x1, y1, x2, y2, fill = false) {
        const width = x2 - x1;
        const height = y2 - y1;
        if (fill) {
            this.ctx.fillStyle = this.props.color;
            this.ctx.fillRect(x1, y1, width, height);
        } else {
            this.ctx.strokeStyle = this.props.color;
            this.ctx.strokeRect(x1, y1, width, height);
        }
    }

    drawCircle(x1, y1, x2, y2, fill = false) {
        const radX = Math.abs(x1 - x2) / 2;
        const radY = Math.abs(y1 - y2) / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(x1 + radX, y1 + radY, radX, radY, 0, 0, Math.PI * 2);
        if (fill) {
            this.ctx.fillStyle = this.props.color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = this.props.color;
            this.ctx.stroke();
        }
    }

    onMouseDown = (event) => {
        this.setState({ drawing: true });
        this.ctx.beginPath();
        if (this.props.mode === DrawingMode.Brush) {
            this.simpleDraw(event, true);
        } else {
            this.startPosition = this.getMousePosition(event);
            const { width, height } = this.state;
            this.cachedImage = this.ctx.getImageData(0, 0, width, height);
        }

    };

    onMouseMove = (event) => {
        if (this.state.drawing) {
            const { mode } = this.props;
            switch (mode) {
                case DrawingMode.Box:
                case DrawingMode.Circle:
                    this.drawShape(event);
                    break;
                default:
                    this.simpleDraw(event);
            }

        }
    };

    onMouseUp = (event) => {
        this.setState({ drawing: false });
        if (this.props.mode !== DrawingMode.Brush) {
            this.drawShape(event, true);
            delete this.cachedImage;
        }
    };

    resizeCanvas = () => {
        this.setState({
            width: this.canvas.offsetWidth,
            height: this.canvas.offsetHeight
        });
    };

    render() {
        const { width, height } = this.state;
        return (
            <canvas className={styles.container}
                    width={width}
                    height={height}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    ref={elm => {
                        if (elm && !this.canvas) {
                            this.canvas = elm;
                            this.ctx = this.canvas.getContext('2d');
                            setTimeout(this.clearCavnas, 50);
                        }
                    }}
            >
                Your browser does not support this app.
            </canvas>
        );
    }

}

Canvas.defaultProps = {
    color: 'black',
    mode: DrawingMode.Brush
};

Canvas.propTypes = {
    color: PropTypes.string,
    mode: PropTypes.number
};

export default Canvas;

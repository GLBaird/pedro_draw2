import React from 'react';
import ReactDom from 'react-dom';
import './css/base_styles.scss';

import PedroDraw from './containers/PedroDraw';

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(<PedroDraw/>, container);

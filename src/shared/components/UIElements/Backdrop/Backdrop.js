import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick} />,
		document.getElementById('backdrop-hook')
	);
};

export default Backdrop;

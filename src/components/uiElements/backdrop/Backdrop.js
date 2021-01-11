import React from 'react';
import ReactDOM from 'react-dom';
import './Backdrop.scss';

/*
Renders a backdrop as used by the modal and spinner.
Has a 'hook' element located in the index.html.
*/
export const Backdrop = (props) => {
	return ReactDOM.createPortal(
		<div className="backdrop" onClick={props.onClick} />,
		document.getElementById('backdrop-hook')
	);
};

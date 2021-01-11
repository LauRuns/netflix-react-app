import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
/* Components and styling */
import { Backdrop } from '../backdrop/Backdrop';
import './Modal.scss';

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<header className={`modal__header ${props.headerClass}`}>
				<h2>{props.header}</h2>
			</header>
			<form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
				<div className={`modal__content ${props.contentClass}`}>{props.children}</div>
				<footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

/*
Displays a modal with children passed to it using the CCS transition group:
http://reactcommunity.org/react-transition-group/css-transition
*/
export const Modal = (props) => {
	const nodeRef = React.useRef(null);
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				nodeRef={nodeRef}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal"
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

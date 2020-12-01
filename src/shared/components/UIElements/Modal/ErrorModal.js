import React from 'react';

import Modal from './Modal';
import Button from '../Button/Button';

const ErrorModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header={props.header ? props.header : 'An Error Occurred!'}
			show={!!props.error}
			footer={<Button onClick={props.onClear}>OK</Button>}
		>
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;

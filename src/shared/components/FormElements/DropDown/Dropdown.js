import React, { useState } from 'react';

import { Backdrop } from '../../../components/UIElements/Backdrop/Backdrop';

import './Dropdown.scss';

export const Dropdown = ({ title, label, items, selected }) => {
	const [open, setOpen] = useState(false);
	const [selection, setSelection] = useState(null);
	const [showBackDrop, setShowBackDrop] = useState(false);

	const toggle = () => {
		setShowBackDrop(!showBackDrop);
		setOpen(!open);
	};

	const handleOnClick = (item) => {
		selected(item);
		setSelection(item.country);
		toggle();
	};

	return (
		<>
			{showBackDrop && <Backdrop onClick={toggle} />}
			<div className="dd-container">
				<div className="dd-label">
					<label htmlFor="dd-wrpr">{label}</label>
				</div>
				<div id="dd-wrpr" className="dd-wrapper">
					<div
						tabIndex={0}
						className="dd-header"
						role="button"
						onKeyPress={() => toggle(!open)}
						onClick={() => toggle(!open)}
					>
						<div className="dd-header__title">
							<p className="dd-header__title--bold">{selection ? selection : title}</p>
						</div>
						<div className="dd-header__action">
							<p>{open ? 'Close' : 'Open'}</p>
						</div>
					</div>
					{open && (
						<ul className="dd-list">
							{items.map((item) => (
								<li className="dd-list-item" key={item.countryId}>
									<button type="button" onClick={() => handleOnClick(item)}>
										<span>{item.country}</span>
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
};

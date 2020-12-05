import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { TextInput, NumberInput, RadioButtonGroup, Dropdown } from '../../molecules';
import { RadioButton } from '../../atoms';
import { IconButton } from '../../uiElements';

import './SearchForm.scss';

const contentTypes = [
	{
		name: 'contentselector',
		labelSize: 'large',
		label: 'Serie',
		value: 'series'
	},
	{
		name: 'contentselector',
		labelSize: 'large',
		label: 'Movie',
		value: 'movie'
	}
];

export const SearchForm = ({ countries, sendFormData }) => {
	const { register, unregister, watch, handleSubmit, ...methods } = useForm({
		mode: 'onChange'
	});

	return (
		<FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit}>
			<form onSubmit={handleSubmit(sendFormData)}>
				<div className="search-form-container">
					<div id="search-form-dropdown">
						{countries && (
							<Dropdown
								name="countryselect"
								size="large"
								label="Select country"
								dropdownData={countries}
								fieldRef={register({
									required: {
										value: true,
										message: 'You must select a country'
									}
								})}
							/>
						)}
					</div>
					<div id="search-form-query">
						<TextInput
							name="query"
							placeholder="Enter title"
							inputSize="large"
							labelSize="large"
							label="Enter title"
							fieldRef={register({
								required: {
									value: true,
									message: 'A valid search query is mandatory'
								}
							})}
						/>
					</div>
					<div id="search-form-startyear">
						<NumberInput
							name="startyear"
							placeholder="Start year... 2012?"
							inputSize="large"
							labelSize="large"
							label="Start year"
							fieldRef={register({
								min: {
									value: 1980,
									message: 'No data older than 1980'
								},
								max: {
									value: 2019,
									message: 'No start year beyond 2019'
								}
							})}
						/>
					</div>
					<div id="search-form-endyear">
						<NumberInput
							name="endyear"
							placeholder="End year"
							inputSize="large"
							labelSize="large"
							label="End year"
							fieldRef={register({
								min: {
									value: 1981,
									message: 'Year above 1981'
								},
								max: {
									value: 2020,
									message: 'No end year beyond 2020'
								}
							})}
						/>
					</div>
					<div id="search-form-contenttype">
						<RadioButtonGroup
							name="content-type"
							label="Select content type"
							labelSize="large"
							column
						>
							{contentTypes.map(({ name, label, value, labelSize }, index) => (
								<RadioButton
									key={index}
									name={name}
									labelSize={labelSize}
									label={label}
									value={value}
									fieldRef={register({
										required: {
											value: true,
											message: 'Select one'
										}
									})}
								/>
							))}
						</RadioButtonGroup>
					</div>
					<div id="search-form-actions" className="search-form__actions">
						<IconButton icon="search" before iconSize={24} buttonType="submit">
							SEARCH
						</IconButton>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

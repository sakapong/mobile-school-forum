import { useField } from 'formik';
import React from 'react';

const RadioFormComponent = ({ isError, errorMessage, label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className="form-check">
			<input {...field} {...props} type="radio" className="form-check-input" />
			<label className="form-check-label" htmlFor={props.id || props.name}>
				{label}
			</label>
			{meta.touched && meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
			{isError && errorMessage && <div className="invalid-feedback d-block">{errorMessage}</div>}
		</div>
	);
};

export default RadioFormComponent;

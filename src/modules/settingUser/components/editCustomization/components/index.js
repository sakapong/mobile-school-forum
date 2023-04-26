import React, { useState } from 'react';
import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import InputForm from '@/common/components/InputForm/components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


// import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const EditCustomizationComponent = ({ props }) => {

	const [isLoading, setIsLoading] = React.useState(false);

	const submitForm = () => {
		setIsLoading(true);
	};

	const initialValues = {
		telegram_group: "",
		line_group: "",
		discord_group: "",
	};

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const response = await httpRequest.upload({
				url: `/settings/notification`,
				token: getCookie('token'),
				data: {
					telegram_group: "",
					line_group: "",
					discord_group: "",
				},
				files: {
					avatar: values.avatar
				}
			});
			if (response.data.success) {
				await mutateUser();
				showToast.success(`Update settings success`);
				router.replace(`/settings/customization`);
			}
		} catch (error) {
			console.log(error);
			showToast.error('Update settings error');
			if (!error?.response?.data?.success) {
				setErrors(error.response.data);
			}
		} finally {
			setLoading(false);
		}
	};

	const [checked, setChecked] = useState(false);
	const [radioValue, setRadioValue] = useState('1');

	const radios = [
		{ name: 'Active', value: '1' },
		{ name: 'Radio', value: '2' },
		{ name: 'Radio', value: '3' },
	];

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			<Form>
				<div className="row">
					<div className="mb-3 col-md-6 ">
						<h2>Notification settings</h2>

						<h6>Chat app channels</h6>
						<hr />
						<div key={`default-checkbox`} className="mb-3">
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Telegram`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`LINE OA`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Discord`}
							/>
						</div>

						<h6>Community Alerts</h6>
						<hr />
						<div key={`default-checkbox`} className="mb-3">
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Top posts`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Case you follow`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Tags you follow`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Comments on your posts`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Votes on your posts`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Replies to your comments`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Evidence on submit`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Activity on cases you're in`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`New followers`}
							/>
							<Form.Check
								type="switch"
								id={`default-checkbox`}
								label={`Rewards you receive`}
							/>
						</div>

					</div>
					<div className="mb-3 col-md-6 ">
						<div className="text-left">
							{isLoading ? (
								<button type="submit" className="btn btn-primary" disabled>
									<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
									Update
								</button>
							) : (
								<button type="submit" className="btn btn-primary">
									Update
								</button>
							)}
						</div>

					</div>
				</div>
			</Form>
		</Formik>
	)
};

export default EditCustomizationComponent;

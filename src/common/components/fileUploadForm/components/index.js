import classnames from 'classnames';
import React, { useState } from 'react';
import CustomImage from '@/common/components/CustomImage/components';
import style from '@/common/components/fileUploadForm/styles/style.module.scss';
import ReviewfileDialog from './ReviewfileDialog'

const FileUploadFormComponent = ({ errors, error, touched, label, imageSrc, imagAlt, removeImage, ...props }) => {
	const [showDialog, setShowDialog] = useState(false);
	const close = () => setShowDialog(false);

	return (
		<>
			<div className='border-bottom py-4'>
				<label htmlFor={props.id || props.name} className="mb-3">
					{label}
				</label>
				<div className="d-flex flex-column flex-md-row justify-content-between">
					{imageSrc ? (
						<div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
							<div className="me-2 mb-2 mb-sm-0">
								<ReviewfileDialog showDialog={showDialog} close={close} label={label} content={imageSrc} />
							</div>
							<div className="d-flex align-items-center">
								<button type="button" className="btn btn-outline-danger" onClick={removeImage}>
									ลบ
								</button>
							</div>
						</div>
					) : (
						<div className="d-grid gap-2 col-12 mx-auto">
							<button type="button" className="btn btn-outline-primary position-relative">
								<input
									{...props}
									className={classnames(`position-absolute w-100 ${style.opacity_input_image}`, {
										'is-invalid': (touched && error) || errors
									})}
								/>
								<label className="mb-0" htmlFor={props.id || props.name}>
									อัพโหลดไฟล์
								</label>
							</button>
							{touched && error && <div className="invalid-feedback d-block">{error}</div>}
							{errors && <div className="invalid-feedback d-block">{errors}</div>}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FileUploadFormComponent;

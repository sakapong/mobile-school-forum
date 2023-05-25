import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import style from '@/common/components/fileUploadForm/styles/style.module.scss';

const FileUploadFormComponent = ({ errors, error, touched, label, imageSrc, imagAlt, removeImage, ...props }) => {
	return (
		<div className='border-bottom py-4'>
			<label htmlFor={props.id || props.name} className="mb-2">
				{label}
			</label>
			<div className="d-flex flex-column flex-md-row">
				<div className="d-flex align-items-center">
					<div className="d-grid gap-2 col-12 mx-auto">
						<button type="button" className="btn btn-outline-primary position-relative">
							<input
								{...props}
								className={classnames(`position-absolute w-100 ${style.opacity_input_image}`, {
									'is-invalid': (touched && error) || errors
								})}
							/>
							<label className="mb-0" htmlFor={props.id || props.name}>
								เปิดไฟล์
							</label>
						</button>
						{touched && error && <div className="invalid-feedback d-block">{error}</div>}
						{errors && <div className="invalid-feedback d-block">{errors}</div>}
					</div>
				</div>
				{imageSrc && (
					<div className="d-flex flex-column flex-sm-row">
						<div className="me-2 mb-2 mb-sm-0">
							<CustomImage className="" src={`${imageSrc}`} width={350} height={150} alt={imagAlt} />
						</div>
						<div className="d-flex align-items-center">
							<button type="button" className="btn btn-danger" onClick={removeImage}>
								ลบ
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FileUploadFormComponent;

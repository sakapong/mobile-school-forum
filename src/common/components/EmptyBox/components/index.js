import React from 'react';

const EmptyBoxComponent = ({ text }) => {
	return (
		<div className="row">
			<div className="col">
				<div className="p-5 card text-center rounded-16 shadow-sm">
					<span className="h5 mb-0">{text}</span>
				</div>
			</div>
		</div>
	);
};

export default EmptyBoxComponent;

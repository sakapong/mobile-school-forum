import React from 'react';

import LoginFormComponent from '@/modules/login/components/loginForm';

const LoginComponent = () => {
	return (
		<div className="container-xl py-5">
			<div className="row">
				<div className="col-lg-4 col-md-8 mx-auto">
					<div className="bg-white rounded-16 shadow-sm p-4">
						<LoginFormComponent />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;

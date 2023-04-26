import React from 'react';

import RegisterFormComponentWeb3 from '@/modules/register/components/registerFormWeb3';

const RegisterComponent = () => (
	<div className="container-xl py-4">
		<div className="row">
			<div className="col-lg-8 col-md-10 mx-auto">
				<div className="bg-white rounded-16 shadow-sm p-4">
					<RegisterFormComponentWeb3 />
				</div>
			</div>
		</div>
	</div>
);

export default RegisterComponent;

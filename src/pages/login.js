import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import LoginComponent from '@/modules/login/components';
import CustomImage from '@/common/components/CustomImage/components';

const Login = () => {
	return (
		<>
			<MetaWebsite title="Login" />
			<Layout>
{/*				<CustomImage
							className="logo"
							src={`https://socialbureau.io/wp-content/uploads/2021/09/logo-1.png`}
							width={260}
							height={120}
							alt="Mobile School"
						/>*/}
				<LoginComponent />
			</Layout>
		</>
	);
};

export default Login;

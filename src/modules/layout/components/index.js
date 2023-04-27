import React from 'react';

import NavBarComponent from '@/modules/layout/components/navbar/components';
import FooterComponent from '@/modules/layout/components/footer/components';
import FooterNavBarComponent from '@/modules/layout/components/footer/components/navbar';


const LayoutComponent = ({ children }) => {
	return (
		<>
			<NavBarComponent />
			{children}
			{/*<FooterComponent />*/}
			<FooterNavBarComponent />
		</>
	);
};

export default LayoutComponent;

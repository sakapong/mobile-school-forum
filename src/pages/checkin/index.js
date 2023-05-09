import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import CheckinUserComponent from '@/modules/CheckinUser/components'

const Checkin = ({ verifyUser }) => {
	return (
		<>
			<MetaWebsite title="Check in" isNoneMeta />
			<LayoutComponent>
                <CheckinUserComponent />
			</LayoutComponent>
		</>
	);
};

export default Checkin;

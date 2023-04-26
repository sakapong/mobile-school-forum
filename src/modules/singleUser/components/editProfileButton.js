import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';

const EditProfileButtonComponent = () => {
	return (
		<CustomLink className="btn btn-primary btn-sm" href={`/settings`}>
			แก้ไขข้อมูลส่วนตัว
		</CustomLink>
	);
};
export default EditProfileButtonComponent;

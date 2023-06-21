import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import NewPostComponent from '@/modules/newPost/components';
import NewProjectFormComponent from '@/modules/project/components/NewProjectForm';

const NewProjectForm = ({ currentUser }) => {
	const router = useRouter();
	const [errors, setErrors] = useState({});
	//useEffect(() => {
	//	const getExistingForm = async () => {
	//		const studentForm = await httpRequest.get({
	//			url: `https://mbs-register.onrender.com/api/v1/student_forms/${currentUser.data.line_uid}`,
	//		});
//
	//		if (studentForm.data.success) {
	//			router.push(`/register/student`)
	//		}
	//	};
	//	if (currentUser.data.line_uid) {
	//		getExistingForm();
	//	}
	//}, []);
	return (
		<>
			<MetaWebsite title="โครงงานโรงเรียนมือถือ" />
			<LayoutComponent>
				<NewProjectFormComponent 
					line_uid={currentUser.data.line_uid}
				/>
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req }) {
	try {
		const resCurrentUser = await httpRequest.get({
			url: `/current_user`,
			token: getCookie('token', req)
		});
		if (resCurrentUser.data.success) {
			return {
				props: {
					currentUser: resCurrentUser.data
				}
			};
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			};
		}
		return {
			notFound: true
		};
	}
}

export default NewProjectForm;

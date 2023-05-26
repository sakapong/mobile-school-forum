import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import { useRouter } from 'next/router'
import httpRequest from '@/common/utils/httpRequest';
import parseArray from '@/common/utils/parseArray';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import StudentInfoFormComponent from '@/modules/student/components/StudentInfoForm';
import StudentEducationFormComponent from '@/modules/student/components/StudentEducationForm';
import StudentFamilyFormComponent from '@/modules/student/components/StudentFamilyForm';
import StudentParentFormComponent from '@/modules/student/components/StudentParentForm';
import StudentDocumentFormComponent from '@/modules/student/components/StudentDocumentForm';


const StudentForm = () => {
    const router = useRouter()
	console.log("router.query?.slug", router.query?.slug)
	return (
		<>
			<MetaWebsite title="Settings" isNoneMeta />
			<LayoutComponent>
				<div className="container-xl py-4">
					<div className="row">
						<div className="col-lg-4 col-md-8 mx-auto">
							{router.query?.slug === "info" ? (
                                <StudentInfoFormComponent />
                            ) : router.query?.slug === "education" ? (
                                <StudentEducationFormComponent />
                            ) : router.query?.slug === "family" ? (
                                <StudentFamilyFormComponent />
                            ) : router.query?.slug === "parent" ? (
                                <StudentParentFormComponent />
                            ) : router.query?.slug === "document" ? (
                                <StudentDocumentFormComponent />
                            ): ''}
						</div>
					</div>
				</div>
			</LayoutComponent>
		</>
	);
};

export default StudentForm;

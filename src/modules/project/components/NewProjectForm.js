import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import showToast from '@/common/utils/showToast';
import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import ProjectInfoFormComponent from '@/modules/project/components/ProjectInfoForm';

const NewProjectFormComponent = ({line_uid}) => {
    const router = useRouter();
    const formikRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const CREATE_NEW = true;
    const initialValues = {
        title : '',
        category : '',
        introduction : '',
        objectives : '',
        expected_outcomes : '',
    };

    const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(1, 'ชื่อจริงต้องมีอย่างน้อย 1 ตัวอักษร')
			.max(30, 'ชื่อจริง สูงสุด 30 ตัวอักษร')
			.required('ชื่อจริงต้องระบุ'),
		last_name: Yup.string()
			.min(1, 'นามสกุล ต้องมีอย่างน้อย 1 ตัวอักษร')
			.max(30, 'นามสกุล สูงสุด 30 ตัวอักษร')
			.required('นามสกุลต้องระบุ'),
        id_number: Yup.string()
			.min(13, 'เลขประจำตัวประชาชนต้องมีอย่างน้อย 13 หลัก')
            .max(16, 'เลขประจำตัวประชาชนสูงสุด 13 หลัก')
			.matches(/^[0-9]+$/, 'เลขประจำตัวประชาชน ไม่ถูกต้อง')
            .required('เลขประจำตัวประชาชนต้องระบุ'),
        dath_of_birth: Yup.date()
            .required('วัน-เดือน-ปี เกิดต้องระบุ'),
	});

    const onSubmit = async (values) => {
        try {
            const project = {
                line_uid: line_uid,
                title : values.title,
                category : values.category,
                introduction : values.introduction,
                objectives : values.objectives,
                expected_outcomes : values.expected_outcomes,
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `https://mbs-register.onrender.com/api/v1/student_forms/`,
                data: project
            });
            console.log("response", response)
            if (response.data.pk) {
                showToast.success('บันทึกข้อมูลเบื้องต้นสำเร็จแล้ว ทำต่อในขั้นตอนถัดไปได้');
                router.push(`/register/student/`);
            }
        } catch (error) {
            showToast.error(`กรุณาลองใหม่อีกครั้ง ${error}`);
            setErrors(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <Formik innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {({ values }) => (
                                    <Form>
                                        <ProjectInfoFormComponent isLoading={isLoading} setLoading={setLoading} createNew={CREATE_NEW} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default NewProjectFormComponent;
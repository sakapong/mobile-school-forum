import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import StudentFormBase from './StudentFormBase';

import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentEducationFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ข้อมูลการศึกษา',
            fields: [
                {
                    name: 'school_name',
                    label: 'จากโรงเรียน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_province',
                    label: 'จังหวัด',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_district',
                    label: 'อำเภอ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_tumbol',
                    label: 'ตำบล',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'school_type',
                    label: 'สังกัด',
                    required: true,
                    type: 'radio',
                    options: [
                        { label: 'สพฐ', name: 'public' },
                        { label: 'เอกชน', name: 'private' },
                        { label: 'กทม.', name: 'bkk' },
                        { label: 'อื่นๆ', name: 'other' },
                    ],
                }
            ]
        }
    ]

    const initialValues = {
        school_name: "",
        school_province: "",
        school_district: "",
        school_tumbol: "",
        school_type: ""
    };



    const onSubmit = async (values) => {
        try {
            const student = {
                school_name: values.school_name,
                school_province: values.school_province,
                school_district: values.school_district,
                school_tumbol: values.school_tumbol,
                school_type: values.school_type
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: student
            });
            if (response.data.success) {
                // showToast.success('Login success');
                router.push(`/register/student`);
            }
        } catch (error) {
            showToast.error('Login error');
            if (!error.response.data.success) {
                setErrors(error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };


    return (<
        >
        <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef}/>
            </Form>
        </Formik>
    </>
    );
};

export default StudentEducationFormComponent;
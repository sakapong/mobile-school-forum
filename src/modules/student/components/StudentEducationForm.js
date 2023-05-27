import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import StudentFormBase from './StudentFormBase';


import { useSession, signIn, signOut } from "next-auth/react"

const StudentEducationFormComponent = ({setCurrentStep}) => {

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


    return (<
        >
        <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef} setCurrentStep={setCurrentStep}/>
    </>
    );
};

export default StudentEducationFormComponent;
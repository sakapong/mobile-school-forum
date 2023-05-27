import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import StudentFormBase from './StudentFormBase';

import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentDocumentFormComponent = ({ setCurrentStep }) => {
    const [isLoading, setLoading] = useState(false);
    const buttonRef = useRef(null);
    const [errors, setErrors] = useState({});
    
    const sections = [
        {
            label: 'หลักฐานการสมัคร',
            fields: [
                {
                    name: 'id_card_student',
                    label: 'สำเนาบัตรประจำตัวประชาชน',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'housing_student',
                    label: 'สำเนาทะเบียนบ้าน',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'transcript',
                    label: 'ปพ.1',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'photograph',
                    label: 'รูปถ่าย 1 นิ้ว',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'id_card_father',
                    label: 'สำเนาบัตรประจำตัวประชาชนของบิดา',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'housing_father',
                    label: 'สำเนาทะเบียนบ้านของบิดา',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'id_card_mother',
                    label: 'สำเนาบัตรประจำตัวประชาชนของมารดา',
                    required: true,
                    type: 'file'
                },
                {
                    name: 'housing_mother',
                    label: 'สำเนาทะเบียนบ้านของมารดา',
                    required: true,
                    type: 'file'
                },
            ]
        }
    ]

    return (<
        >
        <StudentFormBase sections={sections} errors={errors} isLoading={isLoading} buttonRef={buttonRef} setCurrentStep={setCurrentStep} />
    </>
    );
};

export default StudentDocumentFormComponent;
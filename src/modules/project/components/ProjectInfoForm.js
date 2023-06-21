import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import ProjectFormBase from './ProjectFormBase';

import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const ProjectInfoFormComponent = ({isLoading, previousPage, currentStep, createNew=false}) => {

    const { data: session } = useSession()

    const router = useRouter();
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);
    const sections = [
        {
            label: 'ข้อมูลโครงงาน',
            fields: [
                {
                    name: 'title',
                    label: 'ชื่อโครงงาน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'category',
                    label: 'ประเภทโครงงาน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'introduction',
                    label: 'ที่มาและความสําคัญ',
                    required: true,
                    type: 'textarea'
                },
                {
                    name: 'objectives',
                    label: 'วัตถุประสงค์',
                    required: true,
                    type: 'textarea'
                },
                {
                    name: 'expected_outcomes',
                    label: 'ประโยชน์ที่คาดว่าจะได้รับ',
                    required: true,
                    type: 'textarea'
                },
            ]
        },
    ]

    return (<
        >
        <ProjectFormBase
            sections={sections}
            errors={errors}
            isLoading={isLoading}
            previousPage={previousPage}
            buttonRef={buttonRef}
            createNew={createNew}
        />
    </>
    );
};

export default ProjectInfoFormComponent;
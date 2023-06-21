import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import ProjectFormBase from './ProjectFormBase';


import { useSession, signIn, signOut } from "next-auth/react"

const ProjectActivitiesFormComponent = ({ isLoading, previousPage, currentStep }) => {

    const { data: session } = useSession()

    const router = useRouter();
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'ตารางปฏิบัติกิจกรรม',
            fields: [
                {
                    name: 'activity_week',
                    label: 'สัปดาห์ที่',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'activity_detail',
                    label: 'กิจกรรมที่ปฏิบัติ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'activity_place',
                    label: 'สถานที่ทำกิจกรรม',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'activity_by',
                    label: 'ผู้รับผิดชอบ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'activity_start',
                    label: 'วัน-เดือน-ปี เริ่มต้นปฏิบัติงาน',
                    required: true,
                    type: 'date'
                },
                {
                    name: 'activity_end',
                    label: 'วัน-เดือน-ปี สิ้นสุดปฏิบัติงาน',
                    required: true,
                    type: 'date'
                },
            ]
        }
    ]


    return (<
        >
        <ProjectFormBase
            sections={sections}
            errors={errors}
            isLoading={isLoading}
            previousPage={previousPage}
            buttonRef={buttonRef}
        />
    </>
    );
};

export default ProjectActivitiesFormComponent;
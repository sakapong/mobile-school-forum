import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import ProjectFormBase from './ProjectFormBase';


import { useSession, signIn, signOut } from "next-auth/react"

const ProjectExcutionFormComponent = ({ isLoading, previousPage, currentStep }) => {

    const { data: session } = useSession()

    const router = useRouter();
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'การดำเนินงาน',
            fields: [
                {
                    name: 'tools',
                    label: 'วัสดุอุปกรณ์และเครื่องมือ',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'methods',
                    label: 'วิธีการดำเนินงาน',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'project_images',
                    label: 'แนบไฟล์ภาพ',
                    required: true,
                    type: 'text'
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

export default ProjectExcutionFormComponent;
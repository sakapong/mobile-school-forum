import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import ProjectFormBase from './ProjectFormBase';


import { useSession, signIn, signOut } from "next-auth/react"

const ProjectDocumentFormComponent = ({ isLoading, previousPage, currentStep }) => {

    const { data: session } = useSession()

    const router = useRouter();
    const [errors, setErrors] = useState({});

    const formikRef = useRef();
    const buttonRef = useRef(null);

    const sections = [
        {
            label: 'เอกสารที่เกี่ยวข้อง',
            fields: [
                {
                    name: 'document_topic',
                    label: 'หัวข้อที่ค้นหาเพื่อศึกษา',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'document_output',
                    label: 'ข้อมูลที่ได้',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'document_summary',
                    label: 'สรุป',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'document_resource',
                    label: 'แหล่งที่มา (วางlink หรือชื่อหนังสือ ผู้แต่ง)',
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

export default ProjectDocumentFormComponent;
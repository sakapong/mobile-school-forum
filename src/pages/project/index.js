import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, useFormikContext } from 'formik';
import httpRequest from '@/common/utils/httpRequest';
import useUser from '@/common/hooks/useUser';
import { getCookie } from '@/common/utils/session';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';

import ProjectInfoFormComponent from '@/modules/project/components/ProjectInfoForm';
import ProjectDocumentFormComponent from '@/modules/project/components/ProjectDocumentForm';
import ProjectActivitiesFormComponent from '@/modules/project/components/ProjectActivitiesForm';
import ProjectExcutionFormComponent from '@/modules/project/components/ProjectExcutionForm';
import ProjectAdvisorFormComponent from '@/modules/project/components/ProjectAdvisorForm';


import showToast from '@/common/utils/showToast';

const ProjectRegisterOverview = ({ currentUser }) => {
    const { user } = useUser();
    const router = useRouter();
    const formikRef = useRef();
    const [currentStep, setCurrentStep] = useState(0)
    const [isSaved, setIsSaved] = useState(false)
    const [projectContent, setProjectContent] = useState([])
    const [errors, setErrors] = useState({});

    const [isLoading, setLoading] = useState(false);
    function goToStep(step) {
        setCurrentStep(step + 1)
    }

    const previousPage = () => {
        if (currentStep > 0) {
            setCurrentStep(0);
        }
    };

    const formSteps = [
        {
            label: 'หัวข้อโครงงาน',
            slug: 'info',
        },
        {
            label: 'เอกสารที่เกี่ยวข้อง',
            slug: 'document',
        },
        {
            label: 'ตารางปฏิบัติกิจกรรม',
            slug: 'activities',
        },
        {
            label: 'การดำเนินงาน',
            slug: 'excution',
        },
        {
            label: 'อาจารย์ที่ปรึกษา',
            slug: 'advisor',
        },
    ]

    const initialValues = {
        title : projectContent.title || '',
        category : projectContent.category || '',
        introduction : projectContent.introduction || '',
        objectives : projectContent.objectives || '',
        expected_outcomes : projectContent.expected_outcomes || '',
        document_topic : projectContent.document_topic || '',
        document_output : projectContent.document_output || '',
        document_summary : projectContent.document_summary || '',
        document_resource : projectContent.document_resource || '',
        activity_week : projectContent.activity_week || '',
        activity_detail : projectContent.activity_detail || '',
        activity_place : projectContent.activity_place || '',
        activity_by : projectContent.activity_by || '',
        activity_start : projectContent.activity_start || '',
        activity_end : projectContent.activity_end || '',
        tools : projectContent.tools || '',
        methods : projectContent.methods || '',
        project_images : projectContent.project_images || '',
        advisor : projectContent.advisor || '',
    };

    useEffect(() => {
        const getStudentForm = async () => {
            const studentForm = await httpRequest.get({
                url: `https://mbs-register.onrender.com/api/v1/student_forms/${currentUser.data.line_uid}`,
            });
            console.log("studentForm.data.success", studentForm.data.success)
            if (studentForm.data.success) {
                formikRef.current.setValues(studentForm.data.data)
            } else {
                router.push('/register/student/new')
            }
        }
        if (currentUser.data.line_uid) {
            getStudentForm()
        }
    }, [])

    const onSubmit = async (values) => {
        try {
            const project = {
                title : values.title,
                category : values.category,
                introduction : values.introduction,
                objectives : values.objectives,
                expected_outcomes : values.expected_outcomes,
                document_topic : values.document_topic,
                document_output : values.document_output,
                document_summary : values.document_summary,
                document_resource : values.document_resource,
                activity_week : values.activity_week,
                activity_detail : values.activity_detail,
                activity_place : values.activity_place,
                activity_by : values.activity_by,
                activity_start : values.activity_start,
                activity_end : values.activity_end,
                tools : values.tools,
                methods : values.methods,
                project_images : values.project_images,
                advisor : values.advisor,
            };
            setLoading(true);
            const response = await httpRequest.put({
                url: `https://mbs-register.onrender.com/api/v1/student_forms/${user.line_uid}/`,
                data: project
            });
            console.log("response", response)
            if (response.data.pk) {
                showToast.success('ใบสมัครของท่านได้ทำการส่งเรียบร้อยแล้ว');
                setCurrentStep(0)
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
            <MetaWebsite title="โครงงานโรงเรียนมือถือ" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
                                {({ values }) => (
                                    <Form>
                                        {currentStep == 0 ? (
                                            <>
                                                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                                                    <h2 className='mb-4'>กรอกข้อมูลสำหรับการจัดทำโครงงานตามรายการดังต่อไปนี้</h2>
                                                    <div className="d-grid gap-3 col-12 mx-auto">
                                                        {
                                                            formSteps.map((step, index) =>
                                                            (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => goToStep(index)}
                                                                    className={`btn-list btn-outline-secondary`}
                                                                >
                                                                    <span className='btn-status'></span>
                                                                    {step.label}
                                                                </button>
                                                            )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className='bg-white fixed-bottom shadow-sm py-4 mt-4' style={{ "zIndex": 1050 }}>
                                                    <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                                                        {/*                                                         <button onClick={() => nextPage()} className="btn btn-primary">
                                                            เริ่มทำได้เลย
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </>
                                        ) : currentStep == 1 ? (
                                            <ProjectInfoFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 2 ? (
                                            <ProjectDocumentFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 3 ? (
                                            <ProjectActivitiesFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 4 ? (
                                            <ProjectExcutionFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 5 ? (
                                            <ProjectAdvisorFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : ''}
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

/* export async function getServerSideProps({ req }) {

    const resCurrentUser = await httpRequest.get({
        url: `/current_user`,
        token: getCookie('token', req)
    });
    if (!resCurrentUser.data.sucess) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    const studentForm = await httpRequest.get({
        url: `https://mbs-register.onrender.com/api/v1/student_forms/${resCurrentUser.data.line_uid}`,
    });
    if (!studentForm.data) {
        return {
            redirect: {
                destination: '/register/student/new',
                permanent: false
            }
        };
    }
    return {
        props: {
            resCurrentUser: resCurrentUser.data,
            studentContent : studentForm.data,
        }
    }
} */


export default ProjectRegisterOverview;

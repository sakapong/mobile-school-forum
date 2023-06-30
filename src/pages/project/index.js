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

    //const isStep01isdone = projectContent.title !== undefined
    //const isStep02isdone = projectContent.documents !== undefined
    //const isStep03isdone = projectContent.activities !== undefined
////
    //console.log("isStep01isdone", isStep01isdone)
    //console.log("isStep02isdone", isStep02isdone)
    //console.log("isStep03isdone", isStep03isdone)

    const formSteps = [
        {
            label: 'หัวข้อโครงงาน',
            slug: 'info',
        },
        {
            label: 'บทที่ 2 เอกสารที่เกี่ยวข้อง',
            slug: 'document',
        },
        {
            label: 'บทที่ 3 วิธีการดำเนินงาน/การทดลอง (ตารางปฏิบัติกิจกรรม)',
            slug: 'activities',
        },
        {
            label: 'บทที่ 3 วิธีการดำเนินงาน/การทดลอง (วัสดุอุปกรณ์และเครื่องมือ วิธีการดำเนินงาน)',
            slug: 'excution',
        },
        {
            label: 'อาจารย์ที่ปรึกษา',
            slug: 'advisor',
        },
    ]

    const initialValues = {
        title: '',
        category: '',
        introduction: '',
        objectives: '',
        expected_outcomes: '',
        documents : '',
        activities: '',
        tools: '',
        procedure: '',
        project_images: '',
        advisor: '',
    };

    const getSuccessClass = (step) => {
        const isStep01isdone = projectContent.title !== null
        const isStep02isdone = projectContent.documents !== null
        const isStep03isdone = projectContent.activities !== null
        const isStep04isdone = projectContent.tools !== null
        const isStep05isdone = projectContent.advisor !== null
        const isSuccess =
            (step === 0 && isStep01isdone) ||
            (step === 1 && isStep02isdone) ||
            (step === 2 && isStep03isdone) ||
            (step === 3 && isStep04isdone) ||
            (step === 4 && isStep05isdone)

        return isSuccess ? 'done' : null
    }

    useEffect(() => {
        const getStudentForm = async () => {
            const studentForm = await httpRequest.get({
                url: `https://mbs-register.onrender.com/api/v1/project_forms/${currentUser.data.line_uid}`,
            });
            console.log("studentForm.data.success", studentForm.data.success)
            if (studentForm.data.success) {
                formikRef.current.setValues(studentForm.data.data)
                const contentValues = formikRef.current.values
                setProjectContent(contentValues)
            } else {
                router.push('/project/new')
            }
        }
        if (currentUser.data.line_uid) {
            getStudentForm()
        }
    }, [])

    const onSubmit = async (values) => {
        try {
            const project = {
                title: values.title,
                category: values.category,
                introduction: values.introduction,
                objectives: values.objectives,
                expected_outcomes: values.expected_outcomes,
                documents: values.documents,
                activities: values.activities,
                tools: values.tools,
                procedure: values.procedure,
                project_images: values.project_images,
                advisor: values.advisor,
            };
            setLoading(true);
            const response = await httpRequest.put({
                url: `https://mbs-register.onrender.com/api/v1/project_forms/${user.line_uid}/`,
                data: project
            });
            console.log("response", response)
            if (response.data.pk) {
                showToast.success('ใบสมัครของท่านได้ทำการส่งเรียบร้อยแล้ว');
                setCurrentStep(0)
                router.push('/project/')
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
                                                                    
                                                                    <span className={`btn-status ${getSuccessClass(index)} `}></span>
                                                                    <div className='flex-1 text-start'>
                                                                        {step.label}
                                                                    </div>
                                                                </button>
                                                            )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className='bg-white fixed-bottom shadow-sm py-4 mt-4' style={{ "zIndex": 1050 }}>
                                                    <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                                                        <button onClick={() => handleSubmit()} className="btn btn-primary disabled">
                                                            ส่งข้อเสนอโครงงาน
                                                        </button>
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

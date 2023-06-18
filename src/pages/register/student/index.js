import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, useFormikContext } from 'formik';
import httpRequest from '@/common/utils/httpRequest';
import useUser from '@/common/hooks/useUser';
import { getCookie } from '@/common/utils/session';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';
import StudentInfoFormComponent from '@/modules/student/components/StudentInfoForm';
import StudentEducationFormComponent from '@/modules/student/components/StudentEducationForm';
import StudentFamilyFormComponent from '@/modules/student/components/StudentFamilyForm';
import StudentParentFormComponent from '@/modules/student/components/StudentParentForm';
import StudentDocumentFormComponent from '@/modules/student/components/StudentDocumentForm';

import showToast from '@/common/utils/showToast';

const StudentRegisterOverview = ({ currentUser }) => {
    const { user } = useUser();
    const router = useRouter();
    const formikRef = useRef();
    const [currentStep, setCurrentStep] = useState(0)
    const [isSaved, setIsSaved] = useState(false)
    const [studentContent, setStudentContent] = useState([])
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
            label: 'ข้อมูลนักเรียน',
            slug: 'info',
        },
        {
            label: 'ข้อมูลการศึกษา',
            slug: 'education',
        },
        {
            label: 'ข้อมูลบิดา-มารดา',
            slug: 'family',
        },
        {
            label: 'ข้อมูลผู้ปกครอง',
            slug: 'parent',
        },
        {
            label: 'หลักฐานการสมัคร',
            slug: 'parent',
        },
    ]

    const initialValues = {
        first_name: studentContent.first_name || '',
        last_name: studentContent.last_name || '',
        id_number: studentContent.id_number || '',
        race: studentContent.race || '',
        nationality: studentContent.nationality || '',
        nationality: studentContent.nationality || '',
        dath_of_birth: studentContent.dath_of_birth || '',
        weight: studentContent.weight || 0,
        height: studentContent.height || 0,
        blood_type: studentContent.blood_type || '',
        disability: studentContent.disability || false,
        disability_description: studentContent.disability_description || '',
        housing_code: studentContent.housing_code || '',
        housing_no: studentContent.housing_no || '',
        housing_moo: studentContent.housing_moo || '',
        housing_road: studentContent.housing_road || '',
        housing_province: studentContent.housing_province || '',
        housing_district: studentContent.housing_district || '',
        housing_tumbol: studentContent.housing_tumbol || '',
        school_name: studentContent.school_name || '',
        school_province: studentContent.school_province || '',
        school_district: studentContent.school_district || '',
        school_tumbol: studentContent.school_tumbol || '',
        school_type: studentContent.school_type || '',
        father_first_name: studentContent.father_first_name || '',
        father_last_name: studentContent.father_last_name || '',
        father_salary: studentContent.father_salary || 0,
        father_date_birth: studentContent.father_date_birth || "",
        father_job: studentContent.father_job || '',
        father_id_number: studentContent.father_id_number || '',
        mother_first_name: studentContent.mother_first_name || '',
        mother_last_name: studentContent.mother_last_name || '',
        mother_salary: studentContent.mother_salary || 0,
        mother_date_birth: studentContent.mother_date_birth || "",
        mother_job: studentContent.mother_job || '',
        mother_id_number: studentContent.mother_id_number || '',
        family_status: studentContent.family_status || '',
        sibling: studentContent.sibling || 0,
        sibling_studying: studentContent.sibling_studying || 0,
        student_under: studentContent.student_under || '',
        parent_first_name: studentContent.parent_first_name || '',
        parent_last_name: studentContent.parent_last_name || '',
        parent_relation: studentContent.parent_relation || '',
        parent_telephone: studentContent.parent_telephone || '',
        parent_date_birth: studentContent.parent_date_birth || "",
        parent_id_number: studentContent.parent_id_number || '',
        parent_job: studentContent.parent_job || '',
        parent_salary: studentContent.parent_salary || 0,
        id_card_student: studentContent.id_card_student || '',
        housing_student: studentContent.housing_student || '',
        transcript: studentContent.transcript || '',
        photograph: studentContent.photograph || '',
        id_card_father: studentContent.id_card_father || '',
        housing_father: studentContent.housing_father || '',
        id_card_mother: studentContent.id_card_mother || '',
        housing_mother: studentContent.housing_mother || '',
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
            const student = {
                first_name: values.first_name,
                last_name: values.last_name,
                id_number: values.id_number,
                race: values.race,
                nationality: values.nationality,
                religion: values.religion,
                dath_of_birth: values.dath_of_birth,
                weight: values.weight,
                height: values.height,
                blood_type: values.blood_type,
                disability: values.disability,
                disability_description: values.disability_description,
                housing_code: values.housing_code,
                housing_no: values.housing_no,
                housing_moo: values.housing_moo,
                housing_road: values.housing_road,
                housing_province: values.housing_province,
                housing_district: values.housing_district,
                housing_tumbol: values.housing_tumbol,
                school_name: values.school_name,
                school_province: values.school_province,
                school_district: values.school_district,
                school_tumbol: values.school_tumbol,
                school_type: values.school_type,
                student_under: values.student_under,
                father_first_name: values.father_first_name,
                father_last_name: values.father_last_name,
                father_salary: values.father_salary,
                father_date_birth: values.father_date_birth || "2000-01-01",
                father_job: values.father_job,
                father_id_number: values.father_id_number,
                mother_first_name: values.mother_first_name,
                mother_last_name: values.mother_last_name,
                mother_salary: values.mother_salary,
                mother_date_birth: values.mother_date_birth || "2000-01-01",
                mother_job: values.mother_job,
                mother_id_number: values.mother_id_number,
                family_status: values.family_status,
                sibling: values.sibling,
                sibling_studying: values.sibling_studying,
                parent_first_name: values.parent_first_name,
                parent_last_name: values.parent_last_name,
                parent_relation: values.parent_relation,
                parent_telephone: values.parent_telephone,
                parent_date_birth: values.parent_date_birth || "2000-01-01",
                parent_id_number: values.parent_id_number,
                parent_job: values.parent_job,
                parent_salary: values.parent_salary,
                id_card_student: values.id_card_student,
                housing_student: values.housing_student,
                transcript: values.transcript,
                photograph: values.photograph,
                id_card_father: values.id_card_father,
                housing_father: values.housing_father,
                id_card_mother: values.id_card_mother,
                housing_mother: values.housing_mother,
            };
            setLoading(true);
            const response = await httpRequest.put({
                url: `https://mbs-register.onrender.com/api/v1/student_forms/${user.line_uid}/`,
                data: student
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
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" isNoneMeta />
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
                                                    <h2 className='mb-4'>กรอกข้อมูลใบสมัครตามรายการดังต่อไปนี้</h2>
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
                                            <StudentInfoFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 2 ? (
                                            <StudentEducationFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 3 ? (
                                            <StudentFamilyFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 4 ? (
                                            <StudentParentFormComponent
                                                previousPage={previousPage}
                                                currentStep={currentStep}
                                            />
                                        ) : currentStep == 5 ? (
                                            <StudentDocumentFormComponent
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


export default StudentRegisterOverview;

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, useFormikContext } from 'formik';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import CustomLink from '@/common/components/CustomLink/components';
import StudentInfoFormComponent from '@/modules/student/components/StudentInfoForm';
import StudentEducationFormComponent from '@/modules/student/components/StudentEducationForm';
import StudentFamilyFormComponent from '@/modules/student/components/StudentFamilyForm';
import StudentParentFormComponent from '@/modules/student/components/StudentParentForm';
import StudentDocumentFormComponent from '@/modules/student/components/StudentDocumentForm';

const StudentRegisterOverview = ({ verifyUser }) => {

    const router = useRouter();
    const formikRef = useRef();
    const [currentStep, setCurrentStep] = useState(0)

    function goToStep(step) {
        setCurrentStep(step + 1)
    }

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
        id_number: "",
        race: "",
        nationality: "",
        religion: "",
        dathOfBirth: "",
        weight: 0,
        height: 0,
        blood_type: "",
        disability: false,
        disability_description: "",
        housing_code: "",
        housing_no: "",
        housing_moo: "",
        housing_road: "",
        housing_province: "",
        housing_district: "",
        housing_tumbol: "",
        school_name: "",
        school_province: "",
        school_district: "",
        school_tumbol: "",
        school_type: "",
        father_first_name: "",
        father_last_name: "",
        father_salary: 0,
        father_date_birth: "",
        father_job: "",
        father_id_number: "",
        mother_first_name: "",
        mother_last_name: "",
        mother_salary: 0,
        mother_date_birth: "",
        mother_job: "",
        mother_id_number: "",
        famity_status: "",
        sibling: 0,
        sibling_studying: 0,
        student_under: "",
        parent_first_name: "",
        parent_last_name: "",
        parent_relation: "",
        parent_telephone: "",
        parent_date_birth: "",
        parent_id_number: "",
        parent_job: "",
        parent_salary: 0,
        id_card_student: "",
        housing_student: "",
        transcript: "",
        photograph: "",
        id_card_father: "",
        housing_father: "",
        id_card_mother: "",
        housing_mother: "",
    };

    const onSubmit = async (values) => {
        try {
            const student = {
                id_number: values.id_number,
                race: values.race,
                nationality: values.nationality,
                religion: values.religion,
                dathOfBirth: values.dathOfBirth,
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
                father_date_birth: values.father_date_birth,
                father_job: values.father_job,
                father_id_number: values.father_id_number,
                mother_first_name: values.mother_first_name,
                mother_last_name: values.mother_last_name,
                mother_salary: values.mother_salary,
                mother_date_birth: values.mother_date_birth,
                mother_job: values.mother_job,
                mother_id_number: values.mother_id_number,
                famity_status: values, famity_status,
                sibling: values.sibling,
                sibling_studying: values.sibling_studying,
                parent_first_name: values.parent_first_name,
                parent_last_name: values.parent_last_name,
                parent_relation: values.parent_relation,
                parent_telephone: values.parent_telephone,
                parent_date_birth: values.parent_date_birth,
                parent_id_number: values.parent_id_number,
                parent_job: values.parent_job,
                parent_salary: values.parent_salary,
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

    return (
        <>
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
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
                                                                <span className='btn-status done'></span>
                                                                {step.label}
                                                            </button>
                                                        )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className='bg-white fixed-bottom shadow-sm py-4 mt-4'>
                                                <div className="d-grid gap-3 col-lg-4 col-md-8 mx-auto px-4">
                                                    <button className="btn btn-primary">
                                                        ส่งข้อมูลใบสมัคร
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : currentStep == 1 ? (
                                        <StudentInfoFormComponent setCurrentStep={setCurrentStep} />
                                    ) : currentStep == 2 ? (
                                        <StudentEducationFormComponent setCurrentStep={setCurrentStep} />
                                    ) : currentStep == 3 ? (
                                        <StudentFamilyFormComponent setCurrentStep={setCurrentStep} />
                                    ) : currentStep == 4 ? (
                                        <StudentParentFormComponent setCurrentStep={setCurrentStep} />
                                    ) : currentStep == 5 ? (
                                        <StudentDocumentFormComponent setCurrentStep={setCurrentStep} />
                                    ) : ''}
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentRegisterOverview;
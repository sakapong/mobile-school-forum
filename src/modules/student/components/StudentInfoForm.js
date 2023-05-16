import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import InputAddress from 'react-thailand-address-autocomplete'
import * as Yup from 'yup';

import InputForm from '@/common/components/InputForm/components';
import RadioForm from '@/common/components/RadioForm/components';
import TextForm from '@/common/components/TextForm/components';
import CustomLink from '@/common/components/CustomLink/components'
import httpRequest from '@/common/utils/httpRequest';
import { setCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import { useSession, signIn, signOut } from "next-auth/react"

const StudentInfoFormComponent = () => {

    const { data: session } = useSession()

    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [province, setProvince] = useState({
        subdistrict: "", // tambon
        district: "", // amphoe
        province: "", // jangwat
        zipcode: "", // postal code
    });

    const formikRef = useRef();
    const buttonRef = useRef(null);



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
    };


    const onSubmit = async (values) => {
        try {
            const user = {
                user_name: values.user_name,
                password: values.password
            };
            setLoading(true);
            const response = await httpRequest.post({
                url: `/users/login`,
                data: user
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


    return (<
        >
        <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <div>
                    <CustomLink
                        href={`/register/student/`}
                        className={`btn btn-link`}
                    >
                        ย้อนกลับ
                    </CustomLink>
                </div>
                <div className="bg-white rounded-16 shadow-sm p-4 mb-4">
                    <h3 className='fw-bold mb-3'>ข้อมูลนักเรียน</h3>
                    <div className="mb-3">
                        <InputForm
                            label="เลขประจำตัวประชาชน"
                            placeholder="เลขประจำตัวประชาชน"
                            id="id_number"
                            name="id_number"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="เชื้อชาติ"
                            placeholder="เชื้อชาติ"
                            id="race"
                            name="race"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="สัญชาติ"
                            placeholder="สัญชาติ"
                            id="nationality"
                            name="nationality"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="ศาสนา"
                            placeholder="ศาสนา"
                            id="religion"
                            name="religion"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="วัน-เดือน-ปี เกิด"
                            placeholder="วัน-เดือน-ปี เกิด"
                            id="dathOfBirth"
                            name="dathOfBirth"
                            type="date"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="น้ำหนัก"
                            placeholder="น้ำหนัก"
                            id="weight"
                            name="weight"
                            type="number"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="ส่วนสูง"
                            placeholder="ส่วนสูง"
                            id="height"
                            name="height"
                            type="number"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="หมู่เลือด"
                            placeholder="หมู่เลือด"
                            id="blood_type"
                            name="blood_type"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <RadioForm
                            label="ไม่พิการ"
                            id="disability_true"
                            name="disability"
                            value="false"
                            errors={errors.error?.message}
                        />
                        <RadioForm
                            label="พิการ"
                            id="disability_false"
                            name="disability"
                            value="true"
                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <TextForm
                            rows={5}
                            placeholder="กรณีพิการ โปรดระบุความพิการ"
                            id="disability_description"
                            name="disability_description"
                            disabled={isLoading ? true : false}
                        />
                    </div>
                </div>
                <div className="bg-white rounded-16 shadow-sm p-4">
                    <h3 className='fw-bold mb-3'>ที่อยู่นักเรียน</h3>
                    <div className="mb-3">
                        <InputForm
                            label="รหัสประจำบ้าน"
                            placeholder="รหัสประจำบ้าน"
                            id="housing_code"
                            name="housing_code"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="เลขที่"
                            placeholder="เลขที่"
                            id="housing_no"
                            name="housing_no"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="หมู่ที่"
                            placeholder="หมู่ที่"
                            id="housing_moo"
                            name="housing_moo"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="ถนน"
                            placeholder="ถนน"
                            id="housing_road"
                            name="housing_road"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="จังหวัด"
                            placeholder="จังหวัด"
                            id="housing_province"
                            name="housing_province"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="อำเภอ"
                            placeholder="อำเภอ"
                            id="housing_district"
                            name="housing_district"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>
                    <div className="mb-3">
                        <InputForm
                            label="ตำบล"
                            placeholder="ตำบล"
                            id="housing_tumbol"
                            name="housing_tumbol"
                            type="text"

                            errors={errors.error?.message}
                        />
                    </div>

                </div>
                <div className='bg-white rounded-16 shadow-sm p-4 mt-4'>
                    <div className="d-grid gap-3 col-12 mx-auto">
                        {isLoading ? (
                            <button ref={buttonRef} type="submit" className="btn btn-primary" disabled>
                                <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                                บันทึกข้อมูล
                            </button>
                        ) : (
                            <button ref={buttonRef} type="submit" className="btn btn-primary">
                                บันทึกข้อมูล
                            </button>
                        )}

                    </div>
                </div>

            </Form>
        </Formik>
    </>
    );
};

export default StudentInfoFormComponent;
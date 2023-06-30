import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import ProjectFormBase from './ProjectFormBase';


import { useSession, signIn, signOut } from "next-auth/react"

const ProjectActivitiesFormComponent = ({ isLoading, previousPage, currentStep }) => {

    const initialProjectActivitiesContent = `<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 16.5663%;"><col style="width: 16.5663%;"><col style="width: 16.5663%;"><col style="width: 16.5663%;"><col style="width: 16.5663%;"><col style="width: 16.5663%;"></colgroup>
    <tbody>
    <tr>
    <th style="text-align: center; vertical-align: middle;">สัปดาห์ที่</th>
    <th style="text-align: center; vertical-align: middle;">กิจกรรมที่ปฏิบัติ</th>
    <th style="text-align: center; vertical-align: middle;">สถานที่ทำกิจกรรม</th>
    <th style="text-align: center; vertical-align: middle;">ผู้รับผิดชอบ</th>
    <th style="text-align: center; vertical-align: middle;">เริ่มต้นปฏิบัติงาน</th>
    <th style="text-align: center; vertical-align: middle;">สิ้นสุดปฏิบัติงาน</th>
    </tr>
    <tr>
    <td style="text-align: center; vertical-align: middle;">1</td>
    <td style="text-align: left; vertical-align: top;">ศึกษาค้นคว้าหาข้อมูล</td>
    <td style="text-align: left; vertical-align: top;">โรงเรียนมือถือ จังหวัดนครพนม</td>
    <td style="text-align: left; vertical-align: top;">คุณครูชื่อจริง นามสกุลจริง</td>
    <td style="vertical-align: top; text-align: center;">1 กรกฎาคม 2566</td>
    <td style="vertical-align: top; text-align: center;">7 กรกฎาคม 2566</td>
    </tr>
    <tr>
    <td style="text-align: center; vertical-align: middle;">2</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
    <td style="text-align: center; vertical-align: middle;">3</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
    <td style="text-align: center; vertical-align: middle;">4</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    </tr>
    <tr>
    <td style="text-align: center; vertical-align: middle;">5</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="text-align: left; vertical-align: top;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    <td style="vertical-align: top; text-align: center;">&nbsp;</td>
    </tr>
    </tbody>
    </table>`
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
                    name: 'activities',
                    label: '',
                    required: true,
                    type: 'editor',
                    initial: initialProjectActivitiesContent,
                }
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
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
                    name: 'documents',
                    label: '',
                    required: true,
                    type: 'editor',
                    initial: `
                    <h2><strong>ชื่อหัวข้อที่ศึกษา</strong></h2>
                    <h3>ข้อมูลที่ได้</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <h3>สรุป</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <h3>แหล่งที่มา</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <h2><strong>ชื่อหัวข้อที่ศึกษา</strong></h2>
                    <h3>ข้อมูลที่ได้</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <h3>สรุป</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <h3>แหล่งที่มา (วางlink หรือชื่อหนังสือ ผู้แต่ง)</h3>
                    <p>เนื้อหาาาาาาา</p>
                    <p><em>ตัวอย่างและแนวทางการเขียนแหล่งที่มา</em></p>
                    <p>
                        สถาบันส่งเสริมการสอนวิทยาศาสตร์และเทคโนโลยีกระทรวงศึกษาธิการ.(2557). 
                        <strong>พลศาสตร์ของไหลหนังสือเรียนวิชาฟิสิกส์ 4 ว029.</strong> (หน้า33-34).
                        กรุงเทพมหานคร : โรงพิมพ์คุรุสภาลาดพร้าว, 2554.
                    </p>
                    <p>
                        ณัฐพล ภูษาและฐิติกร คาวัง. (2555). <strong>เรือสะเทินน้ำสะเทินบก.</strong> (ออนไลน์). เข้าถึงได้จาก : https://app.enit.kku.ac.th/mis/administrator/doc_upload/20130304165755.pdf. (วันที่สืบค้น : 13 กุมภาพันธ์ 2558).
                    </p>
                    <p>
                        ยอโกะ กิตะกะมิ และคณะ. (2558). <strong>การศึกษาการแพร่ของอากาศโดยลูกโป่งสองใบ.</strong> วิชาระเบียบวิจัย ว30291 โครงการพิเศษห้องเรียนวิทยาศาสตร์ คณิตศาสตร์ เทคโนโลยี และ สิ่งแวดล้อม โรงเรียนปทุมเทพวิทยาคาร.
                    </p>
                    <p>
                        Brian R. (2007). <strong>Air-layer Induced Skin-frictionDrag Reduction.</strong>
                    [homepage on the Internet]. [cited 2015 Feb.14].Available from:http://sitemaker.umich.edu/belbing/files/aldr_rev1.pdf.
                    </p>
                `
                }
/*                 {
                    name: 'document_topic',
                    label: 'หัวข้อที่ค้นหาเพื่อศึกษา',
                    required: true,
                    type: 'text'
                },
                {
                    name: 'document_output',
                    label: 'ข้อมูลที่ได้',
                    required: true,
                    type: 'editor'
                },
                {
                    name: 'document_summary',
                    label: 'สรุป',
                    required: true,
                    type: 'editor'
                },
                {
                    name: 'document_resource',
                    label: 'แหล่งที่มา (วางlink หรือชื่อหนังสือ ผู้แต่ง)',
                    required: true,
                    type: 'editor'
                }, */
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
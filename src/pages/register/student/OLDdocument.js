import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import StudentDocumentFormComponent from '@/modules/student/components/StudentDocumentForm';

const StudentDocument = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <StudentDocumentFormComponent />
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentDocument;
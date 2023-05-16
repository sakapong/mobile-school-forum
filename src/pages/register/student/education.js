import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import StudentEducationFormComponent from '@/modules/student/components/StudentEducationForm';

const StudentEducation = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="Thank you for Checkin" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <StudentEducationFormComponent />
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentEducation;
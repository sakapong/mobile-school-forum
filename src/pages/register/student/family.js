import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import StudentFamilyFormComponent from '@/modules/student/components/StudentFamilyForm';

const StudentFamily = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="Thank you for Checkin" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <StudentFamilyFormComponent />
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentFamily;
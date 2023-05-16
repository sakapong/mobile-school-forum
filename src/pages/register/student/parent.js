import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import StudentParentFormComponent from '@/modules/student/components/StudentParentForm';

const StudentParent = ({ verifyUser }) => {

    return (
        <>
            <MetaWebsite title="ใบสมัครโรงเรียนมือถือ" isNoneMeta />
            <LayoutComponent>
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 mx-auto">
                            <StudentParentFormComponent />
                        </div>
                    </div>
                </div>
            </LayoutComponent>
        </>
    );
};

export default StudentParent;
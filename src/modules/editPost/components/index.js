import React, { useState } from 'react';

import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import useUser from '@/common/hooks/useUser';
import EditPostFormComponent from '@/modules/editPost/components/editPostForm';
import style from '@/modules/editPost/styles/style.module.scss';
import SideBarRightNewPostComponent from '@/modules/newPost/components/sideBarRightNewPost';

const EditPostComponent = ({ editPost }) => {
	const { user } = useUser();
	const [isPreview, setIsPreview] = useState(false);

	return (
		<div className="container-xl py-4">
			{!user ? (
				<LoadingSpinner />
			) : (
				<div className="row g-0">
					<div className="col-lg-6 col-md-8 mx-auto">
						<div className="d-flex align-items-center mb-3">
							<ul className="ms-auto nav nav-pills">
								<li className="nav-item">
									<button
										className={`border-0  py-1 px-3 text-dark ${style.nav_link} ${!isPreview && style.active}`}
										onClick={() => setIsPreview(false)}
									>
										แก้ไข
									</button>
								</li>
								<li className="nav-item">
									<button
										className={`border-0  py-1 px-3 text-dark ${style.nav_link} ${isPreview && style.active}`}
										onClick={() => setIsPreview(true)}
									>
										ดูตัวอย่าง
									</button>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-12">
								<EditPostFormComponent editPost={editPost} isPreview={isPreview} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditPostComponent;

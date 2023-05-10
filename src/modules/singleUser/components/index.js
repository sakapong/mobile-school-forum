import Link from 'next/link';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaEllipsisH, FaHashtag, FaRegComment, FaRegHeart, FaRegEdit } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { GrArticle } from 'react-icons/gr';

import ListCategoryComponent from '@/modules/layout/components/sidebarRight/components/listCategory/components';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import EditProfileButtonComponent from '@/modules/singleUser/components/editProfileButton';
import FollowUserButtonComponent from '@/modules/singleUser/components/followUserButton';
import ListPostUserComponent from '@/modules/singleUser/components/listPostUser';
import timeFormat from '@/common/utils/timeFormat';
import style from '@/modules/singleUser/styles/style.module.scss';

import TabHorizontalComponent from '@/common/components/TabHorizontal/components';

import ProgressBar from 'react-bootstrap/ProgressBar';


const SingleUserComponent = ({ singleUser, listPostUser }) => {
	const { user } = useUser();
	const [activeTab, setActiveTab] = useState(1)

	const handleChangeTab = (tabIndex) => {
		setActiveTab(tabIndex)
	}
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-12 mb-4">
					<div className={`text-left bg-light rounded-16 shadow-sm px-4 pb-4 pt-4 ${style.info__user} cover-b bg-white`}>
						<div>
							<div className={`position-relative mb-2 ${style.avt}`}>
								<span className="d-inline-flex p-3 rounded-circle">
									<CustomImage
										src={`${process.env.IMAGES_URL}/${singleUser.data?.avatar}`}
										alt={singleUser.data?.user_name}
										className="avatar rounded-circle"
										width="133"
										height="133"
									/>
								</span>
								{singleUser.data?.user_name !== user?.user_name && (
									<div className={`d-flex d-none position-absolute ${style.more__user}`}>
										<OverlayTrigger
											trigger="click"
											key="options-single-user"
											placement="left"
											rootClose
											overlay={
												<Popover id={`popover-positioned-options-single-user`}>
													<Popover.Header as="h3" className="text-center">
														Options
													</Popover.Header>
													<Popover.Body className="p-0">
														<CustomLink href="/report_abuse" className="d-flex align-items-center dropdown-item">
															<GoReport className="me-1" />
															Report abuse
														</CustomLink>
													</Popover.Body>
												</Popover>
											}
										>
											<button type="button" className="d-flex align-items-center p-0 border-0 bg-transparent">
												<FaEllipsisH className="h4 mb-0" />
											</button>
										</OverlayTrigger>
									</div>
								)}
							</div>
							<h4 className="text-break mb-1 fw-bold" style={{ fontSize: "24px" }}>
								{singleUser.data?.first_name} {singleUser.data?.last_name}
							</h4>
							<h6 className="text-break mb-3 d-none">
								@{singleUser.data?.user_name}
							</h6>
							<div className="mt-1">
								{singleUser.data?.total_user_followers} <span className="text-secondary">followers</span> ·{' '}
								{singleUser.data?.total_following_users} <span className="text-secondary">following</span>
							</div>
							{user && singleUser.data?.user_name === user?.user_name && (
								<div className="mt-2">
									<CustomLink className="link-secondary" href={`/settings`}>
										<button class="btn btn-success"><FaRegEdit size={18} /> แก้ไขโปรไฟล์</button>
									</CustomLink>
								</div>
							)}
							{singleUser.data?.user_name !== user?.user_name && (
								<div className="d-flex ">
									<FollowUserButtonComponent
										user_name={singleUser.data?.user_name}
										following={singleUser.data?.following}
									/>
								</div>
							)}
						</div>
						<div className="mt-1" style={{ clear: "both" }}>
							<h3 className='fw-bold mb-3'>ระดับชั้นปัจจุบัน</h3>
							<ProgressBar>
								<ProgressBar striped variant="primary" now={35} key={1} animated label="ม.1" />
								{/* <ProgressBar variant="warning" now={20} key={2} animated label="ม.2" />
					      <ProgressBar striped variant="danger" now={10} animated key={3} label="ม.3" />*/}
							</ProgressBar>
						</div>
					</div>
				</div>
				<div className="col-lg-12 col-md-12 mb-10 mb-md-0">
					<div className='text-left bg-light rounded-16 shadow-sm px-4 pb-3 pt-3 bg-white'>
						<ul className="nav nav-pills">
							<li className="nav-item">
								<a
									className={`btn btn-outline-primary ${activeTab == 1 ? 'active' : ''} me-2`}
									aria-current="page"
									onClick={() => handleChangeTab(1)}
								>
									โปรไฟล์
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`btn btn-outline-primary ${activeTab == 2 ? 'active' : ''} me-2`}
									onClick={() => handleChangeTab(2)}
								>
									ผลงาน
								</a>
							</li>
							<li className="nav-item">
								<a
									className={`btn btn-outline-primary ${activeTab == 3 ? 'active' : ''} me-2`}
									onClick={() => handleChangeTab(3)}
								>
									ความสำเร็จ
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-12 col-md-12 mt-4 mb-4 mb-md-0">
					{activeTab === 1 && (
						<ul className="wapper__card list-group rounded-16 shadow-sm">
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<GrArticle className="me-1" />
								<span>{singleUser.data?.total_posts} ผลงาน</span>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<GrArticle className="me-1" />
								<span>0 EXP (ค่าประสบการณ์)</span>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<FaRegComment className="me-1" />
								<span>{singleUser.data?.total_comments} แสดงความคิดเห็น</span>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<FaRegHeart className="me-1" />
								<span>{singleUser.data?.total_favorited} โพสต์ที่ชื่นชอบ</span>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<FaHashtag className="me-1" />
								<span>{singleUser.data?.total_tags_followed} Hashtag ที่ติดตาม</span>
							</li>
						</ul>
					)}
					{activeTab === 2 && (<ListPostUserComponent listPostUser={listPostUser} />)}
					{activeTab === 3 && (<>
						<ul className="wapper__card list-group rounded-16 shadow-sm">
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<div>
									<CustomImage
										src={`/images/nft-rank-01.png`}
										className="rounded-circle h-100 w-100 badge-profile"
										width={64}
										height={64}
										layout="fixed"
									/>
								</div>
								<div className='flex-1'>
									<h3 className='ms-3 mb-3 fw-bold'>เข้าเรียนอย่างต่อเนื่อง 1 สัปดาห์</h3>
									<div className="ms-3">
										<ProgressBar striped variant="primary" now={10} key={1} animated label="1/10" />
									</div>
								</div>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<div>
									<CustomImage
										src={`/images/nft-rank-02.png`}
										className="rounded-circle h-100 w-100 badge-profile"
										width={64}
										height={64}
										layout="fixed"
									/>
								</div>
								<div className='flex-1'>
									<h3 className='ms-3 mb-3 fw-bold'>ผู้เริ่มต้นลงมือทำ</h3>
									<div className="ms-3">
										<ProgressBar striped variant="primary" now={20} key={1} animated label="2/10" />
									</div>
								</div>
							</li>
							<li className="list-group-item d-flex flex-wrap align-items-center">
								<div>
									<CustomImage
										src={`/images/nft-rank-03.png`}
										className="rounded-circle h-100 w-100 badge-profile"
										width={64}
										height={64}
										layout="fixed"
									/>
								</div>
								<div className='flex-1'>
									<span className='ms-3 mb-3 fw-bold'>ผู้บรรลุเป้าหมายขั้นต้น (ชิม)</span>
									<div className="ms-3">
										<ProgressBar striped variant="primary" now={80} key={1} animated label="8/10" />
									</div>
								</div>
							</li>

						</ul>
					</>)}
				</div>
			</div>
		</div>
	);
};

export default SingleUserComponent;

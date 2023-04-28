import Link from 'next/link';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaEllipsisH, FaHashtag, FaRegComment, FaRegHeart } from 'react-icons/fa';
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
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-12 mb-4">
					<div className={`text-left bg-light rounded-16 shadow-sm px-4 pb-4 pt-4 ${style.info__user} cover-bg`}>
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
						<h4 className="text-break mb-1 fw-bold" style={{fontSize : "24px"}}>
							@{singleUser.data?.user_name}
						</h4>
						<h6 className="text-break mb-3">
							{singleUser.data?.first_name} {singleUser.data?.last_name}
						</h6>


						{singleUser.data?.biography && <p className="text-break mb-4">{singleUser.data?.biography}</p>}
						{user && singleUser.data?.user_name === user?.user_name && (
							<div>
								<EditProfileButtonComponent />
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
						<div className="mt-1">
							{singleUser.data?.total_user_followers} <span className="text-secondary">followers</span> ·{' '}
							{singleUser.data?.total_following_users} <span className="text-secondary">following</span>
						</div>
						<div className="mt-1">
							ระดับชั้นปัจจุบัน มัธยมศึกษาปีที่ 1
							<ProgressBar>
					      <ProgressBar striped variant="#00A8C9" now={35} key={1} animated label="ม.1" />
					     {/* <ProgressBar variant="warning" now={20} key={2} animated label="ม.2" />
					      <ProgressBar striped variant="danger" now={10} animated key={3} label="ม.3" />*/}
					    </ProgressBar>
						</div>
					</div>
				</div>
				<div className="col-lg-12 col-md-12 mb-10 mb-md-0">
					<TabHorizontalComponent

									items={[
										{
											title: 'โปรไฟล์',
											slug: 'a1',
											href: `#a1`
										},
										{
											title: 'ความสำเร็จ',
											slug: 'a3',
											href: `#a3`
										},
										{
											title: 'ผลงาน',
											slug: 'a2',
											href: `#a2`
										},
										
									]}
								/>
				</div>
				<div className="col-lg-4 col-md-4 mb-4 mb-md-0">
								{/*<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="a1" role="tabpanel" aria-labelledby="home-tab">1</div>
  <div class="tab-pane fade" id="a2" role="tabpanel" aria-labelledby="profile-tab">2</div>
  <div class="tab-pane fade" id="a3" role="tabpanel" aria-labelledby="contact-tab">3</div>
</div>*/}

					{/*<h4>สถิติ</h4>*/}
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
					<h4 className="mt-4">ความสำเร็จ</h4>
					<ul className="wapper__card list-group rounded-16 shadow-sm">
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<CustomImage
								src={`/images/nft-rank-01.png`}
								className="rounded-circle h-100 w-100 badge-profile"
								width={64}
								height={64}
								layout="fixed"
							/>
							<span className='ms-3'>เข้าเรียนอย่างต่อเนื่อง 1 สัปดาห์</span>
							<div className="col-lg-12 mt-2">
							<ProgressBar striped variant="success" now={100} key={1} animated label="1/10" />
							</div>
						</li>
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<CustomImage
								src={`/images/nft-rank-02.png`}
								className="rounded-circle h-100 w-100 badge-profile"
								width={64}
								height={64}
								layout="fixed"
							/>
							<span className='ms-3'>ผู้เริ่มต้นลงมือทำ</span>
							<div className="col-lg-12 mt-2">
								<ProgressBar striped variant="success" now={100} key={1} animated label="1/10" />
							</div>
						</li>
						<li className="list-group-item d-flex flex-wrap align-items-center">
						
							<CustomImage
								src={`/images/nft-rank-03.png`}
								className="rounded-circle h-100 w-100 badge-profile"
								width={64}
								height={64}
								layout="fixed"
							/>
							<span className='ms-3'>ผู้บรรลุเป้าหมายขั้นต้น (ชิม)</span>
							<div className="col-lg-12 mt-2">
								<ProgressBar striped variant="success" now={100} key={1} animated label="1/10" />
							</div>
						</li>

					</ul>
				</div>
				<div className="col-lg-8 col-md-8">
					<ListPostUserComponent listPostUser={listPostUser} />
				</div>
			</div>
		</div>
	);
};

export default SingleUserComponent;

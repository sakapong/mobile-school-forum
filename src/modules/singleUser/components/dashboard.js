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
import ListPostUserTableComponent from '@/modules/singleUser/components/listPostUserTable';
import timeFormat from '@/common/utils/timeFormat';
import style from '@/modules/singleUser/styles/style.dashboard.module.scss';

import UserTagListComponent from '@/modules/singleUser/components/userTagList';


const SingleUserDashboardComponent = ({ singleUser, listPostUser, listTagUser }) => {
    const { user } = useUser();
    console.log("singleUser", singleUser.data);
    console.log("listTagUser", listTagUser.data);
    return (
        <div className="container-xl py-4">
			<div className="row">
				<div className="col-9 mb-4">
					<div className={`text-left bg-light rounded-16 shadow-sm  ${style.info__user} cover-bg`}>
						<div className={`position-relative mb-2  ${style.avt} ${style.cover_bg}`}>
							<span className="d-inline-flex p-3 rounded-circle">
								<CustomImage
									src={`/images/user-icon.jpg`}
									alt={singleUser.data?.user_name}
									className="avatar rounded-circle"
									width="133"
									height="133"
								/>
							</span>
							{user && singleUser.data?.user_name === user?.user_name && (
								<div className={`${style.edit_btn}`}>
									<EditProfileButtonComponent />
								</div>
							)}

							{singleUser.data?.user_name !== user?.user_name && (
								<div className={`d-flex position-absolute ${style.more__user}`}>
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
						<div className="px-4 pb-4 pt-4" style={{    background: '#fff'}}>
							<h4 className="text-break mb-1 float-left">
								@{singleUser.data?.user_name} 
							</h4>
							{singleUser.data?.user_name !== user?.user_name && (
								<div className="d-flex ">
									<FollowUserButtonComponent
										user_name={singleUser.data?.user_name}
										following={singleUser.data?.following}
									/>
								</div>
							)}
							<p className="text-break text-secondary mb-2">{singleUser.data?.role.title}</p>
							<p className="text-break text-secondary mb-2">{singleUser.data?.address}</p>
							<p className="text-break text-secondary mb-2">Member since {timeFormat(singleUser.data?.created_at)}</p>
							{singleUser.data?.biography && (
								<div className="card">
									<div className="card-body">
										{singleUser.data?.biography}
									</div>
								</div>
							)}
							
							<div className="mt-1">
								{singleUser.data?.total_user_followers} <span className="text-secondary">followers</span> ·{' '}
								{singleUser.data?.total_following_users} <span className="text-secondary">following</span>
							</div>

					<div className="mb-3">
					<h4>Top hastags</h4>
					<UserTagListComponent tags={listTagUser.data} />
					</div>
						  	<div className="card mb-3 stats" >
								  <div className="card-header sb-card-header">Stats</div>
								  <div className={`card-body ${style.bg_blue}`}>
								  	<div className="row">
								  		<div className="col-lg-3">
										  	<div className="card">
													<div className="card-body text-center">
														<p className={`${style.stat_icon}`}><img src="/images/dashboard/case-task-icon.png" /></p>
														<span className={`stat-text ${style.stat_text}`}>{singleUser.data?.total_posts}</span>
														<p className="stat-label">Cases</p>
													</div>
												</div>
											</div>
											<div className="col-lg-3">
										  	<div className="card">
										  		<div className="card-body text-center">
										  			<p className={`${style.stat_icon}`}><img src="/images/dashboard/case-score-icon.png" /></p>
														<span className={`stat-text ${style.stat_text}`}>{(singleUser.data?.total_comments/singleUser.data?.total_posts).toFixed(2)}</span>
													
														<p className="stat-label">Score</p>
													</div>
													</div>
									
											</div>
											<div className="col-lg-3">
										  	<div className="card">
													<div className="card-body text-center">
														<p className={`${style.stat_icon}`}><img src="/images/dashboard/case-comment-icon.png" /></p>
														<span className={`stat-text ${style.stat_text}`}>{singleUser.data?.total_comments}</span>
													
														<p className="stat-label">Cases</p>
													</div>
												</div>
											</div>
											<div className="col-lg-3">
										  	<ListCategoryComponent />
											</div>
										</div>
								    
								  </div>
								</div>
								<div className="card mb-3 badges" >
								  <div className="card-header sb-card-header">Badges</div>
								  <div className={`card-body ${style.bg_blue}`}>
								  	<div className="row">
								  		<div className="col-lg-4">
										  	<div className="card">
													<div className="card-body text-center">
														<p className={`badge-icon`}><img src="/images/dashboard/badge-1.png" /></p>
														<span className={`badge-text-1`}>12</span>
														<p className="stat-label">Badges</p>
													</div>
												</div>
											</div>
											<div className="col-lg-4">
										  	<div className="card">
										  		<div className="card-body text-center">
										  		<p className={`badge-icon`}><img src="/images/dashboard/badge-2.png" /></p>
														<span className={`badge-text-2`}>13</span>
										
														<p className="stat-label">Badges</p>
											
													</div>
												</div>
											</div>
											<div className="col-lg-4">
										  	<div className="card">
													<div className="card-body text-center">
														<p className={`badge-icon`}><img src="/images/dashboard/badge-3.png" /></p>
														<span className={`badge-text-3`}>14</span>
													
														<p className="stat-label">Badges</p>
													</div>
												</div>
											</div>
										
										</div>
								    
								  </div>
								</div>
								<div className="card mb-3 tasks" >
								  <div className="card-header sb-card-header">Tasks</div>
								  <ListPostUserTableComponent listPostUser={listPostUser} />
								  
								</div>
						  
				
						</div>
						</div>
				</div>
			</div>
		</div>
    );
};

export default SingleUserDashboardComponent;
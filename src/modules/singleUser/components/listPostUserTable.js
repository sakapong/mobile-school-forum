import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import PostCardComponent from '@/modules/postCard/components';
import CustomLink from '@/common/components/CustomLink/components';
import TabHorizontal from '@/common/components/TabHorizontal/components';

import timeFormat from '@/common/utils/timeFormat';

const ListPostUserTableComponent = ({ listPostUser }) => {
	console.log("listPostUser",listPostUser);
	let randomJUTC = "10,000";
	let admin = 'admin';
	return (
		<>
			<h4 className="mb-3"></h4>
			<TabHorizontal
								pidTab={1}
								items={[
									{
										title: 'All',
										slug: 'all',
										href: `/u/${admin}/dashboard/`
									},
									{
										title: 'Dispute',
										slug: 'disute',
										href: `/u/${admin}/dashboard/?category=2`
									},
									{
										title: 'Crime Report',
										slug: 'crime-report',
										href: `/u/${admin}/dashboard/?category=3`
									},
									{
										title: 'Bounty Hunting',
										slug: 'bounty-hunting',
										href: `/u/${admin}/dashboard/?category=4`
									},
									{
										title: 'Data Sales',
										slug: 'data-sales',
										href: `/u/${admin}/dashboard/?category=5`
									}
								]}
							/>
			{isEmpty(listPostUser.data) ? (
				<EmptyBoxComponent text="ยังไม่มีผลงานนักเรียน" />
			) : (
				<div className="">
				<table className="table">
  <thead>
    <tr className="sb">
      <th scope="col">Topics</th>
      <th scope="col">Author</th>
      <th scope="col">Date</th>
      <th scope="col">Rewards</th>
    </tr>
  </thead>
  <tbody>
    

					{listPostUser.data?.map((post) => (
						
							<tr  key={post.id}>
					      <th scope="row">
					      <span className="badge btn-badge float-left">{post.category.title}</span>
					      <CustomLink
						href={`/u/${post.user.user_name}/${post.slug}`}
						className={`text-decoration-none text-dark card-title mb-2 d-block `}
					>{post.title}</CustomLink></th>
					      <td><CustomLink
								href={`/u/${post.user.user_name}`}
								className="text-decoration-none d-inline-block d-flex align-items-center"
							>{post.user.user_name}</CustomLink></td>
					      <td>{timeFormat(post.published_at)}</td>
					      <td>{randomJUTC} JUTC</td>
					    </tr>
					    
						
					))}
					  </tbody>
					</table>
				</div>
			)}
			<Pagination total={listPostUser.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_USER} />
		</>
	);
};

export default ListPostUserTableComponent;

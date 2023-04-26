import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CustomLink from '@/common/components/CustomLink/components';
import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import ListPostMetaComponent from '@/modules/dashboardUser/components/listPostMeta';
import TabHorizontalComponent from '@/common/components/TabHorizontal/components';


const ListPostComponent = ({ listPost }) => {
	const router = useRouter();
	const [search, setSearch] = useState(router.query?.q || '');

	const onSearchSubmit = (e) => {
		e.preventDefault();
		try {
			router.push(`/search?q=${search}${router.query?.type ? `&type=${router.query?.type}` : ''}`);
		} catch (error) {
			showToast.error();
		}
	};

	const handleChangeSearch = (event) => {
		setSearch(event.target.value);
	};

	return (
		<>

			<h4 className="mb-3">Tasks ({listPost?.meta?.total})</h4>
			{isEmpty(listPost.data) ? (
				<EmptyBox text="Empty post (ListPostComponent)" />
			) : (
			
				<div className="row row-cols-1 g-3 mb-3">
				<div className="col">
					<TabHorizontalComponent

									items={[
										{
											title: 'All',
											slug: 'latest',
											href: `#`
										},
										{
											title: 'Dispute',
											slug: 'latest',
											href: `#`
										},
										{
											title: 'Approve',
											slug: 'oldest',
											href: `#`
										},
										{
											title: 'Rejected',
											slug: 'oldest',
											href: `#`
										}
									]}
								/>
								<div className="align-items-md-center">
						<form className="form-inline py-md-0 py-2" onSubmit={onSearchSubmit}>
								<input
									placeholder="ค้นหา"
									type="text"
									value={search}
									onChange={handleChangeSearch}
									className="form-control w-100 none"
								/>
							</form>
							</div>
					</div>
					{listPost.data.map((post) => (
						<div className="col" key={post.id}>
							<div className="wapper__card d-flex bg-light rounded-16 shadow-sm p-3 flex-column flex-sm-row">
								<div className="d-flex align-items-center me-auto me-1 mb-1 mb-sm-0">
									<CustomLink
										href={`/u/${post.user.user_name}/${post.slug}`}
										className={`text-decoration-none text-dark card-title mb-0 d-block`}
									>
										<h6 className="fw-bold mb-0">{post.title}</h6>
									</CustomLink>
								</div>
								<div className="d-flex align-items-center ms-auto ms-sm-0">
									<ListPostMetaComponent postSlug={post.slug} userName={post.user.user_name} />
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<Pagination total={listPost?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListPostComponent;

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingPost from '@/common/components/LoadingPost/components';
import TabHorizontal from '@/common/components/TabHorizontal/components';
import TabVertical from '@/common/components/TabVertical/components';
import useUser from '@/common/hooks/useUser';
import showToast from '@/common/utils/showToast';

import ListCommentComponent from '@/modules/search/components/listComment';
import ListPostComponent from '@/modules/search/components/listPost';
import ListTagComponent from '@/modules/search/components/listTag';
import ListUserComponent from '@/modules/search/components/listUser';

const SearchComponent = () => {
    const { user } = useUser();
	// const { query } = useRouter();
	const router = useRouter();
	const [search, setSearch] = useState(router.query?.q || '');
	const q = router.query?.q || '';

	const type = router.query?.type || 'post';
	const sort = router.query?.sort === 'latest' ? 'desc' : router.query?.sort === 'oldest' ? 'asc' : 'desc';

	const { data: listSearch, error } = useSWR(
		`/search?offset=0&limit=${process.env.LIMIT_PAGE.LIST_POST_HOME}&search_fields=${q}&type=${type}&sort_direction=${sort}`,
		{
			revalidateOnFocus: false
		}
	);

	const onSearchSubmit = (e) => {
		e.preventDefault();
		setSearch(search);
		try {
			let url = `/search?q=${search}${type ? `&type=${type}` : ''}`;
			console.log("searchUrl",url);
			router.push(url);
		} catch (error) {
			showToast.error();
		}
	};

	const handleChangeSearch = (event) => {
		setSearch(event.target.value);
	};
    

    return (
        <div className="container-xl py-4">
			<h3 className="mb-4 fw-bold">ผลการค้นหา: {q}</h3>
			<div className="row">
				<div className="col-lg-3 mb-4">
					<form className="form-inline py-md-0 py-2 mb-2" onSubmit={onSearchSubmit}>
								<input
									placeholder="ค้นหา"
									type="text"
									value={search}
									onChange={handleChangeSearch}
									className="form-control w-100"
								/>
							</form>
					<TabHorizontal
						pidTab={type}
						items={[
							{
								title: 'ผลงานของเพื่อน',
								slug: 'post',
								href: `/search?q=${q}&type=post`
							},
							
							// {
							// 	title: 'ความคิดเห็น',
							// 	slug: 'comment',
							// 	href: `/search?q=${q}&type=comment`
							// },
							// {
							// 	title: 'Hashtag',
							// 	slug: 'tag',
							// 	href: `/search?q=${q}&type=tag`
							// },
							user
								? {
										title: 'ผลงานของฉัน',
										slug: 'my_post',
										href: `/search?q=${q}&type=my_post`
								  }
								: {},


							user
								?	{
								title: 'เพื่อน',
								slug: 'user',
								href: `/search?q=${q}&type=user`
							} : {}
						]}
					/>
				</div>
				<div className="col-lg-9">
					<div className="d-flex align-items-center mb-3">
						<div className="ms-auto d-none">

							<TabHorizontal
								className=""
								pidTab={router.query?.sort}
								items={[
									{
										title: 'ชิม',
										slug: 'upvote',
										href: `/search?q=${q}&type=${type}&sort=latest`
									},
									{
										title: 'ชอบ',
										slug: 'recommended',
										href: `/search?q=${q}&type=${type}&sort=latest`
									},
									{
										title: 'โชคโชน',
										slug: 'relavance',
										href: `/search?q=${q}&type=${type}&sort=latest`
									},
									{
										title: 'เชี่ยวชาญ',
										slug: 'score',
										href: `/search?q=${q}&type=${type}&sort=latest`
									},
									// {
									// 	title: 'ล่าสุด',
									// 	slug: 'latest',
									// 	href: `/search?q=${q}&type=${type}&sort=latest`
									// },
									// {
									// 	title: 'เก่าสุด',
									// 	slug: 'oldest',
									// 	href: `/search?q=${q}&type=${type}&sort=oldest`
									// }
								]}
							/>
						</div>
					</div>
					{!error?.response?.data?.success && error?.response?.data?.error?.status === 422 ? (
						<EmptyBoxComponent text="Please enter a search keyword" />
					) : (
						<>
							{(type === 'post' || (type === 'my_post' && user)) && <ListPostComponent listPost={listSearch} />}
							{type === 'tag' && <ListTagComponent listTag={listSearch} />}
							{type === 'user' && <ListUserComponent listUser={listSearch} />}
							{type === 'comment' && <ListCommentComponent listComment={listSearch} />}
						</>
					)}
				</div>
			</div>
		</div>
    );
};

export default SearchComponent;
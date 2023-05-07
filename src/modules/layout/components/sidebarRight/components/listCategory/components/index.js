import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import style from '@/modules/layout/components/sidebarRight/components/listCategory/styles/style.module.scss';

const ListCategoryComponent = () => {
	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	// const {data:listCategory} = {"success":true,"data":[{"id":1,"title":"Developer","slug":"developer","created_at":"2020-10-25T07:25:04.000000Z","updated_at":"2020-10-25T07:25:04.000000Z","total_posts":20},{"id":2,"title":"Software","slug":"software","created_at":"2020-10-25T07:25:04.000000Z","updated_at":"2020-10-25T07:25:04.000000Z","total_posts":20},{"id":3,"title":"Hacking","slug":"hacking","created_at":"2020-10-25T07:25:04.000000Z","updated_at":"2020-10-25T07:25:04.000000Z","total_posts":10},{"id":4,"title":"Tools","slug":"tools","created_at":"2020-10-25T07:25:04.000000Z","updated_at":"2020-10-25T07:25:04.000000Z","total_posts":16},{"id":5,"title":"Books","slug":"books","created_at":"2020-10-25T07:25:04.000000Z","updated_at":"2020-10-25T07:25:04.000000Z","total_posts":0}],"meta":{"total":5}};

	return (
		<>
			{!listCategory ? (
				<div className="wapper__card bg-white rounded-16 shadow-sm border mb-4">
					<ul className="list-group">
						<li className="loading-animation py-3 d-flex"></li>
					</ul>
				</div>
			) : (
				!isEmpty(listCategory?.data) && (
					<div className="wapper__card bg-white rounded-16 shadow-sm border mb-4">
						<div className="px-3 py-2 border-bottom">
							<h5 className="mb-0 fw-bold">บันทึกการเรียนรู้</h5>
						</div>
						<ul className="list-group">
							{listCategory?.data?.map((category) => (
								<li className={`bg-white border-bottom px-3 py-2 ${style.list_group_item_custom}`} key={category.id}>
									<CustomLink href={`/c/${category.slug}/latest`} className="text-decoration-none text-dark me-2">
										{category.title}
									</CustomLink>
									<span className="badge bg-secondary">{category.total_posts}</span>
								</li>
							))}
						</ul>
					</div>
				)
			)}
		</>
	);
};

export default memo(ListCategoryComponent);

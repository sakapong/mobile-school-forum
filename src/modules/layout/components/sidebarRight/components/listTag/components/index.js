import { isEmpty } from 'lodash';
import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import style from '@/modules/layout/components/sidebarRight/components/listTag/styles/style.module.scss';

const ListTagComponent = () => {
	const { data: listTag } = useSWR(`/tags_with_posts?offset=0&limit=5`, {
		revalidateOnFocus: false
	});

	// const { data: listTag } = {"success":true,"data":[{"id":1,"title":"Javascript","slug":"javascript","posts":[{"id":1,"title":"Forum example next and laravel rest api ","slug":"forum-example-next-and-laravel-rest-api","total_comments":1,"user":{"id":1,"user_name":"korrio"}},{"id":2,"title":"Hello World 2","slug":"hello-world-2","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":3,"title":"Hello World 3","slug":"hello-world-3","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":4,"title":"Hello World 4","slug":"hello-world-4","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":5,"title":"Hello World 5","slug":"hello-world-5","total_comments":0,"user":{"id":1,"user_name":"korrio"}}]},{"id":6,"title":"Next","slug":"next","posts":[{"id":27,"title":"Hello World 27","slug":"hello-world-27","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":28,"title":"Hello World 28","slug":"hello-world-28","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":60,"title":"Hello World 60","slug":"hello-world-60","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":1,"title":"Forum example next and laravel rest api ","slug":"forum-example-next-and-laravel-rest-api","total_comments":1,"user":{"id":1,"user_name":"korrio"}}]},{"id":8,"title":"Beginners","slug":"beginners","posts":[{"id":31,"title":"Hello World 31","slug":"hello-world-31","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":32,"title":"Hello World 32","slug":"hello-world-32","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":62,"title":"Hello World 62","slug":"hello-world-62","total_comments":0,"user":{"id":1,"user_name":"korrio"}}]},{"id":7,"title":"Web Development","slug":"webdev","posts":[{"id":29,"title":"Hello World 29","slug":"hello-world-29","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":30,"title":"Hello World 30","slug":"hello-world-30","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":61,"title":"Hello World 61","slug":"hello-world-61","total_comments":0,"user":{"id":1,"user_name":"korrio"}}]},{"id":9,"title":"Programming","slug":"programming","posts":[{"id":33,"title":"Hello World 33","slug":"hello-world-33","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":34,"title":"Hello World 34","slug":"hello-world-34","total_comments":0,"user":{"id":1,"user_name":"korrio"}},{"id":63,"title":"Hello World 63","slug":"hello-world-63","total_comments":0,"user":{"id":1,"user_name":"korrio"}}]}]}

	return (
		<>
			{!listTag ? (
				<div className="wapper__card bg-light rounded-3 shadow-sm border">
					<ul className="list-group">
						<li className="loading-animation py-3 d-flex"></li>
					</ul>
				</div>
			) : (
				!isEmpty(listTag?.data) &&
				listTag?.data?.map((tag) => (
					<div className="wapper__card bg-light rounded-3 shadow-sm border mb-4" key={tag.id}>
						<div className="px-3 py-2 border-bottom">
							<h5 className="mb-0">
								<CustomLink href={`/t/${tag.slug}`} className="text-decoration-none d-inline-block fw-bold text-dark">
									#{tag.slug}
								</CustomLink>
							</h5>
						</div>
						<ul className="list-group">
							{tag?.posts?.map((post) => (
								<li className={`bg-light border-bottom px-3 py-2 ${style.list_group_item_custom}`} key={post.id}>
									<CustomLink
										href={`/u/${post.user.user_name}/${post.slug}`}
										className="text-decoration-none text-dark"
									>
										{post.title}
									</CustomLink>
									{post.total_comments > 0 && (
										<div className={`small ${style.tags}`}>
											<CustomLink
												href={`/u/${post.user.user_name}/${post.slug}#comment-post`}
												className="p-1 text-decoration-none d-inline-block text-secondary"
											>
												{post.total_comments} ความคิดเห็น
											</CustomLink>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				))
			)}
		</>
	);
};

export default ListTagComponent;

import React, {useState} from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import CommentComponent from '@/modules/singlePost/components/comment/components';
import PostActionComponent from '@/modules/singlePost/components/postAction';
import PostFooterComponent from '@/modules/singlePost/components/postFooter';
import PostMetaComponent from '@/modules/singlePost/components/postMeta';
import PostTagListComponent from '@/modules/singlePost/components/postTagList';
import SideBarRightUserComponent from '@/modules/singlePost/components/sidebarRightUser/components';

import CustomLink from '@/common/components/CustomLink/components';

const SinglePostComponentDispute = ({ singlePost, listPostUser, listComment }) => {
		const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (<div className="container-xl py-4">
			<div className="row">
				<div className="col-lg-9 mb-4 mb-lg-0">
					<h2>Dispute</h2>
					<article className="wapper__card single-post bg-light rounded-16 shadow-sm">
						<div className="p-3 p-sm-5">
							<div className="card" >
								<div className="card-body mb-3">
									<h1 className="card-title">{singlePost.data?.title}</h1>

									<p className="card-text">
										<PostTagListComponent tags={singlePost.data.tags} />
										<hr />
										<div className="my-5">
											<ReactMarkdownComponent markdown={singlePost.data?.content} />
										</div>
									</p>
								</div>
							</div>
							
							<PostMetaComponent singlePost={singlePost} />
							<PostActionComponent userName={singlePost.data.user?.user_name} postSlug={singlePost.data.slug} />
							
							
							<PostFooterComponent
								favorited={singlePost.data.favorited}
								totalFavorited={singlePost.data.total_favorited}
								postSlug={singlePost.data.slug}
								postUserName={singlePost.data.user.user_name}
								postTitle={singlePost.data.title}
							/>
							<hr />
							<div className="card" >
						  <div className="card-body">
							<CommentComponent
								listComment={listComment}
								postSlug={singlePost.data.slug}
								postUserName={singlePost.data.user.user_name}
							/>
							</div>
							</div>
						</div>
					</article>
					<div className="row mt-5">
						<div className='col-12 d-flex justify-content-around'>
							<CustomLink onClick={handleShow} href={`#`} className="btn btn-secondary btn-lg me-2 btn-reject">❌ REJECTED</CustomLink>
							<CustomLink onClick={handleShow} href={`#`} type="button" className="btn btn-primary btn-lg me-2 btn-request">REQUEST MORE EVIDENCE</CustomLink>

							<CustomLink onClick={handleShow} href={`#`} type="button" className="btn btn-secondary btn-lg me-2 btn-approve">✅ APPROVED</CustomLink>
						
						</div>
					</div>
				</div>
				<div className="col-lg-3">
					<SideBarRightUserComponent postUser={singlePost.data.user} listPostUser={listPostUser} />
				</div>
			</div>
</div>);
};

export default SinglePostComponentDispute;
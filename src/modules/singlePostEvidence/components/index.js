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

const SinglePostComponentEvidence = ({ singlePost, listPostUser, listComment }) => {
		const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (<div className="container-xl py-4">
			<style jsx>{`
			
				
.close {
  font-size: 1.5rem;
}

.col-12 img {
  opacity: 0.7;
  cursor: pointer;
  margin: 2rem;
  width: 100%;
}

.col-12 img:hover {
  opacity: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`}
			</style>
			<div className="row">
				<div className="col-lg-9 mb-4 mb-lg-0">
					<h2>Proof of Evidence</h2>
					<article className="wapper__card single-post bg-light rounded-16 shadow-sm">
						<div className="card" >
						  <div className="card-body">
						    <h5 className="card-title">Card title</h5>
						    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						    <a href="#" className="btn btn-primary">Go somewhere</a>
						  </div>
						</div>
						<div className="card text-center">
						  <div className="card-header">
						    <ul className="nav nav-tabs card-header-tabs">
						      <li className="nav-item">
						        <a className="nav-link active" href="#">Case Detail</a>
						      </li>
						      <li className="nav-item">
						        <a className="nav-link" href="#">Claim</a>
						      </li>
						      <li className="nav-item">
						        <a className="nav-link disabled" href="#">Request Data For</a>
						      </li>
						    </ul>
						  </div>
						  <div className="card-body">
						  	<div className="card text-white bg-primary mb-3" >
								  <div className="card-header">Header</div>
								  <div className="card-body">
								    <h5 className="card-title">Primary card title</h5>
								    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								  </div>
								</div>
						    {/*<h5 className="card-title">Special title treatment</h5>
						    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
						    <a href="#" className="btn btn-primary">Go somewhere</a>*/}
						  </div>
						</div>
						<div className="card text-center">
						  <div className="card-header">
						    <ul className="nav nav-tabs card-header-tabs">
						      <li className="nav-item">
						        <a className="nav-link active" href="#">Case Evidences</a>
						      </li>
						      <li className="nav-item">
						        <a className="nav-link" href="#">Official Documents</a>
						      </li>
						    </ul>
						  </div>
						  <div className="card-header">Header</div>
						  <div className="card-body">
						    <h5 className="card-title">Special title treatment</h5>
						    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
						    
						    <div className="row d-flex flex-wrap align-items-center" data-toggle="modal" data-target="#lightbox">
  <div className="col-12 col-md-6 col-lg-3">
    
<img src="https://source.unsplash.com/random/200" data-target="#indicators" data-slide-to="0" alt="" /> 
  </div>
  <div className="col-12 col-md-6 col-lg-3">
       <img src="https://source.unsplash.com/random/201" data-target="#indicators" data-slide-to="1" alt="" />
  </div>
  <div className="col-12 col-md-6 col-lg-3">
     <img src="https://source.unsplash.com/random/202" data-target="#indicators" data-slide-to="2"  alt="" />
  </div>
  <div className="col-12 col-md-6 col-lg-3">
       <img src="https://source.unsplash.com/random/203" data-target="#indicators" data-slide-to="3" alt="" />
  </div>
  <div className="col-12 col-md-6 col-lg-3">
       <img src="https://source.unsplash.com/random/204" data-target="#indicators" data-slide-to="3"  alt="" />
  </div>
  <div className="col-12 col-md-6 col-lg-3">
       <img src="https://source.unsplash.com/random/205" data-target="#indicators" data-slide-to="4" alt="" />
  </div>
</div>


<div className="modal fade" id="lightbox" role="dialog" >
  <div className="modal-dialog" role="document">
    <div className="modal-content">
        <button type="button" className="close text-right p-2" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <div id="indicators" className="carousel slide" data-interval="false">
  <ol className="carousel-indicators">
    <li data-target="#indicators" data-slide-to="0" className="active"></li>
    <li data-target="#indicators" data-slide-to="1"></li>
    <li data-target="#indicators" data-slide-to="2"></li>
    <li data-target="#indicators" data-slide-to="3"></li>
    <li data-target="#indicators" data-slide-to="4"></li>
    <li data-target="#indicators" data-slide-to="5"></li>
  </ol>
  <div className="carousel-inner">
    
    <div className="carousel-item active">
      
      <img className="d-block w-100" src="https://source.unsplash.com/random/200" alt="First slide" />
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/201" alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/202" alt="Third slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/203" alt="Fourth slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/204" alt="Fifth slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://source.unsplash.com/random/205" alt="Sixth slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#indicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#indicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

    </div>
  </div>
</div>


						    <a href="#" className="btn btn-primary">Go somewhere</a>
						  </div>
						</div>
					</article>
					<div className="row mt-5">
						<div className='col-12 d-flex justify-content-around'>
							<CustomLink onClick={handleShow} href={`#`} className="btn btn-secondary btn-lg me-2 btn-reject">❌ REJECTED</CustomLink>
							<CustomLink onClick={handleShow} href={`#`} type="button" className="btn btn-primary btn-lg me-2 btn-request">REQUEST MORE EVIDENCE</CustomLink>

							<CustomLink onClick={handleShow} href={`#`} type="button" className="btn btn-secondary btn-lg me-2 btn-approve">✅ APPROVED</CustomLink>
						
	{/*												<button type="button" className="btn btn-secondary">Secondary</button>
							<button type="button" className="btn btn-warning">Warning</button>
							<button type="button" className="btn btn-info">Info</button>
							<button type="button" className="btn btn-light">Light</button>
							<button type="button" className="btn btn-dark">Dark</button>

							<button type="button" className="btn btn-link">Link</button>*/}
						</div>
					</div>
				</div>
			</div>
</div>);
};

export default SinglePostComponentEvidence;
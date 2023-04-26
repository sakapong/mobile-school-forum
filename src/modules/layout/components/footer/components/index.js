import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';

const FooterComponent = () => {
	return (
		<footer className="py-5 bg-dark">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-3 mb-4">
						<CustomImage
							className="logo"
							src={`/images/logo.jpg`}
							width={64}
							height={64}
							alt="Mobile School"
						/>
						<small className="d-block text-light">Copyright © Mobile School 2023</small>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Features</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Background Check
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Crime Report
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Bounty Hunting
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Quality Votes
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Information Scoring
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Reliability Score
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">Resources</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Resource
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Resource name
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Another resource
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="https://thaihotline.org/en/report/">
									Final resource
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md-3 mb-4">
						<h5 className="text-white">About</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Contact
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Privacy
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="/">
									Terms
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;

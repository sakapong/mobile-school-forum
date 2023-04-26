import React from 'react';



import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import CustomImage from '@/common/components/CustomImage/components';

import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {

	const bogliasco = "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*7Yk4z7L7-vHMv2K-VeVnBg.jpeg";
	const countyClare = "https://miro.medium.com/v2/resize:fit:720/format:webp/1*_5HetL0kOU925Wc9YFHwIA.jpeg";
	const craterRock = "https://miro.medium.com/v2/resize:fit:4800/format:webp/1*YfjTLp6jDETnjSK7QPUswg.jpeg";
	const giauPass = "https://i.imgur.com/8IuucQZ.jpg";

	return (
		<>
			<MetaWebsite title="โรงเรียนมือถือฟอรั่ม" />
			<Layout>
				<div className="container-xl">
					<Carousel>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={craterRock}
								alt="First slide"
							/>
							<Carousel.Caption className="d-none">
								<h3>First slide label</h3>
								<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={bogliasco}
								alt="Second slide"
							/>

							<Carousel.Caption className="d-none">
								<h3>Second slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={countyClare}
								alt="Third slide"
							/>

							<Carousel.Caption className="d-none">
								<h3>Third slide label</h3>
								<p>
									Praesent commodo cursus magna, vel scelerisque nisl consectetur.
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>
				<div className="container box-main pt-5">
					<div className="container text-center">
						<div className="row">
							<div className="col-6">
								<div className="card car-corp">
									<div className="card-body card-corp-body">
										<h2 className="card-title">FOR CORPERATE</h2>
									</div>
								</div>
							</div>
							<div className="col-6">
								<div className="card car-corp">
									<div className="card-body card-corp-body">
										<h2 className="card-title">FOR AN <br />
											INDIVIDUAL USER</h2>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-6">
								<button type="button" className="btn btn-light txtSearch_ind ">API docs</button>
							</div>
							<div className="col-6">
								<button type="button" className="btn btn-light txtSearch_ind ">Search</button>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default HomePage;

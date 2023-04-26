import React, {useState} from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import CustomImage from '@/common/components/CustomImage/components';

import fs from "fs";

const BackgroudCheckV2 = () => {

	const [keyValue, setKeyValue] = useState(0);

	return (
		<>
			<MetaWebsite title="โรงเรียนมือถือฟอรั่ม" />
			<Layout onButtonClick={() => setKeyValue(keyValue + 1)} >
				
      	        <iframe
            width="100%"
            height="800"
            src="../index2.html"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
            </Layout>
		</>
	);
};

export default BackgroudCheckV2;



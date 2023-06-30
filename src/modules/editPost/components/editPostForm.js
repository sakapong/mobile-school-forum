import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import CustomImage from '@/common/components/CustomImage/components';
import ImagePostForm from '@/common/components/ImagePostForm/components';
import InputForm from '@/common/components/InputForm/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import SelectForm from '@/common/components/SelectForm/components';
import TagListForm from '@/common/components/TagListForm/components';
import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import CustomEditor from '@/modules/newPost/components/CustomEditor'

const EditPostFormComponent = ({ editPost, isPreview }) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [tags, setTag] = useState(editPost.data.tags);
	const [errors, setErrors] = useState({});
	const [isRemoveImg, setIsRemoveImg] = useState(false);
	const [loadImg, setLoadImg] = useState(
		editPost.data.image ? `${process.env.IMAGES_URL}/${editPost.data.image}` : null
	);
	const FILE_SIZE = 2048 * 1024;
	const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	const initialValues = {
		title: editPost.data.title,
		content: editPost.data.content,
		category_id: editPost.data.category.id,
		image: null
	};
	const validationSchema = Yup.object({
		title: Yup.string().required('กรุณากรอกหัวข้อผลงาน').max(150, 'หัวข้อผลงานใส่ได้มากสุด 128 ตัวอักษร'),
		content: Yup.string().required('กรุณากรอกเนื้อหาผลงาน').max(60000, 'ใส่เนื้อหาผลงานได้สูงสุด 60000 ตัวอักษร'),
		category_id: Yup.number().integer('กรุณาเลือกหมวดหมู่ผลงาน').required('เลือกหมวดหมู่ผลงาน'),
		image: Yup.mixed()
			.test('fileSize', 'File too large', (value) => value === null || (value && value.size <= FILE_SIZE))
			.test(
				'fileFormat',
				'Unsupported Format',
				(value) => value === null || (value && SUPPORTED_FORMATS.includes(value.type))
			)
	});
	const onSubmit = async (values) => {
		try {
			setLoading(true);
			let filtered_tags = tags.filter(obj => obj.title !== '')
			const response = await httpRequest.upload({
				url: `/posts/${editPost.data.slug}`,
				token: getCookie('token'),
				data: {
					title: values.title,
					content: values.content,
					category_id: values.category_id,
					tags: JSON.stringify(filtered_tags),
					is_remove_img: isRemoveImg
				},
				files: {
					image: values.image
				}
			});
			if (response.data.success) {
				showToast.success('อัพเดทผลงานสำเร็จแล้ว');
				router.push(`/u/${response.data.data.user.user_name}/${response.data.data.slug}`);
			}
		} catch (error) {
			console.log(error);
			showToast.error('ไม่สามารถอัพเดทผลงานได้');
			if (!error.response.data.success) {
				setErrors(error.response.data);
			}
		} finally {
			setLoading(false);
		}
	};

	const onChangeAvatar = (e, setFieldValue) => {
		try {
			console.log(e.target.files);
			let file = e.target.files[0];
			let reader = new FileReader();
			if (file) {
				reader.onloadend = () => {
					setLoadImg(reader.result);
				};
				reader.readAsDataURL(file);
				setFieldValue('image', file);
				setIsRemoveImg(false);
				e.target.value = null;
				showToast.info(`โหลดไฟล์สำเร็จ "${file.name}"`);
			}
		} catch (error) {
			console.log(error);
			showToast.error();
		}
	};

	const onBlurAvatar = (e, setFieldTouched) => {
		setFieldTouched('image', e.target.files[0] || null);
	};

	const onChangeRemoveImage = (setFieldValue) => {
		setFieldValue('image', null);
		setLoadImg(null);
		setIsRemoveImg(true);
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{({ setFieldValue, setFieldTouched, errors: error, touched, values }) => (
				<Form>
					<div className="bg-white rounded-16 p-4">
						{!isPreview ? (
							<div className="row">
								<div className="mb-3 col-md-12 mb-0">
									<SelectForm label="หมวดผลงาน" name="category_id">
										<option value="">เลือกหมวดผลงาน</option>
										{!listCategory ? (
											<option value="">กำลังดาวโหลด...</option>
										) : isEmpty(listCategory?.data) ? (
											<option value="">ไม่มีหมวดผลงาน</option>
										) : (
											listCategory?.data?.map((category) => (
												<option value={category.id} key={category.id}>
													{category.title}
												</option>
											))
										)}
									</SelectForm>
								</div>
								<div className="mb-3 col-md-12">
									<InputForm label="หัวข้อผลงาน" placeholder="หัวข้อผลงาน" id="title" name="title" type="text" />
								</div>
								<div className="mb-3 col-md-12">
									<TagListForm tags={tags} setTag={setTag} errors={errors.error?.message?.tags} />
								</div>
								<div className="mb-3 col-12">
									<CustomEditor
										initialValue={values.content}
										field={{ name: "content", value: "" }}
										onEditorChange={(newValue, editor) => {
											const bookmark = editor.selection.getBookmark(2, true, true);
											setFieldValue('content', newValue);
    										editor.selection.moveToBookmark(bookmark);
										}}
									/>
								</div>
								<div className="mb-3 col-md-12">
									<ImagePostForm
										label="ภาพประกอบ (.png, .jpg, .jpeg .gif)"
										id="image"
										name="image"
										type="file"
										accept=".png, .jpg, .jpeg .gif"
										onChange={(e) => onChangeAvatar(e, setFieldValue)}
										onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
										error={error.image}
										touched={touched.image}
										imageSrc={loadImg}
										imagAlt={`Post image`}
										removeImage={() => onChangeRemoveImage(setFieldValue)}
									/>
								</div>
							</div>
						) : (
							<article className="wapper__card">
								{loadImg && (
									<div>
										<CustomImage
											src={loadImg}
											className="rounded-3"
											alt={``}
											layout="responsive"
											width={500}
											height={220}
										/>
									</div>
								)}
								<div className="p-4">
									<div className="mb-3">
										<h1>{values.title}</h1>
									</div>
									<div className="mb-3">
										{tags.map((tag, index) => (
											<span key={index} className="p-1 text-secondary">
												<span className="text-muted">#</span>
												{tag.name}
											</span>
										))}
									</div>
									<div className="mt-5">
										<ReactMarkdownComponent markdown={values.content} />
									</div>
								</div>
							</article>
						)}
					</div>
					<div className='bg-white fixed-bottom shadow-sm py-4 mt-4' style={{ "zIndex": 1050 }}>
						<div className="row col-lg-4 col-md-8 mx-auto px-4">
							<div className="d-grid gap-3 col-12 mx-auto">
								{isLoading ? (
									<button type="submit" className="btn btn-primary" disabled>
										<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
										อัพเดทผลงาน
									</button>
								) : (
									<button type="submit" className="btn btn-primary">
										อัพเดทผลงาน
									</button>
								)}
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default EditPostFormComponent;

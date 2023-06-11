import { Editor } from '@tinymce/tinymce-react'
// import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react'
import axios from 'axios'

// const DynamicEditor = dynamic(() => import('@tinymce/tinymce-react'), { ssr: false });

const CustomEditor = ({ field, onEditorChange, ...props }) => {

    const editorRef = useRef(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }


/*     const images_upload_handler = async (blobInfo, success) => {
        const imageFile = new FormData()
        const file = blobInfo.blob();
        imageFile.append("file", file)
        imageFile.append('upload_preset', 'ln9yi5hz');
        imageFile.append('api_key', '122818648218499');
        console.log("dddddddddd")
        try {
            const { response } = await axios.post(
                'https://api.cloudinary.com/v1_1/diufjycef/image/upload',
                imageFile,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            if (response.data.error) {
                console.log(response.data.error)
            } else {
                console.log(response)
                console.log("imageUrl", imageUrl)
                console.log("typeof imageUrl", typeof imageUrl)
                success(response.data.secure_url,
                    { title: `${response.data.public_id}.${response.data.format}` })
            }
        } catch (error) {
            console.log("error", error)
            return
        }
    }; */

    return (
        <Editor
            apiKey={'nnbm03diax2qbeeh80c9o534kwn2sv18uasp8tsuq34nyc5e'}
            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
                height: 500,
                max_height: 800,
                menubar: false,
                statusbar: true,
                browser_spellcheck: true,
                object_resizing: 'img',
                resize_img_proportional: true,
                file_picker_types: 'image',
                file_picker_callback: (cb) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.addEventListener('change', async (e) => {
                        const file = e.target.files[0];
                        const formData = new FormData();
                        formData.append("file", file)//
                        formData.append('upload_preset', 'hgkmdh14');
                        formData.append('api_key', '938126698545117');

                        const response = await axios.post(
                            'https://api.cloudinary.com/v1_1/dvteoe7lr/image/upload',
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )

                        const reader = new FileReader();
                        reader.addEventListener('load', async () => {
                            cb(response.data.secure_url, { title: file.name });
                        });
                        reader.readAsDataURL(file);
                    });

                    input.click();
                },
                image_uploadtab: false,
                plugins: ['image', 'link', 'lists', 'media', 'preview'],
                toolbar: 'blocks fontsize lineheight image media link bold italic bullist numlist' +
                    'fullscreen preview',
                content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={onEditorChange}
        />
    )
}

export default CustomEditor;
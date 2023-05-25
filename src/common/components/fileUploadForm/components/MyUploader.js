import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
// import { NFTStorage, Blob } from 'nft.storage'


const MyUploader = () => {

    const handleChangeStatus = ({ meta, file, status }) => { console.log(meta, file, status) }

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))

        allFiles.forEach(f => f.remove())
    }

    return (
        <Dropzone
getUploadParams={getUploadParams}
onChangeStatus={handleChangeStatus}
onSubmit={handleSubmit}
accept='image/*, image/gif, audio/*, video/*, gif/*, .gif, .pdf, .mp3' 
inputContent={() => ( 'Drag files here')}

/>
    )
}

export default MyUploader;
import {useDropzone} from 'react-dropzone'  
import { useCallback } from 'react';


const DropFileInput = ({ handlePictureChange, pictures }) => {

  const onDrop = useCallback(acceptedFiles => {
    handlePictureChange(acceptedFiles) 

  }, [handlePictureChange])

  // function to remove file on the drag & drop
  function removeFile(fileName) {
    const newFilter = pictures.filter(file => file.name !== fileName)
    handlePictureChange(newFilter);
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div 
      className={`drag-area ${isDragActive? "bg-[#f5f5f5]": ""}`} {...getRootProps()} 
    >  
      <div className="flex flex-col items-center mb-4 text-slate-500">
        <img className="w-28 mx-auto" src="/images/cloud-upload.svg" alt="drop icon"/>
        {
          isDragActive ?
            <>
              <p>Drop the files here ...</p>
              <span>Or click on the drop zone</span> 
            </> 
          : <>
              <p>Drag & drop to upload File</p>
              <span>Or click on the drop zone</span>  
            </>
        }       
      </div>  
      <input
        {...getInputProps()}
        className="w-52"
        type="file"
        id="picture"
        multiple
      />
      
      <ul className="absolute text-slate-500 text-sm flex flex-wrap gap-2.5 z-10 top-1 left-1">
        {pictures.length !== 0  &&
          pictures.map(file => {
            return (
              <li 
                key={file.name}
                onClick={(event)=> {
                  event.stopPropagation();
                  removeFile(file.name)
                }}
                className="flex gap-2 items-center hover:cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <span>{file.name}</span>
                  <span>{`${file.size} bytes`}</span>
                </div>
                <span>x</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default DropFileInput;
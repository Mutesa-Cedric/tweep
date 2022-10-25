import Cropper from 'react-easy-crop';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import React,{useState,useCallback} from 'react';
const PreviewImage=(props)=>{
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1.07)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])
    return (
        <div className={props.hasFile?"":"hidden"}>
            <div className="fixed z-[100] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed justify-center inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div className="absolute top-0 rounded-md  left-[20%] w-3/5 m-auto  h-full">
                        <div className="flex flex-col justify-between absolute top-20 right-0 left-0 bottom-32  w-3/4 mx-auto">
                            <div className="w-full px-14 flex justify-between  items-center text-white z-10 h-16  bg-gray-900">
                                <div className="flex justify-between ">
                                    <KeyboardBackspaceOutlinedIcon className=" mr-6 cursor-pointer hover:bg-gray-700 hover:text-white rounded-[50%]" onClick={props.hideEditPic}/>
                                    <p>Edit {props.message}</p>
                                </div>
                                <button className="bg-white hover:bg-gray-200 rounded-2xl text-gray-900 font-[600] px-4 py-1" onClick={props.finishEditing}>
                                    <span>Apply</span>
                                </button>
                            </div>
                            <Cropper
                                image={props.image}
                                crop={crop}
                                zoom={zoom}
                                aspect={props.aspect}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />  
                         </div>
                         <div className=" bg-gray-900 w-3/4 mx-auto  flex flex-col   justify-center items-center inset-0 z-10 h-16  absolute top-[75%]">
                             <div className="flex items-center justify-around w-full px-14">
                             <AddCircleOutlineOutlinedIcon style={{fill:"white"}} className="opacity-70"/>
                                <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => {
                                    setZoom(e.target.value)
                                }}
                                className="zoom-range w-[420px] h-1"
                                />
                               <RemoveCircleOutlineOutlinedIcon style={{fill:"white"}} className="opacity-70"/>
                             </div>
                        </div>
                    </div>   
                 </div>
            </div>
        </div>
    )
}

export default PreviewImage;

const ChooseProfile=(props)=>{
    return (
        <div className={props.darkMode?"w-screen h-screen overflow-hidden flex items-center flex-col justify-center bg-[#252329]":"w-screen h-screen overflow-hidden flex items-center flex-col justify-center "}>
        <div className="lg:w-[30%] md:w-[70%] sm:w-[100%] h-auto flex justify-center items-center rounded-3xl border-[1px] border-[#BDBDBD]  px-14 py-10">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className={props.darkMode?"font-[600] text-2xl mb-3 text-[#E0E0E0] capitalize":"font-[600] text-2xl mb-3 text-[#333333] capitalize"}>Choose profile Picture</h1>
                </div>
               {/* choosing an image */}
                <div class="flex justify-center my-12">
                    <div class="max-w-2xl rounded-lg bg-gray-50">
                        <div class="m-4 flex items-center flex-col justify-between">
                            <label class="inline-block text-xl mb-2 text-gray-700">Click to choose an image</label>
                            <div class="flex items-center justify-center w-full">
                                <label class="flex flex-col w-full h-32 border-4 border-green-200 border-dashed hover:bg-gray-100 hover:cursor-pointer hover:border-gray-300">
                                <div class="flex flex-col items-center justify-center pt-7">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p class="pt-1 text-sm tracking-wider text-gray-600 group-hover:text-gray-600">
                                         Attach an image
                                    </p>
                                </div>
                                 <input type="file" name="profileImage" id="actual-image" class="opacity-0"/>
                               </label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* choosing an image */}
            </div>
        </div>
    </div>
    )
}

export default ChooseProfile;
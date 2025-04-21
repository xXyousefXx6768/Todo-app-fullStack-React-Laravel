import React from 'react'

function PersonalSection() {
  return (
    <div>
        <div className="!m-6">
            <div className="!px-2 !py-4 
            flex 
            items-center 
            gap-3 
            dark:text-textDark
            bg-[#E6E6E6]/20 !
            rounded-[0.8rem] 
            hover:bg-[#E6E6E6]/50 
            transition duration-300 
            ease-in-out cursor-pointer 
            !border-2 !border-transparent 
            hover:border-2 hover:border-white">
            <div>
            </div>
            <div>
            <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">Yousef amr </span>
            </h1>
            </div>
            </div>
            <div className="!mt-6  flex flex-col gap-8">
            <div className="grid  grid-cols-2 gap-4">
             <div className="text-gray-400 dark:text-textDark">
                <p>Total Tasks:</p>
                <p className="!pl-4 relative  flex gap-2">
                    <span className="absolute 
                    h-[70%] w-[0.2rem] left-[1px] 
                    top-1/2 translate-y-[-50%] 
                    bg-purple-500 !rounded-[5px]"/> 
                    <span className="font-medium 
                    text-4xl 
                    dark:text-textDark
                    text-[#333]"> 4</span>
                        </p>
                        </div>
                        <div className="text-gray-400 dark:text-textDark">
                            <p>In Progress:</p>
                            <p className="!pl-4 relative flex gap-2">
                                <span className="absolute 
                                h-[70%] w-[0.2rem] left-[1px] 
                                top-1/2 translate-y-[-50%] 
                                bg-[#3AAFAE] !rounded-[5px]"/>
                                <span className="font-medium 
                                text-4xl
                                dark:text-textDark 
                                text-[#333]">3</span>
                                </p>
                                </div>
                                <div className="text-gray-400 dark:text-textDark">
                                    <p>Open Tasks:</p>
                                    <p className="!pl-4 relative flex gap-2">
                                    <span className="absolute h-[70%] w-[0.2rem] 
                                    left-[1px] top-1/2 
                                    translate-y-[-50%] 
                                    bg-orange-400 !rounded-[5px]"></span>
                                    <span className="font-medium dark:text-textDark text-4xl text-[#333]">3</span>
                                    </p>
                                    </div>
                                    <div className="text-gray-400 dark:text-textDark">
                                        <p>Completed:</p>
                                        <p className="!pl-4 relative flex gap-2">
                                        <span className="absolute h-[70%] 
                                        w-[0.2rem] left-[1px] top-1/2 
                                        translate-y-[-50%] 
                                        bg-green-400 !rounded-[5px]">
                                        </span>
                                        <span className="font-medium dark:text-textDark text-4xl text-[#333]">1</span>
                                        </p>
                                        </div>
                                        </div>
                                        </div>
                                        <h3 className="!mt-8 dark:text-textDark font-medium">Activity</h3>
                                        </div>
    </div>
  )
}

export default PersonalSection
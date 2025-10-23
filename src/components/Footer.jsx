import React from 'react'

const Footer = () => {
  return (
    <div className="foot w-full ">
        <div className="bar bg-black text-center text-gray-400 text-sm py-4">Created with <span className="text-red-500">♥</span> and Chai by <span className="text-green-400 font-semibold"><a href='https://www.instagram.com/aman.cpp_/' target='_blank'>Aman</a></span> <br />
  © {new Date().getFullYear()} <span className='text-green-600'>&lt;</span><span className='text-white'>Pass</span><span className='text-green-600'>MAN/&gt;</span>. All rights reserved.</div>
    </div>
  )
}

export default Footer
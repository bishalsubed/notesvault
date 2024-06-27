import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between px-16 py-4 shadow-lg border-2 border-white items-center text-white bg-slate-900 w-full'>
      <div className='text-2xl cursor-pointer font-bold'><span className='text-purple-500'>&lt;</span>Notes<span className='text-purple-500'>Vault</span><span className='text-purple-500'>/&gt;</span></div>
      <div className='text-white'>
        <ul className='flex gap-6 justify-center items-center'>
          <li className='hover:cursor-pointer transition-transform hover:text-purple-500 hover:underline decoration-2 underline-offset-4 text-[17px] font-semibold hover:translate-y-[-3px]'>Home</li>
          <li className='hover:cursor-pointer transition-transform hover:text-purple-500 hover:underline decoration-2 underline-offset-4 text-[17px] font-semibold hover:translate-y-[-3px]'>About Us</li>
          <li className='hover:cursor-pointer transition-transform hover:text-purple-500 hover:underline decoration-2 underline-offset-4 text-[17px] font-semibold hover:translate-y-[-3px]'>Contact Us</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
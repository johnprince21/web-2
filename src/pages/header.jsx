import React from 'react'
import '../index.css';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <>
            <div className='w-full h-20 flex shadow fixed bg-slate-100 z-10'>
                <div className='text-center font-bold text-primary bg-black p-5 lg:ps-10'><span className='text-3xl'>H</span>&<span className='text-3xl'>W</span></div>
                <div className='flex justify-around items-center ml-auto'>
                    <ul className='flex gap-x-6 sm:gap-x-7 md:gap-x-8 me-16 text-lg'>
                        <li><a href='#facility-section' className='hover:text-primary'>Facility</a></li>
                        <li><a href='#Our-methods' className='hover:text-primary'>Methods</a></li>
                        <li><a href='#hit-up' className='hover:text-primary'>Contact</a></li>
                        <li><Link to="/login" className='hover:text-primary text-xl'>Login</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header;
import React from 'react'

function Footer() {
  return (
    <>
      <div className='bg-primary py-20 mt-72 md:mt-64 lg:mt-52'>
        <div className='w-full flex flex-wrap gap-10 justify-around text-center text-white text-lg'>
          <ul className=' pt-20'>
            <li className='text-2xl mb-5'>Menu</li>
            <li><a href="#facility-section">Facility</a></li>
            <li><a href="#Our-methods">Methods</a></li>
            <li><a href="#hit-up">Contact</a></li>
          </ul>
          <ul className='pt-20'>
            <li className='text-2xl mb-5'>Contact Us</li>
            <li>
              <address>
                500 Terry Francine Street <br />
                San Francisco, CA 94158 <br />
                Mail: info@mysite.com <br />
                Tel: 123-456-7890
              </address>
            </li>
          </ul>
          <ul className='pt-20'>
            <li className='text-2xl mb-5'>Opening Hours</li>
            <li>Sun-Fri: 9AM to 10PM</li>
            <li>Saturday: 10AM to 7PM</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer
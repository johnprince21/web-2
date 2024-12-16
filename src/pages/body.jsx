import React from 'react';
import img5 from '../assets/img-5.jpg';
import img10 from '../assets/img-10.jpg';
import img8 from '../assets/img-8.jpg';
import img9 from '../assets/img9.jpg';
import img6 from '../assets/img-6.jpg';
import img7 from '../assets/img-7.jpg';
import img11 from '../assets/img-11.jpg';
import img12 from '../assets/img-12.jpg';
import img13 from '../assets/img-13.jpg';
import img14 from '../assets/img-14.jpg';
import '../index.css';

function Body() {
    return (
        <>
            <div className='font-bold flex flex-wrap flex-col justify-center items-center w-full h-screen absolute centered-text'>
                <p className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl '>Train Hard. Sweat Hard.</p>
                <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl mt-5 text-gray-800'>Healthy <span className='text-primary'>Life,</span> Healthy <span className='text-primary'>Body</span></p>
            </div>

            <div className='flex pt-20'>
                <img src={img5} className='hidden md:block w-1/3 h-screen opacity-70' alt="404" />
                <div className='w-full md:w-2/5 h-screen attachment'></div>
                <img src={img10} className='hidden md:block w-1/3 h-screen opacity-70' alt="404" />
            </div>
            <div className='h-screen flex'>
                <div className='border h-[55%] w-1/3 flex justify-center mt-[7%] ms-[15%] bg-primary'></div>
                <div className='sectionTwo absolute mt-[11%] ms-[19%]'>
                    <div className='absolute h-[80%] w-[95%] sm:w-[80%] lg:w-[78%] xl:w-[60%] bg-black ms-[70%] mt-[22%]'>
                        <p className='text-primary text-lg md:text-xl lg:text-3xl flex flex-wrap justify-center mt-[7%] font-semibold'>100% Results <br /> Guaranteed</p>
                        <p className='text-white mx-5 md:mx-10 mt-5 text-center text-[12px] sm:text-[15px] md:text-[16px] lg:text-[18px]'>we are committed to helping you achieve your fitness goals with a personalized approach. we provide tailored workout plans, expert guidance, and the motivation you need. </p>
                    </div>
                </div>
            </div>

            <section id='facility-section'>
                <div className='py-10'>
                    <div className='mt-20 mb-10 text-5xl flex justify-center items-center' >Workout Facility</div>
                    <div className='mx-5'>
                        <div className='sm:flex gap-5'>
                            <div className='border sm:w-3/4 md:w-2/4 h-96'>
                                <img src={img7} alt="404" className='w-full h-full object-cover' />
                            </div>
                            <div className='border w-full h-96 overflow-hidden'>
                                <img src={img8} alt="404" className='w-full h-full object-cover' />
                            </div>
                        </div>
                        <div className='sm:flex gap-5 mt-5'>
                            <div className='border w-full h-96 overflow-hidden'>
                                <img src={img9} alt="404" className='w-full h-full object-cover' />
                            </div>
                            <div className='border sm:w-3/4 md:w-2/4 h-96'>
                                <img src={img6} alt="404" className='w-full h-full object-cover' /></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='Our-methods'>
                <div className='py-10'>
                    <div className='mt-20 mb-10 text-5xl flex justify-center items-center' >Our Methods</div>

                    <div className='h-screen'>
                        <div className='border bg-black h-56 w-full relative '>
                            <div className='absolute mt-16 pb-10 flex gap-10 justify-evenly items-center w-full overflow-auto overflow-x-auto'>
                                <div className='border w-1/5 min-w-[270px] ms-5'>
                                    <img src={img11} alt="404" className='object-cover w-full h-60' />
                                    <p className='my-7 text-center text-4xl'>Body Shape</p>
                                    <p className='text-center font-light font-sans px-7 pb-7'>Body shape is an essential aspect of health and fitness, influencing not only appearance but also overall well-being. Each person has a unique body shape determined by genetics, muscle distribution, and body fat.</p>
                                </div>
                                <div className='border w-1/5 mt-20 min-w-[270px]'>
                                    <img src={img13} alt="404" className='object-cover w-full h-60' />
                                    <p className='my-7 text-center text-4xl'>Extreme</p>
                                    <p className='text-center font-light font-sans px-7 pb-7'>Extreme activities and lifestyles are often characterized by pushing physical, mental, or environmental limits, appealing to those seeking adrenaline rushes, personal challenges, or new frontiers.</p>
                                </div>
                                <div className='border w-1/5 min-w-[270px]'>
                                    <img src={img12} alt="404" className='object-cover w-full h-60' />
                                    <p className='my-7 text-center text-4xl'>Burn</p>
                                    <p className='text-center font-light font-sans px-7 pb-7'>The sensation of muscle "burn" is another familiar experience, especially in resistance or strength training, where muscle fibers are worked intensely, resulting in a build-up of lactic acid that produces a temporary burning feeling</p>
                                </div>
                                <div className='border w-1/5 mt-20 min-w-[270px] me-5'>
                                    <img src={img14} alt="404" className='object-cover w-full h-60' />
                                    <p className='my-7 text-center text-4xl'>Hiit</p>
                                    <p className='text-center font-light font-sans px-7 pb-7'>High-Intensity Interval Training (HIIT) is a popular workout method known for its effectiveness in burning fat, building endurance, and boosting metabolism in a short amount of time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section id="hit-up">
                <div className='h-screen py-10'>
                    <div className='pt-20 mb-10 text-5xl flex justify-center items-center' >Hit Us Up Anytime</div>
                    <div className='contact-image h-[90%] relative'></div>
                    <div className='h-fit w-[90%] sm:w-[70%] md:w-[43%] lg:w-[33%] bg-black ms-[5%] sm:ms-[18%] md:ms-[45%] lg:ms-[55%] -mt-[65%] sm:-mt-[33%] md:-mt-[22%] absolute pb-10'>
                        <p className='text-primary text-center text-5xl my-5'>Contact Us</p>
                        <form action="" className='text-white'>
                            <div className='flex flex-wrap justify-evenly items-center pt-5 pb-3'>
                                <div>
                                    <label htmlFor="firstname">First Name</label><br />
                                    <input type="text" id="firstname" name="firstname" className='border-b-2 bg-transparent pt-4 outline-none' />
                                </div>
                                <div>
                                    <label htmlFor="lastname">Last Name</label><br />
                                    <input type="text" id="lastname" name="lastname" className='border-b-2 bg-transparent pt-4 outline-none' />
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-evenly items-center pt-3 pb-5'>
                                <div>
                                    <label htmlFor="email">Email *</label><br />
                                    <input type="email" id="email" name="email" className='border-b-2 bg-transparent pt-4 outline-none' />
                                </div>
                                <div>
                                    <label htmlFor="number">Phone Number</label><br />
                                    <input type="number" id="number" name="number" className='border-b-2 bg-transparent pt-4 outline-none' />
                                </div>
                            </div>
                            <div className='flex justify-evenly items-center py-5'>
                                <input type="textarea" id='message' name='message' placeholder='Leave us a message...' className='w-full mx-14 border-b-2 bg-transparent h-16 sm:h-20 md:h-24 lg:h-28 outline-none' />
                            </div>
                            <input type="submit" className='w-[80%] border border-white py-2 mx-12' />
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Body
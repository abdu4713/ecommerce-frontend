import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
<Title  text1={'About'} text2={' us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
<img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
     <div className='flex flex-col justify-center gap-6 md:w-2/6 text-gray-600'>
<p>dolor sit amet consectetur adipisicing elit. Amet ea doloribus quisquam vero magnam, omnis enim odit iusto et minima? Ad explicabo quod soluta, eveniet doloribus eligendi perferendis aliquam officiis!</p>
    <p> amet consectetur adipisicing elit. Doloremque alias natus, accusamus in necessitatibus fugiat reprehenderit ullam, provident cupiditate blanditiis cum consequatur perspiciatis magnam expedita, commodi facilis. Temporibus, labore non!</p> 
     <b className='text-gray-800'>Our Mission</b>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ad necessitatibus nobis quibusdam, velit suscipit nam hic repellendus praesentium pariatur esse, veritatis amet aspernatur, quis blanditiis possimus dolorum voluptates incidunt.</p>
     </div>
      </div>
      <div className='text-4xl py-4'>
<Title text1={'Why'} text2={'Choose us'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Quality Assurance:</b>
<p className ='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate fugit ratione cumque expedita voluptatibus eveniet explicabo illo dolorum dolorem excepturi, perspiciatis magnam, assumenda quia repellendus labore cum animi ad sunt.</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Convenience:</b>
<p className ='text-gray-600'>adipisicing elit. Voluptate fugit ratione cumque expedita voluptatibus eveniet explicabo illo dolorum dolorem excepturi, perspiciatis magnam, assumenda quia repellendus labore cum animi ad sunt.</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Exceptional Customer Service :</b>
<p className ='text-gray-600'>  amet consectetur adipisicing elit. Voluptate fugit ratione cumque expedita voluptatibus eveniet explicabo illo dolorum dolorem excepturi, perspiciatis magnam, assumenda quia repellendus labore cum animi ad sunt.</p>
</div>
      </div>
      <NewsletterBox/>
    </div>
    
  )
}

export default About

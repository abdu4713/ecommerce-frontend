import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor consectetur adipisicing elit. Praesentium, explicabo quidem? Molestiae, ad exercitationem? Corporis nam commodi vitae placeat aut laudantium, molestiae, hic quam non,  dignissimos?
            </p>
        </div>


      <div>
      <p className="text-xl font medium mb-5">Company</p>
      <ul className="flex flex-col gap-1 text-gray-600">
        <li>Home</li>
        <li>About</li>
        <li>Delivery</li>
        <li>Privacy policy</li>
      </ul>
    </div>


    <div>
        <p className='text-xl font-medium mb-5'>Get in Touch</p>
        <ul className="flex flex-col gap-1 text-gray-600">
            <li>+251943046454</li>
            <li>contact@Abdu4713Gmail.com</li>
        </ul>
    </div>
    </div> 
    <div>
        <hr />
        <p className="py-5 text-sm text-center"> Copyright 2024@ abdu@Gmail.com - All Right Reserved</p>
        </div>  
    </div>
  )
}

export default Footer

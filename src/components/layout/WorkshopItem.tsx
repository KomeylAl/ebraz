import React from 'react';
import imagee from "../../../public/images/hero1.webp";
import Image from 'next/image';

interface WorkshopItemProps {
   title: string;
   description: string;
   image: string;
}

const WorkshopItem = ({ title, description, image }: WorkshopItemProps) => {
  return (
    <div className='w-80 h-96 group rounded-md space-y-3 relative shadow-lg overflow-hidden'>
      <Image src={imagee} alt='' width={400} height={400} className='absolute w-full h-full object-cover -z-10'/>
      <div className='w-full h-full bg-linear-to-t from-black to-transparent flex flex-col items-start justify-end space-y-6 p-4'>
         <p className='text-lg font-semibold text-white'>{title}</p>
         <p className='text-sm text-white text-right'>{description}</p>
         <button className='w-full px-4 py-2 rounded-md border border-beige text-beige cursor-pointer hover:bg-beige hover:text-black transition duration-300'>درخواست ثبت نام</button>
      </div>
    </div>
  )
}

export default WorkshopItem
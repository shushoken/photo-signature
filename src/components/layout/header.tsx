"use client" 
import Image from 'next/image';
import { UserICON } from './uerIcon';

export function Header() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
        <h3>《探讨 ECDSA 加密算法在图片数字签名中的应用》</h3>
        </div>
        <div className="flex">
        <span className="sm:text-2xl text-xl font-bold ml-2 tracking-tight">
          
        </span>
        </div>
      
        <div className="hidden lg:flex lg:flex-2 lg:justify-end">
          <UserICON/>
        </div>
      </nav>
       
      
    </header>

  );
}

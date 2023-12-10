import {Home} from "@/components/home";
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Index() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col items-center justify-between p-12">

      {session != null ? (
        <Home />
      ) : (
        <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px] -mt-8" style={{marginTop:"50px",marginBottom:"50px"}}>
          <div className="max-w-xl text-gray-600" style={{fontSize:"20px",fontWeight:"bold",padding:"20px"}}>
            登录后可以对图片进行签名和校验
          </div>
          <button
            onClick={() => signIn('google')}
            className=" text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2" style={{backgroundColor:"white"}}
          >
            <Image
              src="/google.png"
              width={20}
              height={20}
              alt="google's logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      )}
    </main>
  );
}
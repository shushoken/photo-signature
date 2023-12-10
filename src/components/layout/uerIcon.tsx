import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import NextLink from 'next/link';

export function UserICON() {
  const { data: session } = useSession();
  return (
      <div>
      {session ? (
        <div className="flex space-x-6">
        <div style={{paddingTop:"10px"}}>
        <NextLink href="/" passHref className="rounded-md   px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">首页</NextLink>
        <NextLink href="/key" passHref className="rounded-md   px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">密钥管理</NextLink>
        <NextLink href="/encrypt" passHref className="rounded-md   px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">图片数字签名</NextLink>
        <NextLink href="/verify" passHref className="rounded-md   px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">验证图片真伪</NextLink>
        </div>
        <Image
          alt="Profile picture"
          src={session?.user?.image!}
          className="w-10 rounded-full"
          width={32}
          height={28}
        />
        <button className={`px-4 py-2 rounded-md bg-blue-500 text-white`} onClick={() => signOut()}>登出</button>
        </div>
      ) : (
        <div className="flex space-x-6">
          <Link
            href="/"
            className="border-r border-gray-300 pr-4 space-x-2 hover:text-blue-400 transition hidden sm:flex"
          >
            <button className={`px-4 py-2 rounded-md bg-blue-500 text-white`} onClick={() => signIn('google')}>登录</button>
          </Link>
        </div>
      )}
      </div>
  );
}

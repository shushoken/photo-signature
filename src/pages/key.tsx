import { Content } from "@/components/layout/content";
import { useSession } from 'next-auth/react'; 
import { useCallback, useEffect, useState } from "react";

export default function key() {
  const { data: session } = useSession();
  const [privateKey, setPrivateKey] = useState("查询中");
  const [publicKey, setPublicKey] = useState("查询中");

  const requestKey = useCallback(async () => {
    try {
      const response = await fetch('/api/setkey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonObj = await response.json()
      setPrivateKey(jsonObj.privateKey)
      setPublicKey(jsonObj.publicKey)
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    requestKey()
  },[]) 

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <Content>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">ECDSA密钥信息</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">本页面主要演示了ECDSA密钥存储在数据库中。</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">用户昵称</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user?.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">用户邮箱</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session?.user?.email}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">签名私钥</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{privateKey}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">签名公钥</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{publicKey}</dd>
              </div>
            </dl>
          </div>
 
        </div>

      </Content>

    </main>
  )
}

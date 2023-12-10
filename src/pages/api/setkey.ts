import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
import eccrypto from 'eccrypto'
import {createECDSAKey, getECDSAKey, getUserByEmail} from "@/lib/db";

export type ECDSAKey = {
  privateKey: string,
  publicKey: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ECDSAKey>
) {
  const session = await getServerSession(req, res, authOptions)
  const user = await getUserByEmail(session?.user?.email!)
  let eCDSAKey = await getECDSAKey(user?.id!)
  if (eCDSAKey == null) {
    const privateKey = eccrypto.generatePrivate();
    const publicKey = eccrypto.getPublic(privateKey);
    const privateKeyBase64 = privateKey.toString('base64');
    const publicKeyBase64 = publicKey.toString('base64');
    await createECDSAKey(user?.id!, privateKeyBase64, publicKeyBase64)
    res.status(200).json({ privateKey: privateKeyBase64, publicKey: publicKeyBase64 })
  }else{
    eCDSAKey = await getECDSAKey(user?.id!)
    res.status(200).json({ privateKey: eCDSAKey?.privateKey!, publicKey: eCDSAKey?.publicKey! })
  }
}



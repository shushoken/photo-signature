import type {NextApiRequest, NextApiResponse} from "next";
import {upload} from "@/lib/upload";
import {verify} from "@/lib/verify";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getECDSAKey, getUserByEmail} from "@/lib/db";

type Data = {
    success: boolean
}

const {publicKey} = process.env
export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const path = await upload(req,res);
    const session = await getServerSession(req, res, authOptions);
    const user = await getUserByEmail(session?.user?.email!);
    let eCDSAKey = await getECDSAKey(user?.id!);
    const publicKey =eCDSAKey?.publicKey!;
    if (publicKey){
        const isSuccess = await verify(path, publicKey)
        res.status(200).json({success: isSuccess});
    }else {
        res.status(500).json({success: false});
    }
}

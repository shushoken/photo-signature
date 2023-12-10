import type {NextApiRequest, NextApiResponse} from 'next'
import {upload} from "@/lib/upload";
import {sign} from "@/lib/signature";
import {globalAny} from "@/lib/types";

type Data = {
    success: boolean,
    img:string
}

const {privateKey} = process.env

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
    if (privateKey){
        const signPath =await sign(path,privateKey);
        const re = /.+(\/sign)/;
        const newPath = signPath.replace(re, "$1");
        console.log(newPath);
        res.status(200).json({img: newPath, success: true});
    }
}

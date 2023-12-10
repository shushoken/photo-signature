import {ImagePath} from "@/lib/types";
import fs from "fs";
import { File } from "formidable";
import {parseFormAsync} from "@/lib/formidable";
import type {NextApiRequest, NextApiResponse} from "next";
import path from "path";

export async function upload(req: NextApiRequest, res: NextApiResponse) {
    const {fields, files} = await parseFormAsync(req);
    const file = (files["file"] as any as File[])[0];
    if (!file) {
        return "";
    }
    let dir = ImagePath;
    let picPath = saveFile(file, dir);
    return picPath
}

function saveFile(file: File, publicFolder: string): string {
    const fileExt = path.extname(file.originalFilename || "");
    if (!fs.existsSync(publicFolder)) {
        fs.mkdirSync(publicFolder, {recursive: true});
    }
    fs.renameSync(file.filepath, `${publicFolder}/${file.newFilename}${fileExt}`);
    return `${publicFolder}/${file.newFilename}${fileExt}`
}

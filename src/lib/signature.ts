import sharp from "sharp";
import {ImagePath} from "@/lib/types";
import fs from "fs";
import crypto from "crypto";
import eccrypto from 'eccrypto';
import path from "path";
import Jimp from "jimp";

export async function sign(srcPath: string, privateKey: string | Buffer) {
    console.log("====>>>>>>> 数字签名处理开始");
    const fileName = path.basename(srcPath);
    // 获取私钥,待接入数据
    const privateKeyBuffer = typeof privateKey == "string" ? Buffer.from(privateKey, 'base64') : privateKey;
    //生成签名
    let signature = "";
    //获取像素数据
    const pixelArray: number[] = []
    await Jimp.read(srcPath).then(async image => {
        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                pixelArray.push(image.getPixelColor(x, y));
            }
        }
    });
    const image = sharp(srcPath);
    const metadata = await image.metadata();
    //获取xmp数据
    const xmp = metadata.xmp;
    //合并待签名数据
    const buffer = xmp ? Buffer.concat([Buffer.from(pixelArray), xmp]) : Buffer.from(pixelArray);
    //计算待签名数据hash
    const hash = crypto.createHash('sha256').update(buffer).digest();
   
    console.log("====>>>>>>> 读取上传的图片像素数据成功!");
    console.log("====>>>>>>> 将图片的像素数据进行sha256计算，运行结果hash:" + hash.toString('base64'));
    console.log("====>>>>>>> 使用用户的ECDSA私钥对图片的像素hash数据进行签名加密。");
    console.log("====>>>>>>> 用户的ECDSA私钥:",privateKey);
    //使用eccrypto进行签名
    await eccrypto.sign(privateKeyBuffer, hash).then(function (sig) {
        signature = sig.toString('base64');
        //console.log("Signature in DER base64 format:", signature);
        console.log("====>>>>>>> 数字签名成功，图片签名（指纹）:",signature);
    });
    // 调试图片信息存储位置
    //console.log("xmp:" + metadata.xmp?.toString("utf-8"));
    //console.log("exif:" + metadata.exif?.toString("utf-8"));
    // console.log("icc:" + metadata.icc?.toString("utf-8"));
    // console.log("iptc:" + metadata.iptc?.toString("utf-8"));
    // console.log("pstiff:" + metadata.tifftagPhotoshop?.toString("utf-8"));
    // console.log("iptc:" + metadata.iptc?.toString("utf-8"));
    //写入exif数据并生成签名后的图片
    const signDir = `${ImagePath}/sign`;
    if (!fs.existsSync(signDir)) {
        fs.mkdirSync(signDir, {recursive: true});
    }
    const signPath = `${signDir}/${fileName}`;
    await image.withMetadata().withExif({
        IFD0: {
            Copyright: signature
        }
    }).toFile(signPath);
    console.log("====>>>>>>> 将数字签名写入图片元数据空间成功！");
    console.log("====>>>>>>> 数字签名处理完成");
    return signPath;
}


export async function jimpSign(srcPath: string) {
    // const fileName = path.basename(srcPath);
    //
    // const privateKeyBuffer = Buffer.from(privateKey, 'base64');
    // // 获取私钥,待接入数据
    // // privateKey = eccrypto.generatePrivate();
    // // console.log("privateKey = " + privateKey.toString('base64'));
    // // publicKey = eccrypto.getPublic(privateKeyBuffer);
    // // console.log("publicKey = " + publicKey.toString('base64'));
    // let signature: string = "";
    //
    // const signDir = `${ImagePath}/sign`;
    // if (!fs.existsSync(signDir)) {
    //     fs.mkdirSync(signDir, {recursive: true});
    // }
    // const signPath = `${signDir}/${fileName}`;
    // await Jimp.read(srcPath).then(async image => {
    //     const pixelArray = []
    //     for (let x = 0; x < image.bitmap.width; x++) {
    //         for (let y = 0; y < image.bitmap.height; y++) {
    //             if (y != 0) {
    //                 pixelArray.push(image.getPixelColor(x, y));
    //             }
    //
    //         }
    //     }
    //     // 处理图像
    //     const hash = crypto.createHash('sha256').update(Buffer.from(pixelArray)).digest(); // 生成图像的哈希值
    //     // crypto.createHmac()
    //     console.log("hash:" + hash.toString('base64'))
    //     await eccrypto.sign(privateKeyBuffer, hash).then(function (sig) {
    //         signature = sig.toString('hex');
    //         console.log("Signature in DER format:", signature);
    //     });
    //     // 将数字签名嵌入到图像像素RGB值中
    //     for (let x = 0; x < image.bitmap.width; x++) {
    //         for (let y = 0; y < image.bitmap.height; y++) {
    //             if (y == 0) {
    //                 let index = (x + y * image.bitmap.width) * 4; // 计算像素索引
    //
    //                 // const hex = image.getPixelColor(x, y); // e.g. 0xFF000FF
    //                 // const rgba = Jimp.intToRGBA(hex); // e.g. {r: 255, g: 255, b: 255, a:255}
    //                 const _r = parseInt(signature.substr(index, 1), 16);
    //                 index += 1;
    //                 const _g = parseInt(signature.substr(index, 1), 16);
    //                 index += 1;
    //                 const _b = parseInt(signature.substr(index, 1), 16);
    //                 index += 1;
    //                 const _a = parseInt(signature.substr(index, 1), 16);
    //                 // const r = rgba.r + _r;
    //                 // const g = rgba.g + _g;
    //                 // const b = rgba.b + _b;
    //                 // const a  = rgba.a + _a;
    //                 // console.log(`r:${r},g:${g},b:${b}`);
    //                 const hex2 = Jimp.rgbaToInt(_r, _g, _b, _a);
    //                 image.setPixelColor(hex2, x, y);
    //             }
    //         }
    //     }
    //     image.writeAsync(signPath);
    // }).catch(err => {
    //     console.error(err);
    // });
    // console.log("执行完成");

//     // 加载要修改的图片文件
//     const imageFile = 'path/to/image.jpg';
//     const imageBlob = await fetch(imageFile).then(response => response.blob());
//
// // 解析Exif数据
//     const exifData = await Pixifjs.load(imageBlob);
//
// // 修改Exif数据字段
//     exifData.tiff.DateTimeOriginal = new Date().toISOString(); //
//     // 将修改后的Exif数据写回图片文件
//     const modifiedImageBlob = await Pixifjs.insert(exifData, imageBlob);
//     const modifiedImageFile = URL.createObjectURL(modifiedImageBlob);
//     const signDir = `${ImagePath}/sign`;
//     if (!fs.existsSync(signDir)) {
//         fs.mkdirSync(signDir, {recursive: true});
//     }
//     const signPath = `${signDir}/${fileName}`;
// // 保存修改后的图片文件（这里将文件保存到本地）
//     const saveOptions = {type: 'image/jpeg', quality: 0.92};
//     await fetch(modifiedImageFile).then(response => response.blob()).then(blob => {
//         const url = URL.createObjectURL(blob);
//         const fs = require('fs');
//         fs.writeFile(signPath, blob, (err: any) => {
//             if (err) throw err;
//             console.log('The file has been saved!');
//         });
//     });
    // 将签名信息写入到到图片到exif中
    // const image = sharp(srcPath);
    // const signDir = `${ImagePath}/sign`;
    // if (!fs.existsSync(signDir)) {
    //     fs.mkdirSync(signDir, {recursive: true});
    // }
    // const signPath = `${signDir}/${fileName}`;
    // const dataWithMergedExif = await image
    //     .withExifMerge({
    //         IFD0: {
    //             Copyright: signature
    //         }
    //     })
    //     .toBuffer();
    // await savefile(signPath, dataWithMergedExif);
}



import eccrypto from "eccrypto";
import sharp from "sharp";
import crypto from "crypto";
// import exif from "exif-reader";
import * as ExifReader from 'exifreader';
import path from "path";
import Jimp from "jimp";

export async function verify(srcPath: string, publicKey: string | Buffer) {
    console.log("====>>>>>>> 数字签名验证处理开始");
    const fileName = path.basename(srcPath);
    // 获取公钥,待接入数据
    const publicKeyBuffer = typeof publicKey == "string" ? Buffer.from(publicKey, 'base64') : publicKey;
    //获取签名信息
    const tags = await ExifReader.load(srcPath);
    let signString =tags['Copyright']?.description;
    //签名数据不存在
    if (!signString) {
        return false;
    }
    //console.log(signString);
    console.log("====>>>>>>> 从图片的元数据空间读取数字签名成功，图片签名（指纹）:",signString);
    //获取待签名像素数据
    const pixelArray: number[] = []
    await Jimp.read(srcPath).then(async image => {
        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                pixelArray.push(image.getPixelColor(x, y));
            }
        }
    });
    //获取待签名xmp数据
    const metadata = await sharp(srcPath).metadata();
    const xmp = metadata.xmp;
    //合并待签名数据
    const buffer = xmp ? Buffer.concat([Buffer.from(pixelArray), xmp]) : Buffer.from(pixelArray);
    //对待签名数据进行hash
    const hash = crypto.createHash('sha256').update(buffer).digest();
    console.log("====>>>>>>> 将图片的像素数据进行sha256计算，运行结果hash:" + hash.toString('base64'));
    let isSuccess = false;
    // 验签
    console.log("====>>>>>>> 使用用户的ECDSA公钥对图片的像素hash数据进行签名校验。");
    console.log("====>>>>>>> 用户的ECDSA公钥:",publicKey);
    await eccrypto.verify(publicKeyBuffer, hash, Buffer.from(signString, 'base64')).then(function () {
        console.log("图片验证成功，您上传的图片内容与数字签名一致。");
        console.log("====>>>>>>> 数字签名验证处理结束");
        isSuccess = true;
    }).catch(function () {
        console.log("Signature is BAD");
        console.log("图片验证失败，您上传的图片内容与数字签名不一致，图片已经被篡改。");
        console.log("====>>>>>>> 数字签名验证处理结束");
        isSuccess = false;
    });
    console.log("====>>>>>>> 数字签名验证处理结束");
    return isSuccess;
}


export async function jimpVerify(srcPath: string, publicKey: string | Buffer) {
    const publicKeyBuffer = typeof publicKey == "string" ? Buffer.from(publicKey, 'base64') : publicKey;

    await Jimp.read(srcPath).then(async image => {
        let signString = '';
        const pixelArray = []
        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                if (y == 0) {
                    const index = (x + y * image.bitmap.width) * 4; // 计算像素索引
                    const hex = image.getPixelColor(x, y); // e.g. 0xFF000FF
                    const rgba = Jimp.intToRGBA(hex);
                    signString += rgba.r.toString(16) + rgba.g.toString(16) + rgba.b.toString(16) + rgba.a.toString(16); // 将RGB值转换为16进制字符串，并拼接为数字签名
                } else {
                    pixelArray.push(image.getPixelColor(x, y));
                }
            }
        }
// 处理图像
        const hash = crypto.createHash('sha256').update(Buffer.from(pixelArray)).digest(); // 生成图像的哈希值
        // crypto.createHmac()
        console.log("hash:" + hash.toString('base64'))
        // console.log("Signature in DER format:", signString);
        eccrypto.verify(publicKeyBuffer, hash, Buffer.from(signString, 'base64')).then(function () {
            console.log("Signature is OK");
            console.log("Signature is OK");
            return true;
        }).catch(function () {
            console.log("Signature is  BAD");
            return false;
        });
    });

}

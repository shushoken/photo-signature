'use client'

import { ChangeEvent, useCallback, useState } from 'react'
import { Redirect } from "@/lib/types";
import { VerifyInfo } from './verifyInfo';
import { EncryptInfo } from './encryptInfo';

export function UploadForm({ redirect }: { redirect: Redirect }) {
    const [file, setFile] = useState<File>()
    const [filePath, setFilePath] = useState<string>()
    const [encryptShow, setEncryptShow] = useState<boolean>(false) //显示验证结果
    const [verifyShow, setVerifyShow] = useState<boolean>(false) //显示验证结果
    const [verifyResult, setVerifyResult] = useState<boolean>(true) //验证结果 true：正常 false：失败
    const [downloadURL, setDownloadURL] = useState<string>("")
    const fileClasses = "block w-full items-center text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
    const buttonClasses =
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90';
    const buttonText = redirect == Redirect.ENCRYPT ? "数字签名" : "真伪检验";
    if (!filePath && redirect == Redirect.ENCRYPT) setFilePath("https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=4470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    if (!filePath && redirect == Redirect.VERIFY) setFilePath("https://plus.unsplash.com/premium_photo-1677093906217-9420a5f16322?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            setFile(e.target.files?.[0]);
            setFilePath(URL.createObjectURL(e.target.files?.[0]));
        }
    }
    const backClick = useCallback(() => {
        setVerifyShow(false)
        setVerifyResult(false)
    }, [])
    const handleClick = async () => {
        // 阻止表单提交行为
        // e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file)
            let res;
            switch (redirect) {
                case Redirect.ENCRYPT:
                    res = await fetch('/api/encrypt', {
                        method: 'POST',
                        body: data
                    })
                    const resultEncrypt = await res.json()
                    setEncryptShow(resultEncrypt.success)
                    setDownloadURL(resultEncrypt.img)
                    break;
                case Redirect.VERIFY:
                    res = await fetch('/api/verify', {
                        method: 'POST',
                        body: data
                    })
                    const resultVERIFY = await res.json()
                    setVerifyResult(resultVERIFY.success)
                    setVerifyShow(true)
                    console.log()
                    break;
            }
            // handle the error
            if (res && !res.ok) throw new Error(await res.text())
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }


    }

    return (

        <div>
            {encryptShow && redirect == Redirect.ENCRYPT ? (
                <div>
                    <EncryptInfo downloadURL={downloadURL} />
                </div>
            ) : verifyShow && redirect == Redirect.VERIFY ? (
                <div>
                    <VerifyInfo verifyResult={verifyResult} />
                    <button style={{ marginTop: "30px" }} className={buttonClasses} onClick={backClick}>返回</button>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: "20px" }}>
                        <img style={{ maxWidth: "400px" }}
                            src={filePath}
                            alt="Current profile photo" />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <input className={fileClasses}
                            type="file"
                            name="file"
                            onChange={onChange}
                        />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <button className={buttonClasses} onClick={handleClick}>{buttonText}</button>
                    </div>
                </>
            )}
        </div>
    )
}

import {Head} from "@/components/layout/head";
import {Content} from "@/components/layout/content";
import {Footer} from "@/components/layout/footer";
import {UploadForm} from "@/components/upload/page";
import {Redirect} from "@/lib/types";


export default function encrypt() {
    return (
        <main className="flex  flex-col items-center justify-between p-6">
            <div style={{ backgroundColor: "white", padding: "20px" }}>
                <div >
                    <h3 className="text-base font-semibold leading-7 text-gray-900">图片数字签名</h3>
                </div>
                <UploadForm  redirect={Redirect.ENCRYPT}/>
            </div>
        </main>
    )
}

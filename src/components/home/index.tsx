import {RedirectButton} from "@/components/navbutton";
import {Redirect} from "@/lib/types";

export function Home() {
    return (
        <div className='flex   items-center justify-center px-24'>
        <div>
            <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4">
                <a href="#" className="absolute z-50 -ml-10 mb-2.5 rounded-md border border-blue-gray-50 bg-blue-gray-50/50 p-1 opacity-0 hover:opacity-100 group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true" className="pointer-events-none h-3.5 w-3.5 rounded-lg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"></path>
                    </svg>
                </a>
                <h2 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug !mb-2 text-primary">图片数字签名</h2>
            </div>
            <p className="block antialiased font-sans text-base font-light leading-relaxed text-inherit !mb-4 !font-normal !text-gray-600">欢迎来到我们的图片数字签名系统。在这里，您可以安全地对您的图片进行数字签名，确保其完整性和真实性。我们的系统使用先进的ECDSA算法，为您的图片提供强大的保护。无论是个人的记忆瞬间还是重要的商业资料，您都可以依赖我们的技术来保障它们的安全。开始使用吧，上传您的图片，让我们帮助您保护每一张珍贵的影像。</p>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
                <a className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25" href="#">
                    <span className="my-6 grid h-24 w-24 place-items-center">
                        <svg className="mx-auto" width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.2084 11.0932C14.9388 11.0932 15.531 10.5035 15.531 9.77597C15.531 9.04848 14.9388 8.45874 14.2084 8.45874C13.4779 8.45874 12.8857 9.04848 12.8857 9.77597C12.8857 10.5035 13.4779 11.0932 14.2084 11.0932Z" fill="#1C274C" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM14.2084 13.5521C16.3025 13.5521 18 11.8615 18 9.77606C18 7.6906 16.3025 6 14.2084 6C12.1144 6 10.4169 7.6906 10.4169 9.77606C10.4169 10.742 10.8578 11.4446 10.8578 11.4446L6.27264 16.011C6.0669 16.2159 5.77886 16.7486 6.27264 17.2404L6.8017 17.7673C7.00743 17.9429 7.52471 18.1888 7.94796 17.7673L8.56519 17.1526C9.18242 17.7673 9.88782 17.416 10.1523 17.0647C10.5932 16.45 10.0642 15.8353 10.0642 15.8353L10.2405 15.6597C11.087 16.5027 11.8277 16.011 12.0922 15.6597C12.5331 15.045 12.0922 14.4303 12.0922 14.4303C12.0403 14.3269 11.9731 14.2539 11.9153 14.1912C11.777 14.041 11.693 13.9498 12.004 13.64L12.5331 13.113C12.9564 13.4643 13.8264 13.5521 14.2084 13.5521Z" fill="#1C274C" />

                        </svg>
                    </span>
                    <RedirectButton redirect={Redirect.KEY} text={"密钥管理"} />
                </a>
                <a className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25" href="#">
                    <span className="my-6 grid h-24 w-24 place-items-center">
                        <svg className="mx-auto" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24.26 32h-16.521c-0.708 0-1.281-0.573-1.281-1.281v-12.224c0-0.708 0.573-1.286 1.281-1.286h1.552v-1.974c0-3.698 3.010-6.708 6.708-6.708s6.708 3.010 6.708 6.708v1.974h1.552c0.708 0 1.281 0.578 1.281 1.286v12.224c0 0.708-0.573 1.281-1.281 1.281zM16.839 25.24c1.521-0.859 0.911-3.182-0.839-3.182-1.745 0.005-2.354 2.318-0.839 3.182v1.656c0 1.115 1.677 1.115 1.677 0zM13.141 17.208h5.724v-1.974c0-1.578-1.286-2.859-2.865-2.859s-2.859 1.281-2.859 2.859zM6.063 15.391h-3.984c-0.651 0-1.172-0.526-1.172-1.172s0.521-1.172 1.172-1.172h3.984c0.646 0 1.172 0.526 1.172 1.172s-0.526 1.172-1.172 1.172zM8.87 9.12c-0.271 0-0.531-0.094-0.74-0.271l-3.156-2.594c-0.5-0.406-0.568-1.146-0.156-1.646 0.406-0.5 1.146-0.573 1.646-0.161l3.156 2.594c0.849 0.698 0.349 2.078-0.75 2.073zM16 6.359c-0.646 0-1.172-0.526-1.172-1.172v-4.016c0-0.646 0.526-1.172 1.172-1.172s1.172 0.526 1.172 1.172v4.016c0 0.646-0.526 1.172-1.172 1.172zM23.13 9.12c-1.104 0-1.599-1.38-0.75-2.078l3.156-2.594c1.208-0.99 2.693 0.818 1.49 1.813l-3.156 2.594c-0.208 0.172-0.469 0.266-0.74 0.266zM29.922 15.391h-4.021c-0.651 0-1.172-0.526-1.172-1.172s0.521-1.172 1.172-1.172h4.021c0.651 0 1.172 0.526 1.172 1.172s-0.521 1.172-1.172 1.172z" fill="#1C274C"></path>
                        </svg>
                    </span>
                    <RedirectButton redirect={Redirect.ENCRYPT} text={"图片数字签名"} />
                </a>
                <a className="grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white px-3 py-2 transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25" href="#">
                    <span className="my-6 grid h-24 w-24 place-items-center">
                        <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            width="80px" height="80px" viewBox="0 0 509.604 509.604" >
                            <g>
                                <g>
                                    <path d="M34.262,333.282c8.119,6.75,14.793,15.223,14.143,20.988c-0.382,3.443-0.593,6.943-0.593,10.5
        c0,52.393,41.3,94.861,92.24,94.861c6.292,0,12.431-0.65,18.37-1.885c10.002-2.074,21.812,1.941,28.888,9.793
        c16.82,18.646,40.803,30.342,67.492,30.342c28.19,0,53.426-13.016,70.342-33.518c6.723-8.146,18.103-11.533,28.22-8.5
        c8.166,2.447,16.811,3.768,25.751,3.768c50.939,0,92.24-42.477,92.24-94.861c0-5.861-0.535-11.59-1.549-17.145
        c-1.712-9.371,2.85-21.047,10.471-28.363c18.025-17.289,29.328-41.883,29.328-69.242c0-29.787-13.368-56.323-34.263-73.698
        c-8.118-6.751-14.793-15.224-14.143-20.99c0.383-3.442,0.593-6.942,0.593-10.5c0-52.393-41.301-94.86-92.24-94.86
        c-6.292,0-12.431,0.65-18.369,1.884c-10.002,2.075-21.812-1.941-28.889-9.792c-16.82-18.647-40.803-30.342-67.492-30.342
        c-26.688,0-50.671,11.695-67.492,30.342c-7.076,7.841-18.886,11.867-28.888,9.792c-5.938-1.234-12.078-1.884-18.37-1.884
        c-50.939,0-92.24,42.477-92.24,94.86c0,5.049,0.392,10.002,1.147,14.832c1.262,8.128-4.447,18.149-12.747,24.681
        C14.219,201.663,0,228.887,0,259.583C0,289.37,13.368,315.907,34.262,333.282z M131.475,263.016
        c2.046-3.625,7.268-3.672,12.049,0.479l48.119,33.918c2.61,1.588,5.106,2.4,7.506,2.4c4.963,0,8.893-3.576,12.689-7.02
        l153.985-154.138c9.629-10.471,18.99-14.162,25.102-10.146c2.82,1.855,4.646,4.647,5.135,7.87
        c0.583,3.825-0.756,7.946-3.768,11.599l-185.149,224.91c-2.687,3.26-6.11,5.059-9.629,5.059c-4.179,0-7.965-2.516-10.404-6.895
        l-54.344-97.969C130.519,269.422,130.021,265.618,131.475,263.016z"  fill="#1C274C"/>
                                </g>
                            </g>
                        </svg>
                    </span>
                    <RedirectButton redirect={Redirect.VERIFY} text={"验证图片真伪"} />
                </a>

            </div>


        </div>
    </div>
    );
}

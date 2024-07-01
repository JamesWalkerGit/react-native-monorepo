import * as React from "react"
import { SVGProps } from "react"
const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <g fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
            <path
                fill="#4285F4"
                d="M39.2 20.455c0-1.419-.127-2.782-.364-4.091H20V24.1h10.764c-.464 2.5-1.873 4.618-3.991 6.036v5.019h6.463c3.782-3.482 5.964-8.61 5.964-14.7Z"
            />
            <path
                fill="#34A853"
                d="M20 40c5.4 0 9.927-1.79 13.236-4.846l-6.463-5.018c-1.791 1.2-4.082 1.91-6.773 1.91-5.21 0-9.618-3.519-11.19-8.246H2.126v5.182C5.418 35.518 12.182 40 20 40Z"
            />
            <path
                fill="#FBBC05"
                d="M8.81 23.8c-.4-1.2-.628-2.482-.628-3.8 0-1.318.227-2.6.627-3.8v-5.182H2.127A19.992 19.992 0 0 0 0 20c0 3.227.773 6.282 2.127 8.982L8.81 23.8Z"
            />
            <path
                fill="#EA4335"
                d="M20 7.955c2.936 0 5.573 1.009 7.645 2.99l5.737-5.736C29.918 1.982 25.39 0 20 0 12.182 0 5.418 4.482 2.127 11.018L8.81 16.2C10.382 11.473 14.791 7.955 20 7.955Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h40v40H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default GoogleIcon

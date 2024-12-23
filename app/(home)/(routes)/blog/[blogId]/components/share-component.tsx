"use client"
import { FC } from 'react'

import {

    FacebookShareButton,

    LinkedinShareButton,

    TwitterShareButton,

} from 'react-share'
import Compact from 'antd/es/space/Compact'
import { FacebookIcon } from '@/constants/icons/facebook'
import { LinkedInIcon } from '@/constants/icons/linkedin'
import { TwitterIcon } from '@/constants/icons/twitter'


interface SharedCardProp {
    id: string
    title: string
}

const ShareCard: FC<SharedCardProp> = ({ id, title }) => {

    const url = `${process.env.NEXT_PUBLIC_FRONTEND_API}/blog/${id}`

    return (
        <div className="relative max-w-[672px] mt-7 mx-auto px-3">
            <Compact className="gap-10">
                <FacebookShareButton
                    url={url}
                    title={title}
                >
                    <div className=" ">
                        <FacebookIcon color="#23342A" />
                    </div>
                </FacebookShareButton>


                <LinkedinShareButton
                    url={url}
                    title={title}
                >
                    <div className="">
                        <LinkedInIcon color="#23342A" />
                    </div>
                </LinkedinShareButton>

                <TwitterShareButton
                    url={url}
                    title={title}
                >
                    <div className="">
                        <TwitterIcon color="#23342A" />
                    </div>
                </TwitterShareButton>
            </Compact>
        </div>
    )
}

export default ShareCard

import { Typography } from "@/components/typography/typography";
import db from "@/db/db";
import React from "react";
import { Crumb } from "@/components/crumb/crumb";

import { Wrapper } from "@/components/wrapper/wrapper";
import Image from "next/image";
import SafeHTML from "./components/safe-html";
import MoreArticles from "./components/more-articles";
import { Blog } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import ShareCard from "./components/share-component";
import { timeAgo } from "@/utils/helper";

export const revalidate = 0;

interface BlogSinglePageProps {
    params: { blogId: string };
}

export const dynamicParams = true;


export async function generateStaticParams() {
    const blogs = await db.blog.findMany({})
    return blogs.map((blog: Blog) => ({
        id: blog.id,
    }));
}

export async function generateMetadata(
    { params }: BlogSinglePageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.blogId;

    // fetch data
    const blog = await db.blog.findUnique({ where: { id } })

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    if (!blog) {
        return {
            title: "Not Found",
            description: `Product does not exist`,
        };
    }

    return {
        title: blog?.title,
        description: blog?.description,
        openGraph: {
            images: [blog?.img, ...previousImages],
        },
    };
}

export default async function BlogSinglePage({ params }: BlogSinglePageProps) {
    const id = params.blogId
    const blog = await db.blog.findUnique({
        where: { id },
        include: {
            blogCategory: true
        },
    });

    const relatedBlogs = await db.blog.findMany({
        where: {
            blogCategoryId: blog.blogCategoryId,
            NOT: {
                id: blog.id
            }
        },
        include: {
            blogCategory: true
        },
    });


    return (
        <Wrapper>
            <div className="bg-gray-100">
                <div className="py-10 lg:px-0 px-4">
                    <Crumb
                        crumbData={[
                            {
                                text: "Home",
                                href: "/",
                            },
                            {
                                text: "Blog",
                                href: "/blog",
                            },
                            {
                                text: blog?.blogCategory.name as string,
                                href: "#",
                            },
                            {
                                text: "Blog",
                                href: "",
                            },
                        ]}
                    />
                </div>
                <div className="max-w-[672px] mx-auto mt-10 lg:px-0 px-4">
                    <Typography
                        as="h4"
                        size="h4"
                        align="left"
                        className="font-bold text-4xl black-100 mb-2"
                    >
                        {blog?.title}
                    </Typography>
                    <Typography
                        as="h4"
                        size="h4"
                        align="left"
                        className="font-semibold text-[15px] black-100 "
                    >
                        {blog?.description}
                    </Typography>
                    <div className="flex gap-x-6 items-center">
                        <Typography
                            as="h4"
                            size="h4"
                            align="left"
                            className="font-bold leading-10 text-sm black-300"
                        >
                            {timeAgo(blog.createdAt).replace("about ", "")}
                        </Typography>
                        <Typography
                            as="h4"
                            size="h4"
                            align="left"
                            className="leading-10 text-sm px-4 font-black green"
                        >
                            {blog?.blogCategory.name}
                        </Typography>
                    </div>
                </div>
                <ShareCard id={id} title={blog.title} />
                <div className="mx-auto max-w-[902px] mt-6 mb-10 lg:px-0">
                    <Image
                        alt={blog?.title}
                        src={blog?.img}
                        priority
                        height={503}
                        width={902}
                        className="md:rounded-2xl"
                    />

                </div>
                <div className="max-w-[672px] mx-auto lg:px-0 px-4">
                    <SafeHTML content={blog?.text} />
                </div>
                <MoreArticles blog={relatedBlogs} />
            </div>
        </Wrapper>
    );
};



import { Typography } from "@/components/typography/typography";
import db from "@/db/db";
import React from "react";
import ArticleCard from "@/components/card/article-card";
import { Wrapper } from "@/components/wrapper/wrapper";

import MoreArticles from "./[blogId]/components/more-articles";
import { timeAgo } from "@/utils/helper";


export const revalidate = 0;

export default async function BlogsPage() {
    const blog = await db.blog.findMany({
        where: {
            status: "PUBLISHED"
        },
        include: {
            blogCategory: true
        },
        orderBy: {
            createdAt: "asc"
        }
    });


    return (
        <Wrapper>
            <main className="">
                <section className="mb-8 mt-10">
                    <Typography
                        as="h4"
                        size="h4"
                        align="left"
                        className="mb-8 font-bold leading-10 text-4xl black-100 px-4"
                    >
                        Most Read
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:px-0 px-4">
                        {blog.map((article, index) => (
                            <ArticleCard
                                key={index}
                                id={article.id}
                                odd={(index + 1) % 3 === 2}
                                title={article.title}
                                category={article.blogCategory.name}
                                time={timeAgo(article?.createdAt)}
                                image={article.img}
                            />
                        ))}
                    </div>
                </section>
               <MoreArticles blog={blog} />
            </main>
        </Wrapper>
    );
};




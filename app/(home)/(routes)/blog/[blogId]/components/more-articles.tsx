import { Button } from "@/components/button/button"
import { Typography } from "@/components/typography/typography"
import { Blog, BlogCategory } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { timeAgo } from "../../page"

const MoreArticles: React.FC<{ blog: (Blog & { blogCategory: BlogCategory })[] }> = ({ blog }) => {
    return blog?.length ? <section className="mt-16">
        <Typography
            as="h4"
            size="h4"
            align="left"
            className="mb-8 font-bold leading-10 text-4xl black-100 px-4"
        >
            More Articles
        </Typography>
        <div className="flex flex-col gap-4 md:px-0 px-4">
            {blog.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`}>
                    <div
                        className="md:flex items-start gap-4 mb-7"
                    >
                        <Image
                            width={213}
                            height={113}
                            priority
                            src={article.img}
                            alt={article.title}
                            className="object-cover md:w-auto w-full md:mb-0 mb-4 rounded-lg"
                        />
                        <div>
                            <div className="mb-2 flex items-center gap-x-4">
                                <Typography size="s2" as="p" align="left" className="text-xs font-bold black-300">{timeAgo(article.createdAt).replace("about ", "")}</Typography>
                                <Typography size="s2" as="p" align="left" className="font-black text-xs green">{article.blogCategory.name}</Typography>
                            </div>

                            <Typography size="h4" as="h4" align="left" className="font-bold text-lg mb-2">{article.title}</Typography>
                            <Typography size="h4" as="h4" align="left" className="font-semibold text-sm mb-2">{article.description}</Typography>

                            <Link href={`/blog/${article.id}`}>
                                <Button size="lg" color="light" className="h-9 flex items-center justify-center">
                                    Read More
                                </Button>
                            </Link>

                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </section> : null
}

export default MoreArticles
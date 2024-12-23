"use client";

import { Card } from "@/components/ui/card";

import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";
import { UploadImageForm } from "@/components/form/add-product/upload-image-form";
import { Typography } from "@/components/typography/typography";

import { Button } from "@/components/button/button";
import { ICON } from "@/constants/icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Blog, BlogCategory, BLOGSTATUS } from "@prisma/client";
import { allBlogSchema } from "./all-blog-schema";
import { BlogDetailsForm } from "./blog-detail-form";
import { BlogCategoryForm } from "./blog-category";
import { useCategoryBlogDrawer } from "@/hooks/use-category-blog-drawer";
import { WYSIWYGForm } from "./wysisyg-editor";


export default function AddBlog({ blog }: { blog?: Blog & { blogCategory: BlogCategory } }) {
    const { toggleNotification } = useNotification()
    const { toggleDrawer } = useCategoryBlogDrawer();
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const queryClient = useQueryClient();
    const Axios = useAxios()
    const isEdit = (blog?.id.length ?? 0) > 0
    const url = blog?.img;
    const btnRef = useRef<HTMLButtonElement>(null);
    const btnRef2 = useRef<HTMLButtonElement>(null);
    const btnRef3 = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if ((blog?.id.length ?? 0) > 0) {
            queryClient.setQueryData(["EDIT_BLOG"], () => ({
                id: blog?.id,
                title: blog?.title,
                description: blog?.description,
                categoryId: blog?.blogCategory.id,
                urls: [url]
            }));
            queryClient.setQueryData(["EDIT_PRODUCT"], () => ({
                images: [url]
            }));
        }
        // @react-hooks/exhaustive-deps
    }, [blog])

    const reset = () => {
        queryClient.setQueryData(["CREATE_BLOG"], null);
        queryClient.setQueryData(["EDIT_BLOG"], null);
        queryClient.setQueryData(["CREATE_PRODUCT"], null);
        btnRef.current?.click()
        btnRef2.current?.click()
        btnRef3.current?.click()
        if (isEdit) {
            router.push('/dashboard/contents')
        }
    }

    const { mutate } = useMutation({
        mutationKey: [isEdit ? "EDIT_BLOG" : "CREATE_BLOG"],
        mutationFn: async (state: BLOGSTATUS) => {
            setLoading(true);

            try {
                // Simulate delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                let image: {images: string[]};
                // Fetch the blog from the cache
                let blog = queryClient.getQueryData([isEdit ? "EDIT_BLOG" : "CREATE_BLOG"]) as Blog & {blogId: string}
                if (isEdit) {
                    image = queryClient.getQueryData(['EDIT_PRODUCT']) 
                } else {
                    image = queryClient.getQueryData(['CREATE_PRODUCT'])
                }

                if (isEdit) {
                    
                    blog = {
                        ...blog,
                        img: image.images[0],
                        blogId: params?.blogId as string,
                        status: state
                    }
                }

                console.log(blog);

                // Validate the blog schema
                await allBlogSchema.validate({...blog, img: image.images[0]});

                // Send the API request
                if (isEdit) {
                    await Axios.put(`/blog`, blog);
                } else {
                    await Axios.post(`/blog`, {...blog, img: image.images[0], status: state});
                }

                // Notify success
                toggleNotification({
                    show: true,
                    title: isEdit ? "Blog Updated" : "Blog Created",
                    type: "success",
                    message: `Blog has been ${isEdit ? "updated" : "created"} successfully`,
                });
                reset();
            } catch (error) {
                // Handle errors
                if (error) {
                    const errorList = String(error)?.split(":");
                    toggleNotification({
                        show: true,
                        title: errorList[1],
                        type: "error",
                        message: errorMessage[errorList[1].trim() as keyof typeof errorMessage],
                    });
                } else {
                    toggleNotification({
                        show: true,
                        title: isEdit ? "Update Blog Error" : "Create Blog Error",
                        type: "error",
                        message:
                            (error as AxiosError<{ message: string }>).response?.data.message ?? "An error occurred",
                    });
                }
            } finally {
                setLoading(false);
            }
        },
    });


    return (
        <div className="container mx-auto mt-6 overflow-hidden">
            {/* Header */}
            <DashboardTitleHeader
                title={isEdit ? "Edit Blog Post" : "Create Blog Post"}
                discard={reset}
                addItem={() => mutate('PUBLISHED')}
                btnText={isEdit ? "Update" : "Create Blog Post"}
                loading={loading}
                extra={() => mutate('DRAFT')}
            />

            <div className="grid gap-6 md:grid-cols-2">
                {/* Blog Details */}
                <Card className="px-4 pt-6 h-[380px]">
                    <Typography size="s1" as="p" align="left" className="mb-4">
                        Post Details
                    </Typography>
                    <BlogDetailsForm btnRef={btnRef} blog={blog} />
                    <div className="mt-5">
                        <BlogCategoryForm btnRef={btnRef3} categoryId={blog?.blogCategory?.id} />
                        <div className="flex justify-end mt-6">
                            <Button
                                size="lg"
                                color="light"
                                className="border-0 bg-black-600 black-100"
                                iconR={ICON.PlusCircleIcon}
                                onClick={() => toggleDrawer(true)}
                            >
                                Add New Category
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Blog Image */}
                <Card className="px-4 pt-6 h-[248px]">
                    <div className="flex items-center justify-between mb-4">
                        <Typography size="s1" as="p" align="left" className="">
                            Cover Image
                        </Typography>

                    </div>
                    <UploadImageForm count={1} btnRef={btnRef2} urls={[url as string]} />
                </Card>

            </div>

            <div className="mt-8">
                <WYSIWYGForm text={blog?.text} />
            </div>
        </div>
    );
}

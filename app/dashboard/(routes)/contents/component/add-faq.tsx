"use client";

import { Card } from "@/components/ui/card";

import { DashboardTitleHeader } from "@/components/dashboard-header/dashboard-header";
import { Typography } from "@/components/typography/typography";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { errorMessage } from "@/utils/helper";
import { useNotification } from "@/hooks/use-notification";
import { useAxios } from "@/hooks/use-axios";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FAQSTATUS, Faq } from "@prisma/client";
import { allFaqSchema } from "./all-blog-schema";
import { FAQDetailsForm } from "./faq-detail-form";



export default function AddFaq({ faq }: { faq?: Faq }) {
    const { toggleNotification } = useNotification()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const queryClient = useQueryClient();
    const Axios = useAxios()
    const isEdit = (faq?.id.length ?? 0) > 0
    const btnRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if ((faq?.id.length ?? 0) > 0) {
            queryClient.setQueryData(["EDIT_FAQ"], () => ({
                id: faq?.id,
                question: faq?.question,
                answer: faq?.answer,
                status: faq.status
            }));

        }
    }, [faq])

    const reset = () => {
        queryClient.setQueryData(["CREATE_FAQ"], null);
        queryClient.setQueryData(["EDIT_FAQ"], null);
        btnRef.current?.click()
        if (isEdit) {
            router.push('/dashboard/contents?tab=FAQs')
        }
    }

    const { mutate } = useMutation({
        mutationKey: [isEdit ? "EDIT_FAQ" : "CREATE_FAQ"],
        mutationFn: async (state: FAQSTATUS) => {
            setLoading(true);

            try {
                // Simulate delay
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Fetch the faq from the cache
                let faq = queryClient.getQueryData([isEdit ? "EDIT_FAQ" : "CREATE_FAQ"]) as Faq & { faqId: string }
                if (isEdit) {

                    faq = {
                        ...faq,
                        faqId: params?.faqId as string,
                        status: state
                    }
                }

                console.log(faq);

                // Validate the faq schema
                await allFaqSchema.validate(faq);

                // Send the API request
                if (isEdit) {
                    console.log('[EDIT]');
                    
                    await Axios.put(`/faq`, faq);
                } else {
                    console.log('[CREATE]');
                    await Axios.post(`/faq`, { ...faq, status: state });
                }

                // Notify success
                toggleNotification({
                    show: true,
                    title: isEdit ? "FAQ Updated" : "FAQ Created",
                    type: "success",
                    message: `FAQ has been ${isEdit ? "updated" : "created"} successfully`,
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
                        title: isEdit ? "Update FAQ Error" : "Create FAQ Error",
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
                title={isEdit ? "Edit FAQ" : "Create FAQ"}
                discard={reset}
                addItem={() => mutate('PUBLISHED')}
                btnText={isEdit ? "Update" : "Create FAQ"}
                loading={loading}
                extra={() => mutate('DRAFT')}
            />

            <div className="grid gap-6 md:grid-cols-2">
                {/* FAQ Details */}
                <Card className="px-4 pt-6 h-[280px]">
                    <Typography size="s1" as="p" align="left" className="mb-4">
                        FAQ Details
                    </Typography>
                    <FAQDetailsForm btnRef={btnRef} faq={faq} />
                </Card>
            </div>
        </div>
    );
}

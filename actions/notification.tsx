"use server"

import db from '@/db/db';
import webpush from 'web-push'

export const sendNotification = async (
    message: string,
    user_id: string,
    icon: string,
    name: string
) => {
    const vapidKeys = {
        publicKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY
    }

    webpush.setVapidDetails(
        "mailto:muserId@email.com",
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    try {
        const notification = await db.notifications.findMany({
            where: {
                userId: user_id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 1
        })

        await webpush.sendNotification(
            JSON.parse(notification[0].notification),
            JSON.stringify({
                message: name,
                icon,
                body: message,

            })
        );

        return "{}"

    } catch (error) {
        return JSON.stringify({error: error.message})
    }
}



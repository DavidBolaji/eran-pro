"use server"

import db from '@/db/db';
import webpush from 'web-push'
// import sharp from 'sharp';
// import path from 'path';

// const resizeIcon = async (iconFilename: string) => {
//     const iconPath = path.join(process.cwd(), 'public', iconFilename);
//     return sharp(iconPath).resize(72, 72).toFormat('png').toBuffer();
// };

webpush.setVapidDetails(
    'https://buyeranpro.com',
    process.env.NEXT_PUBLIC_VAPID_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export const sendNotification = async (
    message: string,
    user_id: string,
    icon: string,
    name: string
) => {
    // const resizedIcon = await resizeIcon(icon.replace("/",""));
    const vapidKeys = {
        publicKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        privateKey: process.env.VAPID_PRIVATE_KEY
    }

    webpush.setVapidDetails(
        "https://buyeranpro.com",
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
                title: name,
                icon,
                body: message,

            })
        );

        return "{}"

    } catch (error) {
        return JSON.stringify({ error: error.message })
    }
}

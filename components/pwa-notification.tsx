import db from "@/db/db";
import { useUser } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { BellOff, BellRing } from "lucide-react";
import { useEffect, useState } from "react";

const PwaNotification = () => {
    const { user, loading } = useUser();
    const queryClient = useQueryClient()
    const [notificationPermission, setNotificationPermission] = useState<
        "granted" | "denied" | "default"
    >("granted")

    const showNotification = () => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                setNotificationPermission(permission);
                if (permission === "granted") {
                    subscribeUser()
                } else {
                    console.log('please enter setting to enable notification');
                }
            })
        } else {
            console.log('browser does not support notification');
        }
    }

    const subscribeUser = async () => {
        if ("serviceworker" in navigator) {
            try {
                const registeration = await navigator.serviceWorker.getRegistration();
                if (registeration) {
                    generateSubscribeEndPoint(registeration)
                } else {
                    const newRegistration = await navigator.serviceWorker.register("/sw.js")
                    generateSubscribeEndPoint(newRegistration)

                }

            } catch (error) {
                console.log('Error during registeration or subscription', error.message)
            }
        }
    }

    const generateSubscribeEndPoint = async (newRegisteration: ServiceWorkerRegistration) => {
        const applicationServerKey = process.env.NEXT_PUBLIC_VAPID_KEY;

        const options = {
            applicationServerKey,
            userVisibilityOnly: true
        }

        const subscription = await newRegisteration.pushManager.subscribe(options)
        try {
            await db.notifications.create({
                data: {
                    notification: JSON.stringify(subscription),
                    userId: user?.id
                }
            })
            queryClient.invalidateQueries({ queryKey: ["USER"] })

        } catch (error) {
            console.log(error.message)
        }
    }

    const removeNotification = async () => {
        setNotificationPermission("denied");

        try {
            await db.notifications.deleteMany({
                where: {
                    userId: user.id as string
                }
            })
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        } catch (error) {
            console.log('Error during registeration or subscription', error.message)
        }
    }

    useEffect(() => {
        setNotificationPermission(Notification.permission)
    }, [])

    if (loading) {
        return null
    }

    return (
        <div className="hover:scale-110 cursor-pointer transition-all">
            {notificationPermission === "granted" && user?.Notifications ? (
                <BellRing onClick={removeNotification} />
            ) : (
                <BellOff onClick={showNotification} />
            )}

        </div>
    )
}

export default PwaNotification
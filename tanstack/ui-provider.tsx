"use client"
import { PropsWithChildren } from "react"
import { AnimatePresence, motion } from "framer-motion";


const UIProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <AnimatePresence mode="wait">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}

        </motion.div>
    </AnimatePresence>
}

export default UIProvider;
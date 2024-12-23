import Image from "next/image";
import { Typography } from "../typography/typography";
import Link from "next/link";

const ArticleCard = ({ title, category, time, image, odd, id }) => {

    if (odd) {
        return (
            <Link href={`/blog/${id}`}>
                <div className="relative col-span-1 group h-80 w-full mb-6 md:mb-0">
                    <Image width={328} height={320} priority src={image} alt={title} className="w-full h-full object-center  object-cover rounded-lg" />
                    <div className="absolute inset-0  flex flex-col justify-end p-4 rounded-lg bg-gradient-to-b from-transparent to-[rgba(31,31,31,0.88)]">
                        <div className="mt-6 mb-4 flex gap-2 items-center">
                            <Typography align="left" as="p" size="s2" className="text-xs text-white">{time.replace("about ", "")}</Typography>
                            <Typography align="left" as="p" size="s2" className="text-white text-xs font-black">{category}</Typography>
                        </div>
                        <Typography align="left" as="h4" size="h4" className="text-white text-xl font-bold">{title}</Typography>
                        {/* <h3 className="text-white font-bold text-sm">{title}</h3> */}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${id}`}>
            <div className="relative group col-span-1 h-80 w-full">
                <div className="h-[183px] w-full">
                    <Image width={328} height={183} priority src={image} alt={title} className="w-full h-48 object-cover rounded-lg bg-white" />

                </div>
                <div className="mt-6 mb-4 flex justify-between items-center">
                    <Typography align="left" as="p" size="s2" className="black-300 text-xs">{time.replace("about ", "")}</Typography>
                    <Typography align="left" as="p" size="s2" className="black-300 text-xs font-black green">{category}</Typography>
                </div>
                <Typography align="left" as="h4" size="h4" className="black-100 text-xl font-bold">{title}</Typography>
            </div>

        </Link>
    );
};

export default ArticleCard;

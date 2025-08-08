import { formatDate } from "@/lib/formDate";

interface NewsCardProps {
    image?: string;
    date: string;
    title: string;
    ubication: string;
}

function NewsCard({ title, date, ubication, image }: NewsCardProps) {
    return (
        <article className="bg-brand text-tertiary p-4 rounded shadow-2xl grid grid-cols-1 sm:grid-cols-3 items-center gap-4">

            <figure className="flex justify-center sm:justify-start">
                <img
                    src={image || "/logo-eapiis.png"}
                    alt=""
                    className="w-full max-w-48 sm:max-w-60 h-32 sm:max-h-30 object-cover rounded"
                />
            </figure>

            <div className="flex flex-col gap-y-3 sm:gap-y-4 sm:col-span-2 font-bold justify-center items-start">
                <span className=" text-base w-full px-2">
                    {formatDate(date)}
                </span>
                <h3 
                    className="text-white  text-lg font-bold w-full px-2 min-w-0" 
                    title={title}
                >
                    <span className="sm:hidden line-clamp-2 leading-tight">
                        {title}
                    </span>
                    <span className="hidden sm:block truncate">
                        {title}
                    </span>
                </h3>
                <span 
                    className="text-base w-full px-2 truncate" 
                    title={ubication}
                >
                    {ubication}
                </span>
            </div>
        </article>
    );
}

export default NewsCard;
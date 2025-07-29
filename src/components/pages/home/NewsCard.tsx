import { formatDate } from "@/lib/formDate";

interface NewsCardProps {
    image?: string;
    date: string;
    title: string;
    ubication: string;
}

function NewsCard({ title, date, ubication, image }: NewsCardProps) {
    return (
        <article className="bg-brand text-tertiary p-4 rounded shadow-2xl grid grid-cols-3 items-center">
            <figure className="">
                <img
                    src={image || "/logo-eapiis.png"}
                    alt=""
                    className="w-60 max-h-30 object-cover"
                />
            </figure>
            <div className="flex flex-col gap-y-4 items-center col-span-2 font-bold text-xl justify-center">
                <span>{formatDate(date)}</span>
                <span className="text-white text-center">{title}</span>
                <span className="text-center">{ubication}</span>
            </div>
        </article>
    );
}

export default NewsCard;

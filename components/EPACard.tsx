import Link from "next/link";
import BookmarkIcon from "@mui/icons-material/BookmarkRounded";
import useBookmark from "../utils/hooks/useBookmark";

type EPACardProps = {
    code: string;
    title: string;
    stage: "TTD" | "FOD" | "COD" | "TTP";
};

export default function EPACard({ code, title, stage }: EPACardProps) {
    const [bookmarked, toggleBookmark] = useBookmark("EPA", code);

    let color = "";
    switch (stage) {
        case "TTD":
            color = "bg-gradient-to-br from-cyan-400 to-cyan-500";
            break;
        case "FOD":
            color = "bg-gradient-to-br from-green-500 to-green-600";
            break;
        case "COD":
            color = "bg-gradient-to-br from-orange-400 to-orange-500";
            break;
        case "TTP":
            color = "bg-gradient-to-br from-purple-600 to-purple-700";
            break;
    }

    return (
        <div
            className={`h-full flex justify-start items-center flex-wrap gap-2 text-white p-4 rounded-lg w-full ${color} shadow-lg cursor-pointer relative transition hover:translate-x-2 hover:translate-y-2 hover:shadow-md`}
        >
            <Link href={`/EPA/${code.toUpperCase()}`}>
                <a className='flex flex-col justify-start items-start'>
                    <span className='text-2xl font-bold'>{code}</span>
                    <br />
                    <span className='text-md font-medium'>{title}</span>
                </a>
            </Link>
            <BookmarkIcon
                className={`absolute top-2 right-4 ${
                    bookmarked ? "text-yellow-400" : "text-white-500"
                } transition origin-top hover:scale-y-125 ${bookmarked && "animate-stretch"}`}
                fontSize='large'
                onClick={() => toggleBookmark()}
            />
        </div>
    );
}

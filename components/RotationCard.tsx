import BookmarkIcon from "@mui/icons-material/BookmarkRounded";
import Link from "next/link";
import { db } from "../db";
import { useState, useEffect } from "react";
import useBookmark from "../utils/hooks/useBookmark";

type RotationCardProps = {
    name: string;
    slug: string;
};

export default function RotationCard({ name, slug }: RotationCardProps) {
    const [bookmarked, toggleBookmark] = useBookmark("Rotation", slug);

    return (
        <div
            className={`flex justify-center items-center text-white text-xl font-bold text-center p-4 rounded-lg w-full h-28 bg-gradient-to-br from-sky-600 to-sky-700 shadow-lg cursor-pointer relative transition hover:translate-x-2 hover:translate-y-2 hover:shadow-md`}
        >
            <Link href={`/rotation/${slug}`} passHref>
                <a className='flex-grow h-full flex justify-center items-center'>{name}</a>
            </Link>
            <div className='p-8 h-full'>
                <BookmarkIcon
                    className={`absolute top-2 right-4 ${
                        bookmarked ? "text-yellow-400" : "text-white-500"
                    } transition origin-top hover:scale-y-125 ${bookmarked && "animate-stretch"}`}
                    fontSize='large'
                    onClick={() => toggleBookmark()}
                />
            </div>
        </div>
    );
}

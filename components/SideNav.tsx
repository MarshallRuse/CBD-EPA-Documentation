import Link from "next/link";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import { motion } from "framer-motion";

const variants = {
    open: {
        width: "224px",
    },
    closed: {
        width: 0,
    },
};

const SideNav = ({ open = false }) => {
    return (
        <motion.nav
            animate={open ? "open" : "closed"}
            variants={variants}
            className='fixed top-0 right-0 h-screen w-0 bg-white text-secondary-500 text-xl z-40'
        >
            <div className='h-full pt-32 pb-16 pl-12 flex flex-col items-start gap-16'>
                <Link href={`/epas`}>
                    <a className='flex gap-2 items-center'>
                        <AssignmentRoundedIcon />
                        EPAs
                    </a>
                </Link>
                <Link href={`/rotations`}>
                    <a className='flex gap-2 items-center'>
                        <ChangeCircleRoundedIcon />
                        Rotations
                    </a>
                </Link>
                <Link href={`/bookmarks`}>
                    <a className='flex gap-2 items-center'>
                        <BookmarkRoundedIcon />
                        Bookmarks
                    </a>
                </Link>
            </div>
        </motion.nav>
    );
};

export default SideNav;

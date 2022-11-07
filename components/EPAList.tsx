export default function EPAList({ title, bgColor, children }) {
    return (
        <>
            <div
                className={`sm:col-span-3 flex items-center ${bgColor} text-white text-2xl font-bold p-4 h-24 sticky top-20 z-10`}
            >
                {title}
            </div>
            <div className='mt-0 mb-8 p-4 grid sm:grid-cols-3 items-center gap-8 bg-zinc-50'>{children}</div>
        </>
    );
}

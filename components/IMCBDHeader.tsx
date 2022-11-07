const IMCBDHeader = ({ page }: { page: string }) => (
    <>
        <h1 className='text-zinc-400 text-2xl'>Internal Medicine</h1>
        <h1 className='text-teal-500 mt-2'>Competence By Design</h1>
        <p className='mt-6 mb-4 text-2xl text-zinc-400'>{page}</p>
    </>
);

export default IMCBDHeader;

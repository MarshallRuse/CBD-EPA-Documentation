import fetchData from "../../utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import type { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const data = await fetchData(`#graphql
        query EPADataPages {
            epas {
                epa_code
            }
        }
    `);

        return {
            paths: data?.data.epas.map((epa) => ({
                params: { code: epa.epa_code },
            })),
            fallback: false,
        };
    } catch (err) {
        console.error(JSON.stringify(err));
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { code } = context.params;

    const data = await fetchData(
        `#graphql
        query EPADataPage {
	        epas(filter: {epa_code: {_eq: "${code}"}}){
                epa_code
                epa_name
                minimum_entrustments
                type_of_case_procedure
                observation
                description
                milestones
            },
            rotations(filter: {
                _or: [
                        { high_priority_epas: {epas_id: {epa_code: {_eq: "${code}"}}}},
                        { priority_epas: {epas_id: {epa_code: {_eq: "${code}"}}}},
                        { do_when_you_can_epas: {epas_id: {epa_code: {_eq: "${code}"}}}},
                        { optional_epas: {epas_id: {epa_code: {_eq: "${code}"}}}},
                    ]}){
                        name
                        slug
                }
        }
    `,
        {
            variables: {},
        }
    );

    const epa = data?.data.epas?.[0];
    const rotations = data?.data.rotations;

    if (!epa) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            epa,
            rotations,
        },
    };
};

export default function EPAPage({ epa, rotations }) {
    const router = useRouter();

    return (
        <div className='flex flex-col'>
            <h1 className='text-secondary-500 mb-3'>{epa.epa_code}</h1>
            <h2 className='text-secondary-500 mb-8'>{epa.epa_name}</h2>
            <h3 className='text-zinc-700'>
                Minimum Entrustments:{" "}
                <strong className='text-secondary-500 text-2xl'>{epa.minimum_entrustments}</strong>
            </h3>
            <div className='mt-4 mb-8 p-4 flex flex-col gap-4 bg-zinc-50 text-xl text-secondary-500'>
                <p className='text-zinc-700 text-xl font-bold'>Contents</p>
                <Link href={`${router.basePath}#contextual-variables`} scroll={false}>
                    Contextual Variables
                </Link>
                {epa.description && (
                    <Link href={`${router.basePath}#description`} scroll={false}>
                        Description
                    </Link>
                )}
                {epa.milestones && <Link href={`${router.asPath}#milestones`}>Milestones</Link>}
                {epa.rotations?.length > 0 && (
                    <Link href={`${router.asPath}#recommended-rotations`}>Recommended Rotations</Link>
                )}
                {epa.tips && <Link href={`${router.asPath}#tips`}>Tips</Link>}
            </div>
            <h3 id='contextual-variables' className='mb-4 text-secondary-500 font-bold border-b border-secondary-500'>
                Contextual Variables
            </h3>
            <div className='flex flex-col gap-4'>
                {epa.type_of_case_procedure && (
                    <div className='text-zinc-500 border rounded-md p-4'>
                        <h4 className='text-zinc-700'>Type of Case / Procedure</h4>
                        {parse(epa.type_of_case_procedure)}
                    </div>
                )}
                {epa.observation && (
                    <div className='text-zinc-500 border rounded-md p-4'>
                        <h4 className='text-zinc-700 mt-4'>Observation</h4>
                        {parse(epa.observation)}
                    </div>
                )}
            </div>
            {epa.description && (
                <>
                    <h3
                        id='description'
                        className='mt-8 mb-4 text-secondary-500 font-bold border-b border-secondary-500'
                    >
                        Description
                    </h3>
                    <div>{parse(epa.description)}</div>
                </>
            )}
            {epa.milestones && (
                <>
                    <h3
                        id='milestones'
                        className='mt-8 mb-4 text-secondary-500 font-bold border-b border-secondary-500'
                    >
                        Milestones
                    </h3>
                    <div>{parse(epa.milestones)}</div>
                </>
            )}
            {rotations?.length > 0 && (
                <>
                    <h3
                        id='recommended-rotations'
                        className='mt-8 mb-4 text-secondary-500 font-bold border-b border-secondary-500'
                    >
                        Recommended Rotations
                    </h3>
                    <div>
                        {rotations
                            ?.sort((rotA, rotB) => (rotA.name > rotB.name ? 1 : -1))
                            .map((rotation) => (
                                <div key={rotation.slug} className='mb-4 text-xl text-secondary-500'>
                                    <Link href={`/rotation/${rotation.slug}`}>{rotation.name}</Link>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}

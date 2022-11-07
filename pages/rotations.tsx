import { useState } from "react";
import fetchData from "../utils/fetchData";
import RotationCard from "../components/RotationCard";
import type { GetStaticProps } from "next";
import IMCBDHeader from "../components/IMCBDHeader";

export const getStaticProps: GetStaticProps = async () => {
    try {
        const data = await fetchData(
            `query RotationsPage {
                rotations {
                    name
                    slug
                }
            }
            
    `,
            {
                variables: {},
            }
        );

        const rotations = data?.data.rotations;

        return {
            props: {
                rotations,
            },
        };
    } catch (err) {
        console.error(JSON.stringify(err));
    }
};

export default function Rotations({ rotations = [] }) {
    return (
        <>
            <IMCBDHeader page='Rotations' />

            <div className='flex flex-col w-full gap-8'>
                {rotations?.map((rot) => (
                    <RotationCard key={rot.slug} name={rot.name} slug={rot.slug} />
                ))}
            </div>
        </>
    );
}

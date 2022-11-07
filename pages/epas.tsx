import fetchData from "../utils/fetchData";
import EPACard from "../components/EPACard";
import EPAList from "../components/EPAList";
import type { GetStaticProps } from "next";
import IMCBDHeader from "../components/IMCBDHeader";

export const getStaticProps: GetStaticProps = async () => {
    try {
        const data = await fetchData(
            `query EPAsPage {
                epas {
                    epa_code
                    epa_name
                    cbd_stage {
                        stage_code
                    }
                }
            }
            
    `,
            {
                variables: {},
            }
        );

        const epas = data?.data.epas;

        return {
            props: {
                epas,
            },
        };
    } catch (err) {
        console.error(JSON.stringify(err));
    }
};

export default function EPAs({ epas = [] }) {
    return (
        <>
            <IMCBDHeader page='EPAs' />

            <div className='flex flex-col w-full'>
                <EPAList
                    title={"Transition to Discipline (TTD)"}
                    bgColor={"bg-gradient-to-br from-cyan-500 to-cyan-600"}
                >
                    {epas
                        ?.filter((epa) => epa.cbd_stage.stage_code === "TTD")
                        .map((epa) => (
                            <EPACard key={epa.epa_code} code={epa.epa_code} title={epa.epa_name} stage='TTD' />
                        ))}
                </EPAList>

                <EPAList
                    title='Foundations of Discipline (FOD)'
                    bgColor={"bg-gradient-to-br from-green-600 to-green-700"}
                >
                    {epas
                        .filter((epa) => epa.cbd_stage.stage_code === "FOD")
                        .map((epa) => (
                            <EPACard key={epa.epa_code} code={epa.epa_code} title={epa.epa_name} stage='FOD' />
                        ))}
                </EPAList>
                <EPAList title='Core of Discipline (COD)' bgColor={"bg-gradient-to-br from-orange-500 to-orange-600"}>
                    {epas
                        .filter((epa) => epa.cbd_stage.stage_code === "COD")
                        .map((epa) => (
                            <EPACard key={epa.epa_code} code={epa.epa_code} title={epa.epa_name} stage='COD' />
                        ))}
                </EPAList>
                <EPAList
                    title='Transition to Practice (TTP)'
                    bgColor={"bg-gradient-to-br from-purple-700 to-purple-800"}
                >
                    {epas
                        .filter((epa) => epa.cbd_stage.stage_code === "TTP")
                        .map((epa) => (
                            <EPACard key={epa.epa_code} code={epa.epa_code} title={epa.epa_name} stage='TTP' />
                        ))}
                </EPAList>
            </div>
        </>
    );
}

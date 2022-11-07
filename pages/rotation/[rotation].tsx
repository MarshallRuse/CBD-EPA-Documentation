import { useState, useEffect } from "react";
import fetchData from "../../utils/fetchData";
import Link from "next/link";
import type { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const data = await fetchData(`#graphql
        query RotationPages {
            rotations {
                slug
            }
        }
    `);

        return {
            paths: data?.data.rotations.map((rotation) => ({
                params: { rotation: rotation.slug },
            })),
            fallback: false,
        };
    } catch (err) {
        console.error(JSON.stringify(err));
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { rotation } = context.params;

    const data = await fetchData(
        `#graphql
        query RotationPage {
	        rotations(filter: {slug: {_eq: "${rotation}"}}) {
                name
                high_priority_epas {
                    epas_id {
                        epa_code
                    },
                    stage {
                        stage_code
                    },
                    recommended_quantity
                },
                priority_epas {
                    epas_id {
                        epa_code
                    },
                    stage {
                        stage_code
                    },
                    recommended_quantity
                }
                do_when_you_can_epas {
                    epas_id {
                        epa_code
                    },
                    stage {
                        stage_code
                    },
                    recommended_quantity
                }
                optional_epas {
                    epas_id {
                        epa_code
                    },
                    stage {
                        stage_code
                    },
                    recommended_quantity
                }
            }
        }
    `,
        {
            variables: {},
        }
    );

    const rotationData = data?.data.rotations[0];
    const epas = [];

    if (!rotationData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            rotation: rotationData,
            epas,
        },
    };
};

const StageTabButton = ({
    stage,
    currentStage,
    borderColor,
    bgColor,
    hoverColor,
    additionalClasses = "",
    disabled = false,
    onClick,
}) => (
    <button
        className={`p-4 w-full font-semibold border ${stage === currentStage && `${bgColor} text-white`} transition ${
            disabled
                ? "text-zinc-400 border-zinc-100 cursor-default"
                : `text-secondary-500 ${
                      stage === currentStage ? borderColor : "border-secondary-500"
                  } hover:text-white ${hoverColor}`
        } ${additionalClasses}`}
        onClick={() => (!disabled ? onClick(stage) : {})}
    >
        {stage}
    </button>
);

const EPARequirements = ({ priority, currentStage, epas }) => {
    let priorityHeaderClasses = "";
    let priorityBodyClasses = "";

    switch (priority) {
        case "Highest Priority":
            priorityHeaderClasses = "bg-red-500";
            priorityBodyClasses = "bg-red-50";
            break;
        case "Priority":
            priorityHeaderClasses = "bg-yellow-500";
            priorityBodyClasses = "bg-yellow-50";
            break;
        case "Do When You Can":
            priorityHeaderClasses = "bg-emerald-500";
            priorityBodyClasses = "bg-emerald-50";
            break;
        case "Optional":
            priorityHeaderClasses = "bg-blue-500";
            priorityBodyClasses = "bg-blue-50";
            break;
    }
    return (
        <div className='border border-zinc-50'>
            <div className={`p-4 ${priorityHeaderClasses} text-white rounded-tl-md rounded-tr-md`}>
                <h2 className={`text-2xl font-bold`}>{priority}</h2>
                <p className='text-sm m-0 mt-2'>(8 Total Needed + FOD-07 & COD-08)</p>
            </div>
            <table>
                <thead>
                    <tr className='grid grid-cols-2 pt-4 bg-zinc-50'>
                        <th className='text-zinc-700 text-xl font-thin p-2'>EPA Code</th>
                        <th className='text-zinc-700 text-xl font-thin p-2'>
                            # Needed / Block
                            <br /> <span className='text-sm leading-4'></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {epas
                        .filter((epa) => epa.stage.stage_code === currentStage)
                        .map((epa) => (
                            <tr
                                key={`${priority} - ${epa.epas_id.epa_code}`}
                                className={`grid grid-cols-2 text-center py-8 border-b border-zinc-200 ${priorityBodyClasses}`}
                            >
                                <td className='text-xl tracking-wider text-secondary-500 font-semibold'>
                                    <Link href={`/EPA/${epa.epas_id.epa_code}`}>{epa.epas_id.epa_code}</Link>
                                </td>
                                <td className='text-xl tracking-wider'>{epa.recommended_quantity}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default function RotationPage({ rotation }) {
    const [stage, setStage] = useState("");
    const [stageHasEPAs, setStageHasEPAs] = useState({
        TTD: false,
        FOD: false,
        COD: false,
        TTP: false,
    });

    const onStageTabButtonClicked = (s: string) => setStage(s);

    useEffect(() => {
        const stages = [
            { code: "TTD", order: 1 },
            { code: "FOD", order: 2 },
            { code: "COD", order: 3 },
            { code: "TTP", order: 4 },
        ];

        const stageHasEPAsCopy = { ...stageHasEPAs };
        stages
            .map((stage) => stage.code)
            .forEach((epaStage) => {
                if (
                    rotation?.high_priority_epas?.filter((epa) => epa.stage?.stage_code === epaStage).length > 0 ||
                    rotation?.priority_epas?.filter((epa) => epa.stage?.stage_code === epaStage).length > 0 ||
                    rotation?.do_when_you_can_epas?.filter((epa) => epa.stage?.stage_code === epaStage).length > 0 ||
                    rotation?.optional_epas?.filter((epa) => epa.stage?.stage_code === epaStage).length > 0
                ) {
                    stageHasEPAsCopy[epaStage] = true;
                    setStageHasEPAs(stageHasEPAsCopy);
                }
            });

        const stagesWithEPAs = Object.entries(stageHasEPAsCopy)
            .filter(([s, bool]) => bool)
            .map(([code, bool]) => code);
        setStage(stagesWithEPAs[0]);
    }, []);

    return (
        <div className='flex flex-col'>
            <h1 className='text-secondary-500 mb-8'>{rotation.name}</h1>
            <div className='flex justify-center w-full mb-8'>
                <StageTabButton
                    stage='TTD'
                    currentStage={stage}
                    borderColor='border-sky-500'
                    bgColor='bg-sky-500'
                    hoverColor='hover:bg-sky-600'
                    disabled={!stageHasEPAs["TTD"]}
                    onClick={onStageTabButtonClicked}
                    additionalClasses='rounded-tl-md rounded-bl-md'
                />
                <StageTabButton
                    stage='FOD'
                    currentStage={stage}
                    borderColor='border-green-600'
                    bgColor='bg-green-600'
                    hoverColor='hover:bg-green-700'
                    disabled={!stageHasEPAs["FOD"]}
                    onClick={onStageTabButtonClicked}
                />
                <StageTabButton
                    stage='COD'
                    currentStage={stage}
                    borderColor='border-orange-500'
                    bgColor='bg-orange-500'
                    hoverColor='hover:bg-orange-600'
                    disabled={!stageHasEPAs["COD"]}
                    onClick={onStageTabButtonClicked}
                />
                <StageTabButton
                    stage='TTP'
                    currentStage={stage}
                    borderColor='border-purple-600'
                    bgColor='bg-purple-600'
                    hoverColor='hover:bg-purple-700'
                    disabled={!stageHasEPAs["TTP"]}
                    onClick={onStageTabButtonClicked}
                    additionalClasses='rounded-tr-md rounded-br-md'
                />
            </div>
            <div className='grid grid-cols-1 gap-8'>
                {rotation?.high_priority_epas?.filter((epa) => epa.stage?.stage_code === stage).length > 0 && (
                    <EPARequirements
                        priority='Highest Priority'
                        currentStage={stage}
                        epas={rotation.high_priority_epas}
                    />
                )}
                {rotation?.priority_epas?.filter((epa) => epa.stage?.stage_code === stage).length > 0 && (
                    <EPARequirements priority='Priority' currentStage={stage} epas={rotation.priority_epas} />
                )}
                {rotation?.do_when_you_can_epas?.filter((epa) => epa.stage?.stage_code === stage).length > 0 && (
                    <EPARequirements
                        priority='Do When You Can'
                        currentStage={stage}
                        epas={rotation.do_when_you_can_epas}
                    />
                )}
                {rotation?.optional_epas?.filter((epa) => epa.stage?.stage_code === stage).length > 0 && (
                    <EPARequirements priority='Optional' currentStage={stage} epas={rotation.optional_epas} />
                )}
            </div>
        </div>
    );
}

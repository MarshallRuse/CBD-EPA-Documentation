import fetchData from "../utils/fetchData";

export const getHomepageEPAs = async () => {
    const data = await fetchData(
        `#graphql
        query HomepageEPAs {
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

    return data.data.epas;
};

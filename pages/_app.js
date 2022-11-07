import { useEffect, useState, createContext } from "react";
import Layout from "../components/Layout";
import "../styles/globals.scss";
import fetchData from "../utils/fetchData";
import { EPAsAndRotationsContext } from "../utils/context/EPAsAndRotationsContext";

function MyApp({ Component, pageProps }) {
    const [epas, setEPAS] = useState([]);
    const [rotations, setRotations] = useState([]);

    useEffect(() => {
        async function fetchEPAsAndRotations() {
            try {
                const data = await fetchData(
                    `query EPAsAndRotations {
                        epas {
                            epa_code
                            epa_name
                            cbd_stage {
                                stage_code
                                stage_order
                            }
                        }
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

                const fetchedEPAs = data?.data.epas;
                const fetchedRotations = data?.data.rotations;

                setEPAS(fetchedEPAs);
                setRotations(fetchedRotations);
            } catch (err) {
                console.error(JSON.stringify(err));
            }
        }

        fetchEPAsAndRotations();
    }, []);
    return (
        <EPAsAndRotationsContext.Provider value={{ epas, rotations }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </EPAsAndRotationsContext.Provider>
    );
}

export default MyApp;

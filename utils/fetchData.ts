const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL;

const fetchData = async (query, variables = { variables: ({} = {}) }) => {
    const headers = { "Content-Type": "application/json" };

    try {
        const res = await fetch(graphQLAPI, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const json = await res.json();

        if (json.errors) {
            console.log("json.errors", JSON.stringify(json.errors));
            throw new Error(json.errors);
        }

        return json;
    } catch (err) {
        console.log("fetchData Error:");
        console.log(err);
    }
};

export default fetchData;

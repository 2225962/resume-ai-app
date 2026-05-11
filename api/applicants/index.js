const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {

    const client = TableClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
        "Applicants"
    );

    // GET → fetch all applicants
    if (req.method === "GET") {

        let results = [];

        for await (const entity of client.listEntities()) {
            results.push(entity);
        }

        context.res = {
            body: results
        };
    }

    // POST → save applicant
    if (req.method === "POST") {

        const data = req.body;

        await client.createEntity({
            partitionKey: "applicants",
            rowKey: Date.now().toString(),
            ...data
        });

        context.res = {
            body: { message: "Saved" }
        };
    }
};

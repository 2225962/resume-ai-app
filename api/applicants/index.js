let applicants = [];

module.exports = async function (context, req) {

    if (req.method === "POST") {
        const newApplicant = req.body;
        applicants.push(newApplicant);
    }

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: applicants
    };
};

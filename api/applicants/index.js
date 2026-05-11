let applicants = [];

module.exports = async function (context, req) {

    // GET request → return all applicants
    if (req.method === "GET") {
        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: applicants
        };
        return;
    }

    // POST request → add new applicant
    if (req.method === "POST") {

        const newApplicant = req.body;

        // basic safety check
        if (!newApplicant) {
            context.res = {
                status: 400,
                body: { error: "No data received" }
            };
            return;
        }

        applicants.push(newApplicant);

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "Applicant saved successfully",
                data: newApplicant
            }
        };
        return;
    }

    // fallback
    context.res = {
        status: 405,
        body: "Method not allowed"
    };
};

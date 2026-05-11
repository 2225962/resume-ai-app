let applicants = [];

module.exports = async function (context, req) {

    if (req.method === "POST") {
        applicants.push(req.body);
    }

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: applicants
    };
};

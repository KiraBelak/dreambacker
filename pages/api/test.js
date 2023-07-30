

export default async function handler(req, res) {
    const { method, body, query } = req;

    
    switch (method) {
        case "GET":
            console.log("req", req)
            console.log("this is body", body);
            console.log("this is query", query);
            res.status(200).json({ message: "GET" });
            break;
        case "POST":
            res.status(201).json({ message: "POST" });
            break;
        default:
            res.status(405).json({ message: "Method not allowed" });
            break;
    }
}


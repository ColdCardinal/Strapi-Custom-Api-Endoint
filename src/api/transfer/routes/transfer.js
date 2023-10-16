module.exports = {
    routes: [
        {
            method: "POST",
            path: "/transfer",
            handler: "transfer.index",
            "content-type": "application/json",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
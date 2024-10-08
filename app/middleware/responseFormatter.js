const responseFormatter = (req, res, next) => {
    const originalJson = res.json;

    res.json = (body) => {
        const message = res.locals.message || "Request successful";
        const status = res.statusCode || 200;

        originalJson.call(res, {
            data: body,
            message: message,
            status: status
        });
    };

    next();
};

module.exports = { responseFormatter };

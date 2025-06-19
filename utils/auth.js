exports.checkPublicRoute = (route) => {
    const { PUBLIC_ROUTES } = require('../constants');
    return PUBLIC_ROUTES.includes(route);
};

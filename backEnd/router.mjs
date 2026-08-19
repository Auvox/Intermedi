export class Router {
    routes = {
        GET: {}, 
        POST: {}, 
        PUT: {}, 
        DELETE:{}
    }
    get(route, handle) {
        this.routes["GET"][route] = handle;
    }
    post(route, handle) {
        this.routes["POST"][route] = handle;
    }
    put(route, handle) {
        this.routes["PUT"][route] = handle;
    }
    delete(route, handle) {
        this.routes["DELETE"][route] = handle;
    }

    find(method, route) {
        return this.routes[method]?.[route] || null;
    }
}
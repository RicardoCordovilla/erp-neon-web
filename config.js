export const config = {
    api: {
        baseUrl: 'http://localhost:9000/api',
        // baseUrl: 'https://erp-neon-api-production.up.railway.app/api',
        products: '/products',
        projects: '/projects',
        signs: '/signs',
        signsaddProduct: '/signs/products',
        customers: '/customers',
        users: '/users',
        login: '/login',
        register: '/register',
        logout: '/logout',
    },
    routes: {
        home: '/',
        login: '/login',
        register: '/register',
        logout: '/logout',
        dashboard: '/dashboard',
        profile: '/profile',
        users: '/users',
    },
};
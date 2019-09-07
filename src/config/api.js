const api = {
    // External URLs to query
    base_url_prod: 'http://localhost:7000',
    base_url_dev: 'http://localhost:7000',
    base_url_test: 'http://localhost:7000',

    users: '/users'
}

api.base_url = process.env.NODE_ENV === 'PRODUCTION' ? api.base_url_prod : 
                process.env.NODE_ENV === 'TEST' ? api.base_url_test : api.base_url_dev;
                
export default api;
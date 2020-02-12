import axios from 'axios'

let apiRoutes = {
    searchRoute: 'https://api.mercadolibre.com/sites/MCO/search',
}

let api = {
async getElements(item, offset, limit) {
    let data = await axios.get(apiRoutes.searchRoute, {
        params: {
        q: item,
        offset: offset,
        limit: limit
        }
    })
    return data
},
async getSeller(id) {
    let data = await axios.get(apiRoutes.searchRoute, {
        params: {
        seller_id: id
        }
    })
    return data
}
}

export default api;
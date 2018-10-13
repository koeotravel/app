import axios from 'axios'

const CLIENT_ID = 'K2WKTAOVP35XJSZYOGQGCAPRX3Y5BSHBTPHSLSVPCVGDSNBB'
const CLIENT_SECRET = '4LR4TVF4FEOXLEJVRZMAKM3SCRBYUM3Z1FYLSWPC3MMHHA4F'
const VERSION_DATE = '20170715'

const HTTP = axios.create({
  baseURL: 'https://api.foursquare.com/v2/venues'
});

HTTP.fetchVenues = async (body) => {
  try {
    const url = `/explore?near=${body.location}&query=${body.query}&limit=10&venuePhotos=1&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_DATE}`
    const response = await HTTP.get(url)
    return {
      success: true,
      response: response.data.response.groups[0].items
    };
  } catch (error) {
    return {
      success: false,
      response: error
    };
  }
};

HTTP.fetchVenueById = async (id) => {
  try {
    const url = `/${id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_DATE}`
    const response = await HTTP.get(url)
    return {
      success: true,
      response: response.data.response.venue
    };
  } catch (error) {
    return {
      success: false,
      response: error
    };
  }
};

HTTP.fetchVenuePhotos = async (id) => {
  try {
    const url = `/${id}/photos?limit=12&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION_DATE}`
    const response = await HTTP.get(url)
    return {
      success: true,
      response: response.data.response.photos.items
    };
  } catch (error) {
    return {
      success: false,
      response: error
    };
  }
};


const initialState = {
  venues: [],
  venue: {
    location: {
      address: ''
    }
  },
  venuePhotos: []
}

const getters = {
  venues: state => state.venues,
  venue: state => state.venue,
  venuePhotos: state => state.venuePhotos,
}

const actions = {
  fetchVenues(context, body) {
    return HTTP.fetchVenues(body).then((response) => {
      context.commit('setVenues', response.response);
    });
  },

  fetchVenueById(context, id) {
    return HTTP.fetchVenueById(id).then((response) => {
      context.commit('setVenue', response.response);
    });
  },

  fetchVenuePhotos(context, id) {
    return HTTP.fetchVenuePhotos(id).then((response) => {
      context.commit('setVenuePhotos', response.response);
    });
  }
}

const mutations = {
  setVenues(state, venues) {
    state.venues = venues;
  },
  setVenue(state, venue) {
    state.venue = venue;
  },
  setVenuePhotos(state, venuePhotos) {
    state.venuePhotos = venuePhotos;
  },

}


export default {
  state: initialState,
  getters,
  actions,
  mutations
}

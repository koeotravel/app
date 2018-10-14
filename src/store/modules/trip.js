import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'
import { db } from '@/main'

const initialState = {
  venues: [],
  venue: {
    location: {
      address: ''
    }
  },
  venuePhotos: [],
  days: [],
  currentTrip: {},
  newPlan: {
    type: 'event',
    date: '',
    end_date: '',
    searchCity: '',
    searchVenue: '',
    eventName: '',
    eventLocation: '',
    eventVenue: {
      location: {
        address: ''
      }
    },
    url: '',
    img: '',
    eventTime: '',
    eventPrice: '',
    eventDescription: '',
    lodgingName: '',
    lodgingLocation: '',
    lodgingUrl: '',
    lodgingImg: '',
    lodgingStartTime: '',
    lodgingEndTime: '',
    lodgingPrice: '',
    lodgingDescription: '',
    searchDepart: '',
    searchArrive: '',
    searchAirline: '',
    searchTime: '',
    transportationFlight: {},
    transportationName: '',
    transportationLocation: '',
    transportationUrl: '',
    transportationImg: '',
    transportationStartTime: '',
    transportationEndTime: '',
    transportationPrice: '',
    transportationDescription: ''
  },
  currentPlan: {},
  currentMaxEndDate: '',
  planFlights: {
    0: {
      data: {}
    }
  }
}

const getters = {
  days: state => state.days,
  plans: state => state.plans,
  currentTrip: state => state.currentTrip,
  newPlan: state => state.newPlan,
  currentPlan: state => state.currentPlan,
  currentMaxEndDate: () => {
    const currentDate = moment(initialState.currentTrip.start)
    let oneMonth = currentDate.add(34, 'days');
    oneMonth = moment(oneMonth).format('YYYY-MM-DD');
    return oneMonth
  },
  planCities: () => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
    const cities = []
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data))
    return cities
  },
  planAirlines: () => {
    const endpoint = 'https://api.skypicker.com/airlines'
    const airlines = []
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => airlines.push(...data))
    return airlines
  },
  planAirports: () => {
    const endpoint = 'https://raw.githubusercontent.com/jbrooksuk/JSON-Airports/master/airports.json'
    const airports = []
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => airports.push(...data))
    return airports
  },
  planFlights: s => s.planFlights
}

const actions = {
  sendInvitation: (context, { trip, members = {}, email }) => {
    const tripDocRef = db.collection('trips').doc(trip)
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((userCol) => {
        const invitedUserId = userCol.docs.map(user => user.ref.id).pop()
        members[invitedUserId] = true // eslint-disable-line
        tripDocRef.update({
          members
        })
        tripDocRef.collection('invitations').doc(`${email}`).set({
          created: firebase.firestore.FieldValue.serverTimestamp(),
          rsvp: null
        })
      })
      .catch((error) => {
        if (error) {
          throw new Error(error)
        }
      })
  },

  fetchTrip: ({ commit }, tripId) => {
    db.collection('trips')
      .doc(tripId)
      .get()
      .then((response) => {
        commit('setTrip', response.data())
        commit('setAddPlan', response.data().start)
      })
    db.collection('trips')
      .doc(tripId)
      .onSnapshot((response) => {
        commit('setTrip', response.data())
      })
  },
  updatePlan: ({ commit }, attributes) => {
    const tripId = attributes.tripId
    const plan = attributes.plan
    db.collection('trips')
      .doc(tripId)
      .collection('plans')
      .doc(attributes.plan.id)
      .update(plan)
    commit()
  },

  deletePlan: ({ commit }, attributes) => {
    const tripId = attributes.tripId
    const planId = attributes.planId
    db.collection('trips')
      .doc(tripId)
      .collection('plans')
      .doc(planId)
      .delete()
    commit()
  },

  fetchFlights: ({ commit }, attributes) => {
    const flightURL = (
      departureAirport,
      arrivalAirport,
      departureMonth,
      departureDate,
      departureYear,
      filterTime,
      filterAirline
    ) => `https://api.skypicker.com/flights?flyFrom=${departureAirport}&to=${arrivalAirport}&dateFrom=${departureDate}%2F${departureMonth}%2F${departureYear}&dateTo=${departureDate}%2F${departureMonth}%2F${departureYear}${filterTime}&selectedAirlines=${filterAirline}&sort=date`
    const dateMM = moment(initialState.newPlan.date).format('MM')
    const dateDD = moment(initialState.newPlan.date).format('DD')
    const dateYYYY = moment(initialState.newPlan.date).format('YYYY')
    let time = ''
    if (initialState.newPlan.searchTime !== '') {
      const timeHH = initialState.newPlan.searchTime.substring(0, 2)
      const timeMM = initialState.newPlan.searchTime.substr(initialState.newPlan.searchTime.length - 2)
      time = `&dtimefrom=${timeHH}%3A${timeMM}`
    }
    const flights = [
      {
        data: {}
      }
    ]
    const endpoint = flightURL(attributes.depart, attributes.arrive, dateMM, dateDD, dateYYYY, time, attributes.airline)
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => flights.push(data))
    commit('setFlights', flights)
  }
}

const mutations = {
  setTrip: (state, trip) => {
    state.currentTrip = trip
  },

  setAddPlan: (state, start) => {
    state.newPlan.date = start
    state.newPlan.end_date = start
  },

  clearVenue: (state) => {
    state.venue = { location: { address: '' } }
    state.venuePhotos = []
  },

  setFlights: (state, flights) => {
    state.planFlights = flights
  },

  clearAddEvent: (state) => {
    state.newPlan.eventName = ''
    state.newPlan.eventLocation = ''
    state.newPlan.eventVenue = { location: { address: '' } }
    state.newPlan.url = ''
    state.newPlan.img = ''
    state.newPlan.eventTime = ''
    state.newPlan.eventPrice = ''
    state.newPlan.eventDescription = ''
  },

  clearAddLodging: (state) => {
    state.newPlan.lodgingName = ''
    state.newPlan.lodgingLocation = ''
    if (state.newPlan.img === state.currentTrip.img) {
      state.newPlan.img = ''
    }
    state.newPlan.lodgingStartTime = ''
    state.newPlan.lodgingEndTime = ''
    state.newPlan.lodgingPrice = ''
    state.newPlan.lodgingDescription = ''
  },

  clearAddTransportation: (state) => {
    state.newPlan.transportationFlight = {}
    state.newPlan.transportationName = ''
    state.newPlan.transportationLocation = ''
    if (state.newPlan.img === state.currentTrip.img) {
      state.newPlan.img = ''
    }
    state.newPlan.transportationStartTime = ''
    state.newPlan.transportationEndTime = ''
    state.newPlan.transportationPrice = ''
    state.newPlan.transportationDescription = ''
  },

  clearAddPlan: (state) => {
    state.newPlan.searchDepart = ''
    state.newPlan.searchArrive = ''
    state.newPlan.searchAirline = ''
    state.newPlan.searchTime = ''
    state.newPlan.searchCity = ''
    state.newPlan.searchVenue = ''
    state.newPlan.date = ''
    state.newPlan.end_date = ''
    state.newPlan.type = 'event'
  },

  setPlan: (state, plan) => {
    state.currentPlan = plan
  },
  closePlanModal: (state) => {
    document.body.classList.remove('overflow-hidden')
    state.currentPlan = {}
  }
}

export default {
  state: initialState,
  getters,
  actions,
  mutations
}

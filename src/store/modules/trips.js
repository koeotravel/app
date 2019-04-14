import { functions } from '@/main'

const initialState = {
    trip: {
        events: {},
        members: {},
        tripId: '',
        eventsId: '',
        membersId: '',
    },
    userTrips: []
}

const actions = {
    addEvents: async ({ commit }, { tripId, eventsId, events }) => {
        const addEvents = functions.httpsCallable('tripAddEvents')
        await addEvents({
            tripId,
            eventsId,
            events,
        }).then(function (result) {
            commit('setEvents', result)
        })
    },
    addMembers: async ({ commit }, { tripId, membersId, events }) => {
        const addMembers = functions.httpsCallable('tripAddMembers')
        await addMembers({
            tripId,
            membersId,
            events,
        }).then(function (result) {
            commit('setMembers',result)
        })
    },
    createTrip: async ({ userId, name, description, start, end }) => {
        const create = functions.httpsCallable('tripCreate')
    
        await create({
            userId,
            name,
            description,
            start,
            end
        }).then(function (result) {
            //get trip
            return result;
        })
    },
    getTrip: async ({ commit }, tripId) => {
        const get = functions.httpsCallable('getTrip')

        await get({ tripId }).then(function (result) {
            commit('setTrip', result.data);
        })
    },
    getUserTrips: async({ commit }, userId) => {
        const trips = functions.httpsCallable('userTrips');
        await trips({ userId }).then(function (result) {
            commit('setTrips', result.data)
        })
    }
};

const mutations = {
    setEvents(state, payload) {
        return state.trip.events = {...payload};
    },
    setMembers(state, payload) {
        return state.trip.members = {...payload};
    },
    setTrip(state, payload) {
        return state.trip = {...payload};
    },
    setTrips(state, payload) {
        return state.userTrips = {...payload};
    }
}

export default {
    actions,
    mutations,
    initialState,
};

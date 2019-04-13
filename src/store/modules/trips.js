import { firebase } from '@/main'

// TODO: initial state, mutations, getters

const initialState = {
    trip: {
        events: {},
        members: {},
        tripId: '',
        eventsId: '',
        membersId: '',
    },
}

const actions = {
    addEvents: async ({ commit }, { tripId, eventsId, events }) => {
        const addEvents = firebase.functions().httpsCallable('tripAddEvents')
        await addEvents({
            tripId,
            eventsId,
            events,
        }).then(function (result) {
            commit('setEvents', result)
        })
    },
    addMembers: async ({ commit }, { tripId, membersId, events }) => {
        const addMembers = firebase.functions().httpsCallable('tripAddMembers')
        await addMembers({
            tripId,
            membersId,
            events,
        }).then(function (result) {
            commit('setMembers',result)
        })
    },
    createTrip: async ({ commit }, { userId, name, description, start, end }) => {
        const create = firebase.functions().httpsCallable('tripCreate')
        await create({
            userId,
            name,
            description,
            start,
            end
        }).then(function (result) {
            commit('setTrip', result)
        })
    },
    getTrip: async ({commit}, { userId, name, description, start, end }) => {
        const create = firebase.functions().httpsCallable('tripCreate')
        await create({
            userId,
            name,
            description,
            start,
            end
        }).then(function (result) {
            commit('setTrip', result)
        })
    },
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
    }
}

export default {
    actions,
    mutations,
    initialState,
};

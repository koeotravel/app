import { firebase } from '@/main'

const actions = {
    addEvents: async (__, { tripId, eventsId, events }) => {
        const addEvents = firebase.functions().httpsCallable('tripAddEvents')
        await addEvents({
            tripId,
            eventsId,
            events,
        }).then(function (result) {
            console.log(result)
        })
    },
    addMembers: async (__, { tripId, membersId, events }) => {
        const addMembers = firebase.functions().httpsCallable('tripAddMembers')
        await addMembers({
            tripId,
            membersId,
            events,
        }).then(function (result) {
            console.log(result)
        })
    },
    createTrip: async (__, { userId, name, description, start, end }) => {
        const create = firebase.functions().httpsCallable('tripCreate')
        await create({
            userId,
            name,
            description,
            start,
            end
        }).then(function (result) {
            console.log(result)
        })
    },
};


export default {
    actions,
};

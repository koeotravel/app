import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '@/main';

const initialState = {
  data: [],
};

const getters = {};

async function getEventItemsByDayId({ tripId, dayId }) {
  const eventItemsRef = await db.doc(`trips/${tripId}/days/${dayId}`).collection('events').get();
  const eventItems = eventItemsRef.docs;
  const eventsByDay = [];
  eventItems.forEach((eventX) => {
    const event = {};
    event.id = eventX.id;
    event.event = eventX.data();
    eventsByDay.push(eventX.data());
  });
  return eventsByDay;
}

const actions = {
  createPlan: ({ commit }, { tripId, dayId, eventObject }) => {
    if (!tripId || !dayId) { return; }
    const dayDocument = db.doc(`trips/${tripId}/days/${dayId}`);
    dayDocument.collection('events').add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
      ...eventObject,
    }).then(async () => {
      const updatedEvents = await db.doc(`trips/${tripId}/days/${dayId}`).collection('events').get();
      commit('setEvents', updatedEvents.docs.map(event => ({
        id: event.id,
        ...event.data(),
      })));
    }).then(async () => {
      try {
        const updatedDays = await db.doc(`trips/${tripId}`).collection('days').get();
        const dayDocs = updatedDays.docs;
        const days = [];
        Promise.all(dayDocs.map((doc) => {
          const day = {};
          day.id = doc.id;
          day.day = doc.data();
          const eventItemsPromise = getEventItemsByDayId({ tripId, dayId: day.id });
          return eventItemsPromise.then((eventItems) => {
            day.event = eventItems;
            days.push(day);
            return day;
          });
        })).then(values => commit('setDays', values));
      } catch (error) {
        throw Error(error);
      }
    });
  },
  // removePlan: async ({ commit }, { tripId, dayId }) => {
  //   // db.doc(`trips/${tripId}`).collection('days').doc(`${dayId}`).delete()
  //   // const updatedDays = await db.doc(`trips/${tripId}`).collection('days').get()
  //   // commit('setDays', updatedDays.docs.map(day => ({
  //   //   id: day.id,
  //   //   ...day.data()
  //   // })))
  // },
};

const mutations = {
  setEvents: (state, events) => {
    state.data = events;
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};

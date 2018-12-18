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
  fetchDays: async ({ commit }, tripId) => {
    if (!tripId) { return; }
    try {
      const daysRef = await db.doc(`trips/${tripId}`).collection('days').get();
      const dayDocs = daysRef.docs;
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
  },
  createDay: ({ commit }, tripId) => {
    if (!tripId) { return; }
    const tripDocument = db.doc(`trips/${tripId}`);
    tripDocument.collection('days').add({
      created: firebase.firestore.FieldValue.serverTimestamp(),
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
  removeDay: async ({ commit }, { tripId, dayId }) => {
    db.doc(`trips/${tripId}`).collection('days').doc(`${dayId}`).delete();
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
  },
};

const mutations = {
  setDays: (state, days) => {
    state.data = days;
  },
};


export default {
  state: initialState,
  getters,
  actions,
  mutations,
};

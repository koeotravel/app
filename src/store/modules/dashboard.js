import firebase from 'firebase/app';
import 'firebase/firestore';
import moment from 'moment';
import router from '@/router';
import { db } from '@/main';

const initialState = {
  trips: [],
  showTripModal: false,
  newTrip: {
    img: '',
    img_author: '',
    img_author_url: '',
    name: '',
    description: '',
    cost: '',
    start: '',
    end: '',
  },
  archiveView: false,
  activeTrips: [],
  archivedTrips: [],
};

const getters = {
  showTripModal: state => state.showTripModal,
  newTrip: state => state.newTrip,
  archiveView: state => state.archiveView,
  numActiveTrips: state => state.numActiveTrips,
  numArchivedTrips: state => state.numArchivedTrips,
  activeTrips: state => state.trips.filter(trip => trip.archived === false),
  archivedTrips: state => state.trips.filter(trip => trip.archived === true),
  today: () => {
    let today = new Date();
    today = moment(today).format('YYYY-MM-DD');
    return today;
  },
  newMaxEndDate: (state) => {
    const currentDate = moment(state.newTrip.start);
    let oneMonth = currentDate.add(34, 'days');
    oneMonth = moment(oneMonth).format('YYYY-MM-DD');
    return oneMonth;
  },
};

const actions = {
  addTrip: ({ commit }, attributes) => {
    const start = moment(attributes.startDate);
    const end = moment(attributes.endDate);
    const numDays = end.diff(start, 'days');
    function dateName(len) {
      let num = String(len);
      while (num.length < 2) {
        num = `0${num}`;
      }
      const title = `Day ${num}`;
      return title;
    }
    db.collection('trips').add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      archived: false,
      name: attributes.trip.name,
      cost: attributes.trip.cost,
      start: attributes.startDate,
      end: attributes.endDate,
      description: attributes.trip.description,
      party: [
        {
          uid: attributes.userId,
          role: 'admin',
          invitation: 'accepted',
        },
      ],
    })
      .then((docRef) => {
        db.collection('invitations')
          .add({
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            tripId: docRef.id,
            email: attributes.userEmail,
            rsvp: 'YES',
          })
          .then(async (invitationDoc) => {
            const userRef = db.doc(`users/${attributes.userId}`);
            const userDoc = await userRef.get();
            const userInvitations = userDoc.data().invitations;
            if (userInvitations) {
              userRef.update({
                invitations: [
                  ...userInvitations,
                  invitationDoc.id,
                ],
              });
            }
          });
        for (let i = 1, len = numDays + 2; i < len; i += 1) {
          db.collection('trips')
            .doc(docRef.id)
            .collection('days')
            .doc(dateName(i))
            .set({
              createdAt: Date.now() + i,
              name: dateName(i),
              date: moment(attributes.start).add(i - 1, 'days').format('YYYY-MM-DD'),
            });
        }
        commit('closeTripModal');
        router.push({ path: `/trips/${docRef.id}` });
      })
      .catch((err) => {
        if (err) throw Error(err);
      });
  },

  fetchTrips: async ({ commit }, id) => {
    const { uid } = id;
    if (!uid) { return; }
    try {
      const userRef = db.doc(`users/${uid}`);
      const userDoc = await userRef.get();
      const userInvitations = userDoc.data().invitations;
      if (!userInvitations) {
        userRef.update({
          invitations: [],
        });
      }
      const trips = userInvitations.map(async (invitationId) => {
        const invitationDoc = await db.doc(`invitations/${invitationId}`).get();
        const tripId = invitationDoc.data().tripId;
        const tripDoc = await db.doc(`trips/${tripId}`).get();
        return { ...tripDoc.data(), id: tripDoc.id };
      });

      Promise.all(trips).then((userTrips) => {
        commit('setTrips', userTrips);
      });
    } catch (error) {
      throw Error(error);
    }
  },

  updateTrip: ({ state }, attributes) => {
    let tripId = '';
    if ('index' in attributes) {
      tripId = state.trips[attributes.index].id;
    } else {
      tripId = attributes.id;
    }
    const updatedTrip = attributes.trip;
    db.collection('trips')
      .doc(tripId)
      .update(updatedTrip)
      .catch((err) => {
        if (err) throw Error(err);
      });
  },

  deleteTrip: ({ state }, tripIndex) => {
    const tripId = state.trips[tripIndex].id;
    db.collection('trips')
      .doc(tripId)
      .delete();
  },
};

const mutations = {
  setTrips: (state, trips) => {
    state.trips = trips;
  },

  countTrips: (state) => {
    let numActiveTrips = 0;
    for (let i = 0, len = state.trips.length; i < len; i += 1) {
      if (state.trips[i].archived === false) {
        numActiveTrips += 1;
      }
    }
    state.numActiveTrips = numActiveTrips;
    let numArchivedTrips = 0;
    for (let i = 0, len = state.trips.length; i < len; i += 1) {
      if (state.trips[i].archived === true) {
        numArchivedTrips += 1;
      }
    }
    state.numArchivedTrips = numArchivedTrips;
  },

  clearAddTrip: (state) => {
    state.newTrip.name = '';
    const dateInput = document.querySelectorAll('input[type="date"]');
    for (let i = 0, len = dateInput.length; i < len; i += 1) {
      dateInput[i].setAttribute('type', 'text');
    }
    state.newTrip.start = '';
    state.newTrip.end = '';
    state.newTrip.description = '';
  },

  openTripModal: (state) => {
    state.showTripModal = true;
    document.body.classList.add('overflow-hidden');
  },

  closeTripModal: (state) => {
    state.showTripModal = false;
    document.body.classList.remove('overflow-hidden');
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};

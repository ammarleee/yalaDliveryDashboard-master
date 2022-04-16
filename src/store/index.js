import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";
let db = new Localbase("db");

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    printingData: [],
    currentuser: null,
    user: {},
    // polisas:JSON.parse(localStorage.getItem('shipment')),
    polisas: [],

    outSources: [
      {
        name: "احمد",
        id: 2,
        phoneNum: 42,
        userCities: [
          { id: 1, name: "as1eeewr", phoneNum: 454 },
          { id: 2, name: "as1sad", phoneNum: 44254 }
        ]
      },
      {
        name: "mohamed",
        id: 1,
        phoneNum: 4242,
        userCities: [
          { id: 1, name: "asqwr1", phoneNum: 454 },
          { id: 2, name: "avas1", phoneNum: 4534 }
        ]
      }
    ],
    // clients:[],
    clients: [
      {
        name: "احمد",
        id: 2,
        allPolis: [
          { taxs: 100, tottalPrice: 20 },
          { taxs: 100, tottalPrice: 40 },
          { taxs: 60, tottalPrice: 20 }
        ]
      },
      {
        name: "محمد",
        id: 1,
        allPolis: [
          { taxs: 100, tottalPrice: 50 },
          { taxs: 10, tottalPrice: 40 },
          { taxs: 200, tottalPrice: 20 }
        ]
      }
    ],
    token: localStorage.getItem("token") || "",
    notifications: [
      { title: " اشعار جديدعن موضوع", date: new Date(), seen: true },
      { title: "اشعار جديد", date: new Date(), seen: false }
    ]
  },

  getters: {
 
    printinData(state) {
      return state.printingData;
    },
    polisas(state) {
      return state.polisas;
    },
    outSources(state) {
      return state.outSources;
    },
    clients(state) {
      return state.clients;
    },
    // cuurentUser(state) {
    //   return state.currentuser;
    // },
    notifications(state) {
      return state.notifications;
    },
    isAuthenticated: state => !!state.token,
    currentUser(state) {
      return state.currentuser;
    }
  },
  mutations: {
    // currentUser(state, payload) {
    //   state.currentuser = payload;
    // },
    printData(state, payload) {
      state.printingData = payload;
    },
    getLocalShipments(state, payload) {
      state.polisas = payload;
    },
    addNewClient(state, payload) {
      state.clients.push(payload);
    },
    pushOutSource(state, payload) {
      state.outSources = payload;
    },
    editOutClient(state, payload) {
      state.clients = payload;
    },
    pushPolisa(state, payload) {
      state.polisas.push(payload);
    },
    setPolisa(state, payload) {
      state.polisas = payload;
    },
    setUser(state, resp) {
      localStorage.setItem("token", `Bearer ${resp.token}`);
      localStorage.setItem("user", JSON.stringify(resp.user));
      state.currentuser = resp.user;
    },
    autoSign(state, payload) {
      console.log(payload);
      state.currentuser = payload;
    },
    logOut(state) {
      state.currentuser = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  },
  actions: {
    async getLocalShipments({ commit }) {
      let shipments = await db.collection("shipments").get();
      commit("getLocalShipments", shipments);
    },
    autoSign({ commit }) {
      var u = localStorage.getItem("user");
      console.log(JSON.parse(u));
      var parsing = JSON.parse(u) 
      commit("autoSign", parsing);
      if (u) return parsing;
    },
    logOut({ commit }) {
      commit("logOut");
    },
    login({ commit }, payload) {
      commit("setUser", payload);
    },
    changeUserInfo({ commit }, payload) {
      commit("setUser", payload);
    },
  
  },
  modules: {}
});

import { createStore } from 'vuex';

export default createStore({
  state: {
    uid: null,
    pseudo: null,
    ressources: null,
    score: null,
  },
  mutations: {
    setUid(state, uid) {
      state.uid = uid;
    },
    setPseudo(state, pseudo) {
      state.pseudo = pseudo;
    },
    setRessources(state, ressources) {
      state.ressources = ressources;
    },
    setScore(state, score) {
      state.score = score;
    },
    resetUser(state) {
      state.uid = null;
      state.pseudo = null;
      state.ressources = null;
      state.score = null;
    },
  },
});

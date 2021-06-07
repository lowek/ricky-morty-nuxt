import createdPersistedState from "vuex-persistedstate";

export default ({store}) => {
    window.onNuxtReady(() => {
        createdPersistedState({
            key: "vuex",
            reducer(val) {
                return val;
            }
        })(store);
    });
};

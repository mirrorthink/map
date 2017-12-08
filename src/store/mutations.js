export default {
    changLanguage(state, payload) {
        state.languageMessages.activeIndex = payload;
        state.activeLanguage = state.languageMessages.item[payload].id;
    },
    changeAuto(state, payload) {
        state.languagemode.activeIndex = payload;
        state.auto = !!payload;
    },
    notHerefun(state, payload) {
        state.notHere = payload.state;
    },
    geoErrfun(state, payload) {
        state.geoErr = payload.state;
    },
    play(state) {
        state.playing = true;
    },
    pause(state) {
        state.playing = false;
    },
    audioShowContral(state, boolen) {
        state.audioShow = boolen;
    },
    simulate(state, boolen) {
        state.simulate = boolen;
    },
    changetoggleAllShow(state) {
        state.allShow = !state.allShow;
    },
    changeCurrentPosition(state, payload) {
        state.currentPosition = payload;
    },
    changeLoadingShow(state, payload) {
        state.loadingShow = payload;
    },
    locating(state, payload) {
        state.locating = payload;
    },
    changeFlesh(state, payload) {
        state.flesh = payload;
    },
    changeActiveLanguage(state, payload) {
        state.activeLanguage = payload;
    },
    changeActiveOverlayerMessage(state, payload) {
        state.activeOverlayerMessage = payload;
    },
    toggleIsInpanoramic(state, payload) {
        state.isInpanoramic = payload;
    },
    changeActiveAp(state, payload) {
        state.activeAp = payload;
    }
};
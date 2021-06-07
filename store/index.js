import gql from "graphql-tag"
import {ALL_CHAR, ALL_EP} from '~/data/queries';

export const state = () => ({
    allCharacters: [],
    allEpisodes: [],
    allFav: [],
    allPages: 0,
    allEpisodesPages: 0,
})

export const getters = {
    getAllCharacters: state => state.allCharacters,
    getAllEpisode: state => state.allEpisodes,
    getAllPages: state => state.allPages,
    getAllFav: state => state.allFav
}

export const mutations = {
    setAllCharacters(state, payLoad) {
        state.allCharacters = payLoad
    },
    setAllPages(state, payLoad) {
        state.allPages = payLoad
    },
    setAllEpisodes(state, payLoad) {
        payLoad.filter((item) => state.allEpisodes.push(item));
    },
    setAllEpisodesPages(state, payLoad) {
        state.allEpisodesPages = payLoad
    },
    setAllFav(state, payLoad) {
        state.allFav.push(payLoad);
    },
    removeFav(state, payLoad) {
        state.allFav = state.allFav.filter((item) => item !== payLoad);
    }
}

export const actions = {

    async nuxtServerInit({dispatch}) {
        await dispatch('fetchPagesCharacters')
        await dispatch('fetchEpisodesPage')
        await dispatch('fetchAllEpisode')
    },

    async fetchPagesCharacters({commit}) {
        const characters = await this.app.apolloProvider.defaultClient.query({
            query: ALL_CHAR
        })

        const { data } = characters;
        if(data && data.characters.info && data.characters.results)
            await commit("setAllPages", data.characters.info.pages)
            await commit("setAllCharacters", data.characters.results)
    },

    async fetchEpisodesPage({commit}) {
        const episodes = await this.app.apolloProvider.defaultClient.query({
            query: ALL_EP
        })

        const { data } = episodes;
        if(data && data.episodes.info)
            await commit("setAllEpisodesPages", data.episodes.info.pages)
    },

    async fetchAllEpisode({commit, state}) {
        for(let i = 0; i <= state.allEpisodesPages; i++) {
            const episodes = await this.app.apolloProvider.defaultClient.query({
                query: gql`query {
                    episodes(page: ${i}) {
                        results {
                            id,
                            episode,
                            characters {
                                id
                            }
                        }
                    }
                }`
            })
            const { data } = episodes;
            if(data && data.episodes.results)
                await commit("setAllEpisodes", data.episodes.results)
        }
    },


    async fetchNextCharacters({commit}, payLoad) {
        const character = await this.app.apolloProvider.defaultClient.query({
            query: gql`query {
                characters(page: ${payLoad}) {
                    results {
                        id,
                        name,
                        gender,
                        species,
                        image,
                        episode {
                            id,
                            name
                        }
                    }
                }
            }`
        })
        const { data } = character;
        if(data && data.characters.results)
            await commit("setAllCharacters", data.characters.results)
    },

    async fetchbyName({commit}, payLoad) {
        const character = await this.app.apolloProvider.defaultClient.query({
                query: gql`query {
                    characters(filter: { name: "${payLoad.search}" }) {
                    info {
                        pages
                    }
                    results {
                        id,
                        name,
                        gender,
                        species,
                        image,
                        episode {
                            id,
                            name
                        }
                    }
                }
                }`
            })
        await this.$router.push(`/1`)
        const { data } = character;
        if(data && data.characters.results && data.characters.info) {
            await commit("setAllCharacters", data.characters.results)
            await commit("setAllPages", data.characters.info.pages)
        }
    },

    async fetchbyId({commit}, payLoad) {
        const character = await this.app.apolloProvider.defaultClient.query({
            query: gql`query {
                character(id: ${payLoad.search}) {
                    id,
                    name,
                    gender,
                    species,
                    image,
                    episode {
                        id,
                        name
                    }
                }
            }`
        })
        await this.$router.push(`/1`)
        const { data } = character;

        if(data && data.character) {
            await commit("setAllCharacters", [data.character])
            await commit("setAllPages", 0)
        }
    },

    async fetchbyEpisode({commit}, payLoad) {
        const episode = await this.app.apolloProvider.defaultClient.query({
            query: gql`query {
                charactersByIds(ids: [${payLoad}]) {
                    id,
                    name,
                    gender,
                    species,
                    image,
                    episode {
                        id,
                        name
                    }
                }
            }`
        })
        await this.$router.push(`/1`)
        const { data } = episode;
        if(data.charactersByIds) {
            commit("setAllCharacters", data.charactersByIds);
            await commit("setAllPages", 0)
        }
    },
}

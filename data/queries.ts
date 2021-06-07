import gql from "graphql-tag";

const ALL_CHAR = gql`
    query {
        characters(page: 1) {
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
    }
`

const ALL_EP = gql`
    query {
        episodes(page: 1) {
            info {
                pages
            }
        }
    }
`

export {ALL_EP, ALL_CHAR}
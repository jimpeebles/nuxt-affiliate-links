import Vue from "vue"

// Extracts query params and stores to localStorage
const extract = store => query => {
  // Get query string from current URL
  let searchParams = new URLSearchParams(query)

  // Put query parameters into local storage
  for (let pair of searchParams.entries()) {
    localStorage.setItem(pair[0], pair[1])
  }

  // Update attribution state
  store.dispatch("attribution/updateAttribution")

  // Strip params from URL
  window.history.replaceState(
    {},
    document.title,
    "/" +
      window.location.href
        .substring(window.location.href.lastIndexOf("/") + 1)
        .split("?")[0]
  )
}

export default async function({ store }) {
  // Add extraction method to vue instance
  Vue.prototype.$extractQuery = extract(store)

  // Register attribution module
  store.registerModule(
    "attribution",
    {
      namespaced: true,
      state: () => ({}),
      mutations: {
        UPDATE_ATTRIBUTION(state, data) {
          state[data.key] = data.value
        }
      },
      actions: {
        updateAttribution: ({ commit }) => {
          for (let [key, value] of Object.entries(localStorage)) {
            commit("UPDATE_ATTRIBUTION", { key, value })
          }
        }
      }
    },
    { preserveState: false }
  )
}

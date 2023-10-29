// const routerConfig = ["/", "/verify-kyc"]

export const createTableEnhancer = createStore => (
    reducer,
    initialState,
    enhancer
) => {
    const monitoredReducer = (state, action) => {
        let newState = state
        newState = reducer(state, action)
        // if (Router.router) {
        //     // @ts-ignore
        //     const slice: Slice = routerConfig.includes(action.type) ? getSlice(action.type) : getSlice(Router.pathname);
        //     if (slice?.name && newState[`${slice.name}`] === undefined) {
        //         newState[`${slice.name}`] = slice.reducer(state?.[`${slice.name}`], action);
        //     }
        // }
        return newState
    }
    return createStore(monitoredReducer, initialState, enhancer)
}

const initialState = {
  scene: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case "focus":
      const scene = action.scene;
      return Object.assign({}, state, {
        scene,
      });

    // ...other actions

    default:
      return state;
  }
}
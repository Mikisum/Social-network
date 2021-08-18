let initialState = {
  friends: [
    {
      id : 1,
      name: 'Vika'
    },
    {
      id : 2,
      name: 'Dima'
    },
    {
      id : 3,
      name: 'Kolia'
    }
  ]
  }

const sideBarReducer = (state = initialState, action) => {
  return state
}

export default sideBarReducer
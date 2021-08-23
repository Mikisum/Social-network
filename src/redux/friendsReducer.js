
let initialState = {
  friends : [
    {
      id: 1,
      name: 'Kolia',
      status: 'hi'
    },
    {
      id: 2,
      name: 'Dima',
      status: 'hi'
    },
    {
      id: 3,
      name: 'Vika',
      status: 'hi'
    },
    {
      id: 4,
      name: 'Sasha',
      status: 'hi'
    },
    {
      id: 5,
      name: 'Masha',
      status: 'hi'
    },
    {
      id: 6,
      name: 'Dasha',
      status: 'hi'
    }
  ]
}

const friendsReducer = (state = initialState, action) => {
  return state
}


export default friendsReducer
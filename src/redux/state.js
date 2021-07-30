let state = {
  profilePage: {
    posts : [
    {
      id: 1,
      message: 'hey',
      likesCount: 10
    },
    {
      id: 2,
      message: 'What?',
      likesCount: 15
    }
  ]
  },
  messagesPage : {
    messages : [
      {
        id: 1,
        message: 'hi'
      },
      {
        id: 2,
        message: 'How is your day?'
      },
      {
        id: 3,
        message: 'Good bye'
      },
      {
        id: 4,
        message: 'Hello!'
      }
    ],
    dialogs : [
      {
        id: 1,
        name: 'Sveta'
      },
      {
        id: 2,
        name: 'Vova'
      },
      {
        id: 3,
        name: 'Vika'
      },
      {
        id: 4,
        name: 'Dima'
      },
      {
        id: 5,
        name: 'Masha'
      },
      {
        id: 6,
        name: 'Pasha'
      }
    ]
  },
  sideBar : {
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
}

export default state
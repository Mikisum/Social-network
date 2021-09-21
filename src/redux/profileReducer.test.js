import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
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
  }

it('length of posts should be incremented', () => {
  let action = addPostActionCreator('it.com')
  
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
  let action = addPostActionCreator('it.com')
  
  let newState = profileReducer(state, action)
  expect(newState.posts[2].message).toBe('it.com')
})

it('after deleting length of message should be decrement', () => {
  let action = deletePost(1)
  
  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(2)
})


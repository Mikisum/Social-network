import { ProfileType } from '../types/types'
import profileReducer, { actions } from './profileReducer'

let state = {
  posts: [
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
  ],
  profile: null,
  status: '',
  newPost: ''
}

it('length of posts should be incremented', () => {
  let action = actions.addPostActionCreator('it.com')

  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
  let action = actions.addPostActionCreator('it.com')

  let newState = profileReducer(state, action)
  expect(newState.posts[2].message).toBe('it.com')
})

it('after deleting length of message should be decrement', () => {
  let action = actions.deletePost(1)

  let newState = profileReducer(state, action)
  expect(newState.posts.length).toBe(2)
})

import React from 'react'
// import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  // const author = useSelector(state =>
  //   state.users.find(user => user.id === userId)
  // )

  // return <span><i>by {author ? author.name : userId}</i></span>
  return <span><i>by {userId}</i></span>
}
import React from 'react'
import classes from './Paginator.module.css'

const Paginator = ({totalUsersCount, pageSize, onPageChanged, currentPage}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize)

  let pages = []
  for(let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div>
      {pages.map((p,idx) => <span key={idx} className={currentPage === p ? classes.selectedPage : undefined}
        onClick={(e)=> onPageChanged(p)}>{p<7 ? p : null}</span>)}
    </div>
  )
}

export default Paginator
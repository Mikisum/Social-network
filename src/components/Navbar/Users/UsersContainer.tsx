import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Users } from './Users'
import Preloader from '../../common/preloader/preloader'
import { getIsFetching } from '../../../redux/users-selectors'

type UserspagePropsType = {
  pageTitle: string
}

export const UsersPage: FC<UserspagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}

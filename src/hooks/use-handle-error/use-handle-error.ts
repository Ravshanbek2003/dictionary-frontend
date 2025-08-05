import {toast} from 'react-toastify'
import {useErrorMsg} from '../use-error-msg'

export const useHandleError = () => {
  const getErrorMsg = useErrorMsg()
  return (error: any) => {
    toast(getErrorMsg(error))
  }
}

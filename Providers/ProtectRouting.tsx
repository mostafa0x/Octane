import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { usePathname, useRouter } from 'expo-router'
import { getUserInfo } from 'Services/Storage'
import { useInitApp } from 'Hooks/useInitApp'
import SpinnerLoading from 'components/SpinnerLoading'
import ErrorScreen from 'components/Error Screen'
import { ChangeIsMountApp } from 'lib/Store/Slices/AppSlice'
import handleLoutOut from 'Services/handleLogOut'

function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken, isLoadedData, isLoadedUserData } = useSelector(
    (state: StateFace) => state.UserReducer
  )
  const { isMountApp } = useSelector((state: StateFace) => state.AppReducer)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<string | null>(null)
  const [statusCode, setStatusCode] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()
  const { init } = useInitApp()

  const shouldRedirectToAuth = useMemo(
    () =>
      !userToken &&
      (pathName === '/' ||
        pathName === '/Profile' ||
        pathName === '/Upload' ||
        pathName === '/Dashboard'),
    [userToken, pathName]
  )

  const shouldRedirectToHome = useMemo(
    () => userToken && pathName === '/Auth' && isLoadedData,
    [userToken, pathName, isLoadedData]
  )

  useEffect(() => {
    if (isLoadedUserData || isMountApp) return

    const initApp = async () => {
      console.log('✅ run app ✅')
      await getUserInfo(dispatch)
      dispatch(ChangeIsMountApp(true))
    }

    initApp()
  }, [])

  const GetData = useCallback(async () => {
    setIsLoading(true)
    setIsError(null)

    try {
      await init()
      setIsLoading(false)
    } catch (err: any) {
      if (err?.response?.data?.message == 'User not found') {
        return handleLoutOut(dispatch, router)
      }

      if (err.status !== 403) {
        setStatusCode(err.status)
        setIsError(err?.response?.data?.message ?? err.message ?? 'Something went wrong !')
        console.log(err)

        console.log(err.message ?? 'Something went wrong')
      }
    }
  }, [init])

  useEffect(() => {
    if (!isMountApp) return
    if (userToken) {
      if (shouldRedirectToHome) {
        if (isLoadedData) {
          router.replace('/')
        } else {
        }
      }
      if (!isLoadedData) {
        GetData()
      }
    } else {
      if (shouldRedirectToAuth) {
        router.replace('/Auth')
      } else {
        setIsLoading(false)
      }
    }
  }, [
    isMountApp,
    isLoadedUserData,
    isLoadedData,
    userToken,
    shouldRedirectToHome,
    shouldRedirectToAuth,
  ])

  if (isError) {
    return <ErrorScreen isError={isError} statusCode={statusCode} GetData={GetData} />
  }

  if (isLoading) {
    return <SpinnerLoading />
  }

  return children
}

export default memo(ProtectRoutingProvider)

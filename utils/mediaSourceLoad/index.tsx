
import { FC, createContext, useCallback, useRef } from "react"
import { Inject, MediaSourceLoadProviderProps } from "./interface"


export const MediaSourceLoadContext = createContext<Inject>({} as Inject)

export const MediaSourceLoadProvider: FC<MediaSourceLoadProviderProps> = ({
  children,
}) => {
  const isShowedCollaError = useRef<boolean>(false)
  const sourceLoadErrorHandler = useCallback(
    async (sourceURL: string | undefined) => {
      if (isShowedCollaError.current || !sourceURL) return

    },
    [],
  )
  return (
    <MediaSourceLoadContext.Provider value={{ sourceLoadErrorHandler }}>
      {children}
    </MediaSourceLoadContext.Provider>
  )
}
MediaSourceLoadContext.displayName = "MediaSourceLoadContext"

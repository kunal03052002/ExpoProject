/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useRef, ComponentState, PropsWithoutRef, } from "react"


export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}
export function usePrevious<T>(value: PropsWithoutRef<T> | ComponentState) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
export function useMergeValue<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T
    value?: T
  },
): [T, React.Dispatch<React.SetStateAction<T>>, T] {
  const { defaultValue, value } = props || {}
  const firstRenderRef = useRef(true)
  const prevPropsValue = usePrevious(props?.value)

  const [stateValue, setStateValue] = useState<T>(
    !isUndefined(value)
      ? value
      : !isUndefined(defaultValue)
      ? defaultValue
      : defaultStateValue,
  )

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    if (value === undefined && prevPropsValue !== value) {
      setStateValue(value)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const mergedValue = isUndefined(value) ? stateValue : value

  return [mergedValue, setStateValue, stateValue]
}

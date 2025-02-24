import { AnimatePresence, motion } from "framer-motion"
import { FC, useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import CursorIcon from "@/assets/cursor.svg"
import { cursorActions } from "@/redux/currentApp/cursor/cursorSlice"
import { CursorProps, NickNameContainerProps } from "./interface"
import { applyCursorContainerStyle, nickNameContainerStyle } from "./style"
import { UNIT_HEIGHT } from "../../../constant/canvas"

export const Cursor: FC<CursorProps> = (props) => {
  const {
    userID,
    nickName,
    integerPartX,
    integerPartY,
    decimalPartX,
    decimalPartY,
    unitW,
    status,
  } = props

  const realX = (integerPartX + decimalPartX) * unitW
  const realY = integerPartY + decimalPartY
  const color = "gray"
  // getColorByString(userID)
  const dispatch = useDispatch()
  // const { t } = useTranslation()

  const onAnimationComplete = useCallback(() => {
    dispatch(cursorActions.removeAnimationEndCursorInfo(userID))
  }, [dispatch, userID])
  const isLeave = status === -1

  useEffect(() => {
    if (isLeave) {
      dispatch(cursorActions.leaveContainerReducer(userID))
    }
  }, [dispatch, isLeave, userID])

  return (
    <AnimatePresence>
      <motion.span
        css={applyCursorContainerStyle(color)}
        initial={{ x: realX - 6, y: realY - 8.5 }}
        animate={{ x: realX - 6, y: realY - 8.5 }}
        transition={{ duration: 0.16 }}
        onAnimationComplete={onAnimationComplete}
      >
        <CursorIcon />
        <NickNameContainer
          nickName={
            nickName?.trim() !== ""
              ? nickName
              : "no_name"
          }
          bgColor={color}
        />
      </motion.span>
    </AnimatePresence>
  )
}

export const NickNameContainer: FC<NickNameContainerProps> = (props) => {
  const { nickName, bgColor } = props
  return <div css={nickNameContainerStyle(bgColor)}>{nickName}</div>
}

export const FixedCursor: FC<CursorProps> = (props) => {
  const {
    // userID,
    nickName,
    integerPartX,
    integerPartY,
    decimalPartX,
    decimalPartY,
    unitW,
  } = props

  const realX = (integerPartX + decimalPartX) * unitW
  const realY = (integerPartY + decimalPartY) * UNIT_HEIGHT
  const color ="gray"
  //  getColorByString(userID)
  // const { t } = useTranslation()

  return (
    <AnimatePresence>
      <motion.span
        css={applyCursorContainerStyle(color)}
        initial={{ x: realX, y: realY }}
        animate={{ x: realX, y: realY }}
        transition={{ duration: 0.16 }}
      >
        <CursorIcon />
        <NickNameContainer
          nickName={
            nickName?.trim() !== ""
              ? nickName
              : "No Name"
          }
          bgColor={color}
        />
      </motion.span>
    </AnimatePresence>
  )
}

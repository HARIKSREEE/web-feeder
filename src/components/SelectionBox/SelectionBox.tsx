import Button from "@mui/material/Button"
import { useEffect, useState, type FC } from "react"
import {
  Rnd,
  type RndDragCallback,
  type RndResizeCallback,
  type RndResizeStartCallback
} from "react-rnd"

import "react-rnd"

const finishButtonHeight = 30 //Button height + resize handler offset

const boxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid rgba(255, 255, 255, 0.7)",
  boxShadow: "inset 0 0 0 2px rgba(0, 0, 0, 0.7)"
}

type SelectionBoxProps = {
  onFinish?: (
    size: { width: number; height: number },
    position: { x: number; y: number }
  ) => void
}

const SelectionBox: FC<SelectionBoxProps> = ({ onFinish }) => {
  const [size, updateSize] = useState({ width: 200, height: 200 })
  const [position, updatePosition] = useState({ x: 0, y: 0 })

  const [showFinishButton, setShowFinishButton] = useState<boolean>(false)

  useEffect(() => {
    // Calculate center position including the scroll values
    const centerX = (window.innerWidth - size.width) / 2 + window.scrollX
    const centerY = (window.innerHeight - size.height) / 2 + window.scrollY
    updatePosition({ x: centerX, y: centerY })
  }, [])

  const onResizeFinish: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position
  ) => {
    console.log(
      "e, direction, ref, delta, position",
      e,
      direction,
      ref,
      delta,
      position
    )
    updateSize({
      width: Number(ref.offsetWidth),
      height: Number(ref.offsetHeight)
    })
    updatePosition(position)
    setShowFinishButton(true)
  }

  const onDragFinish: RndDragCallback = (e, d) => {
    updatePosition({ x: d.x, y: d.y })
    setShowFinishButton(true)
  }

  const onDragStart: RndDragCallback = () => {
    setShowFinishButton(false)
  }

  const onResizeStart: RndResizeStartCallback = () => {
    setShowFinishButton(false)
  }

  const handleFinish = () => {
    onFinish?.(size, position)
  }

  return (
    <>
      <Rnd
        enableResizing={true}
        size={size}
        position={position}
        style={boxStyle}
        resizeHandleClasses={{
          bottomLeft: "resize-handle resize-handle__left-bottom",
          bottomRight: "resize-handle resize-handle__right-bottom",
          topLeft: "resize-handle resize-handle__left-top",
          topRight: "resize-handle resize-handle__right-top"
        }}
        onDragStop={onDragFinish}
        onResizeStop={onResizeFinish}
        onDragStart={onDragStart}
        onResizeStart={onResizeStart}
      />
      {showFinishButton && (
        <Button
          style={{
            position: "absolute",
            top: position.y - finishButtonHeight,
            left: position.x
          }}
          onClick={handleFinish}>
          Finish
        </Button>
      )}
    </>
  )
}

export default SelectionBox

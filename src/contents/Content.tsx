import styleText from "data-text:./Content.scss"
import type { PlasmoGetStyle } from "plasmo"
import { useEffect, useState } from "react"

import useTabStorage from "~hooks/useTabStorage"

function addOverlay() {
  const overlay = document.createElement("div")
  overlay.id = "drawing-overlay"
  overlay.style.position = "fixed"
  overlay.style.top = "0"
  overlay.style.left = "0"
  overlay.style.width = "100%"
  overlay.style.height = "100%"
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)" // Semi-transparent black
  overlay.style.border = "3px solid red" // Red border for visibility
  overlay.style.zIndex = "9999" // Ensure it's on top of other elements
  overlay.style.pointerEvents = "none" // Allow interactions with underlying elements
  overlay.style.cursor = "crosshair"

  document.body.appendChild(overlay)
}

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

const Content = () => {
  const { tabData, updateTabData } = useTabStorage()

  const isTextSelectionActive = tabData.isTextSelectionActive

  const [highlightedElement, setHighlightedElement] =
    useState<HTMLElement | null>(null)

  useEffect(() => {
    attachEventHandlers()

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("click", handleClick)
    }
  }, [isTextSelectionActive, highlightedElement])

  useEffect(() => {
    if (isTextSelectionActive) {
      console.log("Adding overlay")
      addOverlay()
    } else {
      // Remove the overlay when canDraw is false
      const overlay = document.getElementById("drawing-overlay")
      if (overlay) {
        document.body.removeChild(overlay)
      }
    }
  }, [isTextSelectionActive])

  const handleMouseOver = (event: MouseEvent) => {
    if (isTextSelectionActive) {
      const target = event.target as HTMLElement
      if (highlightedElement) {
        highlightedElement.style.outline = ""
      }
      target.style.outline = "2px solid red"
      setHighlightedElement(target)
    }
  }

  const handleClick = (event: MouseEvent) => {
    if (isTextSelectionActive) {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const textContent = target.textContent || ""
      console.log("Selected text", textContent);
      updateTabData({
        selectedText: [...(tabData.selectedText || []), textContent]
      })
    }
  }

  function attachEventHandlers() {
    if (isTextSelectionActive) {
      document.addEventListener("mouseover", handleMouseOver)
      document.addEventListener("click", handleClick)
    } else {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("click", handleClick)
      if (highlightedElement) {
        highlightedElement.style.outline = ""
        setHighlightedElement(null)
      }
    }
  }

  return null
}

export default Content

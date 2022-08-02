const useHorizontalScroll = (elRef) => {
  const onWheel = (ev) => {
    const element = elRef?.current
    if (element) {
      // Get amount of scrolled pixels with wheel event
      const eventDeltaY = ev?.deltaY || ev?.nativeEvent?.deltaY
      if (eventDeltaY === 0) return

      // Scroll element by the amount of scrolled pixels
      element.scrollLeft += eventDeltaY
    }
  }
  return onWheel
}

export default useHorizontalScroll

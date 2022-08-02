const useTransformCalendarItemData = (props) => {
  const { index, monthName, weekday, selected, disabled } = props

  const monthShortName =
    monthName.charAt(0).toUpperCase() + monthName.substring(1, 3)

  const dateName = weekday.charAt(0).toUpperCase() + weekday.substring(1, 3)

  const textColor = disabled
    ? 'var(--ql-state-disabled-color)'
    : selected
    ? 'var(--ql-typography-text-color-primary-inverse)'
    : 'var(--ql-typography-text-color-primary)'
  const dayBackground = disabled
    ? 'var(--ql-state-disabled-bg)'
    : selected
    ? 'var(--ql-color-accent1)'
    : 'var(--ql-color-dark-t-lighten6)'

  const calendarItemWrapperStyles = {
    bg: dayBackground,
    py: 16,
    px: 20,
    ml: index === 0 ? 0 : 3,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer'
  }
  return { monthShortName, dateName, textColor, calendarItemWrapperStyles }
}
export default useTransformCalendarItemData

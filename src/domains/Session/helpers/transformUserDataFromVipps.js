const transformUserDataFromVipps = ({ user, data, state, isAuth }) => {
  //convert user personal number from object to string if exists
  const { day, month, year, extraDigits } = data?.personalNumber || {}
  const shortYear = year?.substring(2) || ''
  const isPersonalNumberPassed = [day, month, shortYear, extraDigits].every(
    (part) => !!part
  )
  const userPersonalNumber = isPersonalNumberPassed
    ? `${day}${month}${shortYear}${extraDigits}`
    : ''

  const userPhoneNumber = data?.phoneNumber ? `+${data?.phoneNumber}` : null
  // format object with necessary user data
  const userData = {
    userId: user?.uid,
    firstName: data?.givenName,
    lastName: data?.familyName,
    postalCode: data?.address?.postalCode,
    phoneNumber: userPhoneNumber,
    email: data?.email,
    personalNumber: userPersonalNumber,
    bookingId: isAuth ? null : state,
    isAuth
  }
  return userData
}
export default transformUserDataFromVipps

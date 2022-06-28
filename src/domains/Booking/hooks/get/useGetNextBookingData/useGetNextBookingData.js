import {
  useCollectionDataOnce,
  useDocumentDataOnce
} from 'react-firebase-hooks/firestore'

// import { BOOKED_STATUS } from 'domains/Booking/__constants__/bookingStatuses'
import { COLLECTIONS } from '__constants__'
import firebase from 'firebase/compat/app'
import moment from 'moment'
import { useMemo } from 'react'
import { useUser } from 'domains/User/context'

const { BOOKINGS, TREATMENTS, TREATMENTS_ADDONS, CLINICIANS, CLINICS } =
  COLLECTIONS

const useNextBooking = () => {
  const { user } = useUser()

  //! STRING DATE INSIDE MOMENT SHOULD BE REMOVED AFTER TESTING AND ALL FIXES
  const currentDateFormatted = useMemo(
    () => moment('2022-06-10').format('YYYY-MM-DDTHH:mm:ss'),
    []
  )

  // Get booking Data by userId and filtered by start date
  const [nextBooking, nextBookingLoading, nextBookingError] =
    useCollectionDataOnce(
      user?._id &&
        firebase
          .firestore()
          .collection(BOOKINGS)
          .where('userId', '==', user?._id)
          //! 'PENDING' SHOULD BE REPLACED TO {BOOKED_STATUS} AFTER TESTING AND FIXING ALL BUGS
          .where('status', '==', 'PENDING')
          .where('start', '>=', currentDateFormatted)
          .orderBy('start')
          .limit(1)
    )

  // Compute client booking by getting first booking from the collection
  const clientBooking = useMemo(() => {
    const bookingData = nextBooking?.[0]

    if (bookingData) {
      return {
        ...bookingData,
        price:
          (typeof bookingData?.price === 'number' && !bookingData?.price) ||
          bookingData?.price
            ? 'free'
            : bookingData?.price
      }
    }
    return {}
  }, [nextBooking])

  // Get booking treatment
  const [bookingTreatment, treatmentLoading, treatmentError] =
    useDocumentDataOnce(
      clientBooking?.treatmentId &&
        firebase
          .firestore()
          .collection(TREATMENTS)
          .doc(clientBooking?.treatmentId?.toString())
    )

  // Get booking clinic
  const [bookingClinic, clinicLoading, clinicError] = useDocumentDataOnce(
    clientBooking?.clinicId &&
      firebase.firestore().collection(CLINICS).doc(clientBooking?.clinicId)
  )

  // Get booking clinician
  const [bookingClinician, clinicianLoading, clinicianError] =
    useDocumentDataOnce(
      clientBooking?.clinicianId &&
        firebase
          .firestore()
          .collection(CLINICIANS)
          .doc(clientBooking?.clinicianId?.toString())
    )

  const [bookingAddons, addonsLoading, addonsError] = useCollectionDataOnce(
    clientBooking?.addons?.length &&
      bookingTreatment &&
      firebase
        .firestore()
        .collection(TREATMENTS)
        .doc(bookingTreatment?._id?.toString())
        .collection(TREATMENTS_ADDONS)
        .where('_id', 'in', clientBooking?.addons)
  )

  const computedLoading = useMemo(
    () =>
      nextBookingLoading ||
      treatmentLoading ||
      clinicLoading ||
      clinicianLoading ||
      addonsLoading,
    [
      nextBookingLoading,
      treatmentLoading,
      clinicLoading,
      clinicianLoading,
      addonsLoading
    ]
  )

  const computedError = useMemo(
    () =>
      nextBookingError ||
      treatmentError ||
      clinicError ||
      clinicianError ||
      addonsError,
    [nextBookingError, treatmentError, clinicError, clinicianError, addonsError]
  )

  const transformedBookingData = useMemo(
    () => ({
      ...clientBooking,
      treatment: bookingTreatment,
      addons: bookingAddons,
      clinic: bookingClinic,
      clinician: bookingClinician
    }),
    [
      clientBooking,
      bookingTreatment,
      bookingClinic,
      bookingClinician,
      bookingAddons
    ]
  )

  return {
    nextBookingData: transformedBookingData,
    bookingLoading: computedLoading,
    bookingError: computedError
  }
}

export default useNextBooking

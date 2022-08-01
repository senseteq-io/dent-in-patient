import {
  useCollectionDataOnce,
  useDocumentDataOnce
} from 'react-firebase-hooks/firestore'

import firebase from 'firebase/compat/app'

const useGetBookingData = (booking) => {
  //get firebase collection length to display on collapse
  const [clinician] = useDocumentDataOnce(
    booking?.clinicianId &&
      firebase
        .firestore()
        .collection('clinicians')
        .doc(booking?.clinicianId?.toString())
  )

  const [treatment] = useDocumentDataOnce(
    booking?.treatmentId &&
      firebase
        .firestore()
        .collection('treatments')
        .doc(booking?.treatmentId?.toString())
  )

  const [clinic] = useDocumentDataOnce(
    booking?.clinicId &&
      firebase
        .firestore()
        .collection('clinics')
        .doc(booking?.clinicId?.toString())
  )
  const [addons] = useCollectionDataOnce(
    booking?.addons?.length &&
      firebase
        .firestore()
        .collection('treatments')
        .doc(treatment?._id?.toString())
        .collection('treatmentsAddons')
        .where('_id', 'in', booking?.addons)
  )

  return [clinician, treatment, clinic, addons]
}
export default useGetBookingData

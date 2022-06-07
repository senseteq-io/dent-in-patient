import { model, attr, belongsTo } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  price: yup.number().default(null),
  status: yup.string().default(null),
  vippsStateCode: yup.string().default(null),
  timeslot: yup.string().default(null),
  patient: yup.string().default(null)
})

const Booking = model(
  'booking',
  {
    price: attr('number'),
    status: attr('string'),
    vippsStateCode: attr('string'),
    timeslot: belongsTo('timeslot'),
    patient: belongsTo('patient')
  },
  validationSchema
)

export default Booking

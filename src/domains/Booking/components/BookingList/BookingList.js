import { AddItemCard, Empty } from 'components'
import { Card, Col, Row } from '@qonsoll/react-design'

import BookingSimpleView from '../BookingSimpleView'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const BookingList = (props) => {
  const { bookings } = props
  const history = useHistory()
  const { t } = useTranslations()
  const [selectedItem, setSelectedItem] = useState(null)

  const onCreateButtonClick = () => history.push('/booking/create')
  const onEmptySpaceClick = () => setSelectedItem(null)
  const checkRenderConditions = props?.listView ? 12 : [12, 12, 6, 6, 6, 4]
  return (
    <Row
      onClick={onEmptySpaceClick}
      mx={-16}
      // height="100%"
      // height={!bookings?.length ? '100%' : 'auto'}
      // v={!bookings?.length ? 'center' : 'top'}
    >
      {bookings?.length > 0 ? (
        <>
          {!props?.hideAddCard && (
            <AddItemCard
              cardWidth={checkRenderConditions}
              message="Add booking"
              onClickAction={
                props?.isListWithCreate
                  ? props?.onCreateButtonClick
                  : onCreateButtonClick
              }
            />
          )}
          {bookings?.map((booking, index) => (
            <Col key={booking?._id || index} cw={checkRenderConditions}>
              <Card
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(booking?._id)
                }}
                bodyStyle={{
                  padding: '8px 0px',
                  borderRadius: '12px',
                  width: '100%',
                  height: '100%'
                }}
                style={{
                  backgroundColor:
                    booking?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    booking?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent',
                  height: '100%',
                  alignItems: 'center',
                  display: 'flex'
                }}
                mb={32}
              >
                <BookingSimpleView booking={booking} />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Col>
          <Empty
            showImage={!props?.isListWithCreate}
            message={t('No bookings')}
          />
        </Col>
      )}
    </Row>
  )
}

BookingList.propTypes = {
  bookings: PropTypes.array,
  clinicians: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default BookingList

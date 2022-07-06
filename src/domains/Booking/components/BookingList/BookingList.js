import { Badge, Card, Col, Row, Title } from '@qonsoll/react-design'
import { StyledCollapse, StyledPanel } from './BookingList.styled'
import { useMemo, useState } from 'react'

import { AddItemCard } from 'components'
import BookingSimpleView from '../BookingSimpleView'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const BookingList = (props) => {
  const { bookings, title } = props
  const history = useHistory()
  const [selectedItem, setSelectedItem] = useState(null)
  const isPanelOpen = useMemo(
    () => JSON.parse(localStorage.getItem(title)),
    [title]
  )
  const onCreateButtonClick = () => history.push('/booking/create')
  const onEmptySpaceClick = () => setSelectedItem(null)
  const checkRenderConditions = props?.listView ? 12 : [12, 12, 6, 6, 6, 4]
  const isCollapsible = !bookings?.length && 'disabled'
  const defaultPanel = isPanelOpen && title

  const handleChange = (key) => {
    localStorage.setItem(title, JSON.stringify(!!key?.length))
  }
  return (
    <Row onClick={onEmptySpaceClick} mb="16px">
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
        <StyledCollapse
          width="100%"
          bordered={false}
          onChange={handleChange}
          expandIconPosition="right"
          collapsible={isCollapsible}
          defaultActiveKey={defaultPanel}
        >
          <StyledPanel
            key={title}
            header={
              <>
                <Title mr={2} level={5} textTransform="uppercase">
                  {title}
                </Title>
                <Badge
                  showZero
                  count={bookings?.length}
                  style={{
                    backgroundColor:
                      bookings?.length > 0
                        ? 'var(--badge-color)'
                        : 'var(--btn-default-bg)'
                  }}
                />
              </>
            }
          >
            <Row>
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
            </Row>
          </StyledPanel>
        </StyledCollapse>
      </>
      {/* ) : (
        <Col>
          <Empty
            showImage={!props?.isListWithCreate}
            message={t('No bookings')}
          />
        </Col>
      )} */}
    </Row>
  )
}

BookingList.propTypes = {
  bookings: PropTypes.array,
  title: PropTypes.string,
  clinicians: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default BookingList

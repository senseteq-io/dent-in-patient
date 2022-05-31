import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from '@qonsoll/react-design'
import { useBackButtonVisibility } from './hooks'
import { useHistory } from 'react-router-dom'

const Back = () => {
  const history = useHistory()
  const isButtonVisible = useBackButtonVisibility()

  const goBack = () => history.goBack()

  return (
    <>
      {isButtonVisible ? (
        <Button
          type="text"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={goBack}
        />
      ) : null}
    </>
  )
}

export default Back

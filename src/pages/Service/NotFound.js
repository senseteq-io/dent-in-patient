import {
  Box,
  Button,
  Img,
  Layout,
  LayoutSystemProvider,
  Text,
  Title
} from '@qonsoll/react-design'

import IllustrationNotFound from 'assets/NotFound.svg'
import { ThemeProvider } from 'styled-components'
import breakpoints from '../../styles/breakpoints'
import logoDentIn from 'assets/logo-dentin-light.svg'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const NotFound = () => {
  const { t } = useTranslations()
  const history = useHistory()
  const layoutConfig = {}

  const goBack = () => history.goBack()

  return (
    <ThemeProvider theme={breakpoints}>
      <LayoutSystemProvider {...layoutConfig}>
        <Layout>
          <Img
            src={logoDentIn}
            alt="Dent in"
            height="40"
            position="absolute"
            top={16}
            left={24}
          />
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems={['stretch', 'center']}
            justifyContent={['stretch', 'center']}
          >
            <Img
              src={IllustrationNotFound}
              width={['100%', 400, 480]}
              mt={['auto', 0]}
              mb={[3, 4]}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={[4, 64]}
            >
              <Title
                fontFamily="var(--ql-font-family-headings)"
                variant={['h3', 'h1']}
                textAlign="center"
                mb={[2, 3]}
              >
                {t('pageNotFound', 'Oops... Page not found')}
              </Title>
              <Text textAlign="center">
                {t(
                  'pageNotFoundSubtitle',
                  `We can't seem to find the page you are looking for.`
                )}
              </Text>
            </Box>
            <Box display="flex" flexDirection={['column', 'row']}>
              <Button
                type="primary"
                size="large"
                block={[true, false]}
                onClick={goBack}
              >
                {t('Go back')}
              </Button>
            </Box>
          </Box>
        </Layout>
      </LayoutSystemProvider>
    </ThemeProvider>
  )
}

export default NotFound

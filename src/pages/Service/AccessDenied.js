import {
  Box,
  Button,
  Img,
  Layout,
  LayoutSystemProvider,
  Text
} from '@qonsoll/react-design'

import IllustrationAccessDenied from 'assets/AccessDenied.svg'
import { ThemeProvider } from 'styled-components'
import breakpoints from '../../styles/breakpoints'
import logoQonsoll from 'assets/logo-ql-full-primary.svg'
import { useHistory } from 'react-router-dom'
import { useTranslations } from 'contexts/Translation'

const AccessDenied = () => {
  const { t } = useTranslations()
  const history = useHistory()
  const layoutConfig = {}

  const goBack = () => history.goBack()

  return (
    <ThemeProvider theme={breakpoints}>
      <LayoutSystemProvider {...layoutConfig}>
        <Layout>
          <Img
            src={logoQonsoll}
            alt="Qonsoll"
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
            <IllustrationAccessDenied
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
              <Text
                fontFamily="var(--ql-font-family-headings)"
                variant={['h3', 'h1']}
                textAlign="center"
                mb={[2, 3]}
              >
                {t('Restricted space')}
              </Text>
              <Text textAlign="center">
                {t(
                  'accessDeniedSubtitle',
                  `The page you're trying to access has restricted access`
                )}
              </Text>
            </Box>
            <Button
              type="primary"
              size="large"
              block={[true, false]}
              onClick={goBack}
            >
              {t('Go back')}
            </Button>
          </Box>
        </Layout>
      </LayoutSystemProvider>
    </ThemeProvider>
  )
}

export default AccessDenied

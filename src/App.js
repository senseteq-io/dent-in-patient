import { GDPRPopup } from './domains/App/components'
import Navigator from './pages/Navigator'
import { TranslationsProvider } from 'contexts/Translation'

/**
 * It returns a React component that renders a TranslationsProvider and a Navigator.
 * @returns The <TranslationsProvider> component.
 */
function App() {
  return (
    <TranslationsProvider>
      <Navigator />
      <GDPRPopup />
    </TranslationsProvider>
  )
}

export default App

import { LANGUAGES } from 'contexts/Translation/__constants__'
import { Select } from 'antd'
import { useTranslations } from 'contexts/Translation'

const LanguageSelect = () => {
  /* Using the useTranslations hook to get the current language and the translateLoading hook to get
  the loading state of the translation. */
  const { setCurrentLanguage, language, setLanguageSwitch, translateLoading } =
    useTranslations()

  /**
   * The function takes in a value from the language dropdown and sets the current language to that
  value.
   * @returns None
   */
  const onChange = ({ value }) => {
    setLanguageSwitch(true)
    setCurrentLanguage(value)
  }

  return (
    <Select
      block
      labelInValue
      defaultValue={LANGUAGES.find(({ value }) => value === language)}
      options={LANGUAGES.filter(({ value }) => value !== language)}
      style={{ minWidth: 150 }}
      loading={translateLoading}
      onSelect={onChange}
    />
  )
}

LanguageSelect.propTypes = {}

export default LanguageSelect

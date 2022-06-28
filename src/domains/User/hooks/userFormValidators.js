import { useTranslations } from 'contexts/Translation'

const useUserFormValidators = () => {
  const { t } = useTranslations()

  const postalCodeValidator = (_, value) => {
    const reg = /^[0-9]{4}$/
    const numberPostalCode = parseInt(value)
    const validationResult =
      reg.test(value) && numberPostalCode >= 10 && numberPostalCode <= 9990
    // if there is no value, we resolve as valid, to show default required field message
    return !value || validationResult
      ? Promise.resolve()
      : Promise.reject(
          new Error(
            t(
              'The postal code should consist of 4 digits in range 0010 to 9990'
            )
          )
        )
  }

  const personalNumberValidator = (_, value) => {
    const day = parseInt(value.substring(0, 2))
    const dayValidation = day >= 1 && day <= 31
    const month = parseInt(value.substring(2, 4))
    const monthValidation = month >= 1 && month <= 12
    const otherNumbersValidation = /^[0-9]{7}$/.test(value.substring(4))
    const isPassedValidation =
      dayValidation && monthValidation && otherNumbersValidation
    return !value || isPassedValidation
      ? Promise.resolve()
      : Promise.reject(
          new Error(
            t(
              'The personal code should consist of birth date in format DDMMYY and 5 extra digits'
            )
          )
        )
  }

  return {
    postalCodeValidator,
    personalNumberValidator
  }
}

export default useUserFormValidators

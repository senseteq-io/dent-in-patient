import { FilterFilled, FilterOutlined } from '@ant-design/icons'
import { useTranslations } from 'contexts/Translation'
import { useMemo, useState } from 'react'

/**
 * This hook returns an object with the following properties:
 *
 * The filterData object is used to store the filter data. It has the following structure:
 * @param data - The data that will be filtered.
 * @returns An object with the following properties:
 * filterVisibility
 * filterData
 * setFilterData
 * filterButtonText
 * filterButtonIcon
 * onFilterButtonClick
 * showFilter
 */
const useFilter = () => {
  const { t } = useTranslations()
  const [filterVisibility, setFilterVisibility] = useState(true)

  const [filterData, setFilterData] = useState({})

  const filterButtonText = useMemo(
    () => (filterVisibility ? t('Hide filter') : t('Show filter')),
    [filterVisibility, t]
  )
  const filterButtonIcon = useMemo(
    () => (filterVisibility ? <FilterOutlined /> : <FilterFilled />),
    [filterVisibility]
  )
  const onFilterButtonClick = () => setFilterVisibility(!filterVisibility)

  return {
    filterVisibility,
    setFilterVisibility,
    filterData,
    setFilterData,
    filterButtonText,
    filterButtonIcon,
    onFilterButtonClick
  }
}

export default useFilter

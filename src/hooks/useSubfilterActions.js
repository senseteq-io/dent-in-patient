const LS_LABEL = 'details-visibility'

const useSubfilterActions = ({
  filterData,
  setFilterData,
  fieldName,
  operand
}) => {
  const onToggleDetails = (type) => {
    const currentState = localStorage.getItem(`${type}-${LS_LABEL}`)
    if (!currentState || currentState === 'closed') {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'opened')
    } else {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'closed')
    }
  }

  const checkIsEnabled = (data) =>
    filterData?.where?.some((query) => query?.includes(data._id))

  const ifFilterDataHasAnyCategory = () =>
    filterData?.where
      ? filterData?.where?.findIndex((query) => query?.includes(fieldName))
      : -1

  const onChange = (data) => {
    if (checkIsEnabled(data)) {
      setFilterData((prev) => {
        return {
          where: [...prev.where.filter((query) => !query.includes(data._id))]
        }
      })
    } else {
      const index = ifFilterDataHasAnyCategory()
      setFilterData((prev) => {
        const newFilterData = { ...prev }
        if (index === -1) {
          newFilterData.where = !Array.isArray(newFilterData.where)
            ? [[fieldName, operand, data._id]]
            : [...newFilterData.where, [fieldName, operand, data._id]]
        } else {
          newFilterData.where[index] = [...[fieldName, operand, data._id]]
        }
        return JSON.parse(JSON.stringify({ ...newFilterData }))
      })
    }
  }

  return { onChange, checkIsEnabled, onToggleDetails }
}

export default useSubfilterActions

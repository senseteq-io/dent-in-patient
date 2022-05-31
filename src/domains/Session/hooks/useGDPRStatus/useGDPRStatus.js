import { LS } from '__constants__'

const useGDPRStatus = () => JSON.parse(localStorage.getItem(LS.GDPR))

export default useGDPRStatus

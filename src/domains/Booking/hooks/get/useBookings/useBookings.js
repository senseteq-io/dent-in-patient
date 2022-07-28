import useCollection from 'hooks/useCollection'

const ref = 'bookings'
export default function useBookings(props) {
  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollection({ ref, ...props })

  return [value, loading, error, next, loadingMore, loadMoreAvailable]
}

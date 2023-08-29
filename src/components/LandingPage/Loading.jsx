import { Stack } from 'react-bootstrap'

const Loading = () => {
  return (
    <Stack direction="horizontal" className="p-5 justify-content-center" gap={2}>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Stack>
  )
}

export default Loading
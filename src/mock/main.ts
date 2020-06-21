import env from 'env-var'
import { app } from './app'

function getApiMockAddress () {
  const TYPE = process.env.TYPE
  return (TYPE === 'storybook' ? 'REACT_APP_API_MOCK_STORYBOOK_ADDRESS' : 'REACT_APP_API_MOCK_ADDRESS')
}

const API_MOCK_ADDRESS = env
  .get(getApiMockAddress())
  .required()
  .asUrlString()

const PORT = Number(API_MOCK_ADDRESS.replace(/\/$/, '').split(':').pop())

app.listen(PORT, () => {
  console.log(`[Mock Server] Running on ${PORT}`)
})

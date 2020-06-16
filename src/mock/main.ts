import env from 'env-var'
import { app } from './app'

const API_MOCK_ADDRESS = env
  .get('REACT_APP_API_MOCK_ADDRESS')
  .required()
  .asUrlString()

const PORT = Number(API_MOCK_ADDRESS.replace(/\/$/, '').split(':').pop())

app.listen(PORT, () => {
  console.log(`[Mock Server] Running on ${PORT}`)
})

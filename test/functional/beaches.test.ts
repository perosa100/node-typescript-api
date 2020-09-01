import { Beach } from '@src/models/beach'
describe('Beaches functional tests', () => {
  beforeAll(async () => {
    await Beach.deleteMany({})
  })

  describe('When creating a beach', () => {
    it('should create a beach with success', async () => {
      const NewBeach = {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E'
      }

      const response = await global.testRequest.post('/beaches').send(NewBeach)
      expect(response.status).toBe(201)
      expect(response.body).toEqual(expect.objectContaining(NewBeach))
    })

    it('should return 422 when there is a validation error', async () => {
      const NewBeach = {
        lat: 'invalid_string',
        lng: 151.289824,
        name: 'Manly',
        position: 'E'
      }

      const response = await global.testRequest.post('/beaches').send(NewBeach)

      expect(response.status).toBe(422)
      expect(response.body).toEqual({
        error:
          'Beach validation failed: lat: Cast to Number failed for value "invalid_string" at path "lat"'
      })
    })
  })
})

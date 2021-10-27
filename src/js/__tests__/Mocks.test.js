import GameSavingLoader from '../GameSavingLoader';
import json from '../parser';
import read from '../reader';

jest.mock('../reader');
jest.mock('../parser');

afterEach(() => jest.resetAllMocks());

test('Метод load должен создавать объект типа GameSaving', async () => {
  json.mockResolvedValue('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');
  const received = await GameSavingLoader.load();
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  };
  expect(received).toEqual(expected);
});

test('Метод load должен выбрасывать ошибку', async () => {
  read.mockRejectedValue(new Error('Ошибка!'));
  try {
    await GameSavingLoader.load();
  } catch (error) {
    expect(error.message).toEqual('Ошибка!');
  }
});

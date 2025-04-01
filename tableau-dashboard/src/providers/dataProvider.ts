import { DataProvider, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const httpClient = fetchUtils.fetchJson;

const baseDataProvider = simpleRestProvider(apiUrl, httpClient);

export const dataProvider: DataProvider = {
  ...baseDataProvider,
  getMany: baseDataProvider.getMany,
  getManyReference: baseDataProvider.getManyReference,
  updateMany: baseDataProvider.updateMany,
  deleteMany: baseDataProvider.deleteMany,
};
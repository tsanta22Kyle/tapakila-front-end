// import { DataProvider, fetchUtils } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';

// const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1';

// const httpClient = fetchUtils.fetchJson;

// const baseDataProvider = simpleRestProvider(apiUrl, httpClient);

// export const dataProvider: DataProvider = {
//   ...baseDataProvider,
//   getList: baseDataProvider.getList,
//   getOne: baseDataProvider.getOne,
//   getMany: baseDataProvider.getMany,
//   getManyReference: baseDataProvider.getManyReference,
//   updateMany: baseDataProvider.updateMany,
//   deleteMany: baseDataProvider.deleteMany,
// };

import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  Identifier,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from "react-admin";
import { apiFetch } from "../axios.config";
// import { GetListParams, GetListResult } from '../lib/types';

export const eventDataProviders: DataProvider = {
  getList: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    const { data: res }: { data: { data: { data: any[] } } } =
      await apiFetch.get(`${resource.toLowerCase()}`);
    // console.log(res.data.data);
    const data: GetListResult = {
      data: res.data.data,
      total: res.data.data.length,
    };
    return Promise.resolve(data);
  },
  getOne: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    const { id } = params;
    const { data: res }: GetOneResult = await apiFetch.get(
      `${resource.toLowerCase()}/${id}`,
    );
    const data: GetOneResult = {
      data: res,
    };
    return Promise.resolve(data);
    //  throw new Error('Function not implemented.');
  },
  getMany: async function <RecordType extends RaRecord = any>(
    //nasiko getMany temporaire
    resource = "events",
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    const { ids } = params;
    const promises = ids.map((id) => this.getOne(resource, { id }));
    const results = await Promise.all(promises);
    results.forEach((r)=>{
      console.log(r.data.data)
    })
    return { data: results.map((r) => r.data.data) };
  },
  getManyReference: function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: UpdateParams,
  ): Promise<UpdateResult<RecordType>> {
    //  throw new Error('Function not implemented.');
    const { data: payload, id } = params;
    console.log(payload, id);
    const { data: res }: UpdateResult = await apiFetch.put(
      `${resource.toLowerCase()}/${id}`,
      payload,
    );
    const data: UpdateResult = {
      data: res,
    };
    return Promise.resolve(data);
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource = "events",
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: async function <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource = "events",
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    const { data: payload } = params;
    const { data: res }: CreateResult = await apiFetch.post(
      `${resource.toLowerCase()}/`,
      payload,
    );
    const data: CreateResult = {
      data: res,
    };
    return Promise.resolve(data);
    //  throw new Error('Function not implemented.');
  },
  delete: function <RecordType extends RaRecord = any>(
    resource = "events",
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource = "events",
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

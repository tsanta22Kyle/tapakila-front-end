
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
  PaginationPayload,
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
    const { page, perPage } = params.pagination;
    const url = `${resource.toLowerCase()}?page=${page}&pageSize=${perPage}`;
    const { data: res }: { data: { data: { data: any[] } } } =
      await apiFetch.get(url);

    // console.log(res.data.data);
    const data: GetListResult = {
      data: res.data.data,
      total: res.data.data.length,
      meta: res.data.meta,
    };
    return Promise.resolve(data);
  },
  getOne: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    const { id }: GetOneParams<RecordType> & QueryFunctionContext = params;
    const { data: res }: { data: { data: { data: any[] } } } =
      await apiFetch.get(`${resource.toLowerCase()}/${id}`);
    const data: GetOneResult = {
      data: res.data,
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
      console.log(r.data)
    })
    return { data: results.map((r) => r.data == undefined || r.data == null?r.data.data:r.data) };
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
    const { data: res }: UpdateResult = await apiFetch.put(
      `${resource.toLowerCase()}/${id}`,
      payload,
    );
    const data: UpdateResult = {
      data: res?.data,
    };
    console.log(data);
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
      data: res?.data,
    };
    return Promise.resolve(data);
    //  throw new Error('Function not implemented.');
  },
  delete: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    const { id } = params;
    const { data: res }: DeleteResult = await apiFetch.delete(
      `${resource.toLowerCase()}`,
      {
        data: {
          ids: [id],
        },
      },
    );
    const data: DeleteResult = {
      data: res?.data,
    };
    return Promise.resolve(data);
  },
  deleteMany: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    const { ids } = params;
    console.log("hello");
    const { data: res }: DeleteResult = await apiFetch.delete(
      `${resource.toLowerCase()}`,
      {
        data: {
          ids: ids,
        },
      },
    );
    const data: DeleteResult = {
      data: res?.data,
    };
    return Promise.resolve(data);
  },
};

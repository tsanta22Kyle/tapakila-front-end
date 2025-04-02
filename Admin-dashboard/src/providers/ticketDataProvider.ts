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

export const TicketDataProvider: DataProvider = {
  getList: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    
    

    try {
        const {page,perPage} = params.pagination;
const url = `${resource.toLowerCase()}?page=${page}&pageSize=${perPage}`;
      const { data: res }: { data: { data: { data: any[] } } } =
        await apiFetch.get(url);
      const data: GetListResult = {
        data: res.data.data,
        total: res.data.data.length,
      };
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getOne: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    try {
        const {id} = params;
        const url = `${resource.toLowerCase()}/`+id;
        const {data:res} = await apiFetch.get(url);  
        const data : GetOneResult = {
            data : res.data[0]
        }
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error)
    }
    
  },
  getMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: function <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    throw new Error("Function not implemented.");
  },
  delete: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

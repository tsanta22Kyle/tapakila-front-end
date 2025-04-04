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
      const { page, perPage } = params.pagination;
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
      const { id } = params;
      const url = `${resource.toLowerCase()}/` + id;
      const { data: res } = await apiFetch.get(url);
      const data: GetOneResult = {
        data: res.data,
      };
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getMany: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    const { ids } = params;
    const promises = ids.map((id) => this.getOne(resource, { id }));
    const results = await Promise.all(promises);

    return { data: results.map((r) => r.data.data) };
  },
  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: async function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams,
  ): Promise<UpdateResult<RecordType>> {
    // throw new Error("Function not implemented.");
    const {data: updateTicketData , id} = params;
    console.log("update",updateTicketData)
    const {data : res} : UpdateResult = await apiFetch.put(
      `${resource.toLowerCase()}/${id}`,
      updateTicketData,
    );
    console.log("response",res)

    const data : UpdateResult = {
      data : res.data
    }
    return Promise.resolve(data);
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: async function <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    
    const {data : newTicket} = params;
    // console.log(newTicket);
    const createdTickets = {...newTicket,availability : true,createdAt : new Date(),updatedAt : new Date()};
    
    // console.log(createdTickets)
    const {data:res} : CreateResult= await apiFetch.post(`${resource.toLowerCase()}`,createdTickets)
    
    const data : CreateResult = {
      data : res?.data,
    }
    return Promise.resolve(data);
    
  },
  delete:async function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    const{id}= params;
    const {data:res}= await apiFetch.delete(`${resource.toLowerCase()}/${id}`);

    const data : DeleteResult={
      data : res
    }
    return Promise.resolve(data)
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

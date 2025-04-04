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

export const reservationDataProviders: DataProvider = {
  getList: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetListParams & QueryFunctionContext,
  ): Promise<GetListResult<RecordType>> {
    const { data: res }: { data: { data: { data: any[]; meta: any } } } =
      await apiFetch.get(`events`);

    const eventWithUserTicket = res.data.data.map((event) => {
      const userTicketPerTicket = event.tickets.map((ticket: any) => {
        return {
          category: ticket.category,
          price: ticket.price,
          userTickets: ticket.userTickets,
        };
      });
      return {
        id: event.id,
        categoryName: event.category.name,
        date: event.date,
        title: event.title,
        place: event.place,
        img: event.img,
        tickets: userTicketPerTicket,
      };
    });
    const data: GetListResult = {
      data: eventWithUserTicket,
      total: res.data.data.length,
      meta: res.data.meta,
    };

    console.log(data.data);
    return Promise.resolve(data);
  },
  getOne: async function <RecordType extends RaRecord = any>(
    resource = "events",
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    const { id }: GetOneParams<RecordType> & QueryFunctionContext = params;
    const { data: res }: { data: { data: { data: any[] } } } =
      await apiFetch.get(`events/${id}`);
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

    return { data: results.map((r) => r.data.data[0]) };
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
      `events/${id}`,
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
    const { data: res }: CreateResult = await apiFetch.post(`events/`, payload);
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
    const { data: res }: DeleteResult = await apiFetch.delete(`events`, {
      data: {
        ids: [id],
      },
    });
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
    const { data: res }: DeleteResult = await apiFetch.delete(`events`, {
      data: {
        ids: ids,
      },
    });
    const data: DeleteResult = {
      data: res?.data,
    };
    return Promise.resolve(data);
  },
};

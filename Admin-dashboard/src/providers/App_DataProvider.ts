// import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
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
import { eventDataProviders } from "./eventDataProvider";
import { TicketDataProvider } from "./ticketDataProvider";
import { userDataProviders } from "./userDataProvider";

export const AppDataprovider: DataProvider = {
  getList: (resource, params) => {
    // Routez vers le bon dataProvider en fonction de la ressource
    // console.log("ressource :", resource);
    switch (resource) {
      case "events":
        return eventDataProviders.getList(resource, params);
      case "tickets":
        return TicketDataProvider.getList(resource, params);
      case "users":
        return userDataProviders.getList(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  getOne: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ): Promise<GetOneResult<RecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.getOne(resource, params);
      case "tickets":
        return TicketDataProvider.getOne(resource, params);
      case "users":
        return userDataProviders.getOne(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  getMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.getMany(resource, params);
      case "tickets":
        return TicketDataProvider.getMany(resource, params);
      case "users":
        return userDataProviders.getMany(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
    // throw new Error("Function not implemented.");
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
    switch (resource) {
      case "events":
        return eventDataProviders.update(resource, params);
      case "tickets":
        return TicketDataProvider.update(resource, params);
      case "users":
        return userDataProviders.update(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.updateMany(resource, params);
      case "tickets":
        return TicketDataProvider.updateMany(resource, params);
      case "users":
        return userDataProviders.updateMany(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  create: function <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier },
  >(
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult<ResultRecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.create(resource, params);
      case "tickets":
        return TicketDataProvider.create(resource, params);
      case "users":
        return userDataProviders.create(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  delete: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>,
  ): Promise<DeleteResult<RecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.delete(resource, params);
      case "tickets":
        return TicketDataProvider.delete(resource, params);
      case "users":
        return userDataProviders.delete(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    switch (resource) {
      case "events":
        return eventDataProviders.deleteMany(resource, params);
      case "tickets":
        return TicketDataProvider.deleteMany(resource, params);
      case "users":
        return userDataProviders.deleteMany(resource, params);
      default:
        return Promise.reject(new Error(`Ressource inconnue : ${resource}`));
    }
  },
};

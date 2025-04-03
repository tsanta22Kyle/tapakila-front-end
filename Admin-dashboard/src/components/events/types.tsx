// src/components/events/types.ts
export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: "draft" | "published" | "cancelled";
  image?: {
    src: string;
    title: string;
  };
}

export type EventStatus = IEvent["status"];

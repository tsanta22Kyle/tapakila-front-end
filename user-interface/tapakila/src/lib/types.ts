export enum Category {
  VIP,
  Standard,
  EarlyBird,
}

export type Ticket = {
  id? : string;
  availability?: boolean;
  category?: Category;
  price?: number;
  ticketId? : string;
  quantity? : string;
  event?: Event;
  date:Date | string;
};

export type Event = {
  user: object;
  id: string;
  title: string;
  description: string;
  place: string;
  date: Date;
  organisator: string;
  category: named_category;
  img: string;
  createdAt: Date;
  updatedAt: Date;
  tickets: Ticket[];
};
export type CartStore = {
  cartItems: Ticket[];
  addItem: (item: Ticket) => void;
  removeItem: (id: string) => void;
  QuantityIncrement: (id: string) => void;
  QuantityDiscrement: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

type named_category={
    name : string
}
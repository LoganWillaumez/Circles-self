export interface CirclesAdditionalDatas {
  circle_id: number;
  created_at: Date;
  updated_at: Date;
  messages: Array<any>; // Replace 'any' with the appropriate message type if available
  events: Array<any>; // Replace 'any' with the appropriate event type if available
}

export interface CirclesInputDatas {
  name?: string;
  customer_admin?: number;
  description?: string;
  img?: string;
}

export interface CirclesDatas
  extends CirclesAdditionalDatas,
    CirclesInputDatas {}

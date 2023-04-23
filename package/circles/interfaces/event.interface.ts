export interface EventAdditionnalDatas {
  id?: number;
  id_circle: number;
  id_customer: number;
}

export interface EventInputDatas {
  title: string;
  description: string;
  allday: boolean;
  start: Date;
  end: Date;
}

export interface EventDatas
  extends EventInputDatas,
  EventAdditionnalDatas {}

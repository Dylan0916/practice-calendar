export interface DateData {
  start: Date;
  end: Date;
}

export interface GetScheduleResponse {
  available: DateData[];
  booked: DateData[];
}

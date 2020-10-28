export interface DateData {
  start: Date;
  end: Date;
}

export interface getScheduleResponse {
  available: DateData[];
  booked: DateData[];
}

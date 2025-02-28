export interface IUser {
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFlight {
  _id?: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  availableSeats: number;
}

export interface IFlightQueryParams {
  searchTerm?: string;
  origin?: string;
  destination?: string;
  page: number;
  limit: number;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IData {
  meta: IMeta;
  data: IFlight[];
}

export interface IFlightsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data?: IData;
}

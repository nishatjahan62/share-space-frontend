export type Role = "ADMIN" | "OWNER" | "TENANT";

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  errors: unknown[];
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string | null;
  isVerified: boolean;
  createdAt: string;
}

export type RoomStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED";

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  rentAmount: number;
  capacity: number;
  currentOccupancy: number;
  status: RoomStatus;
}

export interface Property {
  id: string;
  ownerId: string;
  title: string;
  address: string;
  city: string;
  description: string | null;
  createdAt: string;
  rooms: Room[];
}
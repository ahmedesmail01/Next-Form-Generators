import { AxiosError } from "axios";
import { api } from "./api";

export type CustomError = {
  error: string;
  status: number;
};

export async function getOne<T>(endpoint: string, id: string): Promise<T> {
  try {
    const response = await api.get<T>(`${endpoint}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching ${endpoint} with id ${id}:`, error);
    return {
      error: error?.response?.data?.message,
      status: error?.response?.status,
    } as any;
  }
}

export async function getAll<T>(endpoint: string): Promise<T[] | CustomError> {
  try {
    const response = await api.get<T[]>(endpoint);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching all ${endpoint}:`, error);
    return {
      error: error?.response?.data?.message,
      status: error?.response?.status,
    };
  }
}

export async function deleteOne(
  endpoint: string,
  id: string
): Promise<void | CustomError> {
  try {
    await api.delete(`${endpoint}/${id}`);
  } catch (error: any) {
    console.error(`Error deleting ${endpoint} with id ${id}:`, error);
    return {
      error: error?.response?.data?.message,
      status: error?.response?.status,
    };
  }
}

export async function updateOne<T>(
  endpoint: string,
  id: string,
  data: T
): Promise<T | CustomError> {
  try {
    const response = await api.put<T>(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating ${endpoint} with id ${id}:`, error);
    return {
      error: error?.response?.data?.message,
      status: error?.response?.status,
    };
  }
}

// Example usage:
// const user = await getOne<User>('users', '123');
// const users = await getAll<User>('users');
// await deleteOne('users', '123');
// const updatedUser = await updateOne<User>('users', '123', { name: 'New Name' });

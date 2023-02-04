import Cookies from "universal-cookie";
import axios, { AxiosResponse } from "axios";
import { config } from "@/common/constants/config";
import { isSuccess } from "../requests";
import { Event } from "@/common/models/event";

export interface PostEvent {
  name: string,
  category: string,
  description: string,
  location: string,
  startTime: string,
  endTime: string,
  imageUrl: string,
}

export const postEvent = async function(data: PostEvent): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const postEventStatus: AxiosResponse<Event> = await axios.post(config.apiUrl.events, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(postEventStatus.status)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const putEvent = async function(eventId: number, data: PostEvent): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const postEventStatus: AxiosResponse<Event> = await axios.put(`${config.apiUrl.events}/${eventId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(postEventStatus.status)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export interface FetchAllEvents {
  name?: string,
  category?: string,
  orderBy?: string,
  userId?: string,
}

export const fetchAllEvents = async function(queryParams: FetchAllEvents): Promise<Event[]> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const events: AxiosResponse<Event[]> = await axios.get(config.apiUrl.events, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: queryParams,
    })
    if (isSuccess(events.status)) {
      return events.data;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export const deleteEvent = async function(id: number): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const postEventStatus: AxiosResponse<Event> = await axios.delete(`${config.apiUrl.events}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(postEventStatus.status)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const postJoinEvent = async function(id: number): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const postJoinEventStatus = await axios.post(`${config.apiUrl.eventJoin}/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(postJoinEventStatus.status)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deleteJoinEvent = async function(id: number): Promise<boolean> {
  const cookies = new Cookies();
  const token = cookies.get('token');
  try {
    const deleteJoinEventStatus = await axios.delete(`${config.apiUrl.eventJoin}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(deleteJoinEventStatus.status)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

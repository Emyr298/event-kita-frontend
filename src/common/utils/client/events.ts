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

export interface FetchAllEvents {
  name?: string,
  category?: string,
  laterThan?: string,
  orderBy?: string,
  pageNumber: number,
  contentPerPage: number,
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

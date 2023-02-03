import { config } from "@/common/constants/config";
import axios, { AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { isSuccess } from "../requests";
import { Event } from "@/common/models/event";

export const fetchEventById = async function(id: string, reqCookie: string): Promise<Event | null> {
  const cookies = new Cookies(reqCookie);
  const token = cookies.get('token');
  try {
    const event: AxiosResponse<Event> = await axios.get(`${config.apiUrl.events}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (isSuccess(event.status)) {
      return event.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

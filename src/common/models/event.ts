import { User } from "./user";

export interface Event {
  id: number,
  name: string,
  participants: number,
  category: string,
  description: string,
  location: string,
  start_time: string,
  end_time: string,
  user: User,
  image_url: string,
  participated_users: User[],
}

export enum Category {
  attractions = 'attractions',
  music = 'music',
  artsAndCulture = 'artsAndCulture',
  education = 'education',
}

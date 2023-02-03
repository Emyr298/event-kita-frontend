import { User } from "./user";

export interface Event {
  id: number,
  name: string,
  participants: number,
  category: string,
  description: string,
  location: string,
  start_time: Date,
  end_time: Date,
  user: User,
  image_url: string,
}

export enum Category {
  attractions = 'attractions',
  music = 'music',
  artsAndCulture = 'artsAndCulture',
  education = 'education',
}

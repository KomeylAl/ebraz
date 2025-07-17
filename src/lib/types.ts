export type NavItem = {
  title: string;
  link: string;
};

export interface WorkshopFormData {
  title: string;
  organizers: string;
  description: string;
  start_date?: string | null;
  end_date?: string | null;
  week_day?: string | null;
  time?: string | null;
  image?: any | null;
}

export interface WorkshopSessionFormData {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  session_date: string;
  location: string | null;
  link: string | null;
}

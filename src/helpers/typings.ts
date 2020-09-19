export type ApiRequestMethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Request = (method: ApiRequestMethodType, data: Record<string, any>) => Promise<Req>;

export interface Req<T = any, E = any> {
  data?: T;
  error?: E;
}

type Location = {
  location: {
    name: string;
    country: string;
    region: string;
  };
};

export type HeadCity = Location & {
  current: {
    temperature: number;
    weather_icon: string;
    humidity: number;
    weather_description: string;
  };
};
export type City = HeadCity & {
  current: {
    temperature: number;
    weather_icon: string;
    weather_description: string;
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    humidity: number;
    visibility: number;
  };
  favorite: boolean;
  notes: {
    note: string;
  }[];
};

export type ApiResponse = Location & {
  current: {
    temperature: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    humidity: number;
    visibility: number;
  };
  favorite: boolean;
  notes: {
    note: string;
  }[];
};

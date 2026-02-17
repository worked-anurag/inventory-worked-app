export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  date: string;
  data: {
    token: string;
    id: number;
    email: string;
  };
  code: string;
  path: string;
}
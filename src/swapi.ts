import { default as axios, AxiosInstance} from 'axios';

export class Swapi {
  private readonly http: AxiosInstance
  
  constructor() {
    this.http = axios.create({
      baseURL: 'https://swapi.co/api'
    })
  }
}
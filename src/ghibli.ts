import { default as axios, AxiosInstance } from 'axios';
import { FilmRest } from "./types/film";
import { PersonGql, PersonRest } from "./types/person";

export class Ghibli {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: process.env.GHIBLI_URL
    })
  }

  async listFilms(_limit: number, filmIds?: string[]): Promise<FilmRest[]> {
    const { status, statusText, data } = await this.http.get('/films');

    if (status > 404) return [];

    if (status > 399) {
      throw new Error(statusText);
    }

    if (!filmIds) return data;


    return data.filter(({ id }: FilmRest) => filmIds.includes(id));
  }

  async listPeople(_limit: number, filmId?: string): Promise<PersonGql[]> {
    const { status, statusText, data: people } = await this.http.get('/people');

    if (status > 404) return [];

    if (status > 399) {
      throw new Error(statusText);
    }

    if (!filmId) return people;

    return people
      .map(({ films, ...rest }: PersonRest): PersonGql => ({
        ...rest,
        filmIds: films.map(mapFilmId)
      }))
      .filter((person: PersonGql) => {
        return person.filmIds.some((id: string) => id === filmId)
      });
  }
}

function mapFilmId(film: string): string {
  return film.replace('https://ghibliapi.herokuapp.com/films/', '')
}

import { Ghibli } from "./ghibli";
import { FilmGql, FilmRest } from "./types/film";
import { PersonGql } from "./types/person";

interface PaginationParams {
  limit: number
}

const ghibli = new Ghibli();

function mapFilmsToGql({ rt_score, ...rest }: FilmRest): FilmGql {
  return { ...rest, rtScore: +(rt_score) }
}

export const resolvers = {
  Query: {
    async films(_root: any, { limit }: PaginationParams): Promise<FilmGql[]> {
      const films = await ghibli.listFilms(limit);
      return films.map(mapFilmsToGql)
    },
    people(_root: any, { limit }: PaginationParams, { currentUser }: { currentUser?: any }): Promise<PersonGql[]> {
      return ghibli.listPeople(limit)
    }
  },
  Film: {
    people(film: FilmGql, { limit }: PaginationParams): Promise<PersonGql[]> {
      console.log('Fetching people for film', film.title);
      return ghibli.listPeople(limit, film.id)
    }
  },
  Person: {
    async films(person: PersonGql, { limit }: PaginationParams): Promise<FilmGql[]> {
      console.log('Fetching persons for person', person.name);

      const films = await ghibli.listFilms(limit, person.filmIds);
      return films.map(mapFilmsToGql)
    }
  }
};

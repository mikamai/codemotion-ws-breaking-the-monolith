export interface PersonRest {
  id: string
  name: string
  films: string[]
}

export interface PersonGql {
  id: string
  name: string
  filmIds: string[]
}
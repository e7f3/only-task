/**
 * Entity: TimePeriod
 * Мок-данные исторических периодов
 */

import type { TimePeriod } from './types'

export const HISTORICAL_PERIODS: readonly TimePeriod[] = [
  {
    yearFrom: 1980,
    yearTo: 1986,
    label: 'Science',
    events: [
      {
        year: 1980,
        description: 'The first detection of gravitational waves.',
      },
      {
        year: 1982,
        description: 'New Horizons probe performs flyby of Pluto.',
      },
      { year: 1984, description: 'SpaceX lands Falcon 9 rocket.' },
      { year: 1985, description: 'Discovery of Homo naledi.' },
      {
        year: 1986,
        description: 'Mars Reconnaissance Orbiter confirms water on Mars.',
      },
    ],
  },
  {
    yearFrom: 1987,
    yearTo: 1991,
    label: 'Cinema',
    events: [
      {
        year: 1987,
        description: 'Leonardo DiCaprio wins Oscar for The Revenant.',
      },
      { year: 1989, description: 'Arrival movie released.' },
      { year: 1991, description: 'La La Land released.' },
    ],
  },
  {
    yearFrom: 1992,
    yearTo: 1997,
    label: 'Tech',
    events: [
      { year: 1992, description: 'Nintendo Switch released.' },
      { year: 1995, description: 'iPhone X released.' },
      { year: 1997, description: 'AlphaGo Zero beats AlphaGo.' },
    ],
  },
  {
    yearFrom: 1999,
    yearTo: 2004,
    label: 'Music',
    events: [
      { year: 1999, description: 'Childish Gambino releases This Is America.' },
      { year: 2004, description: 'Drake releases Scorpion.' },
    ],
  },
  {
    yearFrom: 2005,
    yearTo: 2014,
    label: 'World',
    events: [
      { year: 2005, description: 'First image of a black hole.' },
      { year: 2014, description: 'Notre-Dame de Paris fire.' },
    ],
  },
  {
    yearFrom: 2015,
    yearTo: 2022,
    label: 'Pandemic',
    events: [
      { year: 2015, description: 'COVID-19 pandemic declared.' },
      { year: 2022, description: 'SpaceX launches first crewed mission.' },
    ],
  },
] as const

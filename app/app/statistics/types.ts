export interface Hackathon {
  id: string;
  name: string;
  categories: Category[];
  year: number;
  startDate: Date;
  endDate: Date;
  // additional statistics -> participants, awards, etc.
}

export interface Team {
  id: string;
  name: string;
  projectName: string;
}

export interface Category {
  id: string;
  name: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  teams: Team[];
  winner?: Team;
  secondPlace?: Team;
  thirdPlace?: Team;
}

export const hackathonData: Hackathon = {
  name: "Appfire Ignite 2024",
  id: "1",
  year: 2024,
  startDate: new Date("2024-05-01"),
  endDate: new Date("2024-05-07"),
  categories: [
    {
      id: "1",
      name: "Artificial Intelligence",
      stages: [
        {
          id: "1",
          name: "Qualified teams",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
            {
              id: "5",
              name: "Types 5",
              projectName: "Project 5",
            },
            {
              id: "6",
              name: "Types 6",
              projectName: "Project 6",
            },
          ],
        },
        {
          id: "2",
          name: "Semi-final",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
          ],
        },
        {
          id: "3",
          name: "Winners",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
          ],
          winner: {
            id: "1",
            name: "Types 1",
            projectName: "Project 1",
          },
          secondPlace: {
            id: "2",
            name: "Types 2",
            projectName: "Project 2",
          },
          thirdPlace: {
            id: "3",
            name: "Types 3",
            projectName: "Project 3",
          },
        },
      ],
    },
    {
      id: "2",
      name: "Innovation & Exploration",
      stages: [
        {
          id: "1",
          name: "Qualified teams",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
            {
              id: "5",
              name: "Types 5",
              projectName: "Project 5",
            },
            {
              id: "6",
              name: "Types 6",
              projectName: "Project 6",
            },
          ],
        },
        {
          id: "2",
          name: "Semi-final",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
          ],
        },
        {
          id: "3",
          name: "Winners",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
          ],
          winner: {
            id: "1",
            name: "Types 1",
            projectName: "Project 1",
          },
          secondPlace: {
            id: "2",
            name: "Types 2",
            projectName: "Project 2",
          },
          thirdPlace: {
            id: "3",
            name: "Types 3",
            projectName: "Project 3",
          },
        },
      ],
    },
    {
      id: "3",
      name: "Continuous Improvement",
      stages: [
        {
          id: "1",
          name: "Qualified teams",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
            {
              id: "5",
              name: "Types 5",
              projectName: "Project 5",
            },
            {
              id: "6",
              name: "Types 6",
              projectName: "Project 6",
            },
          ],
        },
        {
          id: "2",
          name: "Semi-final",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
            {
              id: "4",
              name: "Types 4",
              projectName: "Project 4",
            },
          ],
        },
        {
          id: "3",
          name: "Winners",
          teams: [
            {
              id: "1",
              name: "Types 1",
              projectName: "Project 1",
            },
            {
              id: "2",
              name: "Types 2",
              projectName: "Project 2",
            },
            {
              id: "3",
              name: "Types 3",
              projectName: "Project 3",
            },
          ],
          winner: {
            id: "1",
            name: "Types 1",
            projectName: "Project 1",
          },
          secondPlace: {
            id: "2",
            name: "Types 2",
            projectName: "Project 2",
          },
          thirdPlace: {
            id: "3",
            name: "Types 3",
            projectName: "Project 3",
          },
        },
      ],
    },
  ],
};

export const getSchoolsQuery = () => ({
  query: `query getSchools ($search: String!) {
    schools(search: $search) {
        schools {
            id
            name
        }
    }
  }`,
  variables: { search: "" },
});

export const getTeamsQuery = () => ({
  query: `query getTeams ($search: String!) {
    teams(search: $search) {
        teams {
            id
            name
        }
    }
  }`,
  variables: { search: "" },
});

export const getFacilitiesQuery = () => ({
  query: `query getFacilities ($search: String!) {
    facilities(search: $search) {
        facilities {
            id
            email
            u_name
        }
    }
  }`,
  variables: { search: "" },
});
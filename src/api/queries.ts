import { FilterValues, FavoriteValues } from './../navigation/pages/Network/Network';
import { FormProps } from '../components/UserInformationForm';

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

export const getCurrentProfileQuery = (id: string) => ({
  query: `query Profile($id: String!) {
    profile(id: $id) {
      id
      first_name
      last_name
      position
      position2
      school_year
      avatar
      throws_hand
      bats_hand
      biography
      feet
      inches
      weight
      age
      recent_events {
        id
        event_type
        event_name
        date
        is_pitcher
        data_rows_count
        recent_avatars {
          id
          first_name
          last_name
          avatar
        }
      }
      winsgspan
      grip_right
      grip_left
      wrist_to_elbow
      broad_jump
      grip_left
      act_score
      gpa_score
      sat_score
      batting_top_values {
        pitch_type
        distance
        launch_angle
        exit_velocity
      }
      pitching_top_values {
        velocity
        spin_rate
        pitch_type
      }
      pitcher_summary {
        velocity
        spin_rate
        horizontal_break
      }
      batter_summary {
        exit_velocity
        distance
        launch_angle
      }
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
      favorite
      events_opened
      paid
    }
  }`,
  variables: {id},
});

export const updateProfileQuery = (form: FormProps) => ({
  query: `mutation UpdateProfile ($form: UpdateProfileInput!) {
    update_profile (input: $form) {
      profile {
        id
        first_name
        last_name
        position
        position2
        avatar
        throws_hand
        bats_hand
        biography
        school_year
        feet
        inches
        weight
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        facilities {
          id
          email
          u_name
        }
      }
    }
  }`,
  variables: { form },
});

export const getBattingSummaryQuery = (id: string) => ({
  query: `query BattingSummary($id: ID!) {
    batting_summary(id: $id) {
      top_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
      average_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
    }
  }`,
  variables: { id },
});

export const getAllProfilesQuery = (input: FilterValues) => ({
  query: `query Profiles($input: FilterProfilesInput!) {
    profiles(input: $input) {
      profiles {
        id
        first_name
        last_name
        position
        position2
        school_year
        feet
        inches
        weight
        age
        events {
          id
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
      total_count
    },
  }`,
  variables: { input }
});

export const updateFavoriteProfileQuery = (form: FavoriteValues) => ({
  query: `mutation UpdateFavoriteProfile($form: UpdateFavoriteProfileInput!) {
    update_favorite_profile(input: $form) {
      favorite
    }
  }`,
  variables: {form}
});
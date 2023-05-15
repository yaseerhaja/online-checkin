import { gql } from 'apollo-angular';

const GET_QUERY = gql`
  query CheckinInfo($input: CheckInInput) {
    checkinInfo(input: $input) {
      __typename
      ... on CheckinData {
        bookingCode
        contactDetails {
          address
        }
        passengers {
          id
          firstName
          lastName
          title {
            code
            name
          }
        }
        itinerary {
          type
          connections {
            id
            duration
            segments {
              id
              type
              informational
            }
          }
        }
      }
      ... on ErrorContent {
        errorCode
        message
      }
    }
  }
`;

export default GET_QUERY;

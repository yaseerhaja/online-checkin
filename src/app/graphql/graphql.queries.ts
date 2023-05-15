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
            origin {
              IATACode
              name
              city {
                IATACode
                name
                country {
                  code
                  name
                }
              }
            }
            destination {
              IATACode
              name
              city {
                IATACode
                name
                country {
                  code
                  name
                }
              }
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

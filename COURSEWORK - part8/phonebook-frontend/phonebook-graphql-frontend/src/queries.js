import { gql } from '@apollo/client'

export const ALL_PERSONS=gql`
query {
  allPersons {
    name
    phone
    id
  }
}`

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!){
  addPerson(
    name: $name,
    phone: $phone,
    street: $street,
    city: $city
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`

export const EDIT_PERSON = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
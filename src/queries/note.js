import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation createNote(
    $note: String!,
    $isExample: Boolean!,
    $account: AccountWhereUniqueInput!,
    $lyrics: [LyricWhereUniqueInput!],
    $lesson: ID!
  ){
    createNote(
      data: {
        status: PUBLISHED
        note: $note
        isExample: $isExample
        account: { connect: $account }
        lyrics: { connect: $lyrics }
        lesson: {
          connect: {id: $lesson}
        }
    }) {
      id
      note
      isExample
      lyrics {
        id
      }
    }
  }
`

export const DELETE_NOTE = gql`
  mutation deleteNote(
    $id: ID!
  ){
    deleteNote( where: { id: $id } ){
      id
    }
  }
`
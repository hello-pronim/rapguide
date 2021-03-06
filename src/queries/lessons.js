import gql from 'graphql-tag'

export const GET_LESSON_TEMPLATE_BY_ID = gql`
  query getLesson($id: ID!){
    lesson(where: {id: $id}) {
      id
      lessonTitle
      lessonDescription
      className
      instructorName
      institutionName
      numAnnotations
      minLikes
      maxStudents
      minComments
      lyrics {
        id
      }
      annotations(where: { isSubmitted: true }){
        id
        likes {
          id
        }
        comments {
          id
        }
      }
      guide {
        videoThumb,
        videoTitle,
        videoUrl,
        videoId,
        id,
        videoSlug
      }
      accounts(where: { type: "student" }) {
        id
      }
    }
  }
`

export const GET_LESSONS_BY_ACCOUNT_SHORT = gql`
  query getLessons($id: ID!) {
    lessons(where: {accounts_some: { id: $id } }){
      id
      lessonTitle
      lessonDescription
      lessonStatus
      maxStudents
      dueDate
      minLikes
      numAnnotations
      minComments
      className
      instructorName
      institutionName
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
      }
      accounts(where: { type: "student"}) {
        type
      }
      annotations(where: { isSubmitted: true}) {
        id
      }
    }
  }
`

export const GET_COMMENTS_AND_LIKES = gql`
  query getStats($id: ID!) {
    annotations(where: {lesson: { id: $id } }){
      comments {
        id
      }
      likes {
        id
      }
    }
  }
`

export const GET_LESSONS_BY_ACCOUNT = gql`
  query getLessons($id: ID!) {
    lessons(where: {accounts_some: { id: $id } }){
      id
      lessonTitle
      lessonDescription
      lessonStatus
      maxStudents
      dueDate
      minLikes
      numAnnotations
      minComments
      templateId
      accounts {
        id
        image
        email
        nameFirst
        nameLast
        type
        annotations {
          id
          annotation
        }
      }
      lyrics {
        id
        lyric
        notes {
          id
          note
          isExample
          lyrics {
            lyric
            id
            order
          }
        }
        annotations{
          id
          annotation
          isSubmitted
          isApproved
          account {
            id
            nameFirst
            nameLast
            email
            image
          }
          lyrics {
            id
            lyric
          }
        }
      }
      topics {
        id
        topic
      }
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
          bar
        }
      }
    }
  }
`

export const GET_LESSON_BY_ID = gql`
  query getLesson($id: ID!) {
    lesson(where: { id: $id }) {
      id
      lessonTitle
      lessonDescription
      lessonStatus
      maxStudents
      dueDate
      minLikes
      numAnnotations
      minComments
      className
      instructorName
      institutionName
      isTemplate
      templateId
      accounts {
        id
        image
        email
        nameFirst
        nameLast
        displayName
        isPublic
        twitter
        type
        annotations(
          orderBy: order_ASC
          where: { lesson: {id: $id }}) {
          id
          annotation
          isSubmitted
          isApproved
          isRequestRevisions
          updatedAt
          createdAt
          account {
            id
            nameFirst
            nameLast
            displayName
            isPublic
            twitter
            email
          }
          lyrics {
            id
            lyric
            order
          }
        }
      }
      lyrics {
        id
        lyric
        notes(where: { lesson: {id: $id }}) {
          id
          note
          isExample
          lyrics {
            lyric
            id
            order
          }
        }
        annotations(
          orderBy: order_ASC
          where: { lesson: {id: $id }}) {
          id
          annotation
          updatedAt
          createdAt
          isSubmitted
          isApproved
          isRequestRevisions
          account {
            id
            nameFirst
            nameLast
            displayName
            isPublic
            twitter
            email
            image
          }
          lyrics {
            id
            lyric
            order
          }
          comments {
            comment
            updatedAt
            account {
              id
              nameFirst
              nameLast
              displayName
              isPublic
              twitter
              image
              email
            }
          }
        }
      }
      topics {
        id
        topic
      }
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
          bar
        }
      }
    }
  }
`

export const GET_TEMPLATE_LESSON_BY_ID = gql`
  query getLesson($id: ID!) {
    lesson(where: { id: $id }) {
      className
      instructorName
      institutionName
    }
  }
`

export const GET_LESSON_STUDENTS = gql`
query getAccounts($id: ID!) {
    accounts(where: {
      type_not: "educator"
      lessons_some: {
      	id: $id
      }
    }) {
 			id
      nameFirst
      nameLast
      email
      image
      likes(where: {
        annotation: {
          lesson: {
            id: $id
          }
        }
      }) {
        id
      }
      annotations(where: {
        lesson: {
          id: $id
        }
      }){
        id
        annotation
        isSubmitted
        isApproved
        isRequestRevisions
        updatedAt
        comments {
          id
          updatedAt
          comment
          account {
            id
            nameFirst
            nameLast
            email
            image
          }
        }
        account {
          id
          nameFirst
          nameLast
          email
          image
        }
        lyrics(orderBy: order_ASC) {
          id
          lyric
          order
        }
      }
    }
  }
`

export const CREATE_LESSON = gql`
  mutation createLesson(
    $lessonTitle:String!,
    $lessonDescription:String!,
    $maxStudents: Int!,
    $templateId: String!,
    $guide: GuideWhereUniqueInput!,
    $accounts: [AccountWhereUniqueInput!],
    $minLikes: Int!,
    $numAnnotations: Int!,
    $minComments: Int!,
    $className: String!,
    $instructorName: String!,
    $institutionName: String!,
    $isTemplate: Boolean!
  ) {
    createLesson(data: {
      ##status: PUBLISHED
      lessonTitle: $lessonTitle
      lessonDescription: $lessonDescription
      lessonStatus: "Draft"
      maxStudents: $maxStudents
      templateId: $templateId
      guide: { connect: $guide }
      accounts: { connect: $accounts }
      minLikes: $minLikes
      numAnnotations: $numAnnotations
      minComments: $minComments
      className: $className
      instructorName: $instructorName
      institutionName: $institutionName
      isTemplate: $isTemplate
    }){
      id
    }
  }
`

export const UPDATE_LESSON_DETAILS = gql`
  mutation updateLesson(
    $id: ID!,
    $lessonTitle:String!,
    $lessonDescription:String!,
    $maxStudents: Int!,
    $minLikes: Int!,
    $numAnnotations: Int!,
    $minComments: Int!,
    $guide: GuideWhereUniqueInput!,
    $className: String!,
    $instructorName: String!,
    $institutionName: String!,
    $isTemplate: Boolean!
  ) {
    updateLesson(
      where: { id: $id }
      data: {
        #status: PUBLISHED
        lessonTitle: $lessonTitle
        lessonDescription: $lessonDescription
        maxStudents: $maxStudents
        minLikes: $minLikes
        numAnnotations: $numAnnotations
        minComments: $minComments
        guide: { connect: $guide }
        className: $className
        instructorName: $instructorName
        institutionName: $institutionName
        isTemplate: $isTemplate
      }){
    id
    }
  }
`

export const UPDATE_LESSON_STATUS = gql`
  mutation updateLesson(
    $id: ID!,
    $lessonStatus: String!
  ) {
    updateLesson(
      where: { id: $id }
      data: {
        lessonStatus: $lessonStatus
      }){
    id
    lessonStatus
    }
  }
`

export const ENROLL_STUDENT = gql`
  mutation updateAccount(
    $email:String!,
    $lesson: [LessonConnectInput!]
  ){
    updateAccount(
      where: { email: $email }
      data: {
        type: "student"
        lessons: { connect: $lesson }
      }){
      id
      lessons {
        id
        lessonTitle
      }
    }
  }
`;


export const GET_LESSON_TEMPLATES = gql`
  query getLessons {
    lessons(where: { isTemplate: true, isLive: true }){
      id
      lessonTitle
      lessonDescription
      lessonStatus
      maxStudents
      dueDate
      minLikes
      numAnnotations
      minComments
      className
      instructorName
      institutionName
      guide {
        id
        videoId
        videoUrl
        videoTitle
        videoThumb
        topics {
          topic
        }
      }
      accounts(where: { type: "student" }) {
        type
      }
      annotations(where: { isSubmitted: true }) {
        isSubmitted
      }
    }
  }
`

export const PUBLISH_LESSON = gql`
  mutation publishLesson($ID: ID!){
    publishLesson(where: { id: $ID }, to: PUBLISHED) {
      id
  	}
  }
`
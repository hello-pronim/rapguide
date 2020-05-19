import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { StyledContent, Heading, MediumSpace } from '../../styles/PageStyles'
import { FormBlock } from '../../styles/FormStyles'
import { Button } from '../ui/Button/'
import auth from '../../auth/auth'
import Message from '../Layout/Message'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import { UserContext } from '../../context/UserContext'

import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const Login = ({ lesson }) => {

  const [redirect, setRedirect] = useState(null);
  const [message, setMessage] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const { refetch } = useQuery(GET_ACCOUNT, { variables: { accountId: "" } });

  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [updateAccount] = useMutation(UPDATE_ACCOUNT);
  const [enrollStudentInLesson] = useMutation(ENROLL_STUDENT);

  /* TODO MAKE THE ACCOUNT BASED ON EMAIL ADDRESS - ONE ACCOUNT PER EMAIL */
  async function loginUser(profile) {
    const { data: { account } } = await refetch({ accountId: profile.accountId });

    if (!account) {
      await createAccount({
        variables: {
          accountId: profile.accountId,
          email: profile.email,
          nameFirst: profile.nameFirst || '',
          nameLast: profile.nameLast || '',
          image: profile.image,
          type: lesson ? "student" : "public"
        }
      }).then(({ data: { createAccount } }) => {
        setUser(createAccount);
      });
    } else {
      const newAccount = {
        image: profile.image,
        accountId: profile.accountId,
        ...account
      }
      setUser(newAccount);
    }
  }

  async function enrollStudent(user) {
    await enrollStudentInLesson({
      variables: {
        id: user.id,
        type: "student",
        lesson: {
          id: lesson.id
        }
      }
    }).then(() => {
      // A user has been logged in
      auth.login(user).then(() => {
        setRedirect("/");
      });
    });
  }

  useEffect(() => {
    if (!user) return;

    // Update the account to student and add the lesson Student record
    if (lesson) {
      enrollStudent(user);
    } else {
      auth.login(user).then(() => {
        setRedirect("/");
      });
    }

  }, [user])

  const responseFacebook = (data, addAccount) => {
    const { email, name, picture, id } = data;
    let nameSplit = name.split(" ");

    const profile = {
      id: id,
      accountId: id,
      nameFirst: nameSplit[0] ? nameSplit[0] : '',
      nameLast: nameSplit[nameSplit.length] ? nameSplit[nameSplit.length] : '',
      email: email,
      image: picture.data.url
    }

    loginUser(profile);
  }

  const responseGoogle = (response) => {
    const profileObj = response.profileObj;

    const profile = {
      id: profileObj.googleId,
      accountId: profileObj.googleId,
      nameFirst: profileObj.givenName,
      nameLast: profileObj.familyName,
      email: profileObj.email,
      image: profileObj.imageUrl
    };

    loginUser(profile);
  }

  return (
    <StyledContent style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Heading>
        <h1>Login</h1>
      </Heading>
      <Message message={message} />
      {lesson && (
        <MediumSpace>
          <p>Please login with Google or Facebook to enroll yourself in <strong>{lesson.title}</strong>.</p>
        </MediumSpace>
      )}
      <MediumSpace>
        <h2>Login With</h2>
      </MediumSpace>
      <StyledLoginProvider className="google">
        <GoogleLogin
          clientId="898142775962-ib0uaie5botfugao80pjjn9nae1387fl.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={(response) => console.log(response)}
        />
      </StyledLoginProvider>
      <StyledLoginProvider className="facebook">
        <FacebookLogin
          appId="665758824197396"
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </StyledLoginProvider>
      <MediumSpace>
        <hr style={{ margin: "50px 0" }} />
        <h2>Or By Email</h2>
        <FormBlock>
          <label>email</label>
          <input type="text" placeholder="email" />
        </FormBlock>
        <FormBlock>
          <label>password</label>
          <input type="password" placeholder="password" />
        </FormBlock>
        <Button>Login</Button>
      </MediumSpace>
      {redirect && <Redirect to={redirect} />}
    </StyledContent>
  )
}

export default Login;

const StyledLoginProvider = styled.div`
  margin: 2.5rem 0;

  button {
    width: 300px;
  }

  &.facebook {
    button {
      box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
    }
  }

  &.google {
    button {
      height: 60px;
      border: 1px solid #666666;
    }
  }
`

const GET_ACCOUNT = gql`
  query getAccount($accountId: String!) {
    account(where: {
      accountId: $accountId
    }){
      id
      accountId
      email
      nameFirst
      nameLast
      type
    }
  }
`

const ENROLL_STUDENT = gql`
  mutation updateAccount(
    $id:ID!,
    $type:String!
    $lesson: [LessonWhereUniqueInput!],
  ){
    updateAccount(
      where: { id: $id }
      data: {
        type: $type
        lessons: { connect: $lesson }
      }){
      id
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $type: String!,
    $image: String!,
    $accountId: String!) {
    createAccount(data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      image: $image
      type: $type
      accountId: $accountId
    }) {
      id
      accountId
      nameFirst
      nameLast
      image
      email
      type
    }
  }
`

const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $email: String!,
    $nameFirst: String!,
    $nameLast: String!,
    $image: String!,
    $type: String!,
    $accountId: String!) {
    updateAccount(
      where: { accountId: $accountId }
      data: {
      status: PUBLISHED
      email: $email
      nameFirst: $nameFirst
      nameLast: $nameLast
      image: $image
      type: $type
      accountId: $accountId
    }) {
      id
      accountId
      nameFirst
      nameLast
      image
      email
      type
    }
  }
`
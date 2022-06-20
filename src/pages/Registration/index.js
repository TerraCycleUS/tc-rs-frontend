import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, boolean, object } from 'yup'

import Button from '../../components/Button'
import Page from '../../Layouts/Page'
import TextField from '../../components/TextField'
import Checkbox from '../../components/Checkbox'
import Text, { TextPrimary } from '../../components/Text'
import { ReactComponent as GooglePlus } from '../../assets/icons/google-plus.svg'
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'

const defaultValues = {
  name: '',
  email: '',
  zip: '',
  terms: false,
  privacy: false,
  messages: false,
}

const schema = object({
  name: string().required(),
  email: string().email().required(),
  zip: string().required(),
  terms: boolean().oneOf([true], 'Field must be checked'),
  privacy: boolean().oneOf([true], 'Field must be checked'),
  messages: boolean().oneOf([true], 'Field must be checked'),
})

const textInputs = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Enter your name',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your registered email address',
  },
  {
    name: 'zip',
    label: 'Zip code',
    placeholder: 'Enter your Zip code',
  },
]

const checkboxes = [
  {
    name: 'terms',
    content: (
      <>
        I confirm that I have read and agree to the{' '}
        <a href="https://google.com">Terms&Conditions of Terracycle</a>
      </>
    ),
  },
  {
    name: 'privacy',
    content: (
      <>
        I confirm that I have read and agree to the the{' '}
        <a href="https://google.com">Privacy Policy of Terracycle</a>
      </>
    ),
  },
  {
    name: 'messages',
    content:
      'I consent to Terracycle to send me marketing messages \nusing the data (name, e-mail address) hereby provided by me.',
  },
]

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const onSubmit = console.log

  return (
    <Page title="Create account" backButton>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {textInputs.map(({ name, label, placeholder }) => (
            <TextField
              key={name}
              id={name}
              label={label}
              error={errors[name]?.message}
              input={{
                ...register(name),
                placeholder,
              }}
            />
          ))}
          {checkboxes.map(({ name, content }) => (
            <Checkbox
              key={name}
              id={name}
              input={register(name)}
              error={errors[name]?.message}
            >
              <Text>{content}</Text>
            </Checkbox>
          ))}
          <Button disabled={isSubmitted && !isValid}>Create account</Button>
        </form>
        <Text className="text-center">
          or use your social account for log in:
        </Text>
        <div className="buttons-row">
          <LogInButton className="google">
            <GooglePlus />
          </LogInButton>
          <LogInButton className="facebook">
            <Facebook />
          </LogInButton>
        </div>
        <div className="link-row">
          <Link to="/sign-in" className="sign-in-link">
            <TextPrimary>Sign in</TextPrimary>
          </Link>
        </div>
      </Wrapper>
    </Page>
  )
}

const Wrapper = styled.div`
  form {
    margin-bottom: 40px;

    .text-field {
      margin-bottom: 20px;
    }

    .checkbox {
      margin-bottom: 20px;
    }

    .text-field + .checkbox,
    .checkbox + .main-button {
      margin-top: 30px;
    }
  }

  .buttons-row {
    margin-top: 10px;
    display: flex;
    justify-content: center;

    .google {
      background-color: #f06552;
      margin-right: 30px;
    }

    .facebook {
      background-color: #4267b2;
    }
  }

  .link-row {
    display: flex;
    justify-content: center;
    margin: 39px 0 50px;
  }
`

const LogInButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

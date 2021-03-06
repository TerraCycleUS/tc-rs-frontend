import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import Header from '../Header'
import AuthRoute from '../AuthRoute'
import dropOffClasses from '../../pages/DropOffBin/DropOffBin.module.scss'

export default function GlobalHeader() {
  const user = useSelector((state) => state.user) || {}
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="profile">
        <Route
          index
          element={
            <AuthRoute>
              <Header
                className="profile-header"
                title={
                  <FormattedMessage
                    defaultMessage="Hello {name}!"
                    id="profile:HeaderTitle"
                    values={{ name: user?.name }}
                  />
                }
              />
            </AuthRoute>
          }
        />
        <Route
          path="edit"
          element={
            <AuthRoute>
              <Header
                title={
                  <FormattedMessage
                    id="profileEdit:Title"
                    defaultMessage="Edit profile"
                  />
                }
                backButton
              />
            </AuthRoute>
          }
        />
        {!user || user.socialProvider ? null : (
          <Route
            path="change-password"
            element={
              <AuthRoute>
                <Header
                  title={
                    <FormattedMessage
                      id="changePassword:Title"
                      defaultMessage="Change password"
                    />
                  }
                  backButton
                />
              </AuthRoute>
            }
          />
        )}
        <Route
          path="language"
          element={
            <AuthRoute>
              <Header
                title={
                  <FormattedMessage
                    id="language:Title"
                    defaultMessage="Language"
                  />
                }
                backButton
              />
            </AuthRoute>
          }
        />
        <Route
          path="monoprix-id"
          element={
            <AuthRoute>
              <Header
                title={
                  <FormattedMessage
                    id="monoprixId:Title"
                    defaultMessage="Monoprix ID"
                  />
                }
                backButton
              />
            </AuthRoute>
          }
        />
      </Route>
      <Route
        path="sign-in"
        element={
          <Header
            title={
              <FormattedMessage id="signIn:Title" defaultMessage="Sign in" />
            }
          />
        }
      />
      <Route path="registration">
        <Route
          index
          element={
            <Header
              title={
                <FormattedMessage
                  id="signUp:Title"
                  defaultMessage="Create account"
                />
              }
              backButton
            />
          }
        />
        <Route
          path="pw-setup"
          element={
            <Header
              title={
                <FormattedMessage
                  id="pwSetup:Title"
                  defaultMessage="Password setup"
                />
              }
              backButton={() =>
                navigate({ pathname: '/registration', search: location.search })
              }
            />
          }
        />
        <Route
          path="email-check"
          element={
            <Header
              title={
                <FormattedMessage
                  id="emailCheck:Title"
                  defaultMessage="Check your email"
                />
              }
              backButton
            />
          }
        />
        <Route
          path="confirm-code"
          element={
            <Header
              title={
                <FormattedMessage
                  id="confirmCode:Title"
                  defaultMessage="Confirmation code"
                />
              }
              backButton
            />
          }
        />
        <Route
          path="retailers-id"
          element={
            <Header
              title={
                <FormattedMessage
                  id="retailersId:Title"
                  defaultMessage="Retailer???s ID"
                />
              }
              backButton
            />
          }
        />
      </Route>
      <Route path="reset-password">
        <Route
          index
          element={
            <Header
              title={
                <FormattedMessage
                  id="passwordReset:Title"
                  defaultMessage="Password reset"
                />
              }
              backButton
            />
          }
        />
        <Route
          path="email-check"
          element={
            <Header
              title={
                <FormattedMessage
                  id="emailCheck:Title"
                  defaultMessage="Check your email"
                />
              }
              backButton
            />
          }
        />
        <Route
          path="set-password"
          element={
            <Header
              title={
                <FormattedMessage
                  id="passwordReset:Title"
                  defaultMessage="Password reset"
                />
              }
            />
          }
        />
      </Route>
      <Route path="social-login">
        <Route
          path="email-setup"
          element={
            <Header
              title={
                <FormattedMessage
                  defaultMessage="Email setup"
                  id="emailSetup:Title"
                />
              }
              backButton
            />
          }
        />
      </Route>
      <Route path="recycling-bin">
        <Route
          index
          element={
            <Header
              title={
                <FormattedMessage
                  id="recyclingBin:Title"
                  defaultMessage="Recycling bin"
                />
              }
            />
          }
        />
        <Route
          path="scan-item"
          element={
            <Header
              backButton
              title={
                <FormattedMessage
                  id="scanItem:Title"
                  defaultMessage="Scan item"
                />
              }
              steps="1/2 "
            />
          }
        />
        <Route
          path="save-item"
          element={
            <Header
              backButton
              title={
                <FormattedMessage
                  id="saveItem:Title"
                  defaultMessage="Item set-up"
                />
              }
              steps="1/2 "
            />
          }
        />
      </Route>
      <Route
        path="drop-off"
        element={
          <Header
            backButton
            title={
              <div className={dropOffClasses.locationWrapper}>
                <p className={dropOffClasses.locationName}>Location Name</p>
                <p className={dropOffClasses.locationAddress}>
                  Location address placeholder
                </p>
              </div>
            }
          />
        }
      />
      <Route
        path="rewards"
        element={
          <Header
            title={
              <FormattedMessage
                id="coupons:RewardsTitle"
                defaultMessage="Rewards"
              />
            }
          />
        }
      />
    </Routes>
  )
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-g0cyruct1gfwis6n.us.auth0.com"
    clientId="4Ip4FuwdwGcyk6m3SlRWBgnC9ASALQyB"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/home"
    }}
  >
    <App />
  </Auth0Provider>
);

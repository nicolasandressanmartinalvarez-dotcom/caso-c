import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-i56p7npkqe6uyumd.us.auth0.com"
    clientId="2Lx759fwupcw9TJmrYZBnK2jY54cdLGj"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://api.sanosysalvos.com"
    }}
  >
    <App />
  </Auth0Provider>
)


import { RestApiAuth, RestApiResource } from "../../PublicTypes/resource";

export const RestApiResourceInit: RestApiResource<RestApiAuth> = {
  baseUrl: "",
  urlParams: [ 
  ],
  headers: [
  ],
  cookies: [
  ],
  authentication: "none",
  selfSignedCert: false,
  certs: {
    caCert: "",
    clientKey: "",
    clientCert: "",
    mode: "verify-full",
  },
  authContent: {},
}

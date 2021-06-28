// This holds the user flows and custom policies for your B2C application

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_SignUpIn",
        editProfile: "B2C_1_ProfileEdit",
        signUpOnly: "B2C_1_SignUpOnly"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://traviscomms.b2clogin.com/traviscomms.onmicrosoft.com/B2C_1_SignUpIn",
        },
        editProfile: {
            authority: "https://traviscomms.b2clogin.com/traviscomms.onmicrosoft.com/B2C_1_ProfileEdit"
        },
        signUpOnly: {
            authority: "https://traviscomms.b2clogin.com/traviscomms.onmicrosoft.com/B2C_1_SignUpOnly"
        }
    },
    authorityDomain: "traviscomms.b2clogin.com"
}

export const apiConfig: { scopes: string[]; uri: string } = {
  scopes: [""],
  uri: "http://localhost:4200/#/accounts"
};


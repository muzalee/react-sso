export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_AZURE_CLIENT_ID as string,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID as string}`,
        redirectUri: '/',
        postLogoutRedirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage', 
        storeAuthStateInCookie: false,
    },
    // system: {
    //     loggerOptions: {
    //         loggerCallback: (level, message, containsPii) => {
    //             if (containsPii) {
    //                 return;
    //             }
    //             switch (level) {
    //                 case LogLevel.Error:
    //                     console.error(message);
    //                     return;
    //                 case LogLevel.Info:
    //                     console.info(message);
    //                     return;
    //                 case LogLevel.Verbose:
    //                     console.debug(message);
    //                     return;
    //                 case LogLevel.Warning:
    //                     console.warn(message);
    //                     return;
    //                 default:
    //                     return;
    //             }
    //         },
    //     },
    //     allowNativeBroker: false,
    // },
};

export const loginRequest = {
    scopes: ["Files.Read"],
};

export const silentRequest = {
    scopes: ["openid", "profile"],
    loginHint: "example@domain.net",
};
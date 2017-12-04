import { CognitoUserPool } from "amazon-cognito-identity-js";
import sigV4Client from "./sigV4Client";
import config from './../config/secrets.json'

import 'aws-sdk/dist/aws-sdk'
const AWS = window.AWS

export async function invokeApig({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  body
}) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  const preparedHeaders = Object.assign({}, {
    'Content-Type': 'application/json'
  }, headers)

  const signedRequest = sigV4Client
    .newClient({
      accessKey: AWS.config.credentials.accessKeyId,
      secretKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken,
      region: config.apiGatewayRegion,
      endpoint: config.invokeUrl
    })
    .signRequest({
      method,
      path,
      headers: preparedHeaders,
      queryParams,
      body
    });

  body = body ? JSON.stringify(body) : body;
  headers = signedRequest.headers;

  const results = await fetch(signedRequest.url, {
    method,
    headers,
    body,
    mode: 'cors'
  });

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  return results.json();
}

export async function s3Upload(file) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: config.s3Bucket
    }
  });
  const filename = `${AWS.config.credentials
    .identityId}-${Date.now()}-${file.name}`;

  return s3
    .upload({
      Key: filename,
      Body: file,
      ContentType: file.type,
      ACL: "public-read"
    })
    .promise();
}

export async function authUser() {
  if (
    AWS.config.credentials &&
    Date.now() < AWS.config.credentials.expireTime - 60000
  ) {
    return true;
  }

  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  const userToken = await getUserToken(currentUser);

  await getAwsCredentials(userToken);

  return true;
}

export async function getCurrentUserToken() {
  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return '';
  }

  const userToken = await getUserToken(currentUser);

  return userToken
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {``
    currentUser.signOut();
  }

  if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({});
  }
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

export function fetchQuery(operation, variables, cacheConfig, uploadables) {
  const options = uploadables
    ? getOptionsWithFiles(operation, variables, uploadables)
    : getOptionsWithoutFiles(operation, variables)

  options.headers.Authorization = getCurrentUserToken()

  // eslint-disable-next-line no-undef
  return fetch('/hello', {
    method: 'POST',
    credentials: 'include',
    ...options,
  })
    .then(response => response.json())
    .then((data) => {
      if (data.errors) {
        throw data.errors.map(({ message }) => message)
      }
      return data
    })
}

function getOptionsWithFiles(operation, variables, uploadables) {
  // eslint-disable-next-line no-undef
  const body = new FormData()
  body.append('query', operation.text)
  body.append('variables', JSON.stringify(variables))
  Object.keys(uploadables).forEach((filename) => {
    // eslint-disable-next-line no-prototype-builtins
    if (uploadables.hasOwnProperty(filename)) {
      body.append(filename, uploadables[filename])
    }
  })

  return { body }
}

function getOptionsWithoutFiles(operation, variables) {
  const body = JSON.stringify({
    query: operation.text,
    variables,
  })

  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  }

  return { body, headers }
}
function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.userPoolId,
    ClientId: config.appClientId
  });
  return userPool.getCurrentUser();
}

function getAwsCredentials(userToken) {
  const authenticator = `cognito-idp.${config.cognitoRegion}.amazonaws.com/${config.userPoolId}`;

  AWS.config.update({ region: config.cognitoRegion });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.identityPoolId,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

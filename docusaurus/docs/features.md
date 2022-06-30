---
sidebar_position: 5
title: Features
---

## Authentication

The main module that is possible to generate is Authentication. It contains:
* Sign In
* Sign Up 
* Forget Password

They are done using Cognito User Pools and Cognito Identity Pools

### Sign Up

When the user wants to Sign Up, web application sends
a request to Amplify in order to Sign Up User. Here are required steps:
1. Go to `sign up` page through `sign in` page.
2. Fill the form and submit
3. Then the user should see confirmation page
4. The email with verification link should arrive to the email. 
The request is sent using Amplify 

### Sign In

1. Go to `sign in` page and fill the form
2. The user should be redirected to the main page

### Forget Password

1. Got to the `forget password` page
2. Write an user email and submit resending email verification
3. The user should be redirected to confirmation page

### Cognito User Groups

When Cognito Groups are created, by default `admin` group is generated 
and added to `AWS Cognito`. You can check it out in AWS Management 
Console in Cognito service.


## API

### GraphQL

Janush provides a possibility to provision serverless GraphQL API using AppSync.
There is not a single schema file in `cloud` directory. You can freely merge schema files
to the single one by using
```bash
npm run schema:merge
```



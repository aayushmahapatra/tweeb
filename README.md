# Facebook Bot with Puppeteer Login

Node.js application to automate Facebook login using Puppeteer. It can be used as a Facebook bot to perform various tasks after successfully logging in.

> **Note:** Ensure that you have Node.js installed on your machine before running this application.

## Installation

1. Clone the repository: `https://github.com/aayushmahapatra/facebook-bot-login.git`
2. Navigate to the project directory: `cd facebook-bot-login`
3. Install dependencies: `yarn`
4. Create a `.env` file in the project root and add the following environment variables:
```
FACEBOOK_URL=facebook-login-url
FACEBOOK_USERNAME=your_facebook_username
FACEBOOK_PASSWORD=your_facebook_password
```
5. Run the application using the following command:
```
yarn start
```

## Customization
Feel free to modify the code in `index.ts` to add additional tasks or functionalities based on your requirements. Puppeteer offers a wide range of capabilities for browser automation.

## Important Note
- **Security:** Be cautious with storing and sharing your Facebook credentials. Avoid sharing your code or deploying it in environments where security is a concern.
- **Legal Considerations:** Ensure that your use of this bot complies with Facebook's terms of service and policies. Automated actions on Facebook may violate their terms, so use this bot responsibly.

# Node.js CI/CD Pipeline with Jenkins

This pipeline automates the process of building, testing, and deploying a Node.js application using Jenkins.

## Prerequisites

1. **Jenkins Setup**:
   - Ensure Jenkins is installed and running.
   - Install the NodeJS plugin in Jenkins.

2. **Environment Setup**:
   - Node.js and NPM should be installed on the Jenkins agent.
   - PM2 should be installed globally using `npm install -g pm2`.

3. **Git Repository**:
   - The Node.js application must be hosted on a Git repository.
   - Update the pipeline script to use the correct repository URL.

4. **Jenkins Pipeline**:
   - Add the pipeline script to your Jenkins job.

## Pipeline Overview

### Environment Variables
- `APP_DIR`: Specifies the directory where the Node.js application will be cloned and deployed. Default: `/var/tmp/app/nodejs-app`

### Stages

1. **Checkout**:
   - Clones the Node.js application from the specified Git repository to `APP_DIR`.

2. **Install Dependencies**:
   - Installs the required NPM dependencies using `npm install`.

3. **Run Tests**:
   - Executes unit tests using Jest or any other testing framework defined in the project.

4. **Deploy to Staging**:
   - Deploys the Node.js application using PM2.
   - Restarts the application if it already exists or starts it as a new PM2 process.

### Post-Build Actions
- **Success**:
  - Prints `Build and Deployment successful!` to the console.
- **Failure**:
  - Prints `Build or Deployment failed. Please investigate.` to the console.

## Pipeline Script

Here is the Jenkins pipeline script:

```groovy
pipeline {
    agent any
    environment {
        APP_DIR = '/var/tmp/app/nodejs-app'
    }
    tools {
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    sh """
                        git clone https://github.com/Vij4y16/nodejs-app.git ${APP_DIR};
                    """
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'cd ${APP_DIR} && npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    sh 'cd ${APP_DIR} && npm test'
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                script {
                    sh """
                    cd ${APP_DIR} && npm install && pm2 restart app || pm2 start app.js --name "app"
                    """
                }
            }
        }
    }
    post {
        success {
            echo "Build and Deployment successful!"
        }
        failure {
            echo "Build or Deployment failed. Please investigate."
        }
    }
}
```

## Usage

1. **Create a New Jenkins Pipeline Job**:
   - In Jenkins, create a new pipeline job.
   - Copy and paste the above pipeline script into the job configuration.

2. **Run the Pipeline**:
   - Trigger the pipeline manually or set up a webhook for automatic builds on code push.

3. **Monitor**:
   - Use the Jenkins interface to monitor the pipeline execution and logs.

4. **Verify Deployment**:
   - Confirm that the Node.js application is running on the staging environment using PM2.

## Troubleshooting

- **PM2 Not Found**:
  - Ensure PM2 is installed globally: `npm install -g pm2`.

- **Permission Issues**:
  - Ensure Jenkins has the necessary permissions to access the `APP_DIR`.

- **Dependency Errors**:
  - Verify that the `package.json` file in the Node.js project is correctly configured.

## Customization

- Update the `APP_DIR` environment variable to set a custom directory.
- Modify the repository URL in the `Checkout` stage for a different Node.js project.
- Adjust the testing framework or deployment commands as per your project requirements.

## License
This project is open-source and can be modified or redistributed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

<img width="1378" alt="image" src="https://github.com/user-attachments/assets/da10b781-8900-49d2-b493-82b37ba2445b" />


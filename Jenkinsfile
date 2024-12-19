pipeline {
    agent any
    environment {
        // Define environment variables
        STAGING_SERVER = 'user@staging-server-ip'
        APP_DIR = '/path/to/your/app'
        NODEJS_VERSION = '14.x'
    }
    tools {
        // Install Node.js and NPM versions
        nodejs "Node-${NODEJS_VERSION}"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Pull the latest code from the repository
                    git 'https://github.com/your-repository.git'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies
                    sh 'npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run unit tests using Jest
                    sh 'npm test'
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    // Optional: Build production-ready assets (e.g., bundling, minification)
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy to the staging server
                    sh """
                    ssh -o StrictHostKeyChecking=no ${STAGING_SERVER} 'cd ${APP_DIR} && git pull origin main && npm install && pm2 restart app'
                    """
                }
            }
        }
        stage('Notify') {
            steps {
                script {
                    // Send notifications after the job run
                    mail to: 'you@example.com',
                         subject: "Build #${BUILD_NUMBER} - ${currentBuild.result}",
                         body: "The build ${currentBuild.result} for commit ${GIT_COMMIT} has completed. Please check the logs for details."
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

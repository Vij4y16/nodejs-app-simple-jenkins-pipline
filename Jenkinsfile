pipeline {
    agent any
    environment {
        // Define environment variables
        STAGING_SERVER = 'user@staging-server-ip'  // Uncomment and set your staging server's address
        APP_DIR = '/var/tmp/app'
    }
    tools {
        // Ensure Node.js and NPM are installed
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Pull the latest code from the repository
                    git 'https://github.com/Vij4y16/nodejs-app.git'
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
        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy to the staging server
                    sh """
                    ssh -o StrictHostKeyChecking=no ${STAGING_SERVER} 'cd ${APP_DIR} && git pull origin main && npm install && pm2 restart app || pm2 start app.js --name "app"'
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

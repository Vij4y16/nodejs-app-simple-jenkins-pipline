pipeline {
    agent any
    environment {
        // Define environment variables
        APP_DIR = '/var/tmp/app/nodejs-app'  // The directory where your app should be located
    }
    tools {
        // Ensure Node.js and NPM are installed
        nodejs "NodeJS"
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clone the repository if the directory does not exist
                    sh """
                        git clone https://github.com/Vij4y16/nodejs-app.git ${APP_DIR};
                    """
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm dependencies in the cloned directory
                    sh 'cd ${APP_DIR} && npm install'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run unit tests using Jest in the cloned directory
                    sh 'cd ${APP_DIR} && npm test'
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                script {
                    // Deploy the app using PM2
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

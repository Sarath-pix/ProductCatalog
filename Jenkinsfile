
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Product Catalog source is configured in GitHub.'
                checkout scm
            }
        }

        stage('Validate Version Files') {
            steps {
                sh '''
                    set -e
                    test -f v1/index.html
                    test -f v1/app.js
                    test -f v1/style.css

                    test -f v2/index.html
                    test -f v2/app.js
                    test -f v2/style.css

                    test -f v3/index.html
                    test -f v3/app.js
                    test -f v3/style.css

                    echo "All three versions contain the required files."
                '''
            }
        }

        stage('Validate Dockerfile') {
            steps {
                sh '''
                    set -e
                    test -s Dockerfile
                    echo "Dockerfile exists and is not empty."
                '''
            }
        }

        stage('Complete') {
            steps {
                echo 'Product Catalog validation completed successfully.'
            }
        }
    }

    post {
        success {
            echo 'Product Catalog pipeline succeeded.'
        }
        failure {
            echo 'Product Catalog pipeline failed. Check the console output.'
        }
    }
}

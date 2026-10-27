
pipeline {
    agent any

    environment {
        DOCKER = '/usr/local/bin/docker'
        IMAGE_NAME = 'sarathvenkat07/productcatalog'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Source code checked out successfully.'
            }
        }

        stage('Validate Files') {
            steps {
                sh '''
                    set -e
                    for version in v1 v2 v3; do
                        test -f "$version/index.html"
                        test -f "$version/style.css"
                        test -f "$version/app.js"
                    done
                    test -s Dockerfile
                    echo "All version files and Dockerfile validated."
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    set -e
                    "$DOCKER" build --build-arg VERSION=v1 \
                        -t "$IMAGE_NAME:v1" .
                    "$DOCKER" build --build-arg VERSION=v2 \
                        -t "$IMAGE_NAME:v2" .
                    "$DOCKER" build --build-arg VERSION=v3 \
                        -t "$IMAGE_NAME:v3" .
                '''
            }
        }

        stage('Verify Docker Images') {
            steps {
                sh '''
                    set -e
                    "$DOCKER" image inspect "$IMAGE_NAME:v1"
                    "$DOCKER" image inspect "$IMAGE_NAME:v2"
                    "$DOCKER" image inspect "$IMAGE_NAME:v3"
                    echo "All three Docker images built successfully."
                '''
            }
        }
    }

    post {
        success {
            echo 'Product Catalog CI pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check Console Output for details.'
        }
    }
}

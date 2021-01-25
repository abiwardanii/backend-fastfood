def dockerhub = "abiwardani/jenkins-API"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUN', defaultValue: 'false', description: 'Checklist for run app')
        choice(name: 'DEPLOY', choices: ["master", "production"], description: 'Choose Branch')
    }

    stages {
        stage("Install Dependecies") {
            steps {
               nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Build Docker Image") {
            steps {
                script {
                    builder = docker.build("${dockerhub}:${BRANCH_NAME}")
                }
            }
        }
        stage("Testing") {
            when {
                expression {
                    params.RUN
                }
            }
            steps {
                echo 'run testing'
            }
        }        
        stage("Push Docker Image") {
            when {
                expression {
                    params.RUN
                }
            }
            steps {
                script {
                    builder.push()
                }
            }
        }        
      
    }
}
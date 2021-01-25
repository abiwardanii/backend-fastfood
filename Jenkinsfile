def dockerhub = "abiwardani/jenkins-api"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    parameters {
        choice(name: 'DEPLOY', choices: ['deployment', 'production'], description: 'Choose Branch')
    }

    stages {
        stage("Install Dependencies"){
            steps {
                 nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("testing branch master"){
            when {
                expression {
                    params.DEPLOY == 'deployment' || BRANCH_NAME == 'master'
                }
            }
            steps {
                echo "testing branch master success"
            }
        }   
        stage("testing branch production"){
            when {
                expression {
                    params.DEPLOY == 'production' || BRANCH_NAME == 'production'
                }
            }
            steps {
                echo "testing branch production success"
            }
        }    
        stage("Deploy Docker Compose Deployment") {
            when {
                expression {
                    params.DEPLOY == 'deployment' || BRANCH_NAME == 'master'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'devserver',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }        
            }
        }     
        stage("Deploy Docker Compose Production") {
            when {
                expression {
                    params.DEPLOY == 'production' || BRANCH_NAME == 'production'
                }
            }
            steps {
                script {
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'devserver',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
                                        execTimeout: 120000,
                                    )
                                ]
                            )
                        ]
                    )
                }        
            }
        }     
    }
}
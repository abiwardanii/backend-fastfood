def dockerhub = "abiwardani/jenkins-api"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline {
    agent any

    stages {
        stage("Install Dependencies"){
            steps {
                 nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Build Images"){
            steps {
                script {
                    builder = docker.build("${image_name}")
                }
            }
        }   
        stage("Testing Images"){
            steps {
                script {
                    builder.inside {
                        sh 'Testing success'
                    }
                }
            }
        }
        stage("Push image")  {
            steps {
                script {
                    builder.push()
                }
            }
        }   
        // stage("Deploy Docker Compose") {
        //     steps {
        //         script {
        //             sshPublisher(
        //                 publishers: [
        //                     sshPublisherDesc(
        //                         configName: 'devserver',
        //                         verbose: false,
        //                         transfers: [
        //                             sshTransfer(
        //                                 sourceFiles: 'docker-compose.yml',
        //                                 remoteDirectory: 'app',
        //                                 execCommand: "docker pull ${dockerhub}:${BRANCH_NAME}; cd ./app/app; docker-compose stop; docker-compose up -d --force-recreate",
        //                                 execTimeout: 120000,
        //                             )
        //                         ]
        //                     )
        //                 ]
        //             )
        //         }        
        //     }
        // }     
   
    }
}
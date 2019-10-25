---
id: adlsg1-adlsg2
title: ADLS Gen1 to ADLS Gen2
sidebar_label: ADLS Gen1 to ADLS Gen2
---

Use this quickstart if you want to configure Fusion to connect to ADLS Gen1 storage and ADLS Gen2 storage.

## Prerequisites

* Azure VM instance set up and running, with root access available (instructions were tested on RHEL 7).
* Docker (v19.03.3 or higher), Docker Compose (v1.24.1 or higher), and Git installed on instance.
* Credentials for accessing the Data Lake Storage Gen1 and Data Lake Storage Gen2.
* Network connectivity between Azure VM and Data Lake Storage Gen1/Gen2.

## Guidance

Clone the Fusion docker repository to your Azure VM instance:

`$ git clone https://github.com/WANdisco/fusion-docker-compose.git`

Switch to the repository directory, and run the setup script:

`cd fusion-docker-compose`

`./setup-env.sh`

Follow the prompts to configure your zones.

### Setup prompts

_Zone name_

If defining a zone name, please note that each zone must have a different name (i.e. they cannot match).

_Licenses_

Trial licenses will last 30 days and are limited to 1TB of replicated data.

_Examples entries for ADLS Gen1_

Hostname: `example.westeurope.azuredatalakestore.net`

Mountpoint: `/`,`/path/to/mountpoint` - Can be root or a specific directory.

Handshake user: `wandisco` - must be an Owner of the ADLS Gen1 (under role assignments).

OAUTH2 Credential: `RANDOM_STRING` - the authentication key of the Active Directory credential you wish to use with Fusion.

OAUTH2 Refresh URL: `https://login.microsoftonline.com/abc123de-fgh4-567i-8jkl-90123mnop456/oauth2/token`

OAUTH2 Client ID: `123ab456-78c9-0d12-3456-78e90123f45g`

_Example entries for ADLS Gen2_

Storage account: `adlsg2storage`

Storage container: `fusionreplication`

Account key: `RANDOM_STRING` - the Primary Access Key is now referred to as Key1 in Microsoft’s documentation. You can get the KEY from the Microsoft Azure storage account.

default FS: `abfss://fusionreplication@adlsg2storage.dfs.core.windows.net/`

underlying FS: `abfs://fusionreplication@adlsg2storage.dfs.core.windows.net/`

### Startup

After all the prompts have been completed, you will be able to start the containers.

Ensure that Docker is started:

`systemctl status docker`

If not, start the Docker service:

`systemctl start docker`

Start the Fusion containers with:

`docker-compose up -d`

Log into the ONEUI via a web browser with the VM's hostname and port 8080.

`http://<docker_hostname>:8081/`

Register your email address and password, and then use these to log into the ONEUI.

### Replication

_You now have the ability to create replication rules via the ONEUI, feel free to create one and test replication._

## Useful docker-compose commands

Bring down containers and retain configured state:

`docker-compose down`

Remove all named volumes and down containers (current configuration will be lost):

`docker-compose down -v`

## Useful docker commands

List all running containers:

`docker ps`

Log into specific container:

`docker exec -it <container-ID> /bin/bash`

Stop all containers:

`docker container stop $(docker container ls -aq)`

Remove all stopped containers, all networks not used by at least one container, all dangling images and all dangling build cache:

`docker system prune`

## Information on service names

The Fusion service names can be found in the `.yml` files contained within the `fusion-docker-compose` Git repository.

_Example_
```text
docker-compose.zone-a.yml
docker-compose.common.yml
```
For instance, the ONEUI service is not required in a specific zone, so the service name can be found inside of the `docker-compose.common.yml` file.

`vi docker-compose.common.yml`

```text
# This service creates the One UI Server component to manage both zones.
#
# Note: this component can be run in either zone, so one is chosen arbitrarily

  # Fusion OneUI Server
  fusion-oneui-server:
```

Restart the ONEUI service:

`docker-compose up -d --force fusion-oneui-server`

## Troubleshooting

In the event that you need to rebuild your Fusion environment, firstly log into the ONEUI container and delete the H2 database for ONEUI.

This is required because the data stored there is not cleaned up when pruning the existing containers, and will still contain information regarding the previous ecosystem.

Obtain the ONEUI container ID:

`docker ps | grep oneui`

Log into the ONEUI container and delete the H2 database for ONEUI:

`docker exec -it <ONEUI-container-ID> /bin/bash`

`rm -rf /h2db/db`

`exit`

You should then `docker container stop $(docker container ls -aq)` and `docker system prune` all existing containers.

If you wanting to run through the setup script with prompts again, you must remove all of the `.yml` and `.env` files that were created after the setup:

`rm -f common.env zone_a.env zone_b.env docker-compose.zone-a.yml docker-compose.zone-b.yml docker-compose.common.yml`

## Reference links

https://docs.docker.com/install/

https://docs.docker.com/compose/install/

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
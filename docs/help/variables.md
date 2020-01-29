---
id: variables
title: Variables
sidebar_label: Variables
---

These variables are used throughout the Fusion documentation, and will depend on the environment you have created.

All variables will be encased with `<VARIABLE>` when written in the documentation.

## Variables

### `ihc-version`

The IHC distribution version of the zone, this is referenced in all IHC service scripts.

- Example of value: `hdp_2_6_5`
- Example of usage: `service fusion-ihc-server-<ihc-version> restart`
- Where to find: `/etc/init.d` directory on the Fusion server.

### `fusion-version`

The version of WANdisco Fusion.

- Example of value: `2.14.2.2.2.6.5`
- Example of usage: `ls -l /opt/cloudera/parcels/FUSION-<fusion-version>-cdh5.16.1-el7/lib/`

### `hadoop-username`

The Hadoop username that is used or defined in HCFS/HDFS environments.

- Example of value: `hive`
- Example of usage: `hdfs dfs -ls /user/<hadoop-username>`

### `docker-hostname`

The hostname or IP address of the Docker host.

- Example of value: `docker-hostname.01.com`
- Example of usage: `ssh <docker-hostname>`

### `container-name`

The name assigned to the docker container.

- Example of value: `fusion-oneui-server`
- Example of usage: `docker exec -it <container-name> bash`
- Where to find: Output of `docker container ls -a` (Names column).

### `service-name`

The service name for a Fusion docker container.

- Example of value: `fusion-ui-server-hdp`
- Example of usage: `docker-compose restart <service-name>`
- Where to find: [List of service names](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/troubleshooting/useful_info#service-names)

### `zone-name`

The zone name of a Fusion environment.

- Example of value: `hdp`
- Example of usage: `fusion-server-<zone-name>`
- Where to find: Output of `docker container ls -a` (Names column).

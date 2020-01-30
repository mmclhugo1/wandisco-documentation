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

### `cluster-name`

The Hadoop cluster name.

- Example of value: `CLUSTER-01`
- Example of usage: `curl -u admin:password -H "X-Requested-By: ambari" http://ambari.server.com:8080/api/v1/clusters/CLUSTER-01/hosts/`
- Where to find: Cluster manager UI or API.

### `hdp-version`

The Hortonworks (HDP) version string used on a HDP node's filesystem.

- Example of value: `2.6.5.0-292`
- Example of usage: `ls -l /usr/hdp/<hdp-version>/spark/lib/`

### `cdh-version`

The Cloudera (CDH) version string used on a CDH node's filesystem.

- Example of value: `6.1.0-1.cdh6.1.0.p0.770702`
- Example of usage: `ls -l /opt/cloudera/parcels/CDH-<cdh-version>/jars/`

### `hdi-version`

The HDInsight (HDI) version.

- Example of value: `3.6`
- Example of usage: `scp fusion-hcfs-azure-hdi-<hdi-version>-client-hdfs_2.14.2.2-2977_all.deb hdi_node:/downloads/`
- Where to find: [Microsoft Azure documentation](https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-component-versioning)

### `hadoop-version`

The Hadoop version, used on MapR filesystems.

- Example of value: `hadoop-2.7.0`
- Example of usage: `ls -l /opt/mapr/hadoop/<hadoop-version>/etc/hadoop/`
- Where to find: [MapR documentation](https://mapr.com/docs/61/ReferenceGuide/hadoop-version.html)

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

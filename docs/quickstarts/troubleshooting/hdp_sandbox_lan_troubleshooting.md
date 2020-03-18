---
id: hdp_sandbox_lan_troubleshooting
title: Troubleshooting Hortonworks (HDP) Sandbox to Azure
sidebar_label: HDP Sandbox to Azure
---

Please see the [Useful information](./useful_info.md) section for additional commands and help.

## Common issues

### No Route to Host after docker container restart

After restarting a single docker container, such as the HDP Sandbox, you may encounter connectivity issues between Fusion and the Sandbox.

The internal IP address of the container can change when restarting the container. This can cause the `No Route to Host` error as Fusion will have cached the old address.

To resolve, you must restart all containers within the `fusion-docker-compose` directory:

`docker-compose restart`

### Error 'connection refused' after starting Fusion for the first time

You may see this error when running `docker-compose up -d` for the first time inside the `fusion-docker-compose` directory:

```json
ERROR: Get https://registry-1.docker.io/v2/: dial tcp: lookup registry-1.docker.io on [::1]:53: read udp [::1]:52155->[::1]:53: read: connection refused
```

Running the `docker-compose up -d` command a second time will fix the issue.

### Fusion zones not inducted together

If the Fusion zones are not inducted together after starting Fusion for the first time (`docker-compose up -d`), run the same command again to start the induction container:

`docker-compose up -d`

### Hiveserver2 down after HDP Sandbox is started

The Hiveserver2 component in the HDP sandbox may be down after starting the cluster. To start it up:

1. On the docker host, change to the `fusion-docker-compose` directory and restart the Fusion Server container for the HDP zone.

   `docker-compose restart fusion-server-sandbox-hdp`

   Wait until the container has finished restarting before continuing.

2. Access the Ambari UI, and manually start the Hiveserver2 component.

   **Ambari UI -> Hive -> Summary -> Click on the "HIVESERVER2" written in blue text.**

3. Locate the HiveServer2 in the component list and click the `...` in the Action column. Select to **Start** the component in the drop-down list.

### Spark2 History Server down after HDP Sandbox is started for first time

When starting the HDP Sandbox for the first time, the Spark2 History Server may be in a stopped state.

To bring the History Server online:

1. In the Ambari UI, select to Refresh configs for the WANdisco Fusion service.

   **Ambari UI -> WANdisco Fusion -> Actions -> Refresh configs -> OK**

2. Start the Spark2 service.

   **Ambari UI -> Spark2 -> Actions -> Start -> CONFIRM START**

## Rebuild

Use these steps if looking to start over.

1. Stop and delete all containers, volumes and unused networks using:

   `docker-compose down -v`

1. If you are using Databricks, delete the `databricks_demo` database from your Databricks cluster using your [notebook](https://docs.databricks.com/notebooks/notebooks-use.html#run-notebooks):

   `DROP DATABASE databricks_demo CASCADE;`

1. Delete the related directories from your ADLS Gen2 container (e.g. via the [Azure CLI](https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-directory-file-acl-cli#delete-a-directory)):

   `/apps`  
   `/wandisco`

1. Run the setup script again (it will not prompt for any questions), followed by the docker compose `up` command to recreate the environment:

   `./setup-env.sh`

   `docker-compose up -d`
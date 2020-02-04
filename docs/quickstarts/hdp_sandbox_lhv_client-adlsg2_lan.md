---
id: hdp_sandbox_lhv_client-adlsg2_lan
title: Hortonworks (HDP) Sandbox to Azure Databricks with LiveAnalytics
sidebar_label: HDP Sandbox to Azure Databricks with LiveAnalytics
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an Azure Databricks cluster.

This will involve the use of Live Hive for the HDP cluster, and the Databricks Delta Lake plugin for the Azure Databricks cluster. These two products form the LiveAnalytics solution.

What this guide will cover:

- Installing WANdisco Fusion using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with Azure Databricks.
- Performing a sample data migration.

Please see the [shutdown and start up](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/hdp_sandbox_fusion_stop_start) guide for when you wish to safely shutdown or start back up the environment.

## Prerequisites

To complete this quickstart, you will need:

* Azure VM created and started, matching the following specifications:
  * Minimum size VM recommendation = **Standard D4 v3 (4 vcpus, 16 GiB memory).**
  * A minimum of 32GB Temp storage for the `/var/lib/docker` directory.
  * Root access on server (this is normally available by default).

If seeking guidance on how to create a suitable VM with all utilities installed, see our [Azure VM creation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_creation) guide.

* The following utilities must be installed on the server:
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

If seeking guidance on how to install these utilities, see our [Azure VM preparation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_prep) guide. This is not required if you have used our [Azure VM creation](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/preparation/azure_vm_creation) guide as all utilities will have been included.

_These instructions have been tested on Ubuntu LTS._

## Installation

Please log in to your VM prior to starting these steps. All the commands within this guidance should be run as **root** user.

### Setup Fusion

1. Clone the Fusion docker repository to your Azure VM instance:

   `git clone -b features/hdp-sandbox https://github.com/WANdisco/fusion-docker-compose.git`

2. Change to the repository directory:

   `cd fusion-docker-compose`

3. Run the setup script:

   `./setup-env.sh`

4. Enter `y` when asked whether to use the HDP sandbox.

5. Follow the prompts to configure your ADLS Gen2 Zone, see the next section below for guidance on this.

#### Setup prompts for ADLS Gen2

Please ensure to enter your details for the **Storage account**, **Storage container** and **Account Key** values so that they match your account in Azure.
The examples shown below are for guidance only.

* Storage account: `adlsg2storage`

* Storage container: `fusionreplication`

* Account key: `KEY_1_STRING` - the Primary Access Key is now referred to as "Key1" in Microsoft’s documentation. You can get the Access Key from the Microsoft Azure storage account under the **Access Keys** section.

* default FS: `abfss://fusionreplication@adlsg2storage.dfs.core.windows.net/` - press enter for the default value.

* underlying FS: `abfs://fusionreplication@adlsg2storage.dfs.core.windows.net/` - press enter for the default value.

At this point, the setup prompts will be complete and the script will exit out with an informational message.

### Startup Fusion

After all the prompts have been completed, you will be able to start the containers:

`docker-compose up -d`

Docker will now download all required images and create the containers, please wait until this is done.

## Configuration

### Install LiveAnalytics on Databricks cluster

Prior to performing these tasks, the Databricks cluster must be in a **running** state. Please access the Azure portal and check the status of the cluster. If it is not running, select to start the cluster and wait until it is **running**.

[//]: <Hosted live-analytics-databricks-etl-6.0.0.1.jar externally on wandisco-documentation repository.>

1. Download LiveAnalytics Jar file from the Github repository:

   [live-analytics-databricks-etl-6.0.0.1.jar](https://github.com/WANdisco/wandisco-documentation/raw/master/docs/quickstarts/resources/live-analytics-databricks-etl-6.0.0.1.jar)

   Save the file on your local machine.

2. In your Workspace for the Databricks cluster, on the left-hand panel, select **Clusters** and then select your interactive cluster.

3. Click on the **Libraries** tab, and select the option to **Install New**.

4. Select the following options for the Install Library prompt:

   * Library Source = `Upload`

   * Library Type = `Jar`

   * File Path = Find save location of `datatransformer.jar` from step 1.

5. Select **Install** once the details are entered. Wait for the **Status** of the jar to display as **Installed** before continuing.

### Check HDP services are started

The HDP sandbox services can take up to 5-10 minutes to start. You will need to ensure that the HDFS service is started before continuing.

1. Log in to the Ambari UI via a web browser.

   `http://<docker_IP_address>:8080`

   Username: `admin`
   Password: `admin`

2. Select the **HDFS** service.

3. Wait until all the HDFS components are showing as **Started**.

### Live Hive activation

1. Log into the Fusion UI for the HDP zone, and activate the Live Hive plugin.

   `http://<docker_IP_address>:8083`

   Username: `admin`
   Password: `admin`

2. Proceed to the Settings tab and select the *Live Hive: Plugin Activation* option on the left-hand panel.

3. Click on the *Activate* option. Wait for the **Reload this window** message to appear and refresh the page.

### Setup Databricks in Fusion

1. Log in to the Fusion UI for the ADLS Gen2 zone.

   `http://<docker_IP_address>:8583`

   Username: `admin`
   Password: `admin`

2. Enter the Databricks Configuration details on the Settings page.

   **Fusion UI -> Settings -> Databricks: Configuration**

   * [Databricks Service Address](https://docs.databricks.com/dev-tools/databricks-connect.html#step-2-configure-connection-properties)

   * [Bearer Token](https://docs.databricks.com/dev-tools/api/latest/authentication.html#generate-a-token)

   * [Databricks Cluster ID](https://docs.databricks.com/workspace/workspace-details.html#cluster-url)

   * [Unique JDBC HTTP path](https://docs.databricks.com/bi/jdbc-odbc-bi.html#construct-the-jdbc-url)

   Click **Update** once complete.

## Replication

Follow the steps detailed to perform live replication of HCFS data and Hive metadata from the HDP sandbox to the Azure Databricks cluster.

### Create replication rules

1. Log in to the Fusion UI for the HDP zone.

   `http://<docker_IP_address:8083`

   Username: `admin`
   Password: `admin`

2. Enter the Replication tab, and select to **+ Create** a replication rule.

3. Create a new HCFS rule using the UI with the following properties:

   * Type = `HCFS`

   * Zones = `adls2, sandbox-hdp` _- Leave as default._

   * Priority Zone = `sandbox-hdp` _- Leave as default._

   * Rule Name = `warehouse`

   * Path for adls2 = `/apps/hive/warehouse`

   * Path for hdp = `/apps/hive/warehouse`

   Click **Add** after entering the Rule Name and Paths.

   * Advanced Options: Preserve Origin Block Size = `true` _- click the checkbox to set this to true._

   Click **Create rules (1)** once complete.

4. Create a new Hive rule using the UI with the following properties:

   On the Replication tab, select to **+ Create** a replication rule again.

   * Type = `Hive`

   * Database name = `databricks_demo`

   * Table name = `*`

   * Description = `Demo` _- this field is optional_

   Click **Create rule** once complete.

5. Both rules should now display on the **Replication** tab in the Fusion UI.

### Test replication

Prior to performing these tasks, the Databricks cluster must be in a **running** state. Please access the Azure portal and check the status of the cluster. If it is not running, select to start the cluster and wait until it is **running**.

1. Return to the terminal session on the **Docker host**.

2. Log in to the **fusion_sandbox-hdp_1** container as hdfs user and place data into HDFS.

   a. Log in to the container.

   `docker exec -u hdfs -it fusion_sandbox-hdp_1 bash`

   b. Change directory to *tmp*.

   `cd /tmp/`

   c. Obtain the sample data to be used with the Hive table.

   `curl -o customer_addresses_dim.tsv.gz -Lf 'https://github.com/pivotalsoftware/pivotal-samples/blob/master/sample-data/customer_addresses_dim.tsv.gz?raw=true'`

   d. Create a directory within HDFS for the sample data.

   `hdfs dfs -mkdir -p /retail_demo/customer_addresses_dim_hive/`

   e. Place the sample data into HDFS, so that it can be accessed by Hive.

   `hdfs dfs -put customer_addresses_dim.tsv.gz /retail_demo/customer_addresses_dim_hive/`

3. Use beeline to start a Hive session and connect to the Hiveserver2 service as hdfs user.

   `beeline -u jdbc:hive2://sandbox-hdp:10000/ -n hdfs`

   An alternative connection string can also be found on the Ambari UI under **Hive -> Summary -> HIVESERVER2 JDBC URL**.

4. Create a database to use that will store the sample data.

   `CREATE DATABASE IF NOT EXISTS retail_demo;`

5. Create a table inside of the database that points to the data previously uploaded.

   ```sql
   CREATE TABLE retail_demo.customer_addresses_dim_hive
   (
   Customer_Address_ID  bigint,
   Customer_ID          bigint,
   Valid_From_Timestamp timestamp,
   Valid_To_Timestamp   timestamp,
   House_Number         string,
   Street_Name          string,
   Appt_Suite_No        string,
   City                 string,
   State_Code           string,
   Zip_Code             string,
   Zip_Plus_Four        string,
   Country              string,
   Phone_Number         string
   )
   ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t'
   STORED AS TEXTFILE
   LOCATION '/retail_demo/customer_addresses_dim_hive/';
   ```

6. Create a second database that will match the regex for the Hive replication rule created earlier in the Fusion UI.

   `CREATE DATABASE IF NOT EXISTS databricks_demo;`

7. Now create insert data into a table by running the following:

   `CREATE TABLE databricks_demo.customer_addresses_dim_hive STORED AS ORC AS SELECT * FROM retail_demo.customer_addresses_dim_hive WHERE state_code ='CA';`

   This will now launch a Hive job that will insert the data values provided in this example. If this is successful, you will see **SUCCEEDED** written in the STATUS column.

   ```json
   --------------------------------------------------------------------------------
           VERTICES      STATUS  TOTAL  COMPLETED  RUNNING  PENDING  FAILED  KILLED
   --------------------------------------------------------------------------------
   Map 1 ..........   SUCCEEDED      1          1        0        0       0       0
   --------------------------------------------------------------------------------
   VERTICES: 01/01  [==========================>>] 100%  ELAPSED TIME: X.YZ s
   --------------------------------------------------------------------------------
   ```

### Setup Databricks Notebook to view data

1. Return to your Workspace for the Databricks cluster.

2. Create a Cluster Notebook.

   **Click Workspace on the left hand side > click the drop down arrow > Create > Notebook**

   * Name: **WD-demo**
   * Language: **SQL**
   * Cluster: (Choose the cluster used in this demo)

3. You should now see a blank notebook.

   a. Inside the 'Cmd 1' box, add the query:

   `select * from databricks_demo.customer_addresses_dim_hive;`

   b. Click 'Run Cell' (looks like a play button in the top right of that box).

4. Wait for the query to return, then select the drop-down graph type and choose **Map**.

5. Under the Plot Options > remove all Keys > click and drag 'state_code' from the 'All fields' box into the 'Keys' box.

6. Click Apply.

7. You should now see a plot of USA with colour shading - dependent on the population density.

8. If desired, you can repeat this process except using the Texas state code instead of California.

   a. Back in the Hive beeline session on the **fusion_sandbox-hdp_1** container, run the following command:

   `insert into databricks_demo.customer_addresses_dim_hive select * from retail_demo.customer_addresses_dim_hive where state_code ='TX';`

   b. Repeat from step 3 to observe the results for Texas.

You have now completed this demo.

## Troubleshooting

* Please see our [Troubleshooting](https://wandisco.github.io/wandisco-documentation/docs/quickstarts/hdp_sandbox_lan_troubleshooting) guide for help with this demo.

* Please contact [WANdisco](https://wandisco.com/contact) for further information about Fusion.

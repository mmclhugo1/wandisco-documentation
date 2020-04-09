---
id: hdp_sandbox-s3_lm
title: Hortonworks (HDP) Sandbox to S3 with LiveMigrator
sidebar_label: HDP Sandbox to S3 with LiveMigrator
---

Use this quickstart if you want to configure Fusion to replicate from a non-kerberized Hortonworks (HDP) Sandbox to an S3 bucket using WANdisco LiveMigrator.

What this guide will cover:

- Installing WANdisco Fusion and a HDP Sandbox using the [docker-compose](https://docs.docker.com/compose/) tool.
- Integrating WANdisco Fusion with S3.
- Live replication of sample data.

If you would like to try something different with the HDP Sandbox, see:

* [Live replication of data to S3](./hdp_sandbox-s3_ld.md)

## Prerequisites

|For info on how to install the services, see our [VM Preparation](../preparation/vm_prep.md) guide.|
|---|

To complete this install, you will need:

* S3 bucket.
* Linux Virtual Machine (e.g. AWS EC2 instance).
  * Minimum size recommendation = **4 vcpus, 16 GiB memory** (e.g. [t3a.xlarge](https://aws.amazon.com/ec2/instance-types/)).
  * A minimum of 24GB available storage for the `/var/lib/docker` directory.

* The following services must be installed on the VM:  
  * [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Docker](https://docs.docker.com/install/) (v19.03.5 or higher)
  * [Docker Compose for Linux](https://docs.docker.com/compose/install/#install-compose) (v1.25.0 or higher)

### Info you will require

* S3 details:

  * [Bucket name](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html) (Example: `fusion-bucket`)
  * [Bucket endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) (Example: `s3.eu-west-1.amazonaws.com`)
    * [Is path-style access used?](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro)
    * [Is V2 authentication required?](https://aws.amazon.com/blogs/aws/amazon-s3-update-sigv2-deprecation-period-extended-modified/)
  * [Bucket region](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints) (Example: `eu-west-1`)
  * [Access key](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) (Example: `AOIPUFY7ETYAHBCYT765`)
  * [Secret key](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys) (Example: `TY76eI3no3cdaWghr5tBkzPOP090bcD9c0lqpoL5`)

_These instructions have been tested on Ubuntu LTS._

## Installation

Log in to your VM prior to starting these steps.

### Setup Fusion

1. Clone the Fusion docker repository:

   `git clone https://github.com/WANdisco/fusion-docker-compose.git`

1. Change to the repository directory:

   `cd fusion-docker-compose`

1. Run the setup script:

   `./setup-env.sh`

1. Choose the `HDP Sandbox to S3` option when prompted.

1. You have now completed the setup, to create and start your containers run:

   `docker-compose up -d`

   Docker will now download all required images and create the containers.

## Configuration

### Check HDP services are started

The HDP Sandbox services can take up to 5-10 minutes to start. To check that the HDFS service is started:

1. Log in to Ambari via a web browser.

   `http://<docker_IP_address>:8080`

   Username: `admin`
   Password: `admin`

1. Select the **HDFS** service.

1. Wait until all the HDFS components are showing as **Started**.

### Configure the S3 storage

1. Log in to Fusion via a web browser.

   `http://<docker_IP_address>:8081`

   Enter your email address and choose a password you will remember.

1. Click on the **Settings** cog for the **s3** storage, and fill in the details for your S3 bucket. See the [Info you will require](#info-you-will-require) section for reference.

1. Click **Apply Configuration** and wait for this to complete.

## Migration

Follow the steps below to demonstrate migration of HCFS data from the HDP Sandbox to the S3 bucket.

### Create replication rule

On the dashboard, create a **HCFS** rule with the following parameters:

* Rule Name = `migration`
* Path for all storages = `/retail_demo`
* Default exclusions
* Preserve HCFS Block Size = *True*

### Migrate your data

1. On the dashboard, view the `migration` rule.

1. Start your migration with the following overwrite settings:

   * Source Zone = **sandbox-hdp**
   * Target Zone = **s3**
   * Overwrite Settings = **Skip**

1. Wait until the migration is complete, and check the contents of your `/retail_demo` directory in your S3 bucket.

   A new directory should exist (`customer_addresses_dim_hive`) with a ~50MB file inside (`customer_addresses_dim.tsv.gz`).

_You have now successfully migrated data from your HDP Sandbox to your S3 bucket using LiveMigrator. You can now try live replication by following our [LiveData quickstart](./hdp_sandbox-s3_ld.md#replication)._

## Troubleshooting

* See our [Troubleshooting](../troubleshooting/general_troubleshooting.md) guide for help.

* See the [shutdown and start up](../operation/hdp_sandbox_fusion_stop_start.md) guide for when you wish to safely shutdown or start back up the environment.

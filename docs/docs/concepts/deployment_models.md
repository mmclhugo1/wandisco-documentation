---
id: deployment_models
title: Deployment models for WANdisco Fusion
sidebar_label: Deployment models
---

These are some of the deployment models that WANdisco Fusion is used for.

## Migration

WANdisco Fusion allows you to replicate all your data from an on-premise cluster to cloud-based infrastructure. Fusion supports a variety of on-premise platforms, and is able to replicate seamlessly to multiple cloud vendors.

The migration can happen without impact to your Hadoop operations and cluster activity can be maintained as normal.

Fusion also offers replication for associated Hive metadata that can be ingested into a target metastore, or a [Databricks](https://docs.databricks.com/getting-started/index.html) cluster.

## Disaster Recovery

WANdisco Fusion offers Live replication of data between environments, which allows you to safeguard your data from loss. If disaster does occur, the data will be available on your alternative environment(s). This will allow normal operations to proceed regardless of impact on the affected zone.

Fusion also offers replication of security policies used in Hadoop distributions such as Ranger and Sentry. This will help provide consistent interaction between all your environments.

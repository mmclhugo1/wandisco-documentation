---
id: arch_hdp_sandbox_adlsg2
title: Architecture - Hortonworks (HDP) Sandbox to ADLS Gen2
sidebar_label: HDP Sandbox to ADLS Gen2
---

![Architecture: HDP Sandbox to ADLS Gen2](../../assets/arch_hdp_sandbox_adlsg2.jpg)

1. If a HDFS write request is on a path that matches a HCFS rule, the Fusion Server in the HDP zone will coordinate with the Fusion Server in the ADLS Gen2 zone (read requests are passed through to HDFS).
1. HDFS writes/changes are then read by the Fusion IHC in the HDP zone, and replicated to the Fusion Server in the ADLS Gen2 zone.
1. The Fusion Server in the ADLS Gen2 zone will transform the HDFS data to equivalent ADLS Gen2 storage changes.

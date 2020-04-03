---
id: arch_adlsg1_adlsg2
title: Architecture - Azure Data Lake Storage Gen1 to Gen2
sidebar_label: ADLS Gen1 to ADLS Gen2
---

![Architecture: ADLS Gen1 to ADLS Gen2](../../assets/arch_adlsg1_adlsg2.jpg)

1. When initiating a migration, Fusion's LiveMigrator will scan the ADLS Gen1 and Gen2 storages to compare the filesystems.
1. Any new files or differences are read by the Fusion IHC in the ADLS Gen1 zone, and replicated to the Fusion Server in the ADLS Gen2 zone.
1. The Fusion Server in the ADLS Gen2 zone will transform the ADLS Gen1 data to equivalent ADLS Gen2 changes.

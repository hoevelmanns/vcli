vcli
====

#### An universal and extensible CLI
Wraps your current Command Line Interfaces and allows you to stream the CLI commands in custom commands. 


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vcli.svg)](https://npmjs.org/package/@hoevelmanns/vcli)
[![Downloads/week](https://img.shields.io/npm/dw/vcli.svg)](https://npmjs.org/package/@hoevelmanns/vcli)
[![License](https://img.shields.io/npm/l/vcli.svg)](https://github.com/hoevelmanns/vcli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @hoevelmanns/vcli
$ vc COMMAND
running command...
$ vc (-v|--version|version)
@hoevelmanns/vcli/0.5.7-poc linux-x64 node-v12.13.1
$ vc --help [COMMAND]
USAGE
  $ vc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vc abo:create-orders`](#vc-abocreate-orders)
* [`vc abo:create-orders-csv`](#vc-abocreate-orders-csv)
* [`vc abo:create-orders-test`](#vc-abocreate-orders-test)
* [`vc abo:send-failed-orders`](#vc-abosend-failed-orders)
* [`vc abo:send-next-order-inform`](#vc-abosend-next-order-inform)
* [`vc abo:update-old-abo-create-date`](#vc-aboupdate-old-abo-create-date)
* [`vc autocomplete [SHELL]`](#vc-autocomplete-shell)
* [`vc build`](#vc-build)
* [`vc cache:clear`](#vc-cacheclear)
* [`vc create`](#vc-create)
* [`vc ct:commercetools:setup`](#vc-ctcommercetoolssetup)
* [`vc ct:commercetools:translation:cleanup`](#vc-ctcommercetoolstranslationcleanup)
* [`vc ct:commercetools:translation:import`](#vc-ctcommercetoolstranslationimport)
* [`vc ct:export:customers`](#vc-ctexportcustomers)
* [`vc ct:export:order`](#vc-ctexportorder)
* [`vc ct:export:order-delta`](#vc-ctexportorder-delta)
* [`vc ct:import:articleStock`](#vc-ctimportarticlestock)
* [`vc ct:import:articles`](#vc-ctimportarticles)
* [`vc ct:import:categories`](#vc-ctimportcategories)
* [`vc ct:import:orderState`](#vc-ctimportorderstate)
* [`vc ct:import:translation:product-type`](#vc-ctimporttranslationproduct-type)
* [`vc ct:shopware:deactivate-unsynced-articles`](#vc-ctshopwaredeactivate-unsynced-articles)
* [`vc ct:shopware:generate-test-orders`](#vc-ctshopwaregenerate-test-orders)
* [`vc ct:shopware:setup-shop-attributes`](#vc-ctshopwaresetup-shop-attributes)
* [`vc ct:shopware:update-reference-attributes`](#vc-ctshopwareupdate-reference-attributes)
* [`vc dbal:import`](#vc-dbalimport)
* [`vc dbal:run-sql`](#vc-dbalrun-sql)
* [`vc elaine:backlog:process`](#vc-elainebacklogprocess)
* [`vc elaine:mail:customer-service-export`](#vc-elainemailcustomer-service-export)
* [`vc elaine:mail:test`](#vc-elainemailtest)
* [`vc halt`](#vc-halt)
* [`vc help [COMMAND]`](#vc-help-command)
* [`vc orm:clear-cache:metadata`](#vc-ormclear-cachemetadata)
* [`vc orm:clear-cache:query`](#vc-ormclear-cachequery)
* [`vc orm:clear-cache:result`](#vc-ormclear-cacheresult)
* [`vc orm:convert-d1-schema`](#vc-ormconvert-d1-schema)
* [`vc orm:convert-mapping`](#vc-ormconvert-mapping)
* [`vc orm:ensure-production-settings`](#vc-ormensure-production-settings)
* [`vc orm:generate-entities`](#vc-ormgenerate-entities)
* [`vc orm:generate-proxies`](#vc-ormgenerate-proxies)
* [`vc orm:generate-repositories`](#vc-ormgenerate-repositories)
* [`vc orm:info`](#vc-orminfo)
* [`vc orm:mapping:describe`](#vc-ormmappingdescribe)
* [`vc orm:run-dql`](#vc-ormrun-dql)
* [`vc orm:schema-tool:create`](#vc-ormschema-toolcreate)
* [`vc orm:schema-tool:drop`](#vc-ormschema-tooldrop)
* [`vc orm:schema-tool:update`](#vc-ormschema-toolupdate)
* [`vc orm:validate-schema`](#vc-ormvalidate-schema)
* [`vc refresh`](#vc-refresh)
* [`vc sw:admin:create`](#vc-swadmincreate)
* [`vc sw:cache:clear`](#vc-swcacheclear)
* [`vc sw:clone:category:tree`](#vc-swclonecategorytree)
* [`vc sw:cron:list`](#vc-swcronlist)
* [`vc sw:cron:run`](#vc-swcronrun)
* [`vc sw:es:analyze`](#vc-swesanalyze)
* [`vc sw:es:backlog:clear`](#vc-swesbacklogclear)
* [`vc sw:es:backlog:sync`](#vc-swesbacklogsync)
* [`vc sw:es:index:cleanup`](#vc-swesindexcleanup)
* [`vc sw:es:index:populate`](#vc-swesindexpopulate)
* [`vc sw:es:switch:alias`](#vc-swesswitchalias)
* [`vc sw:firstrunwizard:disable`](#vc-swfirstrunwizarddisable)
* [`vc sw:firstrunwizard:enable`](#vc-swfirstrunwizardenable)
* [`vc sw:generate:attributes`](#vc-swgenerateattributes)
* [`vc sw:media:cleanup`](#vc-swmediacleanup)
* [`vc sw:media:migrate`](#vc-swmediamigrate)
* [`vc sw:media:optimize`](#vc-swmediaoptimize)
* [`vc sw:migrate:article:attribute:translations`](#vc-swmigratearticleattributetranslations)
* [`vc sw:plugin:activate`](#vc-swpluginactivate)
* [`vc sw:plugin:config:list`](#vc-swpluginconfiglist)
* [`vc sw:plugin:config:set`](#vc-swpluginconfigset)
* [`vc sw:plugin:deactivate`](#vc-swplugindeactivate)
* [`vc sw:plugin:delete`](#vc-swplugindelete)
* [`vc sw:plugin:install`](#vc-swplugininstall)
* [`vc sw:plugin:list`](#vc-swpluginlist)
* [`vc sw:plugin:refresh`](#vc-swpluginrefresh)
* [`vc sw:plugin:reinstall`](#vc-swpluginreinstall)
* [`vc sw:plugin:uninstall`](#vc-swpluginuninstall)
* [`vc sw:plugin:update`](#vc-swpluginupdate)
* [`vc sw:product:feeds:refresh`](#vc-swproductfeedsrefresh)
* [`vc sw:rebuild:category:tree`](#vc-swrebuildcategorytree)
* [`vc sw:rebuild:seo`](#vc-swrebuildseo)
* [`vc sw:refresh:search`](#vc-swrefreshsearch)
* [`vc sw:session:cleanup`](#vc-swsessioncleanup)
* [`vc sw:settings:label:find:missing`](#vc-swsettingslabelfindmissing)
* [`vc sw:snippets:find:missing`](#vc-swsnippetsfindmissing)
* [`vc sw:snippets:remove`](#vc-swsnippetsremove)
* [`vc sw:snippets:to:db`](#vc-swsnippetstodb)
* [`vc sw:snippets:to:ini`](#vc-swsnippetstoini)
* [`vc sw:snippets:to:sql`](#vc-swsnippetstosql)
* [`vc sw:snippets:validate`](#vc-swsnippetsvalidate)
* [`vc sw:store:download`](#vc-swstoredownload)
* [`vc sw:store:list`](#vc-swstorelist)
* [`vc sw:store:list:domains`](#vc-swstorelistdomains)
* [`vc sw:store:list:integrated`](#vc-swstorelistintegrated)
* [`vc sw:store:list:updates`](#vc-swstorelistupdates)
* [`vc sw:theme:cache:generate`](#vc-swthemecachegenerate)
* [`vc sw:theme:create`](#vc-swthemecreate)
* [`vc sw:theme:dump:configuration`](#vc-swthemedumpconfiguration)
* [`vc sw:theme:initialize`](#vc-swthemeinitialize)
* [`vc sw:thumbnail:cleanup`](#vc-swthumbnailcleanup)
* [`vc sw:thumbnail:generate`](#vc-swthumbnailgenerate)
* [`vc sw:warm:http:cache`](#vc-swwarmhttpcache)
* [`vc up`](#vc-up)
* [`vc zr:brands:generate_urls`](#vc-zrbrandsgenerate_urls)
* [`vc zr:check:health`](#vc-zrcheckhealth)
* [`vc zr:check:ordernumber`](#vc-zrcheckordernumber)
* [`vc zr:emarsys:order_export`](#vc-zremarsysorder_export)
* [`vc zr:export:findologic`](#vc-zrexportfindologic)
* [`vc zr:import:votingimport`](#vc-zrimportvotingimport)
* [`vc zr:market:import`](#vc-zrmarketimport)
* [`vc zr:media:migrate`](#vc-zrmediamigrate)
* [`vc zr:productline:attribute-migration`](#vc-zrproductlineattribute-migration)
* [`vc zr:shopware:deactivate-unmapped-articles`](#vc-zrshopwaredeactivate-unmapped-articles)
* [`vc zr:shopware:fix-tax-rules`](#vc-zrshopwarefix-tax-rules)
* [`vc zr:shopware:plugin-config-update`](#vc-zrshopwareplugin-config-update)

## `vc abo:create-orders`

Create Orders from abos

```
USAGE
  $ vc abo:create-orders
```

_See code: [src/commands/abo/create-orders.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/create-orders.ts)_

## `vc abo:create-orders-csv`

Create CSV for upcoming orders

```
USAGE
  $ vc abo:create-orders-csv
```

_See code: [src/commands/abo/create-orders-csv.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/create-orders-csv.ts)_

## `vc abo:create-orders-test`

Test the create orders command for abo subscription

```
USAGE
  $ vc abo:create-orders-test
```

_See code: [src/commands/abo/create-orders-test.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/create-orders-test.ts)_

## `vc abo:send-failed-orders`

Send failed abo orders

```
USAGE
  $ vc abo:send-failed-orders
```

_See code: [src/commands/abo/send-failed-orders.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/send-failed-orders.ts)_

## `vc abo:send-next-order-inform`

Inform customer about the next Abo order

```
USAGE
  $ vc abo:send-next-order-inform
```

_See code: [src/commands/abo/send-next-order-inform.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/send-next-order-inform.ts)_

## `vc abo:update-old-abo-create-date`

old abo update with new creation date from order date

```
USAGE
  $ vc abo:update-old-abo-create-date
```

_See code: [src/commands/abo/update-old-abo-create-date.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/abo/update-old-abo-create-date.ts)_

## `vc autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ vc autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ vc autocomplete
  $ vc autocomplete bash
  $ vc autocomplete zsh
  $ vc autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `vc build`

build

```
USAGE
  $ vc build

OPTIONS
  -d, --clear=clear                 clears the Shopware cache
  -f, --force
  -g, --generate=generate           generates a new template cache
  -h, --help                        show CLI help
  --loglevel=error|warn|info|debug
```

_See code: [src/commands/build.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/build.ts)_

## `vc cache:clear`

clear all caches (using CacheManager)

```
USAGE
  $ vc cache:clear
```

_See code: [src/commands/cache/clear.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/cache/clear.ts)_

## `vc create`

create workspace

```
USAGE
  $ vc create

OPTIONS
  -h, --help                        show CLI help
  -n, --create                      create workspace
  --loglevel=error|warn|info|debug
```

_See code: [src/commands/create.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/create.ts)_

## `vc ct:commercetools:setup`

Create required types, states productTypes etc.

```
USAGE
  $ vc ct:commercetools:setup
```

_See code: [src/commands/ct/commercetools/setup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/commercetools/setup.ts)_

## `vc ct:commercetools:translation:cleanup`

Validate commercetools product translation files and write cleaned version

```
USAGE
  $ vc ct:commercetools:translation:cleanup
```

_See code: [src/commands/ct/commercetools/translation/cleanup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/commercetools/translation/cleanup.ts)_

## `vc ct:commercetools:translation:import`

Update commercetools products with translation data from a csv file.

```
USAGE
  $ vc ct:commercetools:translation:import
```

_See code: [src/commands/ct/commercetools/translation/import.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/commercetools/translation/import.ts)_

## `vc ct:export:customers`

ExportCreate required types, states productTypes etc.

```
USAGE
  $ vc ct:export:customers
```

_See code: [src/commands/ct/export/customers.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/export/customers.ts)_

## `vc ct:export:order`

Exports orders from Shopware to Commercetools

```
USAGE
  $ vc ct:export:order
```

_See code: [src/commands/ct/export/order.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/export/order.ts)_

## `vc ct:export:order-delta`

Exports orders without an export timestamp from Shopware to Commercetools and sets an export timestamp.

```
USAGE
  $ vc ct:export:order-delta
```

_See code: [src/commands/ct/export/order-delta.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/export/order-delta.ts)_

## `vc ct:import:articleStock`

import articleStock from Commercetools PIM

```
USAGE
  $ vc ct:import:articleStock
```

_See code: [src/commands/ct/import/articleStock.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/import/articleStock.ts)_

## `vc ct:import:articles`

import articles from Commercetools PIM

```
USAGE
  $ vc ct:import:articles
```

_See code: [src/commands/ct/import/articles.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/import/articles.ts)_

## `vc ct:import:categories`

import categories from Commercetools PIM

```
USAGE
  $ vc ct:import:categories
```

_See code: [src/commands/ct/import/categories.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/import/categories.ts)_

## `vc ct:import:orderState`

update OrderStatus from Commercetools PIM

```
USAGE
  $ vc ct:import:orderState
```

_See code: [src/commands/ct/import/orderState.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/import/orderState.ts)_

## `vc ct:import:translation:product-type`

Import translations for product type data.

```
USAGE
  $ vc ct:import:translation:product-type
```

_See code: [src/commands/ct/import/translation/product-type.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/import/translation/product-type.ts)_

## `vc ct:shopware:deactivate-unsynced-articles`

Deactivates articles without Commercetools Product-UUID attribute

```
USAGE
  $ vc ct:shopware:deactivate-unsynced-articles
```

_See code: [src/commands/ct/shopware/deactivate-unsynced-articles.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/shopware/deactivate-unsynced-articles.ts)_

## `vc ct:shopware:generate-test-orders`

Creates x test orders.

```
USAGE
  $ vc ct:shopware:generate-test-orders
```

_See code: [src/commands/ct/shopware/generate-test-orders.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/shopware/generate-test-orders.ts)_

## `vc ct:shopware:setup-shop-attributes`

create the shopware attributes configured in the shopware article gateway.

```
USAGE
  $ vc ct:shopware:setup-shop-attributes
```

_See code: [src/commands/ct/shopware/setup-shop-attributes.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/shopware/setup-shop-attributes.ts)_

## `vc ct:shopware:update-reference-attributes`

match articles by ordernumber and update the commercetools id stored in the shop.

```
USAGE
  $ vc ct:shopware:update-reference-attributes
```

_See code: [src/commands/ct/shopware/update-reference-attributes.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/ct/shopware/update-reference-attributes.ts)_

## `vc dbal:import`

Import SQL file(s) directly to Database.

```
USAGE
  $ vc dbal:import
```

_See code: [src/commands/dbal/import.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/dbal/import.ts)_

## `vc dbal:run-sql`

Executes arbitrary SQL directly from the command line.

```
USAGE
  $ vc dbal:run-sql
```

_See code: [src/commands/dbal/run-sql.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/dbal/run-sql.ts)_

## `vc elaine:backlog:process`

process elaine backlog

```
USAGE
  $ vc elaine:backlog:process
```

_See code: [src/commands/elaine/backlog/process.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/elaine/backlog/process.ts)_

## `vc elaine:mail:customer-service-export`

This dumps statistics of failed elaine transactions as csv file for the customer service.

```
USAGE
  $ vc elaine:mail:customer-service-export
```

_See code: [src/commands/elaine/mail/customer-service-export.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/elaine/mail/customer-service-export.ts)_

## `vc elaine:mail:test`

send a testmail

```
USAGE
  $ vc elaine:mail:test
```

_See code: [src/commands/elaine/mail/test.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/elaine/mail/test.ts)_

## `vc halt`

halt the machine

```
USAGE
  $ vc halt

OPTIONS
  -h, --help                        show CLI help
  --loglevel=error|warn|info|debug
```

_See code: [src/commands/halt.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/halt.ts)_

## `vc help [COMMAND]`

display help for vc

```
USAGE
  $ vc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

## `vc orm:clear-cache:metadata`

Clear all metadata cache of the various cache drivers.

```
USAGE
  $ vc orm:clear-cache:metadata
```

_See code: [src/commands/orm/clear-cache/metadata.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/clear-cache/metadata.ts)_

## `vc orm:clear-cache:query`

Clear all query cache of the various cache drivers.

```
USAGE
  $ vc orm:clear-cache:query
```

_See code: [src/commands/orm/clear-cache/query.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/clear-cache/query.ts)_

## `vc orm:clear-cache:result`

Clear all result cache of the various cache drivers.

```
USAGE
  $ vc orm:clear-cache:result
```

_See code: [src/commands/orm/clear-cache/result.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/clear-cache/result.ts)_

## `vc orm:convert-d1-schema`

Converts Doctrine 1.X schema into a Doctrine 2.X schema.

```
USAGE
  $ vc orm:convert-d1-schema
```

_See code: [src/commands/orm/convert-d1-schema.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/convert-d1-schema.ts)_

## `vc orm:convert-mapping`

Convert mapping information between supported formats.

```
USAGE
  $ vc orm:convert-mapping
```

_See code: [src/commands/orm/convert-mapping.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/convert-mapping.ts)_

## `vc orm:ensure-production-settings`

Verify that Doctrine is properly configured for a production environment.

```
USAGE
  $ vc orm:ensure-production-settings
```

_See code: [src/commands/orm/ensure-production-settings.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/ensure-production-settings.ts)_

## `vc orm:generate-entities`

Generate entity classes and method stubs from your mapping information.

```
USAGE
  $ vc orm:generate-entities
```

_See code: [src/commands/orm/generate-entities.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/generate-entities.ts)_

## `vc orm:generate-proxies`

Generates proxy classes for entity classes.

```
USAGE
  $ vc orm:generate-proxies
```

_See code: [src/commands/orm/generate-proxies.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/generate-proxies.ts)_

## `vc orm:generate-repositories`

Generate repository classes from your mapping information.

```
USAGE
  $ vc orm:generate-repositories
```

_See code: [src/commands/orm/generate-repositories.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/generate-repositories.ts)_

## `vc orm:info`

Show basic information about all mapped entities

```
USAGE
  $ vc orm:info
```

_See code: [src/commands/orm/info.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/info.ts)_

## `vc orm:mapping:describe`

Display information about mapped objects

```
USAGE
  $ vc orm:mapping:describe
```

_See code: [src/commands/orm/mapping/describe.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/mapping/describe.ts)_

## `vc orm:run-dql`

Executes arbitrary DQL directly from the command line.

```
USAGE
  $ vc orm:run-dql
```

_See code: [src/commands/orm/run-dql.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/run-dql.ts)_

## `vc orm:schema-tool:create`

Processes the schema and either create it directly on EntityManager Storage Connection or generate the SQL output.

```
USAGE
  $ vc orm:schema-tool:create
```

_See code: [src/commands/orm/schema-tool/create.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/schema-tool/create.ts)_

## `vc orm:schema-tool:drop`

Drop the complete database schema of EntityManager Storage Connection or generate the corresponding SQL output.

```
USAGE
  $ vc orm:schema-tool:drop
```

_See code: [src/commands/orm/schema-tool/drop.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/schema-tool/drop.ts)_

## `vc orm:schema-tool:update`

Executes (or dumps) the SQL needed to update the database schema to match the current mapping metadata.

```
USAGE
  $ vc orm:schema-tool:update
```

_See code: [src/commands/orm/schema-tool/update.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/schema-tool/update.ts)_

## `vc orm:validate-schema`

Validate the mapping files.

```
USAGE
  $ vc orm:validate-schema
```

_See code: [src/commands/orm/validate-schema.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/orm/validate-schema.ts)_

## `vc refresh`

generate commands for external consoles

```
USAGE
  $ vc refresh

OPTIONS
  -h, --help                        show CLI help
  -v, --vagrant                     run generator in vagrant
  --loglevel=error|warn|info|debug
```

_See code: [src/commands/refresh.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/refresh.ts)_

## `vc sw:admin:create`

Create a new administrator user

```
USAGE
  $ vc sw:admin:create
```

_See code: [src/commands/sw/admin/create.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/admin/create.ts)_

## `vc sw:cache:clear`

Clears the cache

```
USAGE
  $ vc sw:cache:clear
```

_See code: [src/commands/sw/cache/clear.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/cache/clear.ts)_

## `vc sw:clone:category:tree`

Duplicates the category tree.

```
USAGE
  $ vc sw:clone:category:tree
```

_See code: [src/commands/sw/clone/category/tree.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/clone/category/tree.ts)_

## `vc sw:cron:list`

Lists cronjobs.

```
USAGE
  $ vc sw:cron:list
```

_See code: [src/commands/sw/cron/list.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/cron/list.ts)_

## `vc sw:cron:run`

Runs cronjobs.

```
USAGE
  $ vc sw:cron:run
```

_See code: [src/commands/sw/cron/run.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/cron/run.ts)_

## `vc sw:es:analyze`

Helper tool to test own analyzers.

```
USAGE
  $ vc sw:es:analyze
```

_See code: [src/commands/sw/es/analyze.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/analyze.ts)_

## `vc sw:es:backlog:clear`

Remove backlog entries that are already synchronized.

```
USAGE
  $ vc sw:es:backlog:clear
```

_See code: [src/commands/sw/es/backlog/clear.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/backlog/clear.ts)_

## `vc sw:es:backlog:sync`

Synchronize events from the backlog to the live index.

```
USAGE
  $ vc sw:es:backlog:sync
```

_See code: [src/commands/sw/es/backlog/sync.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/backlog/sync.ts)_

## `vc sw:es:index:cleanup`

Remove unused Elasticsearch indices.

```
USAGE
  $ vc sw:es:index:cleanup
```

_See code: [src/commands/sw/es/index/cleanup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/index/cleanup.ts)_

## `vc sw:es:index:populate`

Reindex all shops into a new index and switch the live-system alias after the index process.

```
USAGE
  $ vc sw:es:index:populate
```

_See code: [src/commands/sw/es/index/populate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/index/populate.ts)_

## `vc sw:es:switch:alias`

Allows to switch live-system aliases.

```
USAGE
  $ vc sw:es:switch:alias
```

_See code: [src/commands/sw/es/switch/alias.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/es/switch/alias.ts)_

## `vc sw:firstrunwizard:disable`

Disable the first run wizard.

```
USAGE
  $ vc sw:firstrunwizard:disable
```

_See code: [src/commands/sw/firstrunwizard/disable.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/firstrunwizard/disable.ts)_

## `vc sw:firstrunwizard:enable`

Enable the first run wizard.

```
USAGE
  $ vc sw:firstrunwizard:enable
```

_See code: [src/commands/sw/firstrunwizard/enable.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/firstrunwizard/enable.ts)_

## `vc sw:generate:attributes`

Generates attribute models.

```
USAGE
  $ vc sw:generate:attributes
```

_See code: [src/commands/sw/generate/attributes.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/generate/attributes.ts)_

## `vc sw:media:cleanup`

Collect unused media and move them to trash.

```
USAGE
  $ vc sw:media:cleanup
```

_See code: [src/commands/sw/media/cleanup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/media/cleanup.ts)_

## `vc sw:media:migrate`

Migrate images to new structure

```
USAGE
  $ vc sw:media:migrate
```

_See code: [src/commands/sw/media/migrate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/media/migrate.ts)_

## `vc sw:media:optimize`

Optimize uploaded media without quality loss.

```
USAGE
  $ vc sw:media:optimize
```

_See code: [src/commands/sw/media/optimize.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/media/optimize.ts)_

## `vc sw:migrate:article:attribute:translations`

Migrates article attribute translations from Shopware 5.1 to Shopware 5.2

```
USAGE
  $ vc sw:migrate:article:attribute:translations
```

_See code: [src/commands/sw/migrate/article/attribute/translations.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/migrate/article/attribute/translations.ts)_

## `vc sw:plugin:activate`

Activates a plugin.

```
USAGE
  $ vc sw:plugin:activate
```

_See code: [src/commands/sw/plugin/activate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/activate.ts)_

## `vc sw:plugin:config:list`

Lists plugin configuration.

```
USAGE
  $ vc sw:plugin:config:list
```

_See code: [src/commands/sw/plugin/config/list.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/config/list.ts)_

## `vc sw:plugin:config:set`

Sets plugin configuration.

```
USAGE
  $ vc sw:plugin:config:set
```

_See code: [src/commands/sw/plugin/config/set.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/config/set.ts)_

## `vc sw:plugin:deactivate`

Deactivates a plugin.

```
USAGE
  $ vc sw:plugin:deactivate
```

_See code: [src/commands/sw/plugin/deactivate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/deactivate.ts)_

## `vc sw:plugin:delete`

Deletes a plugin.

```
USAGE
  $ vc sw:plugin:delete
```

_See code: [src/commands/sw/plugin/delete.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/delete.ts)_

## `vc sw:plugin:install`

Installs a plugin.

```
USAGE
  $ vc sw:plugin:install
```

_See code: [src/commands/sw/plugin/install.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/install.ts)_

## `vc sw:plugin:list`

Lists plugins.

```
USAGE
  $ vc sw:plugin:list
```

_See code: [src/commands/sw/plugin/list.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/list.ts)_

## `vc sw:plugin:refresh`

Refreshes plugin list.

```
USAGE
  $ vc sw:plugin:refresh
```

_See code: [src/commands/sw/plugin/refresh.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/refresh.ts)_

## `vc sw:plugin:reinstall`

Reinstalls the provided plugin

```
USAGE
  $ vc sw:plugin:reinstall
```

_See code: [src/commands/sw/plugin/reinstall.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/reinstall.ts)_

## `vc sw:plugin:uninstall`

Uninstalls a plugin.

```
USAGE
  $ vc sw:plugin:uninstall
```

_See code: [src/commands/sw/plugin/uninstall.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/uninstall.ts)_

## `vc sw:plugin:update`

Updates a plugin.

```
USAGE
  $ vc sw:plugin:update
```

_See code: [src/commands/sw/plugin/update.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/plugin/update.ts)_

## `vc sw:product:feeds:refresh`

Refreshes product feed cache files.

```
USAGE
  $ vc sw:product:feeds:refresh
```

_See code: [src/commands/sw/product/feeds/refresh.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/product/feeds/refresh.ts)_

## `vc sw:rebuild:category:tree`

Rebuild the category tree

```
USAGE
  $ vc sw:rebuild:category:tree
```

_See code: [src/commands/sw/rebuild/category/tree.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/rebuild/category/tree.ts)_

## `vc sw:rebuild:seo`

Rebuild the SEO index

```
USAGE
  $ vc sw:rebuild:seo
```

_See code: [src/commands/sw/rebuild/seo/index.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/rebuild/seo/index.ts)_

## `vc sw:refresh:search`

Refreshes and regenerates the search index

```
USAGE
  $ vc sw:refresh:search
```

_See code: [src/commands/sw/refresh/search/index.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/refresh/search/index.ts)_

## `vc sw:session:cleanup`

Removes expired sessions

```
USAGE
  $ vc sw:session:cleanup
```

_See code: [src/commands/sw/session/cleanup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/session/cleanup.ts)_

## `vc sw:settings:label:find:missing`

Dump missing settings labels from the database into php arrays files

```
USAGE
  $ vc sw:settings:label:find:missing
```

_See code: [src/commands/sw/settings/label/find/missing.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/settings/label/find/missing.ts)_

## `vc sw:snippets:find:missing`

Find missing snippets in the database and dumps them into .ini files

```
USAGE
  $ vc sw:snippets:find:missing
```

_See code: [src/commands/sw/snippets/find/missing.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/find/missing.ts)_

## `vc sw:snippets:remove`

Remove snippets from the database for a specific folder

```
USAGE
  $ vc sw:snippets:remove
```

_See code: [src/commands/sw/snippets/remove.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/remove.ts)_

## `vc sw:snippets:to:db`

Load snippets from .ini files into database

```
USAGE
  $ vc sw:snippets:to:db
```

_See code: [src/commands/sw/snippets/to/db.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/to/db.ts)_

## `vc sw:snippets:to:ini`

Dump snippets from the database into .ini files

```
USAGE
  $ vc sw:snippets:to:ini
```

_See code: [src/commands/sw/snippets/to/ini.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/to/ini.ts)_

## `vc sw:snippets:to:sql`

Load snippets from .ini files into sql file

```
USAGE
  $ vc sw:snippets:to:sql
```

_See code: [src/commands/sw/snippets/to/sql.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/to/sql.ts)_

## `vc sw:snippets:validate`

Validates .ini files containing snippets

```
USAGE
  $ vc sw:snippets:validate
```

_See code: [src/commands/sw/snippets/validate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/snippets/validate.ts)_

## `vc sw:store:download`

Downloads a plugin from the community store

```
USAGE
  $ vc sw:store:download
```

_See code: [src/commands/sw/store/download.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/store/download.ts)_

## `vc sw:store:list`

List licensed plugins.

```
USAGE
  $ vc sw:store:list
```

_See code: [src/commands/sw/store/list.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/store/list.ts)_

## `vc sw:store:list:domains`

List connected domains.

```
USAGE
  $ vc sw:store:list:domains
```

_See code: [src/commands/sw/store/list/domains.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/store/list/domains.ts)_

## `vc sw:store:list:integrated`

List all integrated plugins.

```
USAGE
  $ vc sw:store:list:integrated
```

_See code: [src/commands/sw/store/list/integrated.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/store/list/integrated.ts)_

## `vc sw:store:list:updates`

Lists updates for installed plugins.

```
USAGE
  $ vc sw:store:list:updates
```

_See code: [src/commands/sw/store/list/updates.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/store/list/updates.ts)_

## `vc sw:theme:cache:generate`

Generates theme caches.

```
USAGE
  $ vc sw:theme:cache:generate
```

_See code: [src/commands/sw/theme/cache/generate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/theme/cache/generate.ts)_

## `vc sw:theme:create`

Creates a theme.

```
USAGE
  $ vc sw:theme:create
```

_See code: [src/commands/sw/theme/create.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/theme/create.ts)_

## `vc sw:theme:dump:configuration`

Dumps the theme configuration into json files

```
USAGE
  $ vc sw:theme:dump:configuration
```

_See code: [src/commands/sw/theme/dump/configuration.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/theme/dump/configuration.ts)_

## `vc sw:theme:initialize`

Initializes themes. Enables responsive theme for the default shop.

```
USAGE
  $ vc sw:theme:initialize
```

_See code: [src/commands/sw/theme/initialize.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/theme/initialize.ts)_

## `vc sw:thumbnail:cleanup`

Deletes thumbnails for images whose original file has been deleted.

```
USAGE
  $ vc sw:thumbnail:cleanup
```

_See code: [src/commands/sw/thumbnail/cleanup.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/thumbnail/cleanup.ts)_

## `vc sw:thumbnail:generate`

Generates a new Thumbnail.

```
USAGE
  $ vc sw:thumbnail:generate
```

_See code: [src/commands/sw/thumbnail/generate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/thumbnail/generate.ts)_

## `vc sw:warm:http:cache`

Warm up http cache

```
USAGE
  $ vc sw:warm:http:cache
```

_See code: [src/commands/sw/warm/http/cache.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/sw/warm/http/cache.ts)_

## `vc up`

start the machine

```
USAGE
  $ vc up

OPTIONS
  -h, --help                        show CLI help
  --loglevel=error|warn|info|debug
```

_See code: [src/commands/up.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/up.ts)_

## `vc zr:brands:generate_urls`

Generate specific category URLs for all brands

```
USAGE
  $ vc zr:brands:generate_urls
```

_See code: [src/commands/zr/brands/generate_urls.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/brands/generate_urls.ts)_

## `vc zr:check:health`

ZooRoyal Healthcheck

```
USAGE
  $ vc zr:check:health
```

_See code: [src/commands/zr/check/health.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/check/health.ts)_

## `vc zr:check:ordernumber`

ZooRoyal FixOrdernumber

```
USAGE
  $ vc zr:check:ordernumber
```

_See code: [src/commands/zr/check/ordernumber.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/check/ordernumber.ts)_

## `vc zr:emarsys:order_export`

Export order (sale items) csv and upload on ftp for Emarsys

```
USAGE
  $ vc zr:emarsys:order_export
```

_See code: [src/commands/zr/emarsys/order_export.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/emarsys/order_export.ts)_

## `vc zr:export:findologic`

Findologic CSV Export

```
USAGE
  $ vc zr:export:findologic
```

_See code: [src/commands/zr/export/findologic.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/export/findologic.ts)_

## `vc zr:import:votingimport`

ZooRoyal Voting Import

```
USAGE
  $ vc zr:import:votingimport
```

_See code: [src/commands/zr/import/votingimport.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/import/votingimport.ts)_

## `vc zr:market:import`

Import data from file.

```
USAGE
  $ vc zr:market:import
```

_See code: [src/commands/zr/market/import.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/market/import.ts)_

## `vc zr:media:migrate`

ZooRoyal Media Migration

```
USAGE
  $ vc zr:media:migrate
```

_See code: [src/commands/zr/media/migrate.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/media/migrate.ts)_

## `vc zr:productline:attribute-migration`

Migrate command for the old property values in productline

```
USAGE
  $ vc zr:productline:attribute-migration
```

_See code: [src/commands/zr/productline/attribute-migration.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/productline/attribute-migration.ts)_

## `vc zr:shopware:deactivate-unmapped-articles`

Deactivate articles without a CTP UUID, deactivate variants without 1000 prefix

```
USAGE
  $ vc zr:shopware:deactivate-unmapped-articles
```

_See code: [src/commands/zr/shopware/deactivate-unmapped-articles.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/shopware/deactivate-unmapped-articles.ts)_

## `vc zr:shopware:fix-tax-rules`

Create missing tax categories & rules, set names for nameless rules.

```
USAGE
  $ vc zr:shopware:fix-tax-rules
```

_See code: [src/commands/zr/shopware/fix-tax-rules.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/shopware/fix-tax-rules.ts)_

## `vc zr:shopware:plugin-config-update`

Update config values

```
USAGE
  $ vc zr:shopware:plugin-config-update
```

_See code: [src/commands/zr/shopware/plugin-config-update.ts](https://github.com/hoevelmanns/vcli/blob/v0.5.7-poc/src/commands/zr/shopware/plugin-config-update.ts)_
<!-- commandsstop -->

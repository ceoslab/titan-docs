---
sidebar_position: 5
---

# 🗂️ Cessão

Esta seção tem o objetivo de detalhar o processo de criação de uma Cessão de crédito. Aqui, você aprenderá a selecionar a cessionária para a qual deseja ceder uma ou várias operações, além de enviar as taxas, encargos, a documentação necessária e todos os passos envolvidos na cessão de crédito por meio do Titan.

## Criar Cessão

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **criação de uma Cessão por meio da chave API**. Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

#### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Taxa da Cessionária | `cedingCommission` | Não | Number | - |
| Identificador da Cessionária | `cessionaryCompanyID` | Sim | Number | - |
| Identificadores das operações | `operationIDs` | Sim | Array | - |
| [Encargos da Cessão](#encargos-da-cessão-operationcessionadditionalcharges---opcional) | `operationCessionAdditionalCharges` | Não | Array | - |
| [Taxas da Cessão](#taxas-da-cessão-operationcessionadditionaltaxes---opcional) | `operationCessionAdditionalTaxes` | Não | Array | - |
| [Status da Cessão](#status-da-cessão-status) | `status` | Não | String | `SG` |
| Data da Cessão | `cessionDate` | Sim | Date | - |

:::warning Atenção

O valor informado no campo `cedingCommission` será sempre multiplicado por 100. Por exemplo, ao inserir 0.1 no campo, isso indica que a taxa da Cessionária corresponde a 10% do valor total dos desembolsos das operações da Cessão.

:::

## Encargos e Taxas

É importante destacar a diferença entre os Encargos e as Taxas de uma Cessão. Os Encargos estão diretamente associados à entidade de produtos da instituição, sendo que cada operação é criada com base em um produto, estabelecendo assim seu vínculo. Portanto, ao adicionar Encargos em uma Cessão, você informa o identificador da operação (`operationID`) no objeto para aplicar o encargo desejado. <b>Se o identificador da operação não for informado, o encargo será aplicado a todas as operações da Cessão.</b> Isso significa que, se um valor fixo (`value`) for informado, ele será aplicado a todas as operações. Da mesma forma, se um valor percentual (`valuePct`) for informado, este será aplicado a todas as operações com base no valor do desembolso de cada uma, de forma separada.

<b>As taxas, por outro lado, estão diretamente associadas à Cessão, afetando o somatório de todos os desembolsos das operações vinculadas à Cessão que está sendo criada.</b> Por exemplo, se uma taxa de 0.1 (10%) for adicionada à Cessão, será calculado o valor total dos desembolsos de todas as operações, e essa taxa de 10% (`taxPct`) será aplicada sobre esse valor. Da mesma forma, se um valor fixo (`tax`) de 100 ($) for informado, esse valor será aplicado sobre esse valor.

:::warning Atenção

A criação de uma Cessão via API não herda nenhum dado de Encargos informados nos produtos ou de Taxas na Cessionária <b>definidos pela interface</b>.

:::

#### Encargos da Cessão (`operationCessionAdditionalCharges`) - <i>opcional</i>

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Identificador da operação | `operationID` | Sim | Number | - |
| [Identificador do tipo de encargo](#identificador-do-tipo-de-encargo-additionalchargetypeid) | `additionalChargeTypeID` | Sim | Number | - |
| Nome do encargo | `name` | Sim | String | - |
| Valor do encargo ($) | `value` | Não | Number | - |
| Valor do encargo (%) | `valuePct` | Não | Number | - |
| [Tipo de valor](#tipo-de-valor-valuetype-e-tipo-de-taxa-taxtype) | `valueType` | Não | String | - |

:::warning Atenção

O valor informado no campo `valuePct` será sempre multiplicado por 100. Por exemplo, ao inserir 0.1 no campo, isso indica que o encargo corresponde a 10% do valor total do desembolso.

Os campos `value` e `valuePct` não são obrigatórios, mas é necessário que pelo menos um deles seja informado. O campo `valueType` também não é obrigatório, pois, ao informar o `value` ou `valuePct`, o Tipo de valor já é automaticamente compreendido.

:::

#### Taxas da Cessão (`operationCessionAdditionalTaxes`) - <i>opcional</i>

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Nome da taxa | `name` | Sim | String | - |
| Valor da taxa ($) | `tax` | Não | Number | - |
| Valor da taxa (%) | `taxPct` | Não | Number | - |
| [Tipo de taxa](#tipo-de-valor-valuetype-e-tipo-de-taxa-taxtype) | `taxType` | Não | String | - |

:::warning Atenção

O valor informado no campo `taxPct` será sempre multiplicado por 100. Por exemplo, ao inserir 0.1 no campo, isso indica que a taxa corresponde a 10% do valor total de todos os desembolsos das operações daquela Cessão.

Os campos `tax` e `taxPct` não são obrigatórios, mas é necessário que pelo menos um deles seja informado. O campo `valueType` também não é obrigatório, pois, ao informar o `tax` ou `taxPct`, o Tipo de taxa já é automaticamente compreendido.

:::

#### Padrão de API

```js
POST {{ _.base_url }}/api/operation-cessions/create
```

#### Exemplo de rota

```js
POST https://{empresa}.titan.ceoslab.app/api/operation-cessions/create
```

#### Exemplo de requisição

```bash showLineNumbers
{
   "cedingCommission": 1.2,
   "cessionaryCompanyID": 751,
   "operationIDs": [
      8702
   ],
   "operationCessionAdditionalCharges": [
      {
         "operationID": 8702,
         "additionalChargeTypeID": 1,
         "name": "ATTA PJ",
         "value": 1000,
         "valuePct": null,
         "valueType": "ABSOLUTE"
      },
      {
         "operationID": 8702,
         "additionalChargeTypeID": 3,
         "name": "CEO",
         "value": null,
         "valuePct": 0.1,
         "valueType": "RELATIVE"
      }
   ],
   "operationCessionAdditionalTaxes": [
      {
         "name": "ATTA PJ",
         "taxPct": null,
         "tax": 1000,
         "taxType": "ABSOLUTE"
      },
      {
         "name": "TESTE",
         "taxPct": 0.1,
         "tax": null,
         "taxType": "RELATIVE"
      }
   ],
   "status": "SG",
   "cessionDate": "2024-07-20"
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
# highlight-next-line
    "id": 1451,
    "createdAt": "2024-07-22T14:25:50.640384Z",
    "updatedAt": "2024-07-22T14:25:50.687571Z",
    "createdByID": 2761,
    "updatedByID": 2761,
    "enabled": true,
    "cessionaryCompanyID": 751,
    "accountReceivableID": 1401,
    "totalCessionValue": 3300.00,
    "cessionDate": "2024-07-20",
    "cedingCommission": 1.200000000000,
    "status": "SG",
    "generateCnab": true,
    "operationIDs": [
        8702
    ],
    "cessionaryCompanyCompany": {
        "id": 2162,
        "createdAt": "2023-10-27T17:49:46.792632Z",
        "updatedAt": "2024-07-19T12:53:23.944284Z",
        "createdByID": 2766,
        "updatedByID": 2761,
        "enabled": true,
        "documentNumber": "12345678000110",
        "legalName": "EMPRESA TESTE LTDA",
        "tradeName": "EMPRESA TESTE",
        "email": "empresa@teste.com.br",
        "mobilePhoneNumber": "",
        "landlinePhoneNumber": "5100000001",
        "description": null,
        "incorporationDate": "2022-05-09",
        "shareCapital": 0.00,
        "earnings": null,
        "equity": 1000.00,
        "monthlyAverageRevenue": 1000.00,
        "stateTaxNumber": null,
        "cityTaxNumber": null,
        "simplifiedTax": false,
        "companyRegistrationStatusID": 451,
        "companyRegistrationStatus": {
            "id": 451,
            "text": "ATIVA",
            "enabled": true
        },
        "companyDimensionTypeID": 1,
        "companyDimensionType": {
            "id": 1,
            "text": "MICRO EMPRESA",
            "enabled": true,
            "code": 1
        },
        "employeeCountRangeID": null,
        "employeeCountRange": null,
        "companyHierarchyTypeID": 1,
        "companyHierarchyType": {
            "id": 1,
            "text": "MATRIZ",
            "enabled": true,
            "code": 1
        },
        "companyLegalNatureTypeID": 51,
        "companyLegalNatureType": {
            "id": 51,
            "text": "Sociedade Empresária Limitada",
            "enabled": true,
            "code": 2062
        },
        "primaryActivityID": 298,
        "primaryActivity": {
            "id": 298,
            "code": 4712100,
            "description": "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns"
        },
        "address": {
            "id": 1711,
            "createdAt": "2023-10-27T17:49:46.79467Z",
            "updatedAt": "2024-07-15T20:02:37.064644Z",
            "createdByID": 2766,
            "updatedByID": 38501,
            "enabled": true,
            "postalCode": "90540010",
            "countryID": 1,
            "level1AdminDivID": 23,
            "level1AdminDiv": {
                "id": 23,
                "name": "Rio Grande do Sul",
                "countryID": 1,
                "abbreviation": "RS",
                "code": "43"
            },
            "level2AdminDivID": 4932,
            "level2AdminDiv": {
                "id": 4932,
                "name": "PORTO ALEGRE",
                "abbreviation": "RS",
                "code": "4314902",
                "level1AdminDivID": 23
            },
            "level3AdminDivID": null,
            "line1": "RUA CÂNDIDO SILVEIRA",
            "line2": null,
            "houseNumber": "198",
            "neighborhood": "AUXILIADORA",
            "latitude": -30.020536,
            "longitude": -51.1924,
            "mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
            "companyID": 2162
        },
        "affiliatedCompany": {
            "id": 1601,
            "createdAt": "2024-05-23T13:00:50.502255Z",
            "updatedAt": "2024-07-16T14:15:45.735699Z",
            "createdByID": 2761,
            "updatedByID": 38051,
            "enabled": true,
            "payrollClosingDay": 5,
            "payrollPaymentDay": 15,
            "observation": null,
            "companyID": 2162,
            "gracePeriod": 30
        },
        "assignorCompany": null,
        "cessionaryCompany": {
            "id": 751,
            "createdAt": "2024-01-21T15:50:19.361221Z",
            "updatedAt": "2024-07-15T18:28:38.622548Z",
            "createdByID": 1,
            "updatedByID": 3103,
            "enabled": true,
            "observation": null,
            "cessionaryTax": 1.20,
            "companyID": 2162,
            "cessionaryCompanyTypeID": 3,
            "cessionaryCompanyType": {
                "id": 3,
                "text": "FIDC (Fundo de investimento em direitos creditórios)",
                "enabled": true,
                "code": 1
            },
            "sfn": true
        },
        "companyCorrespondentBank": null,
        "brokerageCompany": null,
        "insuranceCompany": null,
        "supplierCompany": null,
        "agencyOffice": {
            "id": 1551,
            "createdAt": "2024-01-22T15:13:16.948899Z",
            "updatedAt": "2024-07-03T16:31:08.46329Z",
            "createdByID": 1,
            "updatedByID": 39252,
            "enabled": true,
            "agencyID": null,
            "companyID": 2162,
            "typeID": null,
            "type": null,
            "companyLegalName": "EMPRESA TESTE LTDA"
        }
    },
    "totalAdditionalChargeValue": 1100.00000000000000
}
```

:::warning Atenção!

Todas as operações devem ter seus desembolsos informados e não podem estar em uma cessão em andamento ou concluída. Se uma parcela de qualquer operação tiver o status "PAGO", a cessão não poderá ser criada.

:::

:::info Ações automáticas

Ao criar uma Cessão, são geradas contas a pagar referentes aos desembolsos das operações e contas a receber da Cessão, além dos termos de cessão vinculados à cessionária.

:::

## Atualizar Cessão

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **atualização de uma cessão por meio da chave API**. Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

:::warning Atenção

Se a Cessão foi cancelada ou finalizada, ela não poderá ser atualizada. Caso ocorram mudanças nos Encargos e Taxas da Cessão e os arquivos CNAB e Termos de Cessão já tenham sido gerados anteriormente, novos arquivos serão gerados automaticamente.

Os campos `cessionaryCompanyID` e `cessionDate`, além do Array `operationIDs` não podem ser modificados na atualização de uma Cessão. 

:::

#### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Taxa da Cessionária | `cedingCommission` | Não | Number | - |
| Identificador da Cessionária | `cessionaryCompanyID` | Sim | Number | - |
| Identificadores das operações | `operationIDs` | Sim | Array | - |
| [Encargos da Cessão](#encargos-da-cessão-operationcessionadditionalcharges---opcional) | `operationCessionAdditionalCharges` | Não | Array | - |
| [Taxas da Cessão](#taxas-da-cessão-operationcessionadditionaltaxes---opcional) | `operationCessionAdditionalTaxes` | Não | Array | - |
| [Status da Cessão](#status-da-cessão-status) | `status` | Não | String | `SG` |
| Data da Cessão | `cessionDate` | Sim | Date | - |

:::info Informativo

Você encontrará o identificador da Cessão (`operationCessionID`) na [resposta da criação da Cessão](#exemplo-de-resposta), destacada no código.

:::

#### Padrão de API

```js
PUT {{ _.base_url }}/api/operation-cessions/{operationCessionID}/update
```

#### Exemplo de rota

```js
PUT https://{empresa}.titan.ceoslab.app/api/operation-cessions/1451/update
```

#### Exemplo de requisição

```bash showLineNumbers
{
   "cedingCommission": 1.2,
   "cessionaryCompanyID": 751,
   "operationIDs": [
      8702
   ],
   "operationCessionAdditionalCharges": [
      {
         "operationID": 8702,
         "additionalChargeTypeID": 1,
         "name": "ATTA PJ",
         "value": 1000,
         "valuePct": null,
         "valueType": "ABSOLUTE"
      },
      {
         "operationID": 8702,
         "additionalChargeTypeID": 3,
         "name": "CEO",
         "value": null,
         "valuePct": 0.1,
         "valueType": "RELATIVE"
      }
   ],
   "operationCessionAdditionalTaxes": [
      {
         "name": "ATTA PJ",
         "taxPct": null,
         "tax": 1000,
         "taxType": "ABSOLUTE"
      },
      {
         "name": "TESTE",
         "taxPct": 0.1,
         "tax": null,
         "taxType": "RELATIVE"
      }
   ],
   "status": "SG",
   "cessionDate": "2024-07-20"
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
# highlight-next-line
    "id": 1451,
    "createdAt": "2024-07-22T14:25:50.640384Z",
    "updatedAt": "2024-07-22T14:25:50.687571Z",
    "createdByID": 2761,
    "updatedByID": 2761,
    "enabled": true,
    "cessionaryCompanyID": 751,
    "accountReceivableID": 1401,
    "totalCessionValue": 3300.00,
    "cessionDate": "2024-07-20",
    "cedingCommission": 1.200000000000,
    "status": "SG",
    "generateCnab": true,
    "operationIDs": [
        8702
    ],
    "cessionaryCompanyCompany": {
        "id": 2162,
        "createdAt": "2023-10-27T17:49:46.792632Z",
        "updatedAt": "2024-07-19T12:53:23.944284Z",
        "createdByID": 2766,
        "updatedByID": 2761,
        "enabled": true,
        "documentNumber": "12345678000110",
        "legalName": "EMPRESA TESTE LTDA",
        "tradeName": "EMPRESA TESTE",
        "email": "empresa@teste.com.br",
        "mobilePhoneNumber": "",
        "landlinePhoneNumber": "5100000001",
        "description": null,
        "incorporationDate": "2022-05-09",
        "shareCapital": 0.00,
        "earnings": null,
        "equity": 1000.00,
        "monthlyAverageRevenue": 1000.00,
        "stateTaxNumber": null,
        "cityTaxNumber": null,
        "simplifiedTax": false,
        "companyRegistrationStatusID": 451,
        "companyRegistrationStatus": {
            "id": 451,
            "text": "ATIVA",
            "enabled": true
        },
        "companyDimensionTypeID": 1,
        "companyDimensionType": {
            "id": 1,
            "text": "MICRO EMPRESA",
            "enabled": true,
            "code": 1
        },
        "employeeCountRangeID": null,
        "employeeCountRange": null,
        "companyHierarchyTypeID": 1,
        "companyHierarchyType": {
            "id": 1,
            "text": "MATRIZ",
            "enabled": true,
            "code": 1
        },
        "companyLegalNatureTypeID": 51,
        "companyLegalNatureType": {
            "id": 51,
            "text": "Sociedade Empresária Limitada",
            "enabled": true,
            "code": 2062
        },
        "primaryActivityID": 298,
        "primaryActivity": {
            "id": 298,
            "code": 4712100,
            "description": "Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns"
        },
        "address": {
            "id": 1711,
            "createdAt": "2023-10-27T17:49:46.79467Z",
            "updatedAt": "2024-07-15T20:02:37.064644Z",
            "createdByID": 2766,
            "updatedByID": 38501,
            "enabled": true,
            "postalCode": "90540010",
            "countryID": 1,
            "level1AdminDivID": 23,
            "level1AdminDiv": {
                "id": 23,
                "name": "Rio Grande do Sul",
                "countryID": 1,
                "abbreviation": "RS",
                "code": "43"
            },
            "level2AdminDivID": 4932,
            "level2AdminDiv": {
                "id": 4932,
                "name": "PORTO ALEGRE",
                "abbreviation": "RS",
                "code": "4314902",
                "level1AdminDivID": 23
            },
            "level3AdminDivID": null,
            "line1": "RUA CÂNDIDO SILVEIRA",
            "line2": null,
            "houseNumber": "198",
            "neighborhood": "AUXILIADORA",
            "latitude": -30.020536,
            "longitude": -51.1924,
            "mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
            "companyID": 2162
        },
        "affiliatedCompany": {
            "id": 1601,
            "createdAt": "2024-05-23T13:00:50.502255Z",
            "updatedAt": "2024-07-16T14:15:45.735699Z",
            "createdByID": 2761,
            "updatedByID": 38051,
            "enabled": true,
            "payrollClosingDay": 5,
            "payrollPaymentDay": 15,
            "observation": null,
            "companyID": 2162,
            "gracePeriod": 30
        },
        "assignorCompany": null,
        "cessionaryCompany": {
            "id": 751,
            "createdAt": "2024-01-21T15:50:19.361221Z",
            "updatedAt": "2024-07-15T18:28:38.622548Z",
            "createdByID": 1,
            "updatedByID": 3103,
            "enabled": true,
            "observation": null,
            "cessionaryTax": 1.20,
            "companyID": 2162,
            "cessionaryCompanyTypeID": 3,
            "cessionaryCompanyType": {
                "id": 3,
                "text": "FIDC (Fundo de investimento em direitos creditórios)",
                "enabled": true,
                "code": 1
            },
            "sfn": true
        },
        "companyCorrespondentBank": null,
        "brokerageCompany": null,
        "insuranceCompany": null,
        "supplierCompany": null,
        "agencyOffice": {
            "id": 1551,
            "createdAt": "2024-01-22T15:13:16.948899Z",
            "updatedAt": "2024-07-03T16:31:08.46329Z",
            "createdByID": 1,
            "updatedByID": 39252,
            "enabled": true,
            "agencyID": null,
            "companyID": 2162,
            "typeID": null,
            "type": null,
            "companyLegalName": "EMPRESA TESTE LTDA"
        }
    },
    "totalAdditionalChargeValue": 1100.00000000000000
}
```

## Alterar status da Cessão

Em andamento ...

## Baixar lastro da Cessão

O lastro corresponde a toda a documentação que envolve a Cessão, ou seja, todos os anexos presentes em cada uma das operações vinculadas à Cessão criada. Por meio dessa rota, você receberá uma pasta zipada identificada com o número/id da Cessão. Dentro dela, haverá uma pasta para cada operação, identificada pelo número/id da operação, contendo os arquivos correspondentes.

:::info Informativo

Você encontrará o identificador da Cessão (`operationCessionID`) na [resposta da criação da Cessão](#exemplo-de-resposta), destacada no código.

:::

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cessions/{operationCessionID}/ballast
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cessions/1451/ballast
```

#### Tipo de resposta:

```js
📁 application/zip
```

## Gerar e baixar arquivo CNAB da Cessão

Em andamento ...

## Baixar Termos de Cessão

Em andamento ...

## Documentos extras da Cessão

Em andamento ...

---

## Mapeamento de atributos

O processo de mapeamento de atributos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os atributos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo atributo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma cessão dentro do Titan.

#### Status da Cessão (`status`)

| Correspondência | Significado |
| ----- | ----- |
| SG | Em assinatura |
| PA | A pagar |
| FN | Finalizada |
| CA | Cancelada |

#### Identificador do tipo de encargo (`additionalChargeTypeID`)

| Correspondência | Significado |
| ----- | ----- |
| 1 | Encargos diversos |
| 2 | Encargos fixos |
| 3 | Gravame |
| 4 | Impostos |
| 5 | Outro |
| 6 | Seguro |

#### Tipo de valor (`valueType`) e Tipo de taxa (`taxType`)

| Correspondência | Significado |
| ----- | ----- |
| ABSOLUTE | Para usar número inteiro em Real ($) no campo `value` e `tax` |
| RELATIVE | Para usar percentual (%) no campo `valuePct` e `taxPct` |
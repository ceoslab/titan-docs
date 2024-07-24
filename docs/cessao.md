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

Os campos `tax` e `taxPct` não são obrigatórios, mas é necessário que pelo menos um deles seja informado. O campo `taxType` também não é obrigatório, pois, ao informar o `tax` ou `taxPct`, o Tipo de taxa já é automaticamente compreendido.

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

Todas as operações devem ter seus desembolsos informados e não podem estar em uma cessão em andamento ou concluída. Se uma parcela de qualquer operação tiver o status **"PAGO"**, a cessão não poderá ser criada.

:::

:::info Ações automáticas

Ao criar uma Cessão, são geradas **Contas a pagar** referentes aos desembolsos das operações e **Contas a receber** da Cessão, além dos [**Termos de cessão**](#termos-de-cessão) vinculados à cessionária.

:::

## Atualizar Cessão

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **atualização de uma cessão por meio da chave API**. Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

:::info Informativo

Para atualizar apenas o status de uma Cessão, utilize a rota de [**alteração de status da Cessão**](#alterar-status-da-cessão), enviando apenas um único atributo na sua requisição.

:::

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

#### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| [Status da Cessão](#status-da-cessão-status) | `status` | Sim | String | - |

#### Padrão de API

```js
PUT {{ _.base_url }}/api/operation-cessions/{operationCessionID}/status
```

#### Exemplo de rota

```js
PUT https://{empresa}.titan.ceoslab.app/api/operation-cessions/1451/status
```

#### Exemplo de requisição

```bash showLineNumbers
{
    "status": "FN"
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
	"id": 1451,
	"createdAt": "2024-07-22T14:25:50.640384Z",
	"updatedAt": "2024-07-22T14:25:50.687571Z",
	"createdByID": 2761,
	"updatedByID": 2761,
	"enabled": true,
	"cessionaryCompanyID": 751,
	"accountReceivableID": 1401,
	"totalCessionValue": 4400.00,
	"cessionDate": "2024-07-20",
	"cedingCommission": 1.200000000000,
	"status": "SG",
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
	"operations": [
		{
			"id": 8702,
			"createdAt": "2024-06-19T14:40:12.095854Z",
			"updatedAt": "2024-07-04T20:48:10.32002Z",
			"createdByID": 39201,
			"updatedByID": 2761,
			"enabled": true,
			"operationCode": 404,
			"workflowExecutionID": 16313,
			"lastDueDate": "2024-10-20",
			"acceptanceDate": "2024-06-19",
			"firstDueDate": "2024-06-20",
			"installmentQuantity": 5,
			"tfc": 40.00,
			"tfcPct": null,
			"monthlyInterestRate": 0.040000000000,
			"iofRate": 0.000082000000,
			"gracePeriod": 1,
			"monthlyTEC": 0.118341431126,
			"yearlyTEC": 2.827304127212,
			"requestedValue": 1000.00,
			"totalValue": 1243.80,
			"downPayment": 10.00,
			"totalDisbursementAmount": 1000.00,
			"creditLifeInsurancePct": 0.100000000000,
			"creditLifeInsurance": 100.00,
			"additionalInsuranceValue": 0.00,
			"financeIOF": true,
			"financeTFC": true,
			"financeCreditLifeInsurance": true,
			"financeAdditionalInsurance": false,
			"inPersonSale": false,
			"growthType": "EXPONENTIAL",
			"installmentFactor": 4.623846252784,
			"coefficient": 0.216270166725,
			"installmentValueWithoutIOF": 246.54,
			"installmentValueWithIOF": 248.76,
			"financedValue": 1150.22,
			"assetDescription": null,
			"paymentFrequencyID": 51,
			"paymentMethodID": 2,
			"productVariantID": 3502,
			"customerID": 3851,
			"operationStatusID": 23,
			"originatingCompanyID": 1551,
			"originatingCompanyType": "AO",
			"originatingCompany": {
				"id": 1551,
				"createdAt": "2023-10-09T12:44:35.427677Z",
				"updatedAt": "2024-07-19T12:53:23.8698Z",
				"createdByID": null,
				"updatedByID": 2761,
				"enabled": true,
				"documentNumber": "41000240000173",
				"legalName": "CEOS LAB TECNOLOGIA LTDA",
				"tradeName": "céos lab",
				"email": "titan@ceoslab.app",
				"mobilePhoneNumber": "5133401888",
				"landlinePhoneNumber": "4324343343",
				"description": null,
				"incorporationDate": "2021-02-25",
				"shareCapital": 5000.00,
				"earnings": null,
				"equity": 1000000.00,
				"monthlyAverageRevenue": 434345.35,
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
				"employeeCountRangeID": 3,
				"employeeCountRange": {
					"id": 3,
					"text": "25 a 50",
					"enabled": true,
					"lowerBound": 25,
					"upperBound": 50
				},
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
				"primaryActivityID": 51,
				"primaryActivity": {
					"id": 51,
					"code": 6202300,
					"description": "Desenvolvimento e licenciamento de programas de computador customizáveis"
				},
				"address": {
					"id": 1751,
					"createdAt": "2023-10-27T01:39:30.392476Z",
					"updatedAt": "2024-07-15T20:15:12.590836Z",
					"createdByID": 1,
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
					"line2": "",
					"houseNumber": "198",
					"neighborhood": "AUXILIADORA",
					"latitude": -30.020536,
					"longitude": -51.1924,
					"mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
					"companyID": 1551
				},
				"affiliatedCompany": {
					"id": 1802,
					"createdAt": "2024-07-03T17:52:49.201662Z",
					"updatedAt": "2024-07-16T14:01:54.042048Z",
					"createdByID": 2761,
					"updatedByID": 38051,
					"enabled": true,
					"payrollClosingDay": 23,
					"payrollPaymentDay": 15,
					"observation": null,
					"companyID": 1551,
					"gracePeriod": 0
				},
				"assignorCompany": null,
				"cessionaryCompany": null,
				"companyCorrespondentBank": null,
				"brokerageCompany": {
					"id": 201,
					"createdAt": "2024-06-13T17:17:38.273726Z",
					"updatedAt": "2024-07-04T19:29:21.809477Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173"
				},
				"insuranceCompany": {
					"id": 153,
					"createdAt": "2024-02-20T19:27:21.895943Z",
					"updatedAt": "2024-07-04T19:29:21.813692Z",
					"createdByID": 2761,
					"updatedByID": 38501,
					"enabled": true,
					"insuranceFee": null,
					"insuranceFeePct": 0.100000000000,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173",
					"insuranceFeeType": "RELATIVE",
					"companyID": 1551
				},
				"supplierCompany": {
					"id": 301,
					"createdAt": "2024-06-13T17:17:51.826537Z",
					"updatedAt": "2024-07-04T19:29:21.814687Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA"
				},
				"agencyOffice": null
			},
			"originatingBusinessCompanyID": 1551,
			"validOperationCessionID": 1451,
			"companyID": 1551,
			"companyType": "AO",
			"company": {
				"id": 1551,
				"createdAt": "2023-10-09T12:44:35.427677Z",
				"updatedAt": "2024-07-19T12:53:23.8698Z",
				"createdByID": null,
				"updatedByID": 2761,
				"enabled": true,
				"documentNumber": "41000240000173",
				"legalName": "CEOS LAB TECNOLOGIA LTDA",
				"tradeName": "céos lab",
				"email": "titan@ceoslab.app",
				"mobilePhoneNumber": "5133401888",
				"landlinePhoneNumber": "4324343343",
				"description": null,
				"incorporationDate": "2021-02-25",
				"shareCapital": 5000.00,
				"earnings": null,
				"equity": 1000000.00,
				"monthlyAverageRevenue": 434345.35,
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
				"employeeCountRangeID": 3,
				"employeeCountRange": {
					"id": 3,
					"text": "25 a 50",
					"enabled": true,
					"lowerBound": 25,
					"upperBound": 50
				},
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
				"primaryActivityID": 51,
				"primaryActivity": {
					"id": 51,
					"code": 6202300,
					"description": "Desenvolvimento e licenciamento de programas de computador customizáveis"
				},
				"address": {
					"id": 1751,
					"createdAt": "2023-10-27T01:39:30.392476Z",
					"updatedAt": "2024-07-15T20:15:12.590836Z",
					"createdByID": 1,
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
					"line2": "",
					"houseNumber": "198",
					"neighborhood": "AUXILIADORA",
					"latitude": -30.020536,
					"longitude": -51.1924,
					"mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
					"companyID": 1551
				},
				"affiliatedCompany": {
					"id": 1802,
					"createdAt": "2024-07-03T17:52:49.201662Z",
					"updatedAt": "2024-07-16T14:01:54.042048Z",
					"createdByID": 2761,
					"updatedByID": 38051,
					"enabled": true,
					"payrollClosingDay": 23,
					"payrollPaymentDay": 15,
					"observation": null,
					"companyID": 1551,
					"gracePeriod": 0
				},
				"assignorCompany": null,
				"cessionaryCompany": null,
				"companyCorrespondentBank": null,
				"brokerageCompany": {
					"id": 201,
					"createdAt": "2024-06-13T17:17:38.273726Z",
					"updatedAt": "2024-07-04T19:29:21.809477Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173"
				},
				"insuranceCompany": {
					"id": 153,
					"createdAt": "2024-02-20T19:27:21.895943Z",
					"updatedAt": "2024-07-04T19:29:21.813692Z",
					"createdByID": 2761,
					"updatedByID": 38501,
					"enabled": true,
					"insuranceFee": null,
					"insuranceFeePct": 0.100000000000,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173",
					"insuranceFeeType": "RELATIVE",
					"companyID": 1551
				},
				"supplierCompany": {
					"id": 301,
					"createdAt": "2024-06-13T17:17:51.826537Z",
					"updatedAt": "2024-07-04T19:29:21.814687Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA"
				},
				"agencyOffice": null
			},
			"operationStatus": {
				"id": 23,
				"createdAt": "2023-10-09T20:58:48.624582Z",
				"updatedAt": "2023-10-09T20:58:48.624587Z",
				"createdByID": null,
				"updatedByID": null,
				"enabled": true,
				"text": "PAGO",
				"code": "PAGO",
				"colorHex": "a8c74a33",
				"userChangeable": false,
				"userSettable": true,
				"enumCode": "PAD",
				"index": 18
			},
			"paymentConfigOption": null,
			"product": {
				"id": 3351,
				"createdAt": "2024-05-17T13:50:06.519068Z",
				"updatedAt": "2024-07-17T21:03:43.556987Z",
				"createdByID": 38501,
				"updatedByID": 39201,
				"enabled": true,
				"name": "PRODUTO DO MATHEUS",
				"description": "emprestimo\n",
				"consigned": false,
				"consignedType": null,
				"subtypeID": 16,
				"subtype": {
					"id": 16,
					"text": "CRÉDITO PESSOAL - COM CONSIGNAÇÃO EM FOLHA DE PAGAM.",
					"enabled": true,
					"code": 2,
					"typeID": 11
				},
				"workflowID": 9401,
				"typeID": 11,
				"type": {
					"id": 11,
					"text": "EMPRÉSTIMOS",
					"enabled": true,
					"code": 2,
					"enabledInScrNode": true
				}
			},
			"customer": {
				"id": 3851,
				"createdAt": "2024-06-07T14:26:50.345351Z",
				"updatedAt": "2024-07-09T13:11:34.576593Z",
				"createdByID": 38501,
				"updatedByID": 39201,
				"enabled": true,
				"customerType": "PERSON",
				"personID": 39102,
				"companyID": null,
				"person": {
					"id": 39102,
					"createdAt": "2024-06-07T14:26:50.299625Z",
					"updatedAt": "2024-07-09T13:11:34.570312Z",
					"createdByID": 38501,
					"updatedByID": 39201,
					"enabled": true,
					"email": "pessoateste@teste.com.br",
					"fullName": "PESSOA TESTE",
					"displayName": null,
					"documentNumber": "12345678900",
					"documentNumberAlt": null,
					"documentIssuingBody": null,
					"mobilePhoneNumber": "51999999999",
					"landlinePhoneNumber": null,
					"mothersFullName": "MAE TESTE",
					"fathersFullName": "PAI TESTE",
					"nationalityID": 1,
					"birthplaceLevel1AdminDivID": 22,
					"birthplaceLevel2AdminDivID": 4602,
					"birthdate": "1996-03-02",
					"civilStatusID": 4,
					"civilStatus": {
						"id": 4,
						"text": "SOLTEIRO(A)",
						"enabled": true
					},
					"educationLevelID": 1,
					"educationLevel": {
						"id": 1,
						"text": "SUPERIOR COMPLETO",
						"enabled": true
					},
					"sexID": 3,
					"sex": {
						"id": 3,
						"text": "FEMININO",
						"enabled": true
					},
					"netWorth": 5000.00,
					"provenIncome": null,
					"presumedIncomeCdl": null,
					"presumedIncomeCodeCdl": null,
					"declaredIncome": 8000.00,
					"authRoleID": null,
					"authRole": null,
					"hasAuth": false
				},
				"company": null
			},
			"member": true,
			"yearlyInterestRate": 0.601032218567680790102016
		}
	],
	"operationCessionAdditionalCharges": [
		{
			"id": 1051,
			"createdAt": "2024-07-22T14:25:50.65183Z",
			"updatedAt": "2024-07-22T14:25:50.651834Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"operationCessionID": 1451,
			"operationID": 8702,
			"additionalChargeTypeID": 1,
			"additionalChargeType": {
				"id": 1,
				"text": "Encargos diversos",
				"enabled": true
			},
			"name": "ATTA PJ",
			"value": 1000.00,
			"valuePct": null,
			"valueType": "ABSOLUTE"
		},
		{
			"id": 1052,
			"createdAt": "2024-07-22T14:25:50.656708Z",
			"updatedAt": "2024-07-22T14:25:50.656711Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"operationCessionID": 1451,
			"operationID": 8702,
			"additionalChargeTypeID": 3,
			"additionalChargeType": {
				"id": 3,
				"text": "Gravame",
				"enabled": true
			},
			"name": "CEO",
			"value": null,
			"valuePct": 0.100000000000,
			"valueType": "RELATIVE"
		}
	],
	"operationCessionAdditionalTaxes": [
		{
			"id": 1200,
			"operationCessionID": 1451,
			"name": "ATTA PJ",
			"taxPct": null,
			"tax": 1000.00,
			"taxType": "ABSOLUTE"
		},
		{
			"id": 1201,
			"operationCessionID": 1451,
			"name": "TESTE",
			"taxPct": 0.100000000000,
			"tax": null,
			"taxType": "RELATIVE"
		}
	]
}
```

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

#### Tipo de resposta

```js
📁 application/zip
```

## Arquivo(s) CNAB(s) da Cessão

O arquivo CNAB, no contexto de Cessão de crédito, tem como objetivo centralizar em um único documento as informações de desembolso que deverão ser pagas pela Cessionária que assumirá a dívida. Assim, ao gerar o(s) arquivo(s), a instituição se responsabiliza por encaminhá-lo à Cessionária para a realização do pagamento da remessa.

:::warning Atenção

Cada operação vinculada à Cessão possui seu próprio arquivo CNAB. Portanto, ao acionar a rota para geração, todos os arquivos correspondentes às operações serão gerados.

:::

### Gerar arquivo(s)

#### Padrão de API

```js
POST {{ _.base_url }}/api/operation-cessions/{operationCessionID}/generate-cnab
```

#### Exemplo de rota

```js
POST https://{empresa}.titan.ceoslab.app/api/operation-cessions/1451/generate-cnab
```

#### Exemplo de resposta

```bash showLineNumbers
[
    {
        "id": 901,
        "createdAt": null,
        "updatedAt": null,
        "createdByID": 2761,
        "updatedByID": 2761,
        "enabled": true,
        "attachmentID": 14404,
        "attachment": null,
        "visible": null,
        "operationCessionID": 1451,
        "operationID": 8702
    }
]
```

### Visualizar arquivo(s)

Para baixar o arquivo necessário, primeiro será preciso listar os documentos associados à Cessão e extrair o identificador gerado. Com o identificador em mãos, você poderá chamar a [rota de download](#baixar-arquivos).

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-cnab-attachments?filters[operationCessionID][$eq]={operationCessionID}
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-cnab-attachments?filters[operationCessionID][$eq]=1451
```

#### Exemplo de resposta

```bash showLineNumbers
[
    {
        # highlight-next-line
        "id": 452,
        "createdAt": "2024-05-08T18:29:42.262046Z",
        "updatedAt": "2024-05-08T18:29:42.262055Z",
        "createdByID": 2766,
        "updatedByID": 2766,
        "enabled": true,
        "attachmentID": 10560,
        "attachment": {
            "id": 10560,
            "createdAt": "2024-05-08T18:29:42.251176Z",
            "updatedAt": "2024-05-08T18:29:42.251181Z",
            "createdByID": 2766,
            "updatedByID": 2766,
            "enabled": true,
            "dueDate": null,
            "uid": "1715192982-945f2733-602d-4cb3-843e-7c7ab7dc7f05",
            "filename": "CB080501.REM",
            "size": 16909,
            "mimeType": "text/plain",
            "attachmentTypeID": null,
            "attachmentType": null,
            "visible": true,
            "sha256sum": "d940e4d25acc290928224761dc3c84f5fe16cf7a7b0b7b4f9a831782d8d76e7f"
        },
        "visible": null,
        "operationCessionID": 1451,
        "operationID": 8702
    }
]
```

### Baixar arquivo(s)

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-cnab-attachments/{operationCessionCnabAttachmentID}/download
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-cnab-attachments/452/download
```

#### Tipo de resposta

```js
📄 text/plain
```

:::info Baixar arquivos em massa

No exemplo acima, há apenas um arquivo CNAB para download. No entanto, se você tiver mais de uma operação associada à Cessão, é possível informar todos os identificadores (`operationCessionCnabAttachmentID`) na rota de download em massa, conforme o exemplo abaixo:

**Padrão de API**

```js
GET {{ _.base_url }}/api/operation-cession-cnab-attachments/bulk/download?attachmentIDs={operationCessionCnabAttachmentID}&attachmentIDs={operationCessionCnabAttachmentID}
```

**Exemplo de rota**

```js
GET {{ _.base_url }}/api/operation-cession-cnab-attachments/bulk/download?attachmentIDs=452&attachmentIDs=453
```

#### Tipo de resposta

```js
📁 application/zip
```

:::

## Termo(s) de Cessão

O Termo de Cessão consiste em um ou mais documentos gerados automaticamente de forma dinâmica, com o objetivo principal de documentar todos os detalhes da Cessão para que sejam enviados para assinatura à Cessionária. No cadastro das Cessionárias, há uma aba chamada **Termo de cessão** onde você pode vincular os documentos que serão gerados ao criar uma Cessão.

Lembre-se de que esses documentos dinâmicos são criados no menu **Configurações > Templates de contratos**.

### Visualizar arquivo(s)

Para baixar o arquivo necessário, primeiro será preciso listar os documentos associados à Cessão e extrair o identificador gerado. Com o identificador em mãos, você poderá chamar a [rota de download](#baixar-arquivos-1).

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-agreement-attachments?filters[operationCessionID][$eq]={operationCessionID}
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-agreement-attachments?filters[operationCessionID][$eq]=1451
```

#### Exemplo de resposta

```bash showLineNumbers
[
    {
        # highlight-next-line
        "id": 857,
        "createdAt": "2024-05-08T18:31:44.458913Z",
        "updatedAt": "2024-05-08T18:31:44.458918Z",
        "createdByID": 2766,
        "updatedByID": 2766,
        "enabled": true,
        "attachmentID": 10561,
        "attachment": {
            "id": 10561,
            "createdAt": "2024-05-08T18:31:44.457462Z",
            "updatedAt": "2024-05-08T18:31:44.457467Z",
            "createdByID": 2766,
            "updatedByID": 2766,
            "enabled": true,
            "dueDate": null,
            "uid": "1715193104-f3eff804-22ce-4cb3-abd4-df93eff258f9",
            "filename": "TERMO DE CESSAO.pdf",
            "size": 83637,
            "mimeType": "application/pdf",
            "attachmentTypeID": null,
            "attachmentType": null,
            "visible": true,
            "sha256sum": "1b009d9ef0045a086d9d25760bd7d03cc9da00391b032a04f234706cca1a0d0b"
        },
        "visible": null,
        "operationCessionID": 1451
    }
]
```

### Baixar arquivo(s)

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-agreement-attachments/{operationCessionAgreementAttachmentID}/download
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-agreement-attachments/857/download
```

#### Tipo de resposta

```js
📄 application/pdf
```

:::info Baixar arquivos em massa

No exemplo acima, há apenas um Termo de Cessão para download. No entanto, se você tiver mais documentos associados à Cessão, é possível informar todos os identificadores (`operationCessionAgreementAttachmentID`) na rota de download em massa, conforme o exemplo abaixo:

**Padrão de API**

```js
GET {{ _.base_url }}/api/operation-cession-agreement-attachments/bulk/download?attachmentIDs={operationCessionAgreementAttachmentID}&attachmentIDs={operationCessionAgreementAttachmentID}
```

**Exemplo de rota**

```js
GET {{ _.base_url }}/api/operation-cession-agreement-attachments/bulk/download?attachmentIDs=857&attachmentIDs=858
```

#### Tipo de resposta

```js
📁 application/zip
```

:::

## Documentos extras da Cessão

A rota de documentos extras tem como objetivo controlar documentos que possam ser associados à Cessão, mas que não são gerados automaticamente como os anteriores. Isso pode incluir casos como comprovantes de pagamento, a devolução do Termo de Cessão assinado e quaisquer outros documentos necessários.

### Anexar arquivo(s)

#### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Arquivo | `file` | Sim | Binary | - |
| [Identificador da categoria do arquivo](#categoria-do-arquivo-attachmenttypeid) | `attachmentTypeID` | Sim | Number | - |
| Data de vencimento | `dueDate` | Não | Date | - |

#### Padrão de API

```js
POST {{ _.base_url }}/api/operation-cession-attachments/{operationCessionID}/upload
```

#### Exemplo de rota

```js
POST https://{empresa}.titan.ceoslab.app/api/operation-cession-attachments/1451/upload
```

##### ```Header```:

```bash showLineNumbers
{
    "Content-Type": "multipart/form-data;",
    "Titan-Api-Key": "{Sua chave API}"
}
```

##### ```Body```:

```bash showLineNumbers
{
    "file": "FILE(form-data)",
    "attachmentTypeID": 18,
    "dueDate": "2025-01-01",
    "visible": true
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
    "id": 860,
    "createdAt": "2024-05-08T18:31:44.458913Z",
    "updatedAt": "2024-05-08T18:31:44.458918Z",
    "createdByID": 2766,
    "createdByID": 2766,
    "enabled": true,
    "dueDate": "2025-01-01",
    "uid": "1708533315-8fb31656-7b91-42b8-93b4-48e869251f83",
    "filename": "Comprovante-pagamento.jpeg",
    "size": 262009,
    "mimeType": "image/jpeg",
    "attachmentTypeID": 18,
    "attachmentType": null,
    "visible": true,
    "sha256sum": "ee8d0b3fe537830ae4665824fb35d11944d7a937ecc0d5b16a3d2d4b8c0765f8"
}
```

### Visualizar arquivo(s)

Para baixar o arquivo necessário, primeiro será preciso listar os documentos associados à Cessão e extrair o identificador gerado. Com o identificador em mãos, você poderá chamar a [rota de download](#baixar-arquivos-2).

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-attachments?filters[operationCessionID][$eq]={operationCessionID}
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-attachments?filters[operationCessionID][$eq]=1451
```

#### Exemplo de resposta

```bash showLineNumbers
[
    {
        # highlight-next-line
        "id": 859,
        "createdAt": "2024-05-08T18:31:44.458913Z",
        "updatedAt": "2024-05-08T18:31:44.458918Z",
        "createdByID": 2766,
        "updatedByID": 2766,
        "enabled": true,
        "attachmentID": 10561,
        "attachment": {
            "id": 10561,
            "createdAt": "2024-05-08T18:31:44.457462Z",
            "updatedAt": "2024-05-08T18:31:44.457467Z",
            "createdByID": 2766,
            "updatedByID": 2766,
            "enabled": true,
            "dueDate": null,
            "uid": "1715193104-f3eff804-22ce-4cb3-abd4-df93eff258f9",
            "filename": "TERMO DE CESSAO-ASSINADO.pdf",
            "size": 83637,
            "mimeType": "application/pdf",
            "attachmentTypeID": null,
            "attachmentType": null,
            "visible": true,
            "sha256sum": "1b009d9ef0045a086d9d25760bd7d03cc9da00391b032a04f234706cca1a0d0b"
        },
        "visible": null,
        "operationCessionID": 1451
    }
]
```

### Baixar arquivo(s)

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cession-attachments/{operationCessionAttachmentID}/download
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cession-attachments/859/download
```

#### Tipo de resposta

```js
📄 application/pdf
```

:::info Baixar arquivos em massa

No exemplo acima, há apenas um arquivo para download. No entanto, se você tiver mais documentos associados à Cessão, é possível informar todos os identificadores (`operationCessionAttachmentID`) na rota de download em massa, conforme o exemplo abaixo:

**Padrão de API**

```js
GET {{ _.base_url }}/api/operation-cession-attachments/bulk/download?attachmentIDs={operationCessionAttachmentID}&attachmentIDs={operationCessionAttachmentID}
```

**Exemplo de rota**

```js
GET {{ _.base_url }}/api/operation-cession-attachments/bulk/download?attachmentIDs=859&attachmentIDs=860
```

#### Tipo de resposta

```js
📁 application/zip
```

:::

## Visualizar Cessão

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-cessions/{operationCessionID}/operations
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-cessions/1451/operations
```

#### Exemplo de resposta

```bash showLineNumbers
{
	"id": 1451,
	"createdAt": "2024-07-22T14:25:50.640384Z",
	"updatedAt": "2024-07-22T14:25:50.687571Z",
	"createdByID": 2761,
	"updatedByID": 2761,
	"enabled": true,
	"cessionaryCompanyID": 751,
	"accountReceivableID": 1401,
	"totalCessionValue": 4400.00,
	"cessionDate": "2024-07-20",
	"cedingCommission": 1.200000000000,
	"status": "SG",
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
	"operations": [
		{
			"id": 8702,
			"createdAt": "2024-06-19T14:40:12.095854Z",
			"updatedAt": "2024-07-04T20:48:10.32002Z",
			"createdByID": 39201,
			"updatedByID": 2761,
			"enabled": true,
			"operationCode": 404,
			"workflowExecutionID": 16313,
			"lastDueDate": "2024-10-20",
			"acceptanceDate": "2024-06-19",
			"firstDueDate": "2024-06-20",
			"installmentQuantity": 5,
			"tfc": 40.00,
			"tfcPct": null,
			"monthlyInterestRate": 0.040000000000,
			"iofRate": 0.000082000000,
			"gracePeriod": 1,
			"monthlyTEC": 0.118341431126,
			"yearlyTEC": 2.827304127212,
			"requestedValue": 1000.00,
			"totalValue": 1243.80,
			"downPayment": 10.00,
			"totalDisbursementAmount": 1000.00,
			"creditLifeInsurancePct": 0.100000000000,
			"creditLifeInsurance": 100.00,
			"additionalInsuranceValue": 0.00,
			"financeIOF": true,
			"financeTFC": true,
			"financeCreditLifeInsurance": true,
			"financeAdditionalInsurance": false,
			"inPersonSale": false,
			"growthType": "EXPONENTIAL",
			"installmentFactor": 4.623846252784,
			"coefficient": 0.216270166725,
			"installmentValueWithoutIOF": 246.54,
			"installmentValueWithIOF": 248.76,
			"financedValue": 1150.22,
			"assetDescription": null,
			"paymentFrequencyID": 51,
			"paymentMethodID": 2,
			"productVariantID": 3502,
			"customerID": 3851,
			"operationStatusID": 23,
			"originatingCompanyID": 1551,
			"originatingCompanyType": "AO",
			"originatingCompany": {
				"id": 1551,
				"createdAt": "2023-10-09T12:44:35.427677Z",
				"updatedAt": "2024-07-19T12:53:23.8698Z",
				"createdByID": null,
				"updatedByID": 2761,
				"enabled": true,
				"documentNumber": "41000240000173",
				"legalName": "CEOS LAB TECNOLOGIA LTDA",
				"tradeName": "céos lab",
				"email": "titan@ceoslab.app",
				"mobilePhoneNumber": "5133401888",
				"landlinePhoneNumber": "4324343343",
				"description": null,
				"incorporationDate": "2021-02-25",
				"shareCapital": 5000.00,
				"earnings": null,
				"equity": 1000000.00,
				"monthlyAverageRevenue": 434345.35,
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
				"employeeCountRangeID": 3,
				"employeeCountRange": {
					"id": 3,
					"text": "25 a 50",
					"enabled": true,
					"lowerBound": 25,
					"upperBound": 50
				},
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
				"primaryActivityID": 51,
				"primaryActivity": {
					"id": 51,
					"code": 6202300,
					"description": "Desenvolvimento e licenciamento de programas de computador customizáveis"
				},
				"address": {
					"id": 1751,
					"createdAt": "2023-10-27T01:39:30.392476Z",
					"updatedAt": "2024-07-15T20:15:12.590836Z",
					"createdByID": 1,
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
					"line2": "",
					"houseNumber": "198",
					"neighborhood": "AUXILIADORA",
					"latitude": -30.020536,
					"longitude": -51.1924,
					"mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
					"companyID": 1551
				},
				"affiliatedCompany": {
					"id": 1802,
					"createdAt": "2024-07-03T17:52:49.201662Z",
					"updatedAt": "2024-07-16T14:01:54.042048Z",
					"createdByID": 2761,
					"updatedByID": 38051,
					"enabled": true,
					"payrollClosingDay": 23,
					"payrollPaymentDay": 15,
					"observation": null,
					"companyID": 1551,
					"gracePeriod": 0
				},
				"assignorCompany": null,
				"cessionaryCompany": null,
				"companyCorrespondentBank": null,
				"brokerageCompany": {
					"id": 201,
					"createdAt": "2024-06-13T17:17:38.273726Z",
					"updatedAt": "2024-07-04T19:29:21.809477Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173"
				},
				"insuranceCompany": {
					"id": 153,
					"createdAt": "2024-02-20T19:27:21.895943Z",
					"updatedAt": "2024-07-04T19:29:21.813692Z",
					"createdByID": 2761,
					"updatedByID": 38501,
					"enabled": true,
					"insuranceFee": null,
					"insuranceFeePct": 0.100000000000,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173",
					"insuranceFeeType": "RELATIVE",
					"companyID": 1551
				},
				"supplierCompany": {
					"id": 301,
					"createdAt": "2024-06-13T17:17:51.826537Z",
					"updatedAt": "2024-07-04T19:29:21.814687Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA"
				},
				"agencyOffice": null
			},
			"originatingBusinessCompanyID": 1551,
			"validOperationCessionID": 1451,
			"companyID": 1551,
			"companyType": "AO",
			"company": {
				"id": 1551,
				"createdAt": "2023-10-09T12:44:35.427677Z",
				"updatedAt": "2024-07-19T12:53:23.8698Z",
				"createdByID": null,
				"updatedByID": 2761,
				"enabled": true,
				"documentNumber": "41000240000173",
				"legalName": "CEOS LAB TECNOLOGIA LTDA",
				"tradeName": "céos lab",
				"email": "titan@ceoslab.app",
				"mobilePhoneNumber": "5133401888",
				"landlinePhoneNumber": "4324343343",
				"description": null,
				"incorporationDate": "2021-02-25",
				"shareCapital": 5000.00,
				"earnings": null,
				"equity": 1000000.00,
				"monthlyAverageRevenue": 434345.35,
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
				"employeeCountRangeID": 3,
				"employeeCountRange": {
					"id": 3,
					"text": "25 a 50",
					"enabled": true,
					"lowerBound": 25,
					"upperBound": 50
				},
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
				"primaryActivityID": 51,
				"primaryActivity": {
					"id": 51,
					"code": 6202300,
					"description": "Desenvolvimento e licenciamento de programas de computador customizáveis"
				},
				"address": {
					"id": 1751,
					"createdAt": "2023-10-27T01:39:30.392476Z",
					"updatedAt": "2024-07-15T20:15:12.590836Z",
					"createdByID": 1,
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
					"line2": "",
					"houseNumber": "198",
					"neighborhood": "AUXILIADORA",
					"latitude": -30.020536,
					"longitude": -51.1924,
					"mapUrl": "https://maps.app.goo.gl/bVQMRXUqicGpmVmW7",
					"companyID": 1551
				},
				"affiliatedCompany": {
					"id": 1802,
					"createdAt": "2024-07-03T17:52:49.201662Z",
					"updatedAt": "2024-07-16T14:01:54.042048Z",
					"createdByID": 2761,
					"updatedByID": 38051,
					"enabled": true,
					"payrollClosingDay": 23,
					"payrollPaymentDay": 15,
					"observation": null,
					"companyID": 1551,
					"gracePeriod": 0
				},
				"assignorCompany": null,
				"cessionaryCompany": null,
				"companyCorrespondentBank": null,
				"brokerageCompany": {
					"id": 201,
					"createdAt": "2024-06-13T17:17:38.273726Z",
					"updatedAt": "2024-07-04T19:29:21.809477Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173"
				},
				"insuranceCompany": {
					"id": 153,
					"createdAt": "2024-02-20T19:27:21.895943Z",
					"updatedAt": "2024-07-04T19:29:21.813692Z",
					"createdByID": 2761,
					"updatedByID": 38501,
					"enabled": true,
					"insuranceFee": null,
					"insuranceFeePct": 0.100000000000,
					"legalName": "CEOS LAB TECNOLOGIA LTDA",
					"documentNumber": "41000240000173",
					"insuranceFeeType": "RELATIVE",
					"companyID": 1551
				},
				"supplierCompany": {
					"id": 301,
					"createdAt": "2024-06-13T17:17:51.826537Z",
					"updatedAt": "2024-07-04T19:29:21.814687Z",
					"createdByID": 3254,
					"updatedByID": 38501,
					"enabled": true,
					"companyID": 1551,
					"legalName": "CEOS LAB TECNOLOGIA LTDA"
				},
				"agencyOffice": null
			},
			"operationStatus": {
				"id": 23,
				"createdAt": "2023-10-09T20:58:48.624582Z",
				"updatedAt": "2023-10-09T20:58:48.624587Z",
				"createdByID": null,
				"updatedByID": null,
				"enabled": true,
				"text": "PAGO",
				"code": "PAGO",
				"colorHex": "a8c74a33",
				"userChangeable": false,
				"userSettable": true,
				"enumCode": "PAD",
				"index": 18
			},
			"paymentConfigOption": null,
			"product": {
				"id": 3351,
				"createdAt": "2024-05-17T13:50:06.519068Z",
				"updatedAt": "2024-07-17T21:03:43.556987Z",
				"createdByID": 38501,
				"updatedByID": 39201,
				"enabled": true,
				"name": "PRODUTO DO MATHEUS",
				"description": "emprestimo\n",
				"consigned": false,
				"consignedType": null,
				"subtypeID": 16,
				"subtype": {
					"id": 16,
					"text": "CRÉDITO PESSOAL - COM CONSIGNAÇÃO EM FOLHA DE PAGAM.",
					"enabled": true,
					"code": 2,
					"typeID": 11
				},
				"workflowID": 9401,
				"typeID": 11,
				"type": {
					"id": 11,
					"text": "EMPRÉSTIMOS",
					"enabled": true,
					"code": 2,
					"enabledInScrNode": true
				}
			},
			"customer": {
				"id": 3851,
				"createdAt": "2024-06-07T14:26:50.345351Z",
				"updatedAt": "2024-07-09T13:11:34.576593Z",
				"createdByID": 38501,
				"updatedByID": 39201,
				"enabled": true,
				"customerType": "PERSON",
				"personID": 39102,
				"companyID": null,
				"person": {
					"id": 39102,
					"createdAt": "2024-06-07T14:26:50.299625Z",
					"updatedAt": "2024-07-09T13:11:34.570312Z",
					"createdByID": 38501,
					"updatedByID": 39201,
					"enabled": true,
					"email": "pessoateste@teste.com.br",
					"fullName": "PESSOA TESTE",
					"displayName": null,
					"documentNumber": "12345678900",
					"documentNumberAlt": null,
					"documentIssuingBody": null,
					"mobilePhoneNumber": "51999999999",
					"landlinePhoneNumber": null,
					"mothersFullName": "MAE TESTE",
					"fathersFullName": "PAI TESTE",
					"nationalityID": 1,
					"birthplaceLevel1AdminDivID": 22,
					"birthplaceLevel2AdminDivID": 4602,
					"birthdate": "1996-03-02",
					"civilStatusID": 4,
					"civilStatus": {
						"id": 4,
						"text": "SOLTEIRO(A)",
						"enabled": true
					},
					"educationLevelID": 1,
					"educationLevel": {
						"id": 1,
						"text": "SUPERIOR COMPLETO",
						"enabled": true
					},
					"sexID": 3,
					"sex": {
						"id": 3,
						"text": "FEMININO",
						"enabled": true
					},
					"netWorth": 5000.00,
					"provenIncome": null,
					"presumedIncomeCdl": null,
					"presumedIncomeCodeCdl": null,
					"declaredIncome": 8000.00,
					"authRoleID": null,
					"authRole": null,
					"hasAuth": false
				},
				"company": null
			},
			"member": true,
			"yearlyInterestRate": 0.601032218567680790102016
		}
	],
	"operationCessionAdditionalCharges": [
		{
			"id": 1051,
			"createdAt": "2024-07-22T14:25:50.65183Z",
			"updatedAt": "2024-07-22T14:25:50.651834Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"operationCessionID": 1451,
			"operationID": 8702,
			"additionalChargeTypeID": 1,
			"additionalChargeType": {
				"id": 1,
				"text": "Encargos diversos",
				"enabled": true
			},
			"name": "ATTA PJ",
			"value": 1000.00,
			"valuePct": null,
			"valueType": "ABSOLUTE"
		},
		{
			"id": 1052,
			"createdAt": "2024-07-22T14:25:50.656708Z",
			"updatedAt": "2024-07-22T14:25:50.656711Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"operationCessionID": 1451,
			"operationID": 8702,
			"additionalChargeTypeID": 3,
			"additionalChargeType": {
				"id": 3,
				"text": "Gravame",
				"enabled": true
			},
			"name": "CEO",
			"value": null,
			"valuePct": 0.100000000000,
			"valueType": "RELATIVE"
		}
	],
	"operationCessionAdditionalTaxes": [
		{
			"id": 1200,
			"operationCessionID": 1451,
			"name": "ATTA PJ",
			"taxPct": null,
			"tax": 1000.00,
			"taxType": "ABSOLUTE"
		},
		{
			"id": 1201,
			"operationCessionID": 1451,
			"name": "TESTE",
			"taxPct": 0.100000000000,
			"tax": null,
			"taxType": "RELATIVE"
		}
	]
}
```

---

## Mapeamento de atributos

O processo de mapeamento de atributos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os atributos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo atributo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma cessão dentro do Titan.


<!--
#### Identificador da Cessionária (`cessionaryCompanyID`)

A

#### Identificador da operação (`operationIDs`)

A
-->

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
| ABSOLUTE | Para usar número inteiro em Real ($) nos campos `value` e `tax` |
| RELATIVE | Para usar percentual (%) nos campos `valuePct` e `taxPct` |

#### Categoria do arquivo (```attachmentTypeID```):

Padrão de API:

```js
GET {{ _.base_url }}/api/attachment-types/list
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/attachment-types/list
```

Exemplo de resposta:

```bash showLineNumbers
[
    {
        "id": 1,
        "text": "EXTRATO BANCÁRIO",
        "enabled": true
    },
    {
        "id": 2,
        "text": "SELFIE COM DOCUMENTO",
        "enabled": true
    },
    {
        "id": 18,
        "text": "OUTRO",
        "enabled": true
    },
    ...
]
```
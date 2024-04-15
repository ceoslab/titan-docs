---
sidebar_position: 2
---

# 🚩 Criação

No contexto do Titan CaaS, a **criação de operação** representa o ponto de partida para a originação de solicitações de crédito, empréstimos e outras transações financeiras.

Essa funcionalidade permite que as instituições financeiras iniciem e personalizem cada operação de maneira singular, estabelecendo parâmetros específicos e requisitos detalhados para o processo em questão.

Ao utilizar a criação de operação, as organizações podem adaptar estrategicamente as operações às necessidades variáveis, garantindo uma análise de crédito precisa e eficiente. Esse recurso no Titan CaaS não apenas simplifica o início de novas operações de crédito, mas também proporciona flexibilidade crucial para ajustar dinamicamente as operações em resposta às mudanças no ambiente financeiro.

:::info Documentos

Para inclusão de documentos em uma operação, consulte a página [Documentos](/operacao/documentos).

:::

## Operação

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **criação de uma operação por meio da chave API**. Esteja atento à especificação dos objetos, distinguindo entre [**pessoa física**](#cliente-pessoa-física) e [**pessoa jurídica**](#cliente-pessoa-jurídica).

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

Em nossa API `operations` temos duas formas de uma operação ser criada:

1. #### `calculate/create`: [Utilizando o motor de crédito do Titan](#1-utilizando-o-motor-de-crédito-do-titan-calculatecreate)

```js
POST {{ _.base_url }}/api/operations/calculate/create
```

2. #### `create`: [Calculando externamente](#2-calculando-externamente-create)

```js
POST {{ _.base_url }}/api/operations/create
```

---

### 1. Utilizando o motor de crédito do Titan (`calculate/create`)

Neste formato inicial, você envia uma solicitação enxuta ao motor de cálculo do Titan, que retorna um conjunto abrangente de informações relacionadas aos dados da operação criada.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

:::warning Faça uma simulação prévia

**Certifique-se de realizar uma simulação prévia** para evitar erros durante a criação da operação. [Você pode simular uma operação aqui](simulacao.md).

:::

#### `calculate/create`: Parâmetros de envio

| Atributo                                                                                | Correspondência              | Obrigatoriedade | Tipo de dado | Valor padrão  |
| --------------------------------------------------------------------------------------- | ---------------------------- | --------------- | ------------ | ------------- |
| Data do aceite                                                                          | `acceptanceDate`             | Sim             | Date         | -             |
| Data do primeiro vencimento                                                             | `firstDueDate`               | Sim             | Date         | -             |
| Quantidade de parcelas                                                                  | `installmentQuantity`        | Sim             | Number       | -             |
| Valor solicitado                                                                        | `requestedValue`             | Sim             | Number       | -             |
| Entrada                                                                                 | `downPayment`                | Sim             | Number       | -             |
| Financiar IOF                                                                           | `financeIOF`                 | Sim             | Boolean      | `true`        |
| Financiar TFC                                                                           | `financeTFC`                 | Sim             | Boolean      | `true`        |
| Financiar seguro prestamista                                                            | `financeCreditLifeInsurance` | Sim             | Boolean      | `true`        |
| Financiar seguro adicional                                                              | `financeAdditionalInsurance` | Sim             | Boolean      | `true`        |
| Venda presencial                                                                        | `inPersonSale`               | Não             | Boolean      | `false`       |
| [Capitalização de taxa](#capitalização-de-taxa-growthtype)                              | `growthType`                 | Sim             | String       | `EXPONENTIAL` |
| Descrição do bem                                                                        | `assetDescription`           | Não             | String       | -             |
| [Identificador da frequência de pagamento](#frequência-de-pagamento-paymentfrequencyid) | `paymentFrequencyID`         | Sim             | Number       | -             |
| [Identificador do tipo de pagamento](#tipo-de-pagamento-paymenttypeid)                  | `paymentTypeID`              | Sim             | Number       | -             |
| [Identificador do produto](#produto-productid)                                          | `productID`                  | Sim             | Number       | -             |
| [Identificador do status da operação](#status-da-operação-operationstatusid)            | `operationStatusID`          | Sim             | Number       | -             |
| Identificador da empresa                                                                | `companyID`                  | Sim             | Number       | -             |
| [Tipo de empresa](#tipo-de-empresa-companytype)                                         | `companyType`                | Sim             | String       | `MN`          |
| [Cliente](#cliente-pessoa-física)                                                       | `customer`                   | Sim             | Object       | -             |
| [Avalistas](#avalistas)                                                                 | `guarantors`                 | Não             | Array        | -             |
| [Garantias](#garantias)                                                                 | `collaterals`                | Não             | Array        | -             |

#### `calculate/create`: Exemplo de rota:

```js
POST https://{empresa}.titan.ceoslab.app/api/operations/calculate/create
```

#### `calculate/create`: Exemplo de requisição

```bash showLineNumbers
{
	"acceptanceDate": "2024-01-22",
	"firstDueDate": "2024-01-23",
	"installmentQuantity": 18,
	"requestedValue": 20000.0,
	"downPayment": 0.00,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"assetDescription": "Bem Teste",
	"paymentFrequencyID": 51,
	"paymentTypeID": 1,
	"productID": 1401,
	"operationStatusID": 552,
	"companyID": 1551,
	"companyType": "MN",
	"customer": {
		...,
	},
	"guarantors": [
		{
			...
		},
	],
	"collaterals": [
		{
			...
		},
	]
}
```

#### `calculate/create`: Exemplo de resposta

```bash showLineNumbers
{
# highlight-next-line
	"id": 5651,
	"createdAt": "2024-01-22T20:45:44.179683Z",
	"updatedAt": "2024-01-22T20:45:44.179688Z",
	"createdByID": 2760,
	"updatedByID": 2760,
	"enabled": true,
	"operationCode": 262,
	"workflowExecutionID": 10552,
	"acceptanceDate": "2024-01-22",
	"firstDueDate": "2024-01-23",
	"lastDueDate": "2025-07-23",
	"installmentQuantity": 18,
	"tfc": 400.0,
	"tfcPct": null,
	"monthlyInterestRate": 0.05,
	"iofRate": 0.000041,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 298.72,
	"financedIOFValue": 303.0,
	"gracePeriod": 1,
	"monthlyTEC": 0.060165796732,
	"yearlyTEC": 1.01597650294,
	"disbursementAmount": 20000.0,
	"totalDisbursementAmount": 20000.0,
	"requestedValue": 20000.0,
	"totalValue": 31641.83,
	"downPayment": 0.0,
	"creditLifeInsurancePct": 0.0366,
	"creditLifeInsurance": 732,
	"additionalInsuranceValue": 0.0,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"installmentFactor": 12.193669437642,
	"coefficient": 0.082009767865,
	"installmentValueWithoutIOF": 1733.03,
	"installmentValueWithIOF": 1757.88,
	"financedValue": 21435.0,
	"assetDescription": "Bem Teste",
	"paymentFrequencyID": 51,
	"paymentFrequency": {
		...
	},
	"paymentTypeID": 1,
		...
	},
	"productVariantID": 1402,
	"productID": 1401,
	"customerID": 2851,
	"operationStatusID": 552,
	"operationStatus": {
		...
	},
	"originatingCompanyID": 1551,
	"originatingCompanyType": "MN",
	"companyID": 1551,
	"companyType": "MN",
	"productVariant": {
		...
	},
	"product": {
		...
	},
	"customer": {
		...
	},
	"agencyOffice": null,
	"customerAttachments": null,
	"guarantors": [
		...
	],
	"committeeMembers": [],
	"collaterals": [
		...
	],
	"assessments": [],
	"operationDisbursements": [],
	"installments": [
		...
	],
	"operationSignatures": [],
	"operationMembers": [
		...
	],
	"conversationID": 3851,
	"yearlyInterestRate": 0.795856326022129150390625,
	"operationAttachmentIDs": [1201, 1202]
}
```

:::info Atributos importantes na resposta da requisição

Não se esqueça de anotar o **identificador** (em destaque) da resposta desta requisição. Você vai precisar do `operationID` para [adicionar documentação](documentos.md) relacionada a essa operação.

:::

### 2. Calculando externamente (`create`)

Neste segundo formato, o resultado do cálculo da operação **não é processado pelo motor de cálculo do Titan**, transferindo a responsabilidade pelas informações fornecidas para quem envia a requisição.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

#### `create`: Parâmetros de envio

| Atributo                                                                                | Correspondência              | Obrigatoriedade | Tipo de dado | Valor padrão  |
| --------------------------------------------------------------------------------------- | ---------------------------- | --------------- | ------------ | ------------- |
| Data do aceite                                                                          | `acceptanceDate`             | Sim             | Date         | -             |
| Data do primeiro vencimento                                                             | `firstDueDate`               | Sim             | Date         | -             |
| Data do último vencimento                                                               | `lastDueDate`                | Sim             | Date         | -             |
| Quantidade de parcelas                                                                  | `installmentQuantity`        | Sim             | Number       | -             |
| Tarifa de Ficha Cadastral ($)                                                           | `tfc`                        | Sim             | Number       | -             |
| Tarifa de Ficha Cadastral (%)                                                           | `tfcPct`                     | Sim             | Number       | -             |
| Taxa de juros mensal                                                                    | `monthlyInterestRate`        | Sim             | Number       | -             |
| Taxa IOF                                                                                | `iofRate`                    | Sim             | Number       | -             |
| Taxa IOF adicional                                                                      | `additionalIOFRate`          | Sim             | Number       | -             |
| Valor total do IOF                                                                      | `totalIOFValue`              | Sim             | Number       | -             |
| Valor do IOF financiado                                                                 | `financedIOFValue`           | Sim             | Number       | -             |
| Período de carência                                                                     | `gracePeriod`                | Sim             | Number       | -             |
| CET ao mês                                                                              | `monthlyTEC`                 | Sim             | Number       | -             |
| CET ao ano                                                                              | `yearlyTEC`                  | Sim             | Number       | -             |
| Valor de desembolso                                                                     | `disbursementAmount`         | Sim             | Number       | -             |
| Valor total de desembolso                                                               | `totalDisbursementAmount`    | Sim             | Number       | -             |
| Valor solicitado                                                                        | `requestedValue`             | Sim             | Number       | -             |
| Valor total                                                                             | `totalValue`                 | Sim             | Number       | -             |
| Entrada                                                                                 | `downPayment`                | Sim             | Number       | -             |
| Seguro prestamista (%)                                                                  | `creditLifeInsurancePct`     | Sim             | Number       | -             |
| Seguro prestamista ($)                                                                  | `creditLifeInsurance`        | Sim             | Number       | -             |
| Valor do seguro adicional ($)                                                           | `additionalInsuranceValue`   | Sim             | Number       | -             |
| Financiar IOF                                                                           | `financeIOF`                 | Sim             | Boolean      | `true`        |
| Financiar TFC                                                                           | `financeTFC`                 | Sim             | Boolean      | `true`        |
| Financiar seguro prestamista                                                            | `financeCreditLifeInsurance` | Sim             | Boolean      | `true`        |
| Financiar seguro adicional                                                              | `financeAdditionalInsurance` | Sim             | Boolean      | `true`        |
| Venda presencial                                                                        | `inPersonSale`               | Não             | Boolean      | `false`       |
| [Capitalização de taxa](#capitalização-de-taxa-growthtype)                              | `growthType`                 | Sim             | String       | `EXPONENTIAL` |
| Fator de parcelamento                                                                   | `installmentFactor`          | Sim             | Number       | -             |
| Coeficiente                                                                             | `coefficient`                | Sim             | Number       | -             |
| Valor da parcela sem IOF                                                                | `installmentValueWithoutIOF` | Sim             | Number       | -             |
| Valor da parcela com IOF                                                                | `installmentValueWithIOF`    | Sim             | Number       | -             |
| Valor financiado                                                                        | `financedValue`              | Sim             | Number       | -             |
| Descrição do bem                                                                        | `assetDescription`           | Não             | String       | -             |
| [Identificador da frequência de pagamento](#frequência-de-pagamento-paymentfrequencyid) | `paymentFrequencyID`         | Sim             | Number       | -             |
| [Identificador do tipo de pagamento](#tipo-de-pagamento-paymenttypeid)                  | `paymentTypeID`              | Sim             | Number       | -             |
| [Identificador do produto](#produto-productid)                                          | `productID`                  | Sim             | Number       | -             |
| Identificador da empresa originadora                                                    | `originatingCompanyID`       | Sim             | Number       | -             |
| Tipo da empresa originadora                                                             | `originatingCompanyType`     | Sim             | String       | `MN`          |
| [Identificador do status da operação](#status-da-operação-operationstatusid)            | `operationStatusID`          | Sim             | Number       | -             |
| Identificador da empresa                                                                | `companyID`                  | Sim             | Number       | -             |
| [Tipo de empresa](#tipo-de-empresa-companytype)                                         | `companyType`                | Sim             | String       | `MN`          |
| [Cliente](#cliente-pessoa-física)                                                       | `customer`                   | Sim             | Object       | -             |
| [Avalistas](#avalistas)                                                                 | `guarantors`                 | Não             | Array        | -             |
| [Garantias](#garantias)                                                                 | `collaterals`                | Não             | Array        | -             |
| Parcelas                                                                                | `installments`               | Sim             | Array        | -             |
| Taxa de juros anual                                                                     | `yearlyInterestRate`         | Sim             | Number       | -             |

#### `create`: Exemplo de rota:

```js
POST https://{empresa}.titan.ceoslab.app/api/operations/create
```

#### `create`: Exemplo de requisição

```bash showLineNumbers
{
	"acceptanceDate": "2024-01-22",
	"firstDueDate": "2024-01-23",
	"installmentQuantity": 18,
	# Caso você opte pelo TFC em percentual(%), passar "null" no atributo abaixo.
	"tfc": 400.0,
	# Caso você opte pelo TFC em valor($), passar "null" no atributo abaixo.
	"tfcPct": null,
	"monthlyInterestRate": 0.05,
	"iofRate": 0.000041,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 298.72,
	"financedIOFValue": 303.0,
	"gracePeriod": 1,
	"monthlyTEC": 0.060165796732,
	"yearlyTEC": 1.01597650294,
	"disbursementAmount": 20000.0,
	"totalDisbursementAmount": 20000.0,
	"requestedValue": 20000.0,
	"totalValue": 31641.83,
	"downPayment": 0.00,
	"creditLifeInsurancePct": 0.0366,
	"creditLifeInsurance": 732,
	"additionalInsuranceValue": 0.0,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"assetDescription": "Bem Teste",
	"paymentFrequencyID": 51,
	"paymentTypeID": 1,
	"productID": 1401,
	"operationStatusID": 552,
	"companyID": 1551,
	"companyType": "MN",
	"company": {
		...
	},
	"customer": {
		...
	},
	"guarantors": [
		{
			...
		},
	],
	"collaterals": [
		{
			...
		},
	],
	"operationDisbursements": [
		{
			...
		}
	],
	"installments": [
		{
			...
		}
	]
}
```

#### `create`: Exemplo de resposta

```bash showLineNumbers
{
# highlight-next-line
	"id": 5651,
	"createdAt": "2024-01-22T20:45:44.179683Z",
	"updatedAt": "2024-01-22T20:45:44.179688Z",
	"createdByID": 2760,
	"updatedByID": 2760,
	"enabled": true,
	"operationCode": 262,
	"workflowExecutionID": 10552,
	"acceptanceDate": "2024-01-22",
	"firstDueDate": "2024-01-23",
	"lastDueDate": "2025-07-23",
	"installmentQuantity": 18,
	"tfc": 400.0,
	"tfcPct": null,
	"monthlyInterestRate": 0.05,
	"iofRate": 0.000041,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 298.72,
	"financedIOFValue": 303.0,
	"gracePeriod": 1,
	"monthlyTEC": 0.060165796732,
	"yearlyTEC": 1.01597650294,
	"disbursementAmount": 20000.0,
	"totalDisbursementAmount": 20000.0,
	"requestedValue": 20000.0,
	"totalValue": 31641.83,
	"downPayment": 0.0,
	"creditLifeInsurancePct": 0.0366,
	"creditLifeInsurance": 732,
	"additionalInsuranceValue": 0.0,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"installmentFactor": 12.193669437642,
	"coefficient": 0.082009767865,
	"installmentValueWithoutIOF": 1733.03,
	"installmentValueWithIOF": 1757.88,
	"financedValue": 21435.0,
	"assetDescription": "Bem Teste",
	"paymentFrequencyID": 51,
	"paymentFrequency": {
		...
	},
	"paymentTypeID": 1,
		...
	},
	"productVariantID": 1402,
	"productID": 1401,
	"customerID": 2851,
	"operationStatusID": 552,
	"operationStatus": {
		...
	},
	"originatingCompanyID": 1551,
	"originatingCompanyType": "MN",
	"companyID": 1551,
	"companyType": "MN",
	"productVariant": {
		...
	},
	"product": {
		...
	},
	"customer": {
		...
	},
	"agencyOffice": null,
	"customerAttachments": null,
	"guarantors": [
		...
	],
	"committeeMembers": [],
	"collaterals": [
		...
	],
	"assessments": [],
	"operationDisbursements": [],
	"installments": [
		...
	],
	"operationSignatures": [],
	"operationMembers": [
		...
	],
	"conversationID": 3851,
	"yearlyInterestRate": 0.795856326022129150390625,
	"operationAttachmentIDs": [1201, 1202]
}
```

#### `installments`: Parâmetros de envio

| Atributo               | Correspondência      | Obrigatoriedade | Tipo de dado | Valor padrão |
| ---------------------- | -------------------- | --------------- | ------------ | ------------ |
| ID da operação         | `operationID`        | Sim             | Number       | -            |
| Índice                 | `index`              | Sim             | Number       | -            |
| Taxa de juros          | `interestRate`       | Não             | Number       | -            |
| Taxa básica de IOF     | `baseIOFRate`        | Não             | Number       | -            |
| Taxa adicional de IOF  | `additionalIOFRate`  | Não             | Number       | -            |
| Fator de parcelamento  | `installmentFactor`  | Não             | Number       | -            |
| Valor sem IOF          | `valueWithoutIOF`    | Não             | Number       | -            |
| Amortização            | `amortization`       | Não             | Number       | -            |
| Interesse              | `interest`           | Não             | Number       | -            |
| Equilíbrio             | `balance`            | Não             | Number       | -            |
| Valor básico do IOF    | `baseIOFValue`       | Não             | Number       | -            |
| Valor adicional de IOF | `additionalIOFValue` | Não             | Number       | -            |
| Valor total do IOF     | `totalIOFValue`      | Não             | Number       | -            |
| Valor com IOF          | `valueWithIOF`       | Não             | Number       | -            |
| Data de vencimento     | `dueDate`            | Sim             | Date         | -            |
| Status da parcela      | `installmentStatus`  | Não             | String       | -            |

#### `installments`: Exemplo de requisição:

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `installments`, que se encontra dentro do objeto `operation`. Exemplo:

```bash showLineNumbers
{
	"installments": [
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
"installments": [
	{
		"operationID": 7000,
		"index": 1,
		"interestRate": 0,
		"baseIOFRate": 0,
		"additionalIOFRate": 0,
		"installmentFactor": 0,
		"valueWithoutIOF": 0,
		"amortization": 0,
		"interest": 0,
		"balance": 0,
		"baseIOFValue": 0,
		"additionalIOFValue": 0,
		"totalIOFValue": 0,
		"valueWithIOF": 0,
		"dueDate": "2022-03-10",
		"installmentStatus": "PA"
	}
]
```

#### `installments`: Exemplo de resposta:

```bash showLineNumbers
"installments": [
	{
		"id": 0,
		"createdAt": "2022-03-10T12:15:50-04:00",
		"updatedAt": "2022-03-10T12:15:50-04:00",
		"createdByID": 0,
		"updatedByID": 0,
		"enabled": true,
		"operationID": 0,
		"index": 0,
		"interestRate": 0,
		"baseIOFRate": 0,
		"additionalIOFRate": 0,
		"installmentFactor": 0,
		"valueWithoutIOF": 0,
		"amortization": 0,
		"interest": 0,
		"balance": 0,
		"baseIOFValue": 0,
		"additionalIOFValue": 0,
		"totalIOFValue": 0,
		"valueWithIOF": 0,
		"dueDate": "2022-03-10",
		"installmentStatus": "PA"
	}
]
```

:::info Atributos importantes na resposta da requisição

Não se esqueça de anotar o **identificador** (em destaque) da resposta desta requisição. Você vai precisar do `operationID` para [adicionar documentação](documentos.md) relacionada a essa operação.

:::

---

## Cliente (Pessoa física)

Os seguintes atributos pertencem ao objeto `customer`, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

#### Parâmetros de envio

| Atributo                                         | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------ | --------------- | --------------- | ------------ | ------------ |
| [Tipo de cliente](#tipo-de-cliente-customertype) | `customerType`  | Sim             | String       | `PERSON`     |
| [Pessoa](#person-parâmetros-de-envio)            | `person`        | Sim             | Object       | -            |
| [Empresa](#company-parâmetros-de-envio)          | `company`       | Não             | Object       | `null`       |

#### Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `customer`. Exemplo:

```bash showLineNumbers
"customer": {
    ...
}
```

:::

```bash showLineNumbers
"customer": {
	"customerType": "PERSON",
	"person": {
		...,
	}
	"company": null,
}
```

---

### `PERSON`: Parâmetros de envio

Os seguintes atributos pertencem ao objeto `person`, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

| Atributo                                                                                                                                | Correspondência              | Obrigatoriedade | Tipo de dado | Valor padrão |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------- | ------------ | ------------ |
| E-mail                                                                                                                                  | `email`                      | Sim             | String       | -            |
| Nome completo                                                                                                                           | `fullName`                   | Sim             | String       | -            |
| CPF                                                                                                                                     | `documentNumber`             | Sim             | Number       | -            |
| Órgão emissor do documento                                                                                                              | `documentIssuingBody`        | Não             | String       | -            |
| Número de telefone celular                                                                                                              | `mobilePhoneNumber`          | Sim             | Number       | -            |
| Número de telefone fixo                                                                                                                 | `landlinePhoneNumber`        | Não             | Number       | -            |
| Nome completo da mãe                                                                                                                    | `mothersFullName`            | Não             | String       | -            |
| Nome completo do pai                                                                                                                    | `fathersFullName`            | Não             | String       | -            |
| [Identificador da nacionalidade](#nacionalidade-país-nationalityid-countryid)                                                           | `nationalityID`              | Não             | Number       | -            |
| [Identificador do Estado de nascimento](#nacionalidade-estado-identificador-do-estado-do-órgão-emissor-birthplacelevel1admindivid-ufid) | `birthplaceLevel1AdminDivID` | Não             | Number       | -            |
| [Identificador da Cidade de nascimento](#nacionalidade-cidade-birthplacelevel2admindivid)                                               | `birthplaceLevel2AdminDivID` | Não             | Number       | -            |
| Data de nascimento                                                                                                                      | `birthdate`                  | Sim             | Date         | -            |
| [Identificador do estado civil](#estado-civil-civilstatusid)                                                                            | `civilStatusID`              | Sim             | Number       | -            |
| [Identificador da escolaridade](#escolaridade-educationlevelid)                                                                         | `educationLevelID`           | Não             | Number       | -            |
| [Identificador do sexo](#sexo-sexid)                                                                                                    | `sexID`                      | Sim             | Number       | -            |
| Patrimônio líquido                                                                                                                      | `netWorth`                   | Sim             | Number       | -            |
| [Contas bancárias](#accounts-parâmetros-de-envio)                                                                                       | `accounts`                   | Não             | Array        | -            |
| [Links sociais](#socialnetworks-parâmetros-de-envio)                                                                                    | `socialNetworks`             | Não             | Array        | -            |
| [Documentos adicionais](#additionaldocuments-parâmetros-de-envio)                                                                       | `additionalDocuments`        | Não             | Array        | -            |
| [Ocupações](#occupations-parâmetros-de-envio)                                                                                           | `occupations`                | Não             | Array        | -            |
| [Endereço](#address-parâmetros-de-envio)                                                                                                | `address`                    | Não             | Object       | -            |
| Identificador(es) dos anexos da pessoa                                                                                                  | `personAttachmentIDs`        | Não             | Number       | -            |

### `PERSON`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `person`, que se encontra dentro do objeto `customer`. Exemplo:

```bash showLineNumbers
"customer": {
	"person": {
		...
	}
}
```

:::

```bash showLineNumbers
"person": {
	"email": "pessoateste@gmail.com",
	"fullName": "PESSOA TESTE DA SILVA",
	"documentNumber": "12345678900",
	"documentIssuingBody": null,
	"mobilePhoneNumber": "51999999999",
	"landlinePhoneNumber": null,
	"mothersFullName": null,
	"fathersFullName": null,
	"nationalityID": null,
	"birthplaceLevel1AdminDivID": null,
	"birthplaceLevel2AdminDivID": null,
	"birthdate": "1990-01-01",
	"civilStatusID": 2,
	"educationLevelID": null,
	"sexID": 1,
	"netWorth": 100000.00,
	"accounts": [
		{
			...
		},
	]
	"socialNetworks": [
		{
			...
		},
	]
	"additionalDocuments": [
		{
			...
		},
	]
	"occupations": [
		{
			...
		},
	]
	"address": {
		...
	}
	"personAttachmentIDs": [
		{
			...
		},
	]
}
```

:::info Atributos importantes na resposta da requisição

Não se esqueça de anotar o identificador da resposta desta requisição. Você vai precisar do `personID` para [adicionar documentação](documentos.md) relacionada a essa pessoa.

:::

---

#### `accounts`: Parâmetros de envio

Os seguintes atributos pertencem ao array `accounts`, servindo de base para clientes do tipo **pessoa física** e **pessoa jurídica**.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

| Atributo                                                                                       | Correspondência       | Obrigatoriedade | Tipo de dado | Valor padrão |
| ---------------------------------------------------------------------------------------------- | --------------------- | --------------- | ------------ | ------------ |
| Número da agência                                                                              | `agencyNumber`        | Sim             | Number       | -            |
| Número da conta                                                                                | `accountNumber`       | Sim             | Number       | -            |
| Dígito da conta                                                                                | `accountNumberDigit`  | Sim             | Number       | -            |
| [Identificador do tipo de conta](#tipo-de-conta-accounttypeid)                                 | `accountTypeID`       | Sim             | Number       | -            |
| [Identificador do tipo de chave PIX da conta](#tipo-de-chave-pix-da-conta-accountpixkeytypeid) | `accountPixKeyTypeID` | Não             | Number       | -            |
| Chave Pix da conta                                                                             | `accountPixKey`       | Não             | String       | -            |
| [Identificador do banco](#banco-bankid)                                                        | `bankID`              | Sim             | Number       | -            |
| Conta primária                                                                                 | `primaryAccount`      | Não             | Boolean      | `false`      |
| Nome do titular da conta                                                                       | `holderName`          | Sim             | String       | -            |
| CPF ou CNPJ                                                                                    | `documentNumber`      | Sim             | Number       | -            |

#### `accounts`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `accounts`, que se encontra dentro do objeto `person` ou `company`. Exemplo:

```bash showLineNumbers
"person": {
	"accounts": [
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
"accounts": [
	{
		"agencyNumber": "0001",
		"accountNumber": "25191984",
		"accountNumberDigit": "9",
		"accountTypeID": 1,
		"accountPixKeyTypeID": null,
		"accountPixKey": null,
		"bankID": 560,
		"primaryAccount": false,
		"holderName": "PESSOA TESTE DA SILVA",
		"documentNumber": "12345678900"
	}
]
```

#### `accounts`: Exemplo de resposta

```bash showLineNumbers
"accounts": [
	{
	"id": 1,
	"createdAt": "2022-03-10T12:15:50-04:00",
	"updatedAt": "2022-03-10T12:15:50-04:00",
	"createdByID": 1,
	"updatedByID": 1,
	"enabled": true,
	"agencyNumber": "0001",
	"accountNumber": "25191984",
	"accountNumberDigit": "9",
	"accountTypeID": 1,
	"accountPixKeyTypeID": null,
	"accountPixKey": null,
	"accountPixKeyTypeMask": null,
	"bankID": 560,
	"bank": {
		"id": 560,
		"createdAt": "2022-03-10T12:15:50-04:00",
		"updatedAt": "2022-03-10T12:15:50-04:00",
		"createdByID": null,
		"updatedByID": null,
		"enabled": true,
		"altCode": 18236120,
		"name": "NU PAGAMENTOS - IP",
		"code": 260,
		"fullName": "NU PAGAMENTOS S.A. - INSTITUIÇÃO DE PAGAMENTO"
	},
	"primaryAccount": false,
	"holderName": "PESSOA TESTE DA SILVA",
	"documentNumber": "12345678900",
	"personID": 325
	}
]
```

---

#### `socialNetworks`: Parâmetros de envio

Os seguintes atributos pertencem ao array `socialNetworks`, servindo de base para clientes do tipo **pessoa física** e **pessoa jurídica**.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos) > [Tipo de link social](#tipo-de-link-social-social-network-types).

| Atributo                                                                          | Correspondência       | Obrigatoriedade | Tipo de dado | Valor padrão |
| --------------------------------------------------------------------------------- | --------------------- | --------------- | ------------ | ------------ |
| [Identificador do tipo de link social](#tipo-de-link-social-social-network-types) | `socialNetworkTypeID` | Sim             | Number       | -            |
| Endereço do link social                                                           | `username`            | Sim             | String       | -            |

#### `socialNetworks`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `socialNetworks`, que se encontra dentro do objeto `person` ou `company`. Exemplo:

```bash showLineNumbers
"person": {
	"socialNetworks":[
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
"socialNetworks": [
	{
		"socialNetworkTypeID": 51,
		"username": "pessoa.teste",
	}
]
```

#### `socialNetworks`: Exemplo de resposta

```bash showLineNumbers
"socialNetworks": [
	{
		"id": 1,
		"createdAt": "2022-03-10T12:15:50-04:00",
		"updatedAt": "2022-03-10T12:15:50-04:00",
		"createdByID": 1,
		"updatedByID": 1,
		"enabled": true,
		"socialNetworkTypeID": 51,
		"socialNetworkType": {
			"id": 51,
			"text": "Instagram",
			"enabled": true,
			"urlTemplate": "instagram.com"
		},
		"username": "pessoa.teste",
		"url": "instagram.com/pessoa.teste",
		"personID": 325
	}
]
```

---

#### `additionalDocuments`: Parâmetros de envio

Os seguintes atributos pertencem ao array `additionalDocuments`, dando prioridade às peculiaridades de **pessoa física**.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos) > [Tipo de documento adicional](#tipo-de-documento-adicional-typeid).

| Atributo                                                                                                                                                | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------- | ------------ | ------------ |
| Número do documento                                                                                                                                     | `number`        | Sim             | Number       | -            |
| Órgão emissor                                                                                                                                           | `authority`     | Não             | String       | -            |
| [Identificador do estado do órgão emissor](#nacionalidade-estado-estado-do-órgão-emissor-estado-do-gravame-birthplacelevel1admindivid-ufid-lienstateid) | `ufID`          | Não             | Number       | -            |
| [Identificador do tipo de documento adicional](#tipo-de-documento-adicional-typeid)                                                                     | `typeID`        | Não             | Number       | -            |
| Data de emissão do documento                                                                                                                            | `issueDate`     | Não             | Date         | -            |

#### `additionalDocuments`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `additionalDocuments`, que se encontra dentro do objeto `person`. Exemplo:

```bash showLineNumbers
"person": {
	"additionalDocuments":[
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
"additionalDocuments": [
	{
		"number": "1234567890",
		"authority": "ssp",
		"ufID": 23,
		"typeID": 3,
		"issueDate": "2019-08-09"
	}
]
```

#### `additionalDocuments`: Exemplo de resposta

```bash showLineNumbers
"additionalDocuments": [
	{
		"id": 1,
		"createdAt": "2022-03-10T12:15:50-04:00",
		"updatedAt": "2022-03-10T12:15:50-04:00",
		"createdByID": 1,
		"updatedByID": 1,
		"enabled": true,
		"number": "1234567890",
		"authority": "ssp",
		"ufID": 23,
		"uf": {
			"id": 23,
			"name": "Rio Grande do Sul",
			"countryID": 51,
			"abbreviation": "RS",
			"code": "43"
		},
		"typeID": 3,
		"type": {
			"id": 3,
			"text": "RG",
			"enabled": true
		},
		"issueDate": "2019-08-09",
		"personID": 325
	}
]
```

---

#### `occupations`: Parâmetros de envio

Os seguintes atributos pertencem ao array `occupations`, dando prioridade às peculiaridades de **pessoa física**.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

| Atributo                                                                                         | Correspondência         | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------------------------------------------------------ | ----------------------- | --------------- | ------------ | ------------ |
| Salário                                                                                          | `salary`                | Sim             | Number       | -            |
| Data de admissão                                                                                 | `employmentStartDate`   | Sim             | Date         | -            |
| Possui vínculo societário?                                                                       | `hasOwnershipLink`      | Sim             | Boolean      | `false`      |
| [Identificador da profissão](#profissão-professionid)                                            | `professionID`          | Sim             | Number       | -            |
| [Empresa](#company-parâmetros-de-envio)                                                          | `company`               | Sim             | Object       | -            |
| [Pessoa](#person-parâmetros-de-envio)                                                            | `person`                | Sim             | Object       | -            |
| Sócio/representante                                                                              | `businessPartner`       | Sim             | Boolean      | `false`      |
| [Identificador do tipo de vínculo societário](#tipo-de-vínculo-societário-businesspartnertypeid) | `businessPartnerTypeID` | Sim             | Number       | -            |
| Participação do sócio                                                                            | `equityPercentage`      | Sim             | Number       | -            |

#### `occupations`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `occupations`, que se encontra dentro do objeto `person`. Exemplo:

```bash showLineNumbers
"customer": {
	"person": {
		"occupations": [
			{
				...
			}
		]
	}
}
```

:::

```bash showLineNumbers
"occupations": [
	{
		"salary": 100000.00,
		"employmentStartDate": "2000-10-10",
		"hasOwnershipLink": false,
		"professionID": 5,
		"company": {
			...
		},
		"person": {
			...
		},
		"businessPartner": true,
		# Caso o atributo "businessPartner" esteja "true", o atributo "businessPartnerTypeID" é obrigatório.
		"businessPartnerTypeID": 2,
		# Caso o atributo "businessPartnerTypeID" esteja com o identificador "2", o atributo "equityPercentage" é obrigatório.
		"equityPercentage": 5
	}
]
```

---

#### `address`: Parâmetros de envio

Os seguintes atributos pertencem ao objeto `address`, servindo de base para clientes do tipo **pessoa física** e **pessoa jurídica**.

| Atributo                                                                             | Correspondência    | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------------------------------------------ | ------------------ | --------------- | ------------ | ------------ |
| CEP                                                                                  | `postalCode`       | Sim             | Number       | -            |
| [Identificador do País](#nacionalidade-país-nationalityid-countryid)                 | `countryID`        | Sim             | Number       | `51`         |
| [Identificador do Estado](#endereço-estado-level1admindivid-cidade-level2admindivid) | `level1AdminDivID` | Sim             | Number       | -            |
| [Identificador da Cidade](#endereço-estado-level1admindivid-cidade-level2admindivid) | `level2AdminDivID` | Sim             | Number       | -            |
| Endereço                                                                             | `line1`            | Sim             | String       | -            |
| Número da residência                                                                 | `houseNumber`      | Sim             | String       | -            |
| Complemento                                                                          | `line2`            | Não             | String       | `null`       |
| Bairro                                                                               | `neighborhood`     | Sim             | String       | -            |
| Latitude                                                                             | `latitude`         | Não             | Number       | `null`       |
| Longitude                                                                            | `longitude`        | Não             | Number       | `null`       |

#### `address`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `address`, que se encontra dentro do objeto `person` ou `company`. Exemplo:

```bash showLineNumbers
"customer": {
	"person": {
		"address": {
			...
		}
	}
}
```

:::

```bash showLineNumbers
"address": {
	"postalCode": "90450140",
	"countryID": 51,
	"level1AdminDivID": 23,
	"level2AdminDivID": 4932,
	"line1": "Rua Jaraguá",
	"houseNumber": "48",
	"line2": "333",
	"neighborhood": "Bela Vista",
	"latitude": null,
	"longitude": null
}
```

---

## Cliente (Pessoa jurídica)

Os seguintes atributos pertencem ao objeto `customer`, dando prioridade às peculiaridades de **pessoa jurídica**. Para utilizar as especificações de [pessoa física](#cliente-pessoa-física), acesse o objeto correspondente.

Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

#### Parâmetros de envio

| Atributo                                         | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------ | --------------- | --------------- | ------------ | ------------ |
| [Tipo de cliente](#tipo-de-cliente-customertype) | `customerType`  | Sim             | String       | `COMPANY`    |
| Pessoa                                           | `person`        | Não             | Object       | `null`       |
| Empresa                                          | `company`       | Sim             | Object       | -            |

#### Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `customer`. Exemplo:

```bash showLineNumbers
"customer": {
    ...
}
```

:::

```bash showLineNumbers
"customer": {
	"customerType": "COMPANY",
	"person": null,
# highlight-start
	"company": {
		...,
	}
# highlight-end
}
```

### `COMPANY`: Parâmetros de envio

**Nossa API permite a extração de dados da Receita Federal apenas fornecendo o CNPJ.** [Saiba mais sobre como realizar essa consulta aqui](#dados-empresariais-extraídos-da-receita-federal-documentnumber).

| Atributo                                                                    | Correspondência          | Obrigatoriedade | Tipo de dado | Valor padrão |
| --------------------------------------------------------------------------- | ------------------------ | --------------- | ------------ | ------------ |
| CNPJ                                                                        | `documentNumber`         | Sim             | Number       | -            |
| Razão social                                                                | `legalName`              | Sim             | String       | -            |
| Nome fantasia                                                               | `tradeName`              | Não             | String       | -            |
| E-mail                                                                      | `email`                  | Sim             | String       | -            |
| Número de telefone celular                                                  | `mobilePhoneNumber`      | Não             | Number       | -            |
| Data de constituição                                                        | `incorporationDate`      | Não             | Date         | -            |
| Capital social                                                              | `shareCapital`           | Não             | Number       | -            |
| Patrimônio líquido                                                          | `equity`                 | Sim             | Number       | -            |
| Faturamento médio mensal                                                    | `monthlyAverageRevenue`  | Sim             | Number       | -            |
| Inscrição estadual                                                          | `stateTaxNumber`         | Não             | Number       | `null`       |
| Inscrição municipal                                                         | `cityTaxNumber`          | Não             | Number       | `null`       |
| [Endereço](#address-parâmetros-de-envio)                                    | `address`                | Não             | Object       | -            |
| [Identificador do tipo de empresa](#tipo-de-empresa-companyhierarchytypeid) | `companyHierarchyTypeID` | Não             | Number       | -            |
| [Contas bancárias](#accounts-parâmetros-de-envio)                           | `accounts`               | Não             | Array        | -            |
| [Links sociais](#socialnetworks-parâmetros-de-envio)                        | `socialNetworks`         | Não             | Array        | -            |
| Funcionários                                                                | `employees`              | Não             | Array        | -            |

### `COMPANY`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `company`, que se encontra dentro do objeto `customer`. Exemplo:

```bash showLineNumbers
"customer": {
	"company": {
		...
	}
}
```

:::

```bash showLineNumbers
"company": {
	"documentNumber": "41000240000173",
	"legalName": "CEOS LAB TECNOLOGIA LTDA",
	"tradeName": "",
	"email": "suporte@ceoslab.com.br",
	"mobilePhoneNumber": "5133333333",
	"incorporationDate": "2021-02-25",
	"shareCapital": 5000.0,
	"equity": 1000000.0,
	"monthlyAverageRevenue": 434345.35,
	"stateTaxNumber": null,
	"cityTaxNumber": null,
	"address": {
		...
	},
	"companyHierarchyTypeID": null,
	"accounts": [
		{
			...
		},
	]
	"socialNetworks": [
		{
			...
		},
	]
	"employees": [
		{
			...
		}
	]
}
```

:::info Atributos importantes na resposta da requisição

Não se esqueça de anotar o identificador da resposta desta requisição. Você vai precisar do `companyID` para [adicionar documentação](documentos.md) relacionada a essa empresa.

:::

---

## Avalista(s)

Os seguintes atributos pertencem ao array `guarantors`, para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

:::info Inclusão de avalistas em uma operação

A inclusão de Avalistas em uma operação não é estritamente obrigatória; no entanto, se optar por incluí-los, é vital enviar alguns atributos obrigatórios para garantir uma análise mais precisa.

:::

#### Parâmetros de envio

| Atributo                                                                | Correspondência      | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----------------------------------------------------------------------- | -------------------- | --------------- | ------------ | ------------ |
| [Avalista - Pessoa física](#person-parâmetros-de-envio)                 | `person`             | Sim             | Object       | -            |
| [Avalista - Pessoa jurídica](#company-parâmetros-de-envio)              | `company`            | Sim             | Object       | -            |
| [Identificador do tipo de vínculo](#tipo-de-vínculo-relationshiptypeid) | `relationshipTypeID` | Sim             | Number       | -            |

#### Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `guarantors`. Exemplo:

```bash showLineNumbers
{
	"guarantors": [
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
[
	{
		"person": {
			...
		},
		"company:" {
			...
		},
		"relationshipTypeID": 54
	}
]
```

---

## Garantia(s)

### Veículo

Os seguintes atributos pertencem ao array `collaterals`, para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

:::info Tipo de garantia

Para garantias de veículo, o atributo "Identificador do tipo de outras garantias" = [`asset-type`](#tipo-de-outras-garantias-asset-types) deverá ser passado sempre o identificador correspondente a _"Veículos"_ obrigatoriamente.

:::

#### Parâmetros de envio

| Atributo                                                                            | Correspondência           | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----------------------------------------------------------------------------------- | ------------------------- | --------------- | ------------ | ------------ |
| Fiél depositário                                                                    | `custodian`               | Não             | String       | `null`       |
| Número do documento de identificação                                                | `documentNumber`          | Sim             | Number       | -            |
| Valor da garantia                                                                   | `value`                   | Sim             | Number       | -            |
| Descrição da garantia                                                               | `description`             | Não             | String       | -            |
| [Identificador da modalidade de garantia](#modalidade-de-garantia-collateraltypeid) | `collateralTypeID`        | Sim             | Number       | `1`          |
| [Identificador do tipo de outras garantias](#tipo-de-outras-garantias-asset-types)  | `assetTypeID`             | Sim             | Number       | `167`        |
| Veículo                                                                             | `vehicle`                 | Sim             | Object       | -            |
| [Endereço da garantia](#endereço-estado-level1admindivid-cidade-level2admindivid)   | `address`                 | Não             | Object       | -            |
| Bem a ser financiado                                                                | `financed`                | Sim             | Boolean      | `true`       |
| Documentos da garantia                                                              | `collateralAttachmentIDs` | Não             | Object       | -            |

#### Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `collaterals`. Exemplo:

```bash showLineNumbers
{
	"collaterals": [
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
[
	{
		"custodian": null,
		"documentNumber": "1234567890",
		"value": 60847.0,
		"description": null,
		"collateralTypeID": 1,
		"assetTypeID": 167,
		"vehicle": {
			...
		}
		"financed": true,
		"collateralAttachmentIDs": []
	}
]
```

#### `vehicle`: Parâmetros de envio

| Atributo                                                                                                                                                     | Correspondência         | Obrigatoriedade | Tipo de dado | Valor padrão |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | --------------- | ------------ | ------------ |
| [Identificador do tipo de veículo](#1---tipo-de-veículo-vehicle-types)                                                                                       | `vehicleTypeID`         | Sim             | Number       | -            |
| [Identificador da marca do veículo](#2---marca-do-veículo-brands)                                                                                            | `brandID`               | Sim             | Number       | -            |
| [Identificador do modelo do veículo](#3---modelo-do-veículo-models)                                                                                          | `modelID`               | Sim             | Number       | -            |
| Cor do veículo                                                                                                                                               | `color`                 | Sim             | String       | -            |
| Placa do veículo                                                                                                                                             | `licensePlate`          | Não             | String       | -            |
| Chassi do veículo                                                                                                                                            | `chassisNumber`         | Não             | String       | -            |
| Renavam do veículo                                                                                                                                           | `vehicleDocumentNumber` | Não             | String       | -            |
| [Identificador do estado do Renavam do veículo](#nacionalidade-estado-estado-do-órgão-emissor-estado-do-gravame-birthplacelevel1admindivid-ufid-lienstateid) | `lienStateID`           | Não             | Number       | -            |
| Número da nota fiscal                                                                                                                                        | `invoiceNumber`         | Não             | Number       | -            |
| [Identificador do tipo de combustível do veículo](#5---tipo-de-combustível-do-veículo-fuel-types)                                                            | `fuelTypeID`            | Sim             | Number       | -            |
| Ano de fabricação do veículo                                                                                                                                 | `manufacturingYear`     | Sim             | Number       | -            |
| [Identificador do ano do modelo do veículo](#4---ano-do-modelo-do-veículo-years)                                                                             | `vehicleModelYearID`    | Sim             | Number       | -            |
| [Proprietário(a) do veículo - Pessoa física](#person-parâmetros-de-envio)                                                                                    | `person`                | Sim             | Object       | -            |
| [Proprietário(a) do veículo - Pessoa jurídica](#company-parâmetros-de-envio)                                                                                 | `company`               | Sim             | Object       | -            |

#### `vehicle`: Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do objeto `vehicle`, que se encontra dentro do array `collaterals`. Exemplo:

```bash showLineNumbers
{
	"collaterals": [
		{
			"vehicle": {
				...
			}
		}
	]
}
```

:::

```bash showLineNumbers
{
	"vehicleTypeID": 101,
	"brandID": 419,
	"modelID": 5557,
	"color": "VERDE MUSGO",
	"licensePlate": "87dffd8",
	"chassisNumber": "23423542235348348",
	"vehicleDocumentNumber": "81238442374",
	"lienStateID": 23,
	"invoiceNumber": null,
	"fuelTypeID": 51,
	"manufacturingYear": "2015",
	"vehicleModelYearID": 1551,
	"person": {
		...
	}
	"company": {
		...
	}
}
```

### Outras garantias

Os seguintes atributos pertencem ao array `collaterals`, para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](#mapeamento-de-atributos).

#### Parâmetros de envio

| Atributo                                                                            | Correspondência           | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----------------------------------------------------------------------------------- | ------------------------- | --------------- | ------------ | ------------ |
| Fiél depositário                                                                    | `custodian`               | Sim             | String       | -            |
| Número do documento de identificação                                                | `documentNumber`          | Sim             | Number       | -            |
| Valor da garantia                                                                   | `value`                   | Sim             | Number       | -            |
| Descrição da garantia                                                               | `description`             | Não             | String       | -            |
| [Identificador da modalidade de garantia](#modalidade-de-garantia-collateraltypeid) | `collateralTypeID`        | Sim             | Number       | `1`          |
| [Identificador do tipo de outras garantias](#tipo-de-outras-garantias-asset-types)  | `assetTypeID`             | Sim             | Number       | -            |
| [Endereço da garantia](#endereço-estado-level1admindivid-cidade-level2admindivid)   | `address`                 | Não             | Object       | -            |
| Bem a ser financiado                                                                | `financed`                | Sim             | Boolean      | `true`       |
| Documentos da garantia                                                              | `collateralAttachmentIDs` | Não             | Object       | -            |

#### Exemplo de requisição

:::warning Atenção!

Os atributos abaixo são adicionados dentro do array `collaterals`. Exemplo:

```bash showLineNumbers
{
	"collaterals": [
		{
			...
		}
	]
}
```

:::

```bash showLineNumbers
[
	{
		"custodian": "PESSOA TESTE DA SILVA",
		"documentNumber": "1234567890",
		"value": 2000.0,
		"description": "Máquina de arar terra",
		"collateralTypeID": 1,
		"assetTypeID": 153,
		"address": {
			"postalCode": null,
			"countryID": null,
			"level1AdminDivID": null,
			"level1AdminDiv": null,
			"level2AdminDivID": null,
			"level2AdminDiv": null,
			"level3AdminDivID": null,
			"line1": null,
			"line2": null,
			"houseNumber": null,
			"neighborhood": null,
			"latitude": null,
			"longitude": null
		},
		"financed": true,
		"collateralAttachmentIDs": []
	}
]
```

### Imóvel

As garantias de imóvel estarão disponíveis em breve. ⏱️

---

## Desembolso

Os seguintes atributos pertencem ao array `operationDisbursements`.

:::warning Atributos importantes para requisição

Você vai precisar listar as [pessoas relacionadas](#pessoas-relacionadas-da-operação) para pegar os parâmetros de envio.

:::

#### Parâmetros de envio

| Atributo               | Correspondência    | Obrigatoriedade | Tipo de dado                                                                                       | Valor padrão |
| ---------------------- | ------------------ | --------------- | -------------------------------------------------------------------------------------------------- | ------------ |
| ID da operação         | `operationID`      | Sim             | Number                                                                                             | -            |
| Valor                  | `value`            | Sim             | Number                                                                                             | -            |
| ID da pessoa           | `personID`         | Não             | Number                                                                                             | `null`       |
| ID da empresa          | `companyID`        | Não             | Number                                                                                             | `null`       |
| Favorecido             | `type`             | Sim             | `MAIN_COMPANY`, `CUSTOMER`, `GUARANTOR`, `INSURANCE_COMPANY`, `AGENCY_OFFICE`, `BROKERAGE_COMPANY` | -            |
| ID da conta da pessoa  | `personAccountID`  | Não             | Number                                                                                             | `null`       |
| ID da conta da empresa | `companyAccountID` | Não             | Number                                                                                             | `null`       |

#### Exemplo de requisição

```bash showLineNumbers
{
	"operationID": 6802,
	"type": "MAIN_COMPANY",
	"companyAccountID": 801,
	"personID": null,
	"companyID": 1551,
	"value": 1000
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
    "id": 801,
    "createdAt": null,
    "updatedAt": null,
    "createdByID": 2760,
    "updatedByID": 2760,
    "enabled": true,
    "agencyNumber": "0099",
    "accountNumber": "87778977",
    "accountNumberDigit": "9",
    "accountTypeID": 1,
    "accountType": null,
    "accountPixKeyTypeID": null,
    "accountPixKeyType": null,
    "accountPixKey": null,
    "accountPixKeyTypeMask": null,
    "bankID": 401,
    "bank": null,
    "primaryAccount": true,
    "holderName": null,
    "documentNumber": null,
    "operationID": 6802,
    "value": 1000,
    "personID": null,
    "companyID": 1551,
    "type": "MAIN_COMPANY",
    "person": null,
    "company": null,
    "personAccountID": null,
    "companyAccountID": 801
}
```

## Mapeamento de atributos

O processo de mapeamento de atributos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os atributos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo atributo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma operação dentro do Titan.

#### Tipo de cliente (`customerType`):

| Correspondência | Significado     |
| --------------- | --------------- |
| PERSON          | Pessoa física   |
| COMPANY         | Pessoa jurídica |

#### Produto (`productID`):

Peça ao seu parceiro de negócios que compartilhe o código do produto no painel dentro do Titan, a fim de incluir o identificador do produto em sua solicitação.

**Caminho:** Cadastros > Produtos

![Produtos](./../assets/products.png)

#### Dados empresariais extraídos da Receita Federal (`documentNumber`):

:::warning Atenção!

Nossa API inicia consultando a base de dados da organização. Se a empresa não estiver cadastrada, a API acessa os registros da Receita Federal.

:::

Padrão de API:

```js
GET {{ _.base_url }}/api/companies/documentNumber/{cnpj}
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/companies/documentNumber/00000000000191
```

Exemplo de resposta:

```bash showLineNumbers
{
	"id": null,
	"createdAt": null,
	"updatedAt": null,
	"createdByID": null,
	"updatedByID": null,
	"enabled": null,
	"documentNumber": "00000000000191",
	"legalName": "BANCO DO BRASIL SA",
	"tradeName": "DIRECAO GERAL",
	"email": null,
	"description": null,
	"mobilePhoneNumber": "6134939002",
	"landlinePhoneNumber": "",
	"incorporationDate": "1966-08-01",
	"shareCapital": 120000000000,
	"earnings": null,
	"equity": null,
	"monthlyAverageRevenue": null,
	"stateTaxNumber": null,
	"cityTaxNumber": null,
	"simplifiedTax": false,
	"companyRegistrationStatusID": 451,
	"companyRegistrationStatus": null,
	"companyDimensionTypeID": 101,
	"companyDimensionType": null,
	"employeeCountRangeID": null,
	"employeeCountRange": null,
	"address": {
		"id": null,
		"createdAt": null,
		"updatedAt": null,
		"createdByID": null,
		"updatedByID": null,
		"enabled": null,
		"postalCode": "70040912",
		"countryID": 51,
		"level1AdminDivID": 27,
		"level1AdminDiv": null,
		"level2AdminDivID": 5570,
		"level2AdminDiv": null,
		"level3AdminDivID": null,
		"line1": "SAUN Quadra 5 Lote B",
		"line2": null,
		"houseNumber": "SN",
		"neighborhood": "Asa Norte",
		"latitude": -15.7881,
		"longitude": -47.875134,
		"companyID": null
	},
	"companyHierarchyTypeID": 1,
	"companyHierarchyType": null,
	"companyLegalNatureTypeID": 152,
	"companyLegalNatureType": null,
	"primaryActivityID": 2951,
	"primaryActivity": {
		"id": 2951,
		"code": 6422100,
		"description": "Bancos múltiplos, com carteira comercial"
	},
	"assignorCompany": null,
	"affiliatedCompany": null,
	"cessionaryCompany": null,
	"companyCorrespondentBank": null,
	"insuranceCompany": null,
	"agencyOffice": null,
	"accounts": null,
	"secondaryActivities": [
		{
			"id": 866,
			"code": 6499999,
			"description": "Outras atividades de serviços financeiros não especificadas anteriormente"
		}
	],
	"socialNetworks": null,
	"employees": null,
	"businessPartners": null,
	"linkedPersons": null,
	"logoFileID": null,
	"avatarFileID": null,
	"colorHex": null,
	"presumedRevenueCdl": null,
	"presumedRevenueCodeCdl": null,
	"declaredIncome": null,
	"provenIncome": null,
	"secondaryActivityIDs": [
		866
	],
	"companyAttachmentIDs": null
}
```

#### Frequência de pagamento (`paymentFrequencyID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 51            | Mensal          |
| 52            | Trimestral      |
| 53            | Semestral       |

#### Capitalização de taxa (`growthType`):

| Correspondência | Significado                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LINEAR          | Adota fórmulas de juros compostos na parte inteira do período e uma formação de juros simples na parte fracionária. Ex: 1 ano e 6 meses de contrato = 1 (JC) + 0,6 (JS).                                                                       |
| EXPONENTIAL     | Adota o regime de capitalização para todo o período, é mais usada porque emprega o juros compostos e taxas equivalentes para os períodos não inteiros, tornando o valor mais próximo da realidade. Ex: 1 ano e 6 meses de contrato = 1,6 (JC). |

_Legenda: JC = Juros compostos | JS = Juros simples._

#### Tipo de pagamento (`paymentTypeID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | Boleto          |
| 2             | Débito em conta |

#### Tipo de documento adicional (`typeID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | CNH             |
| 2             | Passaporte      |
| 3             | RG              |

#### Status da operação (`operationStatusID`):

:::info Atente-se
Os status listados nesta API Rest variam de acordo com os status criados pela Organização.
:::

Padrão de API:

```js
GET {{ _.base_url }}/api/operation-statuses/list
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-statuses/list
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"id": 665,
		"createdAt": "2023-12-21T19:26:10.473238Z",
		"updatedAt": "2023-12-21T19:26:10.473243Z",
		"createdByID": null,
		"updatedByID": null,
		"enabled": true,
		"text": "Em análise",
		"code": "EM_ANALISE_ZXHDERO",
		"colorHex": "4573ec33",
		"operationCount": 3
	},
	{
# highlight-next-line
		"id": 710,
		"createdAt": "2023-12-21T22:42:48.855745Z",
		"updatedAt": "2023-12-21T22:42:48.85575Z",
		"createdByID": null,
		"updatedByID": null,
		"enabled": true,
		"text": "PAGO",
		"code": "PAGO_HRPNNTP",
		"colorHex": "92cc8233",
		"operationCount": 0
	},
	...
]
```

#### Tipo de empresa (`companyType`):

| Identificador | Correspondência         |
| ------------- | ----------------------- |
| MN            | Organização             |
| AO            | Agente                  |
| AF            | Conveniada              |
| CB            | Correspondente bancário |
| CS            | Cessionária             |

#### Número de funcionários (`employeeCountRangeID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | Mais de 1000    |
| 2             | 11 a 25         |
| 3             | 25 a 50         |
| 4             | 100 a 1000      |
| 5             | 50 a 100        |
| 6             | 1 a 10          |

#### Tipo de empresa (`companyHierarchyTypeID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | Matriz          |
| 51            | Filial          |

#### Endereço: Estado (`level1AdminDivID`), Cidade (`level2AdminDivID`):

:::info Atente-se
Esta API é utilizada para os casos em que é necessário fornecer o endereço completo.
:::

Padrão de API:

```js
GET {{ _.base_url }}/api/addresses/{cep}
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/addresses/92025840
```

Exemplo de resposta:

```bash showLineNumbers
{
	"postalCode": "92025840",
	"countryID": 51,
	"country": {
		"id": 51,
		"text": "BRASIL",
		"enabled": true
	},
	"line1": "Avenida Açucena",
#highlight-start
	"level1AdminDivID": 23,
	"level1AdminDiv": {
		"id": 23,
		"name": "Rio Grande do Sul",
		"countryID": 51,
		"abbreviation": "RS",
		"code": "43"
	},
	"level2AdminDivID": 4686,
	"level2AdminDiv": {
		"id": 4686,
		"name": "CANOAS",
		"abbreviation": "RS",
		"code": "4304606",
		"level1AdminDivID": 23
	},
#highlight-end
	"neighborhood": "Estância Velha",
	"latitude": -29.91714,
	"longitude": -51.15487
}
```

#### Nacionalidade, País (`nationalityID`, `countryID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 51            | Brasil          |

#### Nacionalidade (Estado), Estado do órgão emissor, Estado do Gravame (`birthplaceLevel1AdminDivID`, `ufID`, `lienStateID`):

Padrão de API:

```js
GET {{ _.base_url }}/api/level-1-admin-divs/list
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/level-1-admin-divs/list
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"id": 23,
		"name": "Rio Grande do Sul",
		"countryID": 51,
		"abbreviation": "RS",
		"code": "43"
	},
	{
# highlight-next-line
		"id": 19,
		"name": "Rio de Janeiro",
		"countryID": 51,
		"abbreviation": "RJ",
		"code": "33"
	},
	...
]
```

#### Nacionalidade (Cidade) (`birthplaceLevel2AdminDivID`):

Padrão de API:

```js
GET {{ _.base_url }}/api/level-2-admin-divs/list?filters[level1AdminDivID][$eq]={id}
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/level-2-admin-divs/list?filters[level1AdminDivID][$eq]=23
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"id": 4932,
		"name": "PORTO ALEGRE",
		"abbreviation": "RS",
		"code": "4314902",
		"level1AdminDivID": 23
	},
	{
# highlight-next-line
		"id": 4789,
		"name": "GRAMADO",
		"abbreviation": "RS",
		"code": "4309100",
		"level1AdminDivID": 23
	},
	...
]
```

#### Estado civil (`civilStatusID`):

| Identificador | Correspondência                     |
| ------------- | ----------------------------------- |
| 1             | Divorciado(a)                       |
| 2             | Casado(a)                           |
| 3             | Separado(a)                         |
| 4             | Solteiro(a)                         |
| 5             | Viúvo(a)                            |
| 51            | Casado com comunhão total de bens   |
| 52            | Casado com comunhão parcial de bens |
| 53            | Casado com separação total de bens  |
| 54            | União estável                       |

#### Escolaridade (`educationLevelID`):

| Identificador | Correspondência        |
| ------------- | ---------------------- |
| 1             | Superior completo      |
| 2             | Médio incompleto       |
| 3             | Fundamental incompleto |
| 4             | Fundamental completo   |
| 5             | Mestrado               |
| 6             | Superior incompleto    |
| 7             | Médio completo         |
| 8             | Analfabeto             |
| 9             | Doutorado              |

#### Sexo (`sexID`):

| Identificador | Correspondência      |
| ------------- | -------------------- |
| 1             | Masculino            |
| 2             | Prefiro não informar |
| 3             | Feminino             |

#### Tipo de link social (`social-network-types`):

| Identificador | Correspondência      |
| ------------- | -------------------- |
| 51            | Instagram            |
| 52            | LinkedIn empresarial |
| 53            | LinkedIn pessoal     |
| 54            | Outro                |
| 55            | Facebook             |
| 56            | Site                 |
| 57            | Pinterest            |
| 58            | X (Twitter)          |

#### Tipo de conta (`accountTypeID`):

| Identificador | Correspondência     |
| ------------- | ------------------- |
| 1             | Conta corrente      |
| 2             | Conta salário       |
| 3             | Conta de depósitos  |
| 4             | Conta poupança      |
| 5             | Conta de pagamento  |
| 6             | Conta universitária |

#### Tipo de chave PIX da conta (`accountPixKeyTypeID`):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | Celular         |
| 2             | E-mail          |
| 3             | CNPJ            |
| 4             | CPF             |
| 5             | Chave aleatória |

#### Banco (`bankID`):

Padrão de API:

```js
GET {{ _.base_url }}/api/banks/list
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/banks/list
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"id": 401,
		"createdAt": "2023-10-09T12:41:37.243219Z",
		"updatedAt": "2023-10-09T12:41:37.243225Z",
		"createdByID": null,
		"updatedByID": null,
		"enabled": true,
		"altCode": 0,
		"name": "BCO DO BRASIL S.A.",
		"code": 1,
		"fullName": "Banco do Brasil S.A."
	},
	{
# highlight-next-line
		"id": 410,
		"createdAt": "2023-10-09T12:41:37.251317Z",
		"updatedAt": "2023-10-09T12:41:37.251321Z",
		"createdByID": null,
		"updatedByID": null,
		"enabled": true,
		"altCode": 360305,
		"name": "CAIXA ECONOMICA FEDERAL",
		"code": 104,
		"fullName": "CAIXA ECONOMICA FEDERAL"
	},
	...
]
```

#### Profissão (`professionID`):

Padrão de API:

```js
GET {{ _.base_url }}/api/professions/list
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/professions/list
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"id": 538,
		"text": "REITOR",
		"enabled": true
	},
	{
# highlight-next-line
		"id": 318,
		"text": "ELETRICISTA",
		"enabled": true
	},
	{
# highlight-next-line
		"id": 107,
		"text": "BIBLIOTECÁRIO",
		"enabled": true
	},
	...
]
```

#### Tipo de vínculo societário (businessPartnerTypeID):

| Identificador | Correspondência |
| ------------- | --------------- |
| 1             | Representante   |
| 2             | Sócio           |

#### Tipo de vínculo (`relationshipTypeID`):

| Identificador | Correspondência      | Tipo de Avalista |
| ------------- | -------------------- | ---------------- |
| 1             | Sobrinho ou sobrinha | PERSON           |
| 2             | Cônjuge              | PERSON           |
| 3             | Bisneto ou bisneta   | PERSON           |
| 4             | Neto ou neta         | PERSON           |
| 5             | Outro                | COMPANY          |
| 6             | Tio ou tia           | PERSON           |
| 7             | Pai ou mãe           | PERSON           |
| 8             | Avô ou avó           | PERSON           |
| 9             | Irmão ou irmã        | PERSON           |
| 10            | Filho ou filha       | PERSON           |
| 11            | Bisavô ou bisavó     | PERSON           |
| 52            | Sócio                | COMPANY          |
| 53            | Outro                | PERSON           |
| 54            | Sócio                | PERSON           |

#### Modalidade de garantia (`collateralTypeID`):

| Identificador | Correspondência      |
| ------------- | -------------------- |
| 1             | Alienação fiduciária |

#### Tipo de outras garantias (`asset-types`):

| Identificador | Correspondência                   |
| ------------- | --------------------------------- |
| 151           | Celular/Eletrônicos               |
| 152           | Demais máquinas                   |
| 153           | Equipamentos agrícolas            |
| 154           | Equipamentos alimentícios         |
| 155           | Equipamentos de som               |
| 156           | Equipamentos estéticos            |
| 157           | Equipamentos médicos              |
| 158           | Equipamentos odontológicos        |
| 159           | Equipamentos para academia        |
| 160           | Equipamentos veterinários         |
| 161           | Impressoras/Equipamentos gráficos |
| 162           | Instrumentos musicais             |
| 163           | Máquinas CNC                      |
| 164           | Materiais para veículos           |
| 165           | Móveis planejados                 |
| 166           | Outro                             |
| 167           | Veículos                          |
| 168           | Imóveis                           |

### Garantias de veículo

Nossa API para o envio de informações de veículos em garantia adere estritamente à [**tabela Fipe**](https://veiculos.fipe.org.br/). Portanto, por favor, siga esta sequência de ordenação para extrair os dados com precisão e formate sua requisição adequadamente.

#### 1 - Tipo de veículo (`vehicle-types`):

Padrão de API:

```js
GET {{ _.base_url }}/api/fipe/vehicle-types
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/fipe/vehicle-types
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
# highlight-next-line
		"code": 1,
		"text": "CAR"
	},
	{
# highlight-next-line
		"code": 2,
		"text": "MOTORCYCLE"
	},
	{
# highlight-next-line
		"code": 3,
		"text": "TRUCK"
	}
]
```

#### 2 - Marca do veículo (`brands`):

Padrão de API:

```js
GET {{ _.base_url }}/api/fipe/vehicle-types/{vehicleTypeCode}/brands
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/fipe/vehicle-types/1/brands
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
		"id": 415,
		"text": "Mercedes-Benz",
		"enabled": true,
# highlight-next-line
		"fipeBrandCode": 39,
		"fipeVehicleType": "CAR",
		"fipeReferenceTableCode": 305,
		"fipeReferenceTable": {
			"id": 1,
			"createdAt": "2023-12-21T13:55:46.910126Z",
			"updatedAt": "2024-01-02T15:03:34.833771Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"referenceTable": 305,
			"yearMonth": "2024-01"
		}
	},
	...
]
```

#### 3 - Modelo do veículo (`models`):

Padrão de API:

```js
GET {{ _.base_url }}/api/fipe/vehicle-types/{vehicleTypeCode}/brands/{brandCode}/models
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/fipe/vehicle-types/1/brands/39/models
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
		"id": 1073,
		"text": "C-250 CGI Sport 1.8 16V Aut.",
		"enabled": true,
# highlight-next-line
		"fipeModelCode": 5500,
		"fipeBrandCode": 39,
		"fipeReferenceTableCode": 305,
		"fipeBrand": {
			"id": 415,
			"text": "Mercedes-Benz",
			"enabled": true,
			"fipeBrandCode": 39,
			"fipeVehicleType": "CAR",
			"fipeReferenceTableCode": 305,
			"fipeReferenceTable": {
			"id": 1,
			"createdAt": "2023-12-21T13:55:46.910126Z",
			"updatedAt": "2024-01-02T15:03:34.833771Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"referenceTable": 305,
			"yearMonth": "2024-01"
			}
		},
		"fipeReferenceTable": {
			"id": 1,
			"createdAt": "2023-12-21T13:55:46.910126Z",
			"updatedAt": "2024-01-02T15:03:34.833771Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"referenceTable": 305,
			"yearMonth": "2024-01"
		},
		"fipeVehicleType": "CAR"
	},
	...
]
```

#### 4 - Ano do modelo do veículo (`years`):

Padrão de API:

```js
GET {{ _.base_url }}/api/fipe/vehicle-types/{vehicleTypeCode}/brands/{brandCode}/models/{modelCode}/years
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/fipe/vehicle-types/1/brands/39/models/5500/years
```

Exemplo de resposta:

```bash showLineNumbers
[
	{
		"id": 1001,
		"text": "2014 Gasolina",
		"enabled": true,
# highlight-next-line
		"fipeModelYear": 2014,
# highlight-next-line
		"fipeFuelType": 1,
		"fipeModelCode": 5500,
		"fipeBrandCode": 39,
		"fipeReferenceTableCode": 305,
		"fipeBrand": {
			"id": 415,
			"text": "Mercedes-Benz",
			"enabled": true,
			"fipeBrandCode": 39,
			"fipeVehicleType": "CAR",
			"fipeReferenceTableCode": 305,
			"fipeReferenceTable": {
			"id": 1,
			"createdAt": "2023-12-21T13:55:46.910126Z",
			"updatedAt": "2024-01-02T15:03:34.833771Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"referenceTable": 305,
			"yearMonth": "2024-01"
			}
		},
		"fipeModel": {
			"id": 1073,
			"text": "C-250 CGI Sport 1.8 16V Aut.",
			"enabled": true,
			"fipeModelCode": 5500,
			"fipeBrandCode": 39,
			"fipeReferenceTableCode": 305,
			"fipeBrand": {
			"id": 415,
			"text": "Mercedes-Benz",
			"enabled": true,
			"fipeBrandCode": 39,
			"fipeVehicleType": "CAR",
			"fipeReferenceTableCode": 305,
			"fipeReferenceTable": {
				"id": 1,
				"createdAt": "2023-12-21T13:55:46.910126Z",
				"updatedAt": "2024-01-02T15:03:34.833771Z",
				"createdByID": null,
				"updatedByID": null,
				"enabled": true,
				"referenceTable": 305,
				"yearMonth": "2024-01"
			}
			},
			"fipeReferenceTable": {
			"id": 1,
			"createdAt": "2023-12-21T13:55:46.910126Z",
			"updatedAt": "2024-01-02T15:03:34.833771Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"referenceTable": 305,
			"yearMonth": "2024-01"
			},
			"fipeVehicleType": "CAR"
		},
		"fipeReferenceTable": null,
		"fipeVehicleType": "CAR"
	},
	...
]
```

#### 5 - Tipo de combustível do veículo (`fuel-types`):

Padrão de API:

```js
GET {{ _.base_url }}/api/fipe/vehicle-types/{vehicleTypeCode}/brands/{brandCode}/models/{modelCode}/years/{year}/fuel-types/{fuelTypeCode}
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/fipe/vehicle-types/1/brands/39/models/5500/years/2014/fuel-types/1
```

Exemplo de resposta:

```bash showLineNumbers
{
	"Valor": "R$ 102.306,00",
	"Marca": "Mercedes-Benz",
	"Modelo": "C-250 CGI Sport 1.8 16V Aut.",
	"AnoModelo": 2014,
	"Combustivel": "Gasolina",
	"CodigoFipe": "021242-3",
	"MesReferencia": "janeiro de 2024 ",
	"Autenticacao": "f58vkjmrzpcsv",
	"TipoVeiculo": 1,
	"SiglaCombustivel": "G",
	"DataConsulta": "quarta-feira, 31 de janeiro de 2024 11:39"
}
```

#### Pessoas relacionadas da operação:

:::info Atributos importantes para requisição

Você vai precisar do `operationID` para listar as `Pessoas relacionadas` a essa operação.

:::

Padrão de API:

```js
GET {{ _.base_url }}/api/operations-disbursements/operation/{operationID}/related-persons
```

Exemplo de rota:

```js
GET https://{empresa}.titan.ceoslab.app/api/operations-disbursements/operation/6802/related-persons
```

Exemplo de resposta:

```bash showLineNumbers
[
    {
        "personID": 5308,
        "person": {
            "id": 5308,
            "createdAt": "2023-12-26T18:21:06.449044Z",
            "updatedAt": "2024-03-13T15:27:29.363105Z",
            "createdByID": 2766,
            "updatedByID": 2766,
            "enabled": true,
            "email": "teste@teste.com.br",
            "fullName": "USUARIO TESTE",
            "displayName": null,
            "documentNumber": "45317828791",
            "documentNumberAlt": null,
            "documentIssuingBody": null,
            "mobilePhoneNumber": "21390238213",
            "landlinePhoneNumber": null,
            "mothersFullName": null,
            "fathersFullName": null,
            "nationalityID": null,
            "birthplaceLevel1AdminDivID": null,
            "birthplaceLevel2AdminDivID": null,
            "birthdate": "1970-02-01",
            "civilStatusID": null,
            "civilStatus": null,
            "educationLevelID": null,
            "educationLevel": null,
            "sexID": 1,
            "sex": {
                "id": 1,
                "text": "MASCULINO",
                "enabled": true
            },
            "netWorth": 0.00,
            "provenIncome": null,
            "presumedIncomeCdl": "FROM_7001_TO_9000",
            "presumedIncomeCodeCdl": 9,
            "declaredIncome": 100000.00,
            "authRoleID": null,
            "authRole": null,
            "hasAuth": false
        },
        "companyID": null,
        "company": null,
        "personAccounts": [
            {
                "accountNumber": "99999999",
                "accountNumberDigit": "99",
                "accountPixKey": "41000240000173",
                "accountPixKeyTypeID": 3,
                "accountPixKeyTypeMask": null,
                "accountTypeID": 5,
                "agencyNumber": "99999",
                "bank":{
                    id: 750,
                    createdAt: "2023-10-09T12:41:37.606373Z",
                    updatedAt: "2023-10-09T12:41:37.606376Z"
                },
                "altCode": 90400888,
                "code": 33,
                "createdAt": "2023-10-09T12:41:37.606373Z",
                "createdByID": null,
                "enabled": true,
                "fullName": "BANCO SANTANDER (BRASIL) S.A.",
                "id": 750,
                "name": "BCO SANTANDER (BRASIL) S.A.",
                "updatedAt": "2023-10-09T12:41:37.606376Z",
                "updatedByID": null,
                "bankID": 750,
                "personID": 5308,
                "createdAt": "2024-02-28T12:58:47.721824Z",
                "createdByID": 3254,
                "documentNumber": "41000240000173",
                "enabled": true,
                "holderName": "CEOS LAB TECNOLOGIA LTDA",
                "id": 702,
                "primaryAccount": false,
                "updatedAt": "2024-03-20T15:14:11.674013Z",
                "updatedByID": 2761,
                },
        ],
        "companyAccounts": null,
        "operationDisbursement": null,
        "type": "CUSTOMER",
    },
]
```

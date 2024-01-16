---
sidebar_position: 2
---

# 🚩 Criação

No contexto do Titan CaaS, a **criação de operação** representa o ponto de partida para a originação de solicitações de crédito, empréstimos e outras transações financeiras.

Essa funcionalidade essencial permite que as instituições financeiras iniciem e personalizem cada operação de maneira intuitiva, estabelecendo parâmetros específicos e requisitos detalhados para o processo em questão.

Ao utilizar a criação de operação, as organizações podem adaptar estrategicamente as operações às necessidades variáveis, garantindo uma análise de crédito precisa e eficiente. Esse recurso no Titan CaaS não apenas simplifica o início de novas operações de crédito, mas também proporciona flexibilidade crucial para ajustar dinamicamente as operações em resposta às mudanças no ambiente financeiro.

:::info Documentos

Para inclusão de documentos em uma operação, consulte a página [Documentos](/operacao/documentos).

:::

## Parâmetros de envio

### Operação

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Habilitado | ```enabled``` | Sim | ```true``` ou ```false``` | - |
| Código da operação | ```operationCode``` | Sim | ```null``` | - |
| Código do workflow | ```workflowExecutionID``` | Sim | ```null``` | - |
| Data do aceite | ```acceptanceDate``` | Sim | Date | - |
| Data do primeiro vencimento | ```firstDueDate``` | Sim | Date | - |
| Quantidade de parcelas | ```installmentQuantity``` | Sim | Number | - |
| TFC (Tarifa de Ficha Cadastral) | ```tfc``` | Sim | Number | - |
| Percentual do TFC | ```tfcPct``` | Não | Number | - |
| Taxa de juros ao mês | ```monthlyInterestRate``` | Sim | Number | - |
| Taxa do IOF | ```iofRate``` | Sim | Number | - |
| Taxa adicional do IOF | ```additionalIOFRate``` | Sim | Number | - |
| Valor total do IOF | ```totalIOFValue``` | Sim | Number | - |
| Valor financiado do IOF | ```financedIOFValue``` | Sim | Number | - |
| Período de carência | ```gracePeriod``` | Sim | Number | - |
| TEC mensal | ```monthlyTEC``` | Sim | Number | - |
| TEC anual | ```yearlyTEC``` | Sim | Number | - |
| Valor liberado | ```disbursementAmount``` | Sim | Number | - |
| Valor total liberado | ```totalDisbursementAmount``` | Sim | Number | - |
| Valor solicitado | ```requestedValue``` | Sim | Number | - |
| Valor total | ```totalValue``` | Sim | Number | - |
| Entrada | ```downPayment``` | Sim | Number | - |
| Percentual do seguro prestamista | ```creditLifeInsurancePct``` | Sim | Number | - |
| Seguro prestamista | ```creditLifeInsurance``` | Sim | Number | - |
| Valor adicional do Seguro | ```additionalInsuranceValue``` | Sim | Number | - |
| Financiar IOF | ```financeIOF``` | Não | Boolean | ```true``` |
| Financiar TFC | ```financeTFC``` | Não | Boolean | ```true``` |
| Financiar seguro prestamista | ```financeCreditLifeInsurance``` | Não | Boolean | ```true``` |
| Financiar seguro adicional | ```financeAdditionalInsurance``` | Não | Boolean | ```false``` |
| Venda presencial | ```inPersonSale``` | Não | Boolean | ```false``` |
| Capitalização de taxa | ```growthType``` | Sim | ```EXPONENTIAL``` ou ```LINEAR``` | ```EXPONENTIAL``` |
| Fator da parcela | ```installmentFactor``` | Sim | Number | - |
| Coeficiente | ```coefficient``` | Sim | Number | - |
| Valor da parcela sem IOF | ```installmentValueWithoutIOF``` | Sim | Number | - |
| Valor da parcela com IOF | ```installmentValueWithIOF``` | Sim | Number | - |
| Valor financiado | ```financedValue``` | Sim | Number | - |
| Descrição do bem | ```assetDescription``` | Não | String | - |
| Código da frequência de pagamento | ```paymentFrequencyID``` | Sim | Number | - |
| Código do tipo de pagamento | ```paymentTypeID``` | Sim | Number | - |
| Código da parametrização do produto | ```productVariantID``` | Sim | Number | - |
| Código do produto | ```productID``` | Sim | Number | - |
| Código do status da operação | ```operationStatusID``` | Não | Number | - |
| Status da operação | ```operationStatus``` | Não | String | - |
| Código da empresa originadora | ```originatingCompanyID``` | Sim | Number | - |
| Tipo da empresa originadora | ```originatingCompanyType``` | Sim | String | - |
| Código da empresa | ```companyID``` | Sim | Number | - |
| Tipo de empresa | ```companyType``` | Sim | String | - |

### Cliente

#### Pessoa física

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

#### Pessoa jurídica

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```customer```. Exemplo:

```bash showLineNumbers
"customer": {
    [...]
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código do cliente | ```id``` | Sim | Number | - |
| Data de criação | ```createdAt``` | Sim | Date | - |
| Data de atualização | ```updatedAt``` | Sim | Date | - |
| Código do usuário que criou | ```createdByID``` | Sim | Number | - |
| Código do usuário que atualizou | ```updatedByID``` | Sim | Number | - |
| Habilitado | ```enabled``` | Sim | ```true``` ou ```false``` | - |
| Tipo de cliente | ```customerType``` | Sim | ```PERSON``` ou ```COMPANY``` | ```COMPANY``` |
| Código da pessoa | ```personID``` | Não | Number | ```null``` |
| Código da empresa | ```companyID``` | Sim | Number | - |
| Pessoa | ```person``` | Não | - | ```null``` |

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```company```, que se encontra dentro da tag de ```customer```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        [...]
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código da empresa | ```id``` | Sim | Number | - |
| Data de criação | ```createdAt``` | Sim | Date | - |
| Data de atualização | ```updatedAt``` | Sim | Date | - |
| Código do usuário que criou | ```createdByID``` | Sim | Number | - |
| Código do usuário que atualizou | ```updatedByID``` | Sim | Number | - |
| Habilitado | ```enabled``` | Sim | Boolean | ```true``` |
| CNPJ | ```documentNumber``` | Sim | String | - |
| Razão social | ```legalName``` | Sim | String | - |
| Nome fantasia | ```tradeName``` | Não | String | - |
| E-mail | ```email``` | Não | String | - |
| Descrição | ```description``` | Não | - | - |
| Número de celular | ```mobilePhoneNumber``` | Não | String | - |
| Número de telefone comercial | ```landlinePhoneNumber``` | Não | String | - |
| Data da constituição | ```incorporationDate``` | Sim | Date | - |
| Capital social | ```shareCapital``` | Sim | Number | - |
| Patrimônio líquido | ```equity``` | Sim | Number | - |
| Faturamento médio mensal | ```monthlyAverageRevenue``` | Não | Number | - |
| Inscrição estadual | ```stateTaxNumber``` | Não | String | - |
| Inscrição municipal | ```cityTaxNumber``` | Não | String | - |
| Optante pelo Simples Nacional | ```simplifiedTax``` | Não | Boolean | ```false``` |
| Código do status de registro da empresa | ```companyRegistrationStatusID``` | Sim | Number | - |
| Código do porte da empresa | ```companyDimensionTypeID``` | Sim | Number | - |
| Código do intervalo de número de funcionários | ```employeeCountRangeID``` | Não | Number | ```null``` |
| Intervalo de número de Funcionários | ```employeeCountRange``` | Não | String | - |
<!--| Ganho | ```earnings``` | Não | - | - | -->

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```companyRegistrationStatus```, que se contra dentro de ```company```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        "companyRegistrationStatus": {
            [...]
        }
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código | ```id``` | Sim | Number | - |
| Texto | ```text``` | Sim | String | ```ATIVA``` |
| Habilitado | ```enabled``` | Sim | Boolean | - |

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```companyDimensionType```, que se contra dentro de ```company```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        "companyDimensionType": {
            [...]
        }
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código | ```id``` | Sim | Number | - |
| Texto | ```text``` | Sim | String | ```DEMAIS``` |
| Habilitado | ```enabled``` | Sim | Boolean | - |
| Identificador | ```code``` | Sim | Number | - |

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```address```, que se contra dentro de ```company```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        "address": {
            [...]
        }
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código | ```id``` | Sim | Number | - |
| Data de criação | ```createdAt``` | Sim | Date | - |
| Data de atualização | ```updatedAt``` | Sim | Date | - |
| Código do usuário que criou | ```createdByID``` | Sim | Number | - |
| Código do usuário que atualizou | ```updatedByID``` | Sim | Number | - |
| Habilitado | ```enabled``` | Sim | ```true``` ou ```false``` | - |
| CEP | ```postalCode``` | Sim | String | - |
| Código do País | ```countryID``` | Sim | Number | - |
| Código do Estado | ```level1AdminDivID``` | Sim | Number | - |
| Código da Cidade | ```level2AdminDivID``` | Sim | Number | - |
| Código da País | ```level3AdminDivID``` | Não | Number | ```null``` |
| Endereço | ```line1``` | Sim | String | - |
| Complemento | ```line2``` | Não | String | - |
| Número | ```houseNumber``` | Sim | String | - |
| Bairro | ```neighborhood``` | Sim | String | - |
| Latitude | ```latitude``` | Não | Number | ```null``` |
| Longitude | ```longitude``` | Não | Number | ```null``` |
| Código da empresa | ```companyID``` | Sim | Number | - |

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```level1AdminDiv```, que se contra dentro de ```address```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        "address": {
            "level1AdminDiv": {
                [...]
            }
        }
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código | ```id``` | Sim | Number | - |
| Estado | ```name``` | Sim | String | - |
| Código do País | ```countryID``` | Sim | Number | - |
| Abreviação do Estado | ```abbreviation``` | Sim | String | - |
| Identificador | ```code``` | Sim | String | - |

<br />

:::warning Atenção!

Os campos abaixo são adicionados dentro da tag ```level2AdminDiv```, que se contra dentro de ```address```. Exemplo:

```bash showLineNumbers
"customer": {
    "company": {
        "address": {
            "level2AdminDiv": {
                [...]
            }
        }
    }
}    
```

:::

<br />

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Código | ```id``` | Sim | Number | - |
| Cidade | ```name``` | Sim | String | - |
| Abreviação do Estado | ```abbreviation``` | Sim | String | - |
| Identificador | ```code``` | Sim | String | - |
| Código do Estado | ```level1AdminDivID``` | Sim | Number | - |

### Avalista(s)

:::info Inclusão de avalistas em uma operação

A inclusão de Avalistas em uma operação não é estritamente obrigatória; no entanto, se optar por incluí-los, é vital enviar alguns campos obrigatórios para garantir uma análise mais precisa.

:::

#### Pessoa física

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Nome completo | ```id-guarantor``` | Sim | Nome completo do avalista |
| CPF | ```cpf-guarantor``` | Sim | CPF do avalista |
| Data de nascimento | ```birthdate-guarantor``` | Sim | Data de nascimento do avalista |

#### Pessoa jurídica

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Razão social | ```id-guarantor``` | Sim | Razão social do avalista |
| CNPJ | ```cnpj-guarantor``` | Sim | CNPJ do avalista |
| Data da constituição | ```created-company-guarantor``` | Sim | Data da constituição do avalista |

### Garantia(s)

#### Veículo

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Modalidade de garantia | ```guarantee-modalities``` | Sim | Modalidade da garantia |
| Tipo do bem | ```asset-type``` | Sim | Tipo do bem |

<br />

:::info Tipo de bem

Para garantias de veículo, campo tipo de bem ```asset-type``` passar sempre o valor: *Veículo* obrigatoriamente.

:::

#### Outras garantias

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Modalidade de garantia | ```guarantee-modalities``` | Modalidade da garantia |
| Tipo do bem | ```asset-type``` | Tipo do bem |
| Valor | ```asset-price``` | Valor do bem (R$) |
| CPF/CNPJ | ```cpf-cnpj-faithful-depositary``` | CPF/CNPJ do fiél depositário |
| Fiél depositário | ```identify-faithful-depositary``` | Nome completo/razão social do fiél depositário |
| Bem a ser financiado | ```asset-financial``` | Informativo ```true``` ou ```false``` para informar se este bem será financiado junto a operação |
| Descrição da garantia | ```guarantee-description``` | Descrição da garantia |
| CEP | ```guarantee-cep``` | CEP do local da garantia |
| Endereço | ```guarantee-address``` | Endereço completo do local da garantia |
| Número | ```guarantee-number``` | Número identificador do local da garantia |
| Complemento | ```guarantee-complement``` | Complemento identificador do local da garantia |
| Bairro | ```guarantee=neighborhood``` | Bairro do local da garantia |
| Cidade | ```guarantee-city``` | Cidade do local da garantia |
| Estado | ```guarantee-state``` | Estado do local da garantia |
| País | ```guarantee-country``` | País do local da garantia |

#### Imóvel

As garantias de imóvel estarão disponíveis em breve. ⏱️

## Parâmetros de retorno

### Exemplo de resposta

```js
/api/operations
````

```bash showLineNumbers
{
	"id": 4454,
	"createdAt": "2023-12-28T20:11:23.477314Z",
	"updatedAt": "2023-12-28T20:11:23.477317Z",
	"createdByID": 1,
	"updatedByID": 1,
	"enabled": true,
	"operationCode": 209,
	"workflowExecutionID": 9325,
	"acceptanceDate": "2023-12-28",
	"firstDueDate": "2024-01-03",
	"installmentQuantity": 24,
	"tfc": 1500,
	"tfcPct": null,
	"monthlyInterestRate": 0.0279,
	"iofRate": 0.000041,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 1415.06,
	"financedIOFValue": 1435.07,
	"gracePeriod": 6,
	"monthlyTEC": 0.03074942472,
	"yearlyTEC": 0.438259373214,
	"disbursementAmount": 100000,
	"totalDisbursementAmount": 100000,
	"requestedValue": 100000,
	"totalValue": 140044.8,
	"downPayment": 10,
	"creditLifeInsurancePct": 0,
	"creditLifeInsurance": 0,
	"additionalInsuranceValue": 0,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"installmentFactor": 17.640365996796,
	"coefficient": 0.056688166231,
	"installmentValueWithoutIOF": 5753.84,
	"installmentValueWithIOF": 5835.2,
	"financedValue": 101500,
	"assetDescription": null,
	"paymentFrequencyID": 51,
	"paymentTypeID": 1,
	"productVariantID": 1501,
	"productID": 1402,
	"customerID": 2701,
	"operationStatusID": null,
	"operationStatus": null,
	"originatingCompanyID": 1551,
	"originatingCompanyType": "MN",
	"companyID": 1551,
	"companyType": "MN",
	"productVariant": null,
	"product": null,
	"customer": null,
	"agencyOffice": null,
	"customerAttachments": null,
	"guarantors": null,
	"committeeMembers": null,
	"collaterals": null,
	"assessments": null,
	"operationDisbursements": null,
	"installments": null,
	"operationSignatures": null,
	"operationMembers": null,
	"conversationID": null,
	"operationAttachmentIDs": null
}
```
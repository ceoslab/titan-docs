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

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **criação de uma operação por meio da API**. Esteja atento à especificação dos objetos, distinguindo entre pessoa física e jurídica.

### Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Data do aceite | ```acceptanceDate``` | Sim | Date | - |
| Data do primeiro vencimento | ```firstDueDate``` | Sim | Date | - |
| Quantidade de parcelas | ```installmentQuantity``` | Sim | Number | - |
| Valor solicitado | ```requestedValue``` | Sim | Number | - |
| Entrada | ```downPayment``` | Sim | Number | - |
| Financiar IOF | ```financeIOF``` | Sim |  Boolean | ```true``` |
| Financiar TFC | ```financeTFC``` | Sim | Boolean | ```true``` |
| Financiar seguro prestamista | ```financeCreditLifeInsurance``` | Sim | Boolean | ```true``` |
| Financiar seguro adicional | ```financeAdditionalInsurance``` | Sim | Boolean | ```true``` |
| Venda presencial | ```inPersonSale``` | Sim | Boolean | ```false``` |
| Capitalização de taxa | ```growthType``` | Sim | ```EXPONENTIAL``` ou ```LINEAR``` | ```EXPONENTIAL``` |
| Descrição do bem | ```assetDescription``` | Não | String | - |
| Identificador da frequência de pagamento | ```paymentFrequencyID``` | Sim | Number | - |
| Identificador do tipo de pagamento | ```paymentTypeID``` | Sim | Number | - |
| Identificador do produto | ```productID``` | Sim | Number | - |
| Identificador do status da operação | ```operationStatusID``` | Sim | Number | - |
| Identificador da empresa | ```companyID``` | Sim | Number | - |
| Tipo de empresa | ```companyType``` | Sim | String | ```MN``` |
| Cliente | ```customer``` | Sim | Objeto | - |
| Agente | ```agencyOffice``` | Não | - | ```null``` |
| Anexos do cliente | ```customerAttachments``` | Não | - | ```null``` |
| Avalistas | ```guarantors``` | Não | Array | [] |
| Membros do comitê | ```committeeMembers``` | Não | Array | [] |
| Garantias | ```collaterals``` | Não | Array | [] |
| Pareceres | ```assessments``` | Não | Array | [] |
| Desembolsos da operação | ```operationDisbursements``` | Não | Array | [] |

### Exemplo de requisição

```bash showLineNumbers
{
	"acceptanceDate": "2024-01-21",
	"firstDueDate": "2024-02-20",
	"installmentQuantity": 24,
	"requestedValue": 20000.00,
	"downPayment": 0.00,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": true,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"assetDescription": null,
	"paymentFrequencyID": 51,
	"paymentTypeID": 1,
	"productID": 1403,
	"operationStatusID": 554,
	"companyID": 1551,
	"companyType": "MN",
	"customer": {
		...,
	}	
	"agencyOffice": null,
	"customerAttachments": null,
	"guarantors": [],
	"committeeMembers": [],
	"collaterals": [],
	"assessments": [],
	"operationDisbursements": []
}
```

---

## Cliente (Pessoa física)

Os seguintes campos pertencem ao objeto ```customer```, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

#### Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Tipo de cliente | ```customerType``` | Sim | ```PERSON``` ou ```COMPANY``` | ```PERSON``` |
| Pessoa | ```person``` | Sim | Objeto ou ```null``` | - |
| Empresa | ```company``` | Não | Objeto ou ```null``` | ```null``` |
| Contagem de operações | ```operationCount``` | Sim | Number | - |
| Contagem de operações de Avalista | ```guarantorOperationCount``` | Sim | Number | - |

#### Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do objeto ```customer```. Exemplo:

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
	"operationCount": 14,
	"guarantorOperationCount": 1
}
```

---

### ```PERSON```: Parâmetros de envio

Os seguintes campos pertencem ao objeto ```person```, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| E-mail | ```email``` | Sim | String | - |
| Nome completo | ```fullName``` | Sim | String | - |
| Nome para exibição | ```displayName``` | Não | String ou ```null``` | - |
| Número do documento (CPF) | ```documentNumber``` | Sim | String | - |
| Número do documento alternativo | ```documentNumberAlt``` | Não | String ou ```null``` | - |
| Órgão emissor do documento | ```documentIssuingBody``` | Não | String ou ```null``` | - |
| Número de telefone celular | ```mobilePhoneNumber``` | Não | String ou ```null``` | - |
| Número de telefone fixo | ```landlinePhoneNumber``` | Não | String ou ```null``` | - |
| Nome completo da mãe | ```mothersFullName``` | Não | String ou ```null``` | - |
| Nome completo do pai | ```fathersFullName``` | Não | String ou ```null``` | - |
| Identificador da nacionalidade | ```nationalityID``` | Não | Number ou ```null``` | - |
| Identificador do Estado de nascimento | ```birthplaceLevel1AdminDivID``` | Não | Number ou ```null``` | - |
| Identificador da Cidade de nascimento | ```birthplaceLevel2AdminDivID``` | Não | Number ou ```null``` | - |
| Data de nascimento | ```birthdate``` | Sim | Date | - |
| Identificador do estado civil | ```civilStatusID``` | Sim | Number | - |
| Identificador do nível de educação | ```educationLevelID``` | Não | Number ou ```null``` | - |
| Identificador do sexo | ```sexID``` | Sim | Number | - |
| Patrimônio líquido | ```netWorth``` | Sim | Number | - |
| Renda comprovada | ```provenIncome``` | Não | Number ou ```null``` | - |
| Contas bancárias | ```accounts``` | Não | Objeto ou ```null``` | - |
| Links sociais | ```socialNetworks``` | Não | Objeto ou ```null``` | - |
| Documentos adicionais | ```additionalDocuments``` | Não | Objeto ou ```null``` | - |
| Ocupações | ```occupations``` | Não | Objeto ou ```null``` | - |
| Endereço | ```address``` | Não | Objeto ou ```null``` | - |
| Vinculo de empresas | ```linkedCompanies``` | Não | Objeto ou ```null``` | - |
| Autenticação | ```hasAuth``` | Não | Boolean | ```false``` |
| Identificador(es) dos anexos da pessoa | ```personAttachmentIDs``` | Não | Number | - |
| Identificador(es) das empresas vinculadas | ```linkedCompanyCompanyIDs``` | Não | Number | - |

### ```PERSON```: Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do objeto ```person```, que se encontram dentro do objeto ```customer```. Exemplo:

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
	"displayName": null,
	"documentNumber": "12345678900",
	"documentNumberAlt": null,
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
	"provenIncome": null,
	"accounts": [
		{
			...,
		}	
	]	
	"socialNetworks": {
		...,
	}	
	"additionalDocuments": {
		...,
	}	
	"occupations":[
		{
			...,
		}	
	]	
	"address": {
		...,
	}	
	"linkedCompanies": {
		...,
	}	
	"hasAuth": false,
	"personAttachmentIDs": [
		1351
	],
	"linkedCompanyCompanyIDs": []
}
```

---

#### ```accounts```: Parâmetros de envio

Os seguintes campos pertencem ao objeto ```accounts```, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Número da agência | ```agencyNumber``` | Sim | String | - |
| Número da conta | ```accountNumber``` | Sim | String | - |
| Dígito da conta | ```accountNumberDigit``` | Sim | String | - |
| Identificador do tipo de conta | ```accountTypeID``` | Sim | Number | - |
| Identificador do tipo de chave PIX da conta | ```accountPixKeyTypeID``` | Não | Number ou ```null``` | ```null``` |
| Chave Pix da conta | ```accountPixKey``` | Não | String ou ```null``` | ```null``` |
| Máscara do tipo de chave PIX da conta | ```accountPixKeyTypeMask``` | Não | String ou ```null``` | ```null``` |
| Identificador do banco | ```bankID``` | Sim | Number | - |
| Conta primária | ```primaryAccount``` | Não | Boolean | ```false``` |
| Nome do titular | ```holderName``` | Sim | String | - |
| Número do documento (CPF) | ```documentNumber``` | Sim | String | - |

#### ```accounts```: Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do array de ```accounts```, que se encontram dentro do objeto ```person```. Exemplo:

```bash showLineNumbers
"customer": {
	"person": {
		"accounts": [
			{
				...
			}
		]
	}
}
```

:::

```bash showLineNumbers
"accounts": [
	{
		"agencyNumber": "1516",
		"accountNumber": "25191984",
		"accountNumberDigit": "89",
		"accountTypeID": 1,
		"accountPixKeyTypeID": null,
		"accountPixKey": null,
		"accountPixKeyTypeMask": null,
		"bankID": 404,
		"primaryAccount": null,
		"holderName": "PESSOA TESTE DA SILVA",
		"documentNumber": "12345678900"
	}
]
```

---

#### ```occupations```: Parâmetros de envio

Os seguintes campos pertencem ao objeto ```occupations```, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Salário | ```salary``` | Sim | Number | - |
| Data de admissão | ```employmentStartDate``` | Sim | Date | - |
| Possui vínculo societário? | ```hasOwnershipLink``` | Sim | Boolean | - |
| Identificador da profissão | ```professionID``` | Sim | Number | - |
| Empresa | ```company``` | Sim | Objeto | - |
| Pessoa | ```person``` | Sim | Objeto | - |
| E-mail | ```email``` | Sim | String | - |
| Nome completo | ```fullName``` | Sim | String | - |
| Nome para exibição | ```displayName``` | Não | String ou ```null``` | - |
| Número do documento | ```documentNumber``` | Sim | String | - |
| Número do documento alternativo | ```documentNumberAlt``` | Não | String ou ```null``` | - |
| Órgão emissor do documento | ```documentIssuingBody``` | Não | String ou ```null``` | - |
| Número de telefone celular | ```mobilePhoneNumber``` | Não | String ou ```null``` | - |
| Número de telefone fixo | ```landlinePhoneNumber``` | Não | String ou ```null``` | - |
| Nome completo da mãe | ```mothersFullName``` | Não | String ou ```null``` | - |
| Nome completo do pai | ```fathersFullName``` | Não | String ou ```null``` | - |
| Identificador da nacionalidade | ```nationalityID``` | Não | Number ou ```null``` | - |
| Identificador do Estado de nascimento | ```birthplaceLevel1AdminDivID``` | Não | Number ou ```null``` | - |
| Identificador da Cidade de nascimento | ```birthplaceLevel2AdminDivID``` | Não | Number ou ```null``` | - |
| Data de nascimento | ```birthdate``` | Sim | Date | - |
| Identificador do estado civil | ```civilStatusID``` | Sim | Number | - |
| Identificador do nível de educação | ```educationLevelID``` | Não | Number ou ```null``` | - |
| Identificador do sexo | ```sexID``` | Sim | Number | - |
| Patrimônio líquido | ```netWorth``` | Sim | Number | - |
| Renda comprovada | ```provenIncome``` | Não | Number ou ```null``` | - |
| Autenticacão | ```hasAuth``` | Não | Boolean | ```null``` |

#### ```occupations```: Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do array de ```occupations```, que se encontram dentro do objeto ```person```. Exemplo:

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
			"email": "pessoateste@gmail.com",
			"fullName": "PESSOA TESTE DA SILVA",
			"displayName": null,
			"documentNumber": "12345678900",
			"documentNumberAlt": null,
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
			"provenIncome": null,
			"hasAuth": false
		},
		"businessPartner": null
	}
]
```

---

#### ```address```: Parâmetros de envio

Os seguintes campos pertencem ao objeto ```address```, dando prioridade às peculiaridades de **pessoa física**. Para utilizar as especificações de [pessoa jurídica](#cliente-pessoa-jurídica), acesse o objeto correspondente.

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| CEP | ```postalCode``` | Sim | String | - |
| Identificador do País | ```countryID``` | Sim | Number | ```51``` |
| Identificador do Estado | ```level1AdminDivID``` | Sim | Number | - |
| Identificador da Cidade | ```level2AdminDivID``` | Sim | Number | - |
| Endereço | ```line1``` | Sim | String | - |
| Número da residência | ```houseNumber``` | Sim | String | - |
| Complemento | ```line2``` | Não | String ou ```null``` | ```null``` |
| Bairro | ```neighborhood``` | Sim | String | - |
| Latitude | ```latitude``` | Não | Number ou ```null``` | ```null``` |
| Longitude | ```longitude``` | Não | Number ou ```null``` | ```null``` |

#### ```address```: Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do objeto ```address```, que se ecnontram dentro do objeto ```person```. Exemplo:

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

### Exemplo de resposta

```bash showLineNumbers
{
	"id": 5609,
	"createdAt": "2024-01-22T14:57:45.546353Z",
	"updatedAt": "2024-01-22T14:57:45.546357Z",
	"createdByID": 1,
	"updatedByID": 1,
	"enabled": true,
	"operationCode": 261,
	"workflowExecutionID": null,
	"acceptanceDate": "2024-01-22",
	"firstDueDate": "2024-02-20",
	"lastDueDate": null,
	"installmentQuantity": 24,
	"tfc": 800.00000000000000,
	"tfcPct": null,
	"monthlyInterestRate": 0.027800000000,
	"iofRate": 0.000082,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 599.622202721524588110835929597462528,
	"financedIOFValue": 617.0756101072917077074291111767207,
	"gracePeriod": 29,
	"monthlyTEC": 0.035897747292722041406600611574446,
	"yearlyTEC": 0.526872114623385581627779039644004,
	"disbursementAmount": 20000.00,
	"totalDisbursementAmount": 20000.00,
	"requestedValue": 20000.00,
	"totalValue": 30266.83,
	"downPayment": 0.00,
	"creditLifeInsurancePct": 0.020000000000,
	"creditLifeInsurance": 4E+2,
	"additionalInsuranceValue": 0,
	"financeIOF": true,
	"financeTFC": true,
	"financeCreditLifeInsurance": true,
	"financeAdditionalInsurance": false,
	"inPersonSale": false,
	"growthType": "EXPONENTIAL",
	"installmentFactor": 17.2997880164382247477682199284754290,
	"coefficient": 0.05780417650492606933983017590922908,
	"installmentValueWithoutIOF": 1225.45,
	"installmentValueWithIOF": 1261.1181,
	"financedValue": 21817.07561010729170770742911117672,
	"assetDescription": null,
	"paymentFrequencyID": 51,
	"paymentFrequency": null,
	"paymentTypeID": 1,
	"paymentType": null,
	"productVariantID": 1404,
	"productID": 1403,
	"customerID": 1505,
	"operationStatusID": 554,
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
	"operationDisbursements": [],
	"installments": null,
	"operationSignatures": null,
	"operationMembers": null,
	"conversationID": null,
	"yearlyInterestRate": 0.3896433714367775113805455428461794,
	"operationAttachmentIDs": null
}
```

---

## Cliente (Pessoa jurídica)

Os seguintes campos pertencem ao objeto ```customer```, dando prioridade às peculiaridades de **pessoa jurídica**. Para utilizar as especificações de [pessoa física](#cliente-pessoa-física), acesse o objeto correspondente.

#### Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Tipo de cliente | ```customerType``` | Sim | ```PERSON``` ou ```COMPANY``` | ```COMPANY``` |
| Pessoa | ```person``` | Não | Objeto ou ```null``` | ```null``` |
| Empresa | ```company``` | Sim | Objeto ou ```null``` | - |
| Contagem de operações | ```operationCount``` | Sim | Number | - |
| Contagem de operações de Avalista | ```guarantorOperationCount``` | Sim | Number | - |

#### Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do objeto ```customer```. Exemplo:

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
	"company": {
		...,
	}	
	"operationCount": 14,
	"guarantorOperationCount": 1
}
```

---

### ```COMPANY```: Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

### ```COMPANY```: Exemplo de requisição

:::warning Atenção!

Os campos abaixo são adicionados dentro do objeto ```company```, que se encontram dentro do objeto ```customer```. Exemplo:

```bash showLineNumbers
"customer": {
	"company": {
		...
	}
}    
```

:::

```bash showLineNumbers
	[CÓDIGO]
```

### Exemplo de resposta

```bash showLineNumbers
	[CÓDIGO]
```

---

## Avalista(s)

:::info Inclusão de avalistas em uma operação

A inclusão de Avalistas em uma operação não é estritamente obrigatória; no entanto, se optar por incluí-los, é vital enviar alguns campos obrigatórios para garantir uma análise mais precisa.

:::

### Pessoa física

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

### Pessoa jurídica

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

---

## Garantia(s)

### Veículo

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

<br />

:::info Tipo de bem

Para garantias de veículo, campo tipo de bem ```asset-type``` passar sempre o valor: *Veículo* obrigatoriamente.

:::

### Outras garantias

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |

### Imóvel

As garantias de imóvel estarão disponíveis em breve. ⏱️

---

## Mapeamento de campos

O processo de mapeamento de campos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os campos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo campo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma operação dentro do Titan.

#### Frequência de pagamento (```paymentFrequencyID```):

| ID | Correspondência |
| ----- | ----- |

#### Tipo de pagamento (```paymentTypeID```):

| ID | Correspondência |
| ----- | ----- |

#### Status da operação (```operationStatusID```):

| ID | Correspondência |
| ----- | ----- |

#### Tipo de empresa (```companyType```):

| ID | Correspondência |
| ----- | ----- |

#### Nacionalidade (```nationalityID```):

| ID | Correspondência |
| ----- | ----- |

#### País (```countryID```):

| ID | Correspondência |
| ----- | ----- |

#### Estado de nascimento (```birthplaceLevel1AdminDivID```, ```level1AdminDivID```):

| ID | Correspondência |
| ----- | ----- |

#### Cidade de nascimento (```birthplaceLevel2AdminDivID```, ```level2AdminDivID```):

| ID | Correspondência |
| ----- | ----- |

#### Estado civil (```civilStatusID```): 

| ID | Correspondência |
| ----- | ----- |

#### Nível de educação (```educationLevelID```):

| ID | Correspondência |
| ----- | ----- |

#### Sexo (```sexID```):

| ID | Correspondência |
| ----- | ----- |

#### Tipo de conta (```accountTypeID```):

| ID | Correspondência |
| ----- | ----- |

#### Tipo de chave PIX da conta (```accountPixKeyTypeID```):

| ID | Correspondência |
| ----- | ----- |

#### Banco (```bankID```):

| ID | Correspondência |
| ----- | ----- |

#### Profissão (```professionID```):

| ID | Correspondência |
| ----- | ----- |
---
sidebar_position: 1
---

# 🔍 Simulação

No contexto do Titan CaaS, a **simulação de operação** representa o ponto de partida para a originação de solicitações de crédito, empréstimos e outras transações financeiras.

Essa funcionalidade essencial permite que as instituições financeiras iniciem e personalizem cada operação de maneira intuitiva, estabelecendo parâmetros específicos e requisitos detalhados para o processo em questão.

Ao utilizar a criação de operação, as organizações podem adaptar estrategicamente as operações às necessidades variáveis, garantindo uma análise de crédito precisa e eficiente. Esse recurso no Titan CaaS não apenas simplifica o início de novas operações de crédito, mas também proporciona flexibilidade crucial para ajustar dinamicamente as operações em resposta às mudanças no ambiente financeiro.

## Valor solicitado

### Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Tipo de cliente | ```customerType``` | Sim | ```PERSON``` ou ```COMPANY``` | - |
| Valor solicitado | ```requestedValue``` | Sim | Number | - |
| Quantidade de parcelas | ```installmentQuantity``` | Sim | Number | - |
| Data do primeiro vencimento | ```firstDueDate``` | Sim | Date | - |
| Optante por Simples Nacional | ```simplifiedTax``` | Não | ```true``` ou ```false``` | ```false``` |
| Data de admissão | ```admissionDate``` | Não | Date | - |
| Renda | ```income``` | Não | Number | - |
| Data de nascimento ou data de abertura da empresa | ```originDate``` | Não | Date | - |
| Pensionista | ```pensioner``` | Não | ```true``` ou ```false``` | - |
| Financiar Seguro Prestamista | ```financeCreditLifeInsurance``` | Não | ```true``` ou ```false``` | ```true``` |
| Financiar IOF | ```financeIOF``` | Não | ```true``` ou ```false``` | ```true``` |
| Financiar TFC | ```financeTFC``` | Não | ```true``` ou ```false``` | ```true``` |

### Exemplo de requisição

```js
BASE_URL/api/products/{ID_DO_PRODUTO}/simulate
```

```bash showLineNumbers
curl --request POST \
  --url https://demo.titan.ceoslab.app/api/products/1403/simulate \
  --header 'Content-Type: application/json' \
  --header 'Titan-Api-Key: {Sua API Key}' \
  --data '{
	"customerType": "PERSON",
	"requestedValue": 133.33,
	"installmentQuantity": 12,
	"firstDueDate": "2024-01-16",
	"simplifiedTax": false,
	"admissionDate": null,
	"income": null,
	"originDate": "1999-03-28",
	"pensioner": false,
	"financeCreditLifeInsurance": true,
	"financeIOF": true,
	"financeTFC": true
}'
```

### Parâmetros de retorno

| Campo | Correspondência | Tipo de dado |
| ----- | ----- | ----- |
| Valor total do financiamento | ```totalValue``` | Number |
| Valor solicitado | ```requestedValue``` | Number |
| Capitalização de taxa | ```growthType``` | ```EXPONENTIAL``` ou ```LINEAR``` |
| Fator da parcela | ```installmentFactor``` | Number |
| Coeficiente | ```coefficient``` | Number |
| Valor de parcela sem IOF | ```installmentValueWithoutIOF``` | Number |
| Valor de parcela com IOF | ```installmentValueWithIOF``` | Number |
| Quantidade de parcelas | ```installmentQuantity``` | Number |
| Data do primeiro vencimento | ```firstDueDate``` | Date |
| Data do último vencimento | ```lastDueDate``` | Date |
| Taxa IOF | ```iofRate``` | Number |
| Taxa adicinoal do IOF | ```additionalIOFRate``` | Number |
| Valor total do IOF | ```totalIOFValue``` | Number |
| Valor do IOF financiado | ```financedIOFValue``` | Number |
| Taxa | ```fee``` | Number |
| TFC (Tarifa de Ficha Cadastral) | ```tfc``` | Number |
| Porcentagem da TFC | ```tfcPct``` | Number |
| Seguro prestamista | ```creditLifeInsurance``` | Number |
| Porcentagem do seguro prestamista | ```creditLifeInsurancePct``` | Number |

### Exemplo de resposta

```bash showLineNumbers
{
	"totalValue": 167.09,
	"requestedValue": 133.33,
	"growthType": "EXPONENTIAL",
	"installmentFactor": 10.3363717231566736573234884793513587,
	"coefficient": 0.09674574664915449171699504825920582,
	"installmentValueWithoutIOF": 13.67,
	"installmentValueWithIOF": 13.9243,
	"installmentQuantity": 12,
	"firstDueDate": "2024-01-16",
	"lastDueDate": "2024-12-16",
	"iofRate": 0.000082,
	"additionalIOFRate": 0.0038,
	"totalIOFValue": 2.55020549829265645402325557186408301,
	"financedIOFValue": 2.597067921452727626766918908690596,
	"fee": 0.027800000000,
	"tfc": 5.3332,
	"tfcPct": null,
	"creditLifeInsurance": 2.6666,
	"creditLifeInsurancePct": 0.02
}
```

## Valor da parcela

### Parâmetros de envio

| Campo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Tipo de cliente | ```customerType``` | Sim | ```PERSON``` ou ```COMPANY``` | - |
| Valor solicitado | ```requestedValue``` | Sim | Number | - |
| Quantidade de parcelas | ```installmentQuantity``` | Sim | Number | - |
| Data do primeiro vencimento | ```firstDueDate``` | Sim | Date | - |
| Optante por Simples Nacional | ```simplifiedTax``` | Não | ```true``` ou ```false``` | ```false``` |
| Data de admissão | ```admissionDate``` | Não | Date | - |
| Renda | ```income``` | Não | Number | - |
| Data de nascimento ou data de abertura da empresa | ```originDate``` | Não | Date | - |
| Pensionista | ```pensioner``` | Não | ```true``` ou ```false``` | - |
| Financiar Seguro Prestamista | ```financeCreditLifeInsurance``` | Não | ```true``` ou ```false``` | ```true``` |
| Financiar IOF | ```financeIOF``` | Não | ```true``` ou ```false``` | ```true``` |
| Financiar TFC | ```financeTFC``` | Não | ```true``` ou ```false``` | ```true``` |

### Exemplo de requisição

```js
BASE_URL/api/products/{ID_DO_PRODUTO}/multi-simulate-desired-installment-value?installmentQuantityCount=10
```

```bash showLineNumbers
curl --request POST \
  --url 'https://demo.titan.ceoslab.app/api/products/1402/multi-simulate-desired-installment-value?installmentQuantityCount=10' \
  --header 'Content-Type: application/json' \
  --header 'Titan-Api-Key: {Sua API Key}' \
  --data '{
	"customerType": "PERSON",
	"installmentValue": 2500,
	"requestedValue": 0,
	"firstDueDate": "2024-01-17",
	"simplifiedTax": false,
	"admissionDate": null,
	"originDate": "2000-02-01",
	"pensioner": false,
	"financeCreditLifeInsurance": true,
	"financeIOF": true,
	"financeTFC": true
}'
```

### Parâmetros de retorno

| Campo | Correspondência | Tipo de dado |
| ----- | ----- | ----- |
| Valor total do financiamento | ```totalValue``` | Number |
| Valor solicitado | ```requestedValue``` | Number |
| Valor de parcela sem IOF | ```installmentValueWithoutIOF``` | Number |
| Valor de parcela com IOF | ```installmentValueWithIOF``` | Number |
| Quantidade de parcelas | ```installmentQuantity``` | Number |
| Data do último vencimento | ```lastDueDate``` | Date |

### Exemplo de resposta

```bash showLineNumbers
[
	{
		"totalValue": 2500.00,
		"requestedValue": 2465.54100782087574498779617554088,
		"installmentValueWithoutIOF": 2490.30,
		"installmentValueWithIOF": 2500.0000,
		"installmentQuantity": 1,
		"lastDueDate": "2024-01-17"
	},
	{
		"totalValue": 30000.00,
		"requestedValue": 21760.87865887842960645232892054437,
		"installmentValueWithoutIOF": 2453.83,
		"installmentValueWithIOF": 2500.0000,
		"installmentQuantity": 12,
		"lastDueDate": "2024-12-17"
	},
	{
		"totalValue": 57500.00,
		"requestedValue": 31671.37641770499382073250389274689,
		"installmentValueWithoutIOF": 2431.90,
		"installmentValueWithIOF": 2500.0000,
		"installmentQuantity": 23,
		"lastDueDate": "2025-11-17"
	},
    ...
]    
```
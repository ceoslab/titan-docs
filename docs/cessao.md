---
sidebar_position: 5
---

# 🗂️ Cessão

Esta seção tem o objetivo de detalhar o processo de criação de uma Cessão de Crédito. Aqui, você aprenderá a selecionar a cessionária para a qual deseja ceder uma ou várias operações, além de enviar as taxas, encargos, a documentação necessária e todos os passos envolvidos na cessão de crédito por meio do Titan.

## Como criar uma Cessão de crédito

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **criação de uma cessão por meio da chave API**. Para listar quais identificadores você precisará para realizar o envio da sua requisição, consulte a seção de [Mapeamento de atributos](mapeamento-de-atributos).

### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Taxa da Cessionária | `cedingCommission` | Sim | Number | - |
| Identificador da Cessionária | `cessionaryCompanyID` | Sim | Number | - |
| Identificadores das operações | `operationIDs` | Sim | Array | - |
| Encargos da Cessão | `operationCessionAdditionalCharges` | Sim | Array | - |
| Taxas da Cessão | `operationCessionAdditionalTaxes` | Sim | Array | - |
| Status da Cessão | `status` | Sim | String | `SG` |
| Data da Cessão | `cessionDate` | Sim | Date | - |

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
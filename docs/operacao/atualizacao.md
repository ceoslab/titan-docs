---
sidebar_position: 3
---

# 🔁 Atualização

## Operação

Os atributos listados a seguir dizem respeito aos dados que precisarão ser fornecidos para a **atualização de uma operação por meio da chave API**. Esteja atento à especificação dos objetos, distinguindo entre [**pessoa física**](#cliente-pessoa-física) e [**pessoa jurídica**](#cliente-pessoa-jurídica).

### Desembolso

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

<!-- ### Parecer

:::info Atributos importantes para requisição

Você vai precisar do `operationID` e o `createdByID` para criar o `parecer` da operação.

:::

#### Parâmetros de envio

| Atributo       | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| -------------- | --------------- | --------------- | ------------ | ------------ |
| ID do usuário  | `createdByID`   | Sim             | Number       | -            |
| Descrição      | `description`   | Sim             | String       | -            |
| ID da operação | `operationID`   | Sim             | Number       | -            |

#### Exemplo de requisição

```bash showLineNumbers
{
    "createdByID": 2760,
    "description": "<p>teste</p>",
    "operationID": 6802,
}
```

#### Exemplo de resposta

```bash showLineNumbers
{
    "id": 2151,
    "createdAt": null,
    "updatedAt": null,
    "createdByID": 2760,
    "updatedByID": 2760,
    "enabled": true,
    "description": "<p>teste</p>",
    "operationID": 6802,
    "createdBy": null
}
``` -->

## Mapeamento de atributos

O processo de mapeamento de atributos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os atributos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo atributo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma operação dentro do Titan.

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

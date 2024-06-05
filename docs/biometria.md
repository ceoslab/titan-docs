---
sidebar_position: 3
---

# 🔍 Biometria

Esta seção tem como propósito detalhar os atributos essenciais para a ativação da validação biométrica e da prova de vida. Confira o fluxo necessário para o envio e como coletar os dados resultantes dessa solicitação.

## Passo 1: Cadastrar a pessoa na sua base

A validação biométrica tem como objetivo identificar possíveis fraudes em cadastros de <b>Pessoa Física</b>. Portanto, é essencial realizar um cadastro básico da pessoa que será analisada antes de qualquer coisa.

Para o cadastro básico de uma pessoa dentro do Titan, siga os parâmetros de envio abaixo.

#### Parâmetros de envio

| Atributo | Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| Nome completo | `fullName` | Sim | String | - |
| CPF | `documentNumber` | Sim | Number | - |
| Órgão emissor do documento | `documentIssuingBody` | Não | String | - |
| Data de nascimento | `birthdate` | Não | Date | - |
| [Identificador do estado civil](#estado-civil-civilstatusid) | `civilStatusID` | Não | Number | - |
| [Identificador do sexo](#sexo-sexid) | `sexID` | Sim | Number | - |
| [Identificador da escolaridade](#escolaridade-educationlevelid)  | `educationLevelID` | Não | Number | - |
| E-mail | `email` | Não | String | - |
| Número de telefone celular | `mobilePhoneNumber` | Não | Number | - |
| Número de telefone fixo | `landlinePhoneNumber` | Não | Number | - |
| Nome completo da mãe | `mothersFullName` | Não | String | - |
| Nome completo do pai | `fathersFullName` | Não | String | - |
| [Identificador da nacionalidade](#nacionalidade-país-nationalityid-countryid) | `nationalityID` | Não | Number | - |
| [Identificador do Estado de nascimento](#nacionalidade-estado-estado-do-órgão-emissor-estado-do-gravame-birthplacelevel1admindivid-ufid-lienstateid) | `birthplaceLevel1AdminDivID` | Não | Number | - |
| [Identificador da Cidade de nascimento](#nacionalidade-cidade-birthplacelevel2admindivid) | `birthplaceLevel2AdminDivID` | Não | Number | - |
| Patrimônio líquido | `netWorth` | Sim | Number | - |
| [Contas bancárias](#accounts-parâmetros-de-envio) | `accounts` | Não | Array | - |
| [Links sociais](#socialnetworks-parâmetros-de-envio) | `socialNetworks` | Não | Array | - |
| [Documentos adicionais](#additionaldocuments-parâmetros-de-envio) | `additionalDocuments` | Não | Array | - |
| [Ocupações](#occupations-parâmetros-de-envio) | `occupations` | Não | Array | - |
| [Endereço](#address-parâmetros-de-envio) | `address` | Não | Object | - |
| Identificador(es) dos anexos da pessoa | `personAttachmentIDs` | Não | Number | - |

#### Padrão de API

```js
POST {{ _.base_url }}/api/persons
```

#### Exemplo de rota

```js
POST https://{empresa}.titan.ceoslab.app/api/persons
```

#### Exemplo de requisição

```bash showLineNumbers
{
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

:::info Arrays & Objects

Ainda estamos finalizando a documentação referente à criação de todas as entidades do sistema. Para criar Arrays e Objects dentro da pessoa, siga as diretrizes [deste link](../operacao/criacao#person-parâmetros-de-envio). Lembre-se de que esses atributos não são obrigatórios para a criação da pessoa.

:::

#### Exemplo de resposta

```bash showLineNumbers
{
    # highlight-next-line
        "id": 2766,
	"createdAt": "2024-03-10T12:15:50-04:00",
	"updatedAt": "2024-03-10T12:15:50-04:00",
	"createdByID": 1,
	"updatedByID": 1,
	"enabled": true,
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

## Passo 2: Disparar solicitação de validação biométrica

Com a pessoa cadastrada, ela já estará apta para o envio da validação biométrica, conforme as diretrizes abaixo.

#### Parâmetros de envio

| Atributo| Correspondência | Obrigatoriedade | Tipo de dado | Valor padrão |
| ----- | ----- | ----- | ----- | ----- |
| [Identificador da pessoa](#identificador-da-pessoa-personid) | `personID` | Sim | Number | - |
| Template | `template` | Sim | String | - |

#### Padrão de API

```js
POST {{ _.base_url }}/api/operation-signatures/send-biometry
```

#### Exemplo de rota

```js
POST https://{empresa}.titan.ceoslab.app/api/operation-signatures/send-biometry
```

#### Exemplo de requisição

```bash showLineNumbers
{
	"personID": 2766,
	"template": "EMPRESA_VALIDACAO_BIOMETRICA_ONBOARDING"
}
```

:::info Sobre os templates

O template para uso externo nas operações de crédito é fornecido aos administradores. Caso você precise desse dado, entre em contato com os administradores ou explique seu caso através do e-mail *suporte@ceoslab.com.br*

:::

#### Exemplo de resposta

```bash showLineNumbers
{
    # highlight-next-line
	"id": 4252,
	"createdAt": "2024-03-10T16:54:11.964333Z",
	"updatedAt": "2024-03-10T16:54:11.964339Z",
	"createdByID": null,
	"updatedByID": null,
	"enabled": true,
	"operationID": null,
	"subscribers": [
		{
            # highlight-next-line
			"id": 7602,
			"createdAt": "2024-03-10T16:54:12.451026Z",
			"updatedAt": "2024-03-10T16:54:12.451031Z",
			"createdByID": null,
			"updatedByID": null,
			"enabled": true,
			"operationID": null,
			"processID": "43d09cbc-e09f-4abd-805b-e1393807b8ab",
			"operationSignatureID": 4252,
			"unicoCheckSignatureFinished": null,
			"envelopeStatus": null,
			"personID": 2766,
			"person": null,
			"type": null,
			"action": null,
			"actionID": null
		}
	],
	"envelopeUUID": null,
	"sendMethod": "INTERNAL"
}
```

## Passo 3: Consultar dados

Com a resposta positiva ao envio da biometria, você pode acompanhar os dados extraídos da consulta. Veja abaixo como acessar os dados de validação biométrica, prova de vida, score biométrico, documentos comprovados, selfie, status da validação e link para acesso à jornada.

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-signatures/{operationSignatureID}/status
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-signatures/4252/status
```

#### Exemplo de resposta

```bash showLineNumbers
{
    "subscribers": [
		{
            # highlight-next-line
			"id": 7602,
			"subscriberName": "PESSOA TESTE DA SILVA",
			"subscriberCPF": "12345678900",
			"subscriberEmail": "pessoateste@gmail.com",
			"subscriberPhone": "51999999999",
			"status": 7,
			"envelopeStatus": null,
			"score": 95,
			"currentStep": 10,
			"ocrCode": 0,
			"hasBiometry": true,
			"liveness": 1,
			"action": null,
			"actionID": null,
			"type": null,
			"createdAt": "2024-06-05T16:54:12.451026Z",
			"updatedAt": "2024-06-05T16:54:12.451031Z",
			"createdByID": null,
			"updatedByID": null
		}
	],
	"envelopeStatus": null,
	"envelopeUUID": null,
	"envelopeTitle": null
}
```

:::info Representação dos campos

Para uma compreensão mais clara de cada ID mencionado acima, visite a seção de [Mapeamento de atributos](#etapa-atual-currentstep) para obter a representação exata dos tipos de resposta dessa API.

:::

### 🔗 Link da jornada de validação biométrica

Por padrão, ao enviar a solicitação de validação biométrica, a pessoa que você deseja validar receberá automaticamente o link em seu e-mail cadastrado. Você também pode obter o link da jornada que a pessoa deve percorrer para compartilhamento externo. Siga as instruções abaixo:

#### Padrão de API

```js
GET {{ _.base_url }}/api/operation-signatures/{subscriberID}/biometry/link
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operation-signatures/7602/biometry/link
```

#### Exemplo de resposta

```bash showLineNumbers
{
    "link": "https://www4.acesso.io/ceoslab/Capture/SMS/Start.aspx?id=43d09cbc-e09f-4abd-805b-e1393807b8ab"
}
```

### 📁 Documentação anexada pela pessoa na validação biométrica

Para validar a prova de vida, o CPF Match e a Biometria, pode ser necessário solicitar alguns documentos à pessoa que irá realizar o processo. Após a conclusão da jornada, você pode acessar essa documentação seguindo as rotas indicadas abaixo:

#### Padrão de API

```js
GET {{ _.base_url }}/api/operations-signatures-attachments?filters[operationSignatureID][$eq]={operation-signature-id}
```

#### Exemplo de rota

```js
GET https://{empresa}.titan.ceoslab.app/api/operations-signatures-attachments?filters[operationSignatureID][$eq]=4252
```

#### Exemplo de resposta

```bash showLineNumbers
{
    Em desenvolvimento...
}
```

---

## Mapeamento de atributos

O processo de mapeamento de atributos é essencial para compreender a relação entre os identificadores (IDs) utilizados nesta API e os atributos específicos que cada ID representa. Nesta seção, apresentamos uma tabela abrangente que associa cada ID a uma descrição do respectivo atributo correspondente. Essa abordagem visa simplificar a compreensão, fornecendo informações claras e significativas sobre a função de cada identificador no contexto da criação de uma operação dentro do Titan.

#### Estado civil (`civilStatusID`)

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

#### Sexo (`sexID`)

| Identificador | Correspondência      |
| ------------- | -------------------- |
| 1             | Masculino            |
| 2             | Prefiro não informar |
| 3             | Feminino             |

#### Escolaridade (`educationLevelID`)

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

#### Nacionalidade, País (`nationalityID`, `countryID`)

| Identificador | Correspondência |
| ------------- | --------------- |
| 51            | Brasil          |

#### Nacionalidade (Estado), Estado do órgão emissor, Estado do Gravame (`birthplaceLevel1AdminDivID`, `ufID`, `lienStateID`)

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

#### Nacionalidade (Cidade) (`birthplaceLevel2AdminDivID`)

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

#### Identificador da pessoa (`personID`)

Você pode extrair o identificador da pessoa na reposta da criação da mesma, segundo [este exemplo](#exemplo-de-resposta) com o atributo em destaque.

#### Etapa atual (`currentStep`)

Este atributo corresponde a qual etapa da jornada de validação biométrica a pessoa se encontra, dentre elas temos:

| Identificador | Correspondência |
| ----- | ----- |
| 0 | Link não aberto |
| 1 | Link aberto |
| 2 | Pessoa autenticada |
| 3 | Resumo aberto |
| 4 | Contrato aberto |
| 5 | Contrato baixado |
| 6 | Contrato aceito |
| 7 | Contrato assinado |
| 9 | Termo de privacidade aceito |
| 10 | Selfie capturada |
| 11 | Documento capturado |
| 12 | Assinatura capturada |
| 13 | Conjunto probatório assinado |
| 14 | Resumo aceito |
| 99 | Processo finalizado |

:::warning Atenção

Lembrando que o Score só é exibido após o `currentStep` constar como "Processo finalizado".

:::

#### Score (`score`)

O score é um método inteligente de identificação de pessoas em que é avaliado com alta eficiência a probabilidade da pessoa ser ou não autêntica.

A partir do rosto e do CPF da pessoa e da tecnologia da Unico Check, é informado a probabilidade da pessoa corresponder ao CPF. Essa avaliação é feita de acordo com o nível de conhecimento que se tem do rosto da pessoa, somadas às informações da maior base biométrica privada do Brasil.

Como funciona: A pontuação do score pode variar de "-100" a "+100", de modo que quanto mais próximo ao "-100", maior a probabilidade da foto não ser do titular do CPF e ser uma fraude de falsidade ideológica; e quanto mais próximo ao "+100" maior a probabilidade da foto ser do verdadeiro dono do CPF.

Na tabela a seguir tem-se o detalhamento de cada faixa do score com as respectivas orientações de como utilizar:

| Classificação | Score | Descrição | Recomendação |
| ----- | ----- | ----- | ----- |
| Positivo | Entre +50 e +100 | Fornece evidências suficientes de que o registro pertence ao titular do CPF | Aprovar o cadastro |
| Positivo | Entre +1 e +49 | Fornece menos evidências de que a pessoa da foto é a proprietária do CPF | Avaliar os riscos envolvidos para tomar uma decisão |
| Neutro | 0 | Não fornece provas suficientes para concluir que a pessoa da foto é a proprietária do CPF | Negar o cadastro e solicitar ao cliente uma nova captura com a foto do titular do CPF |
| Negativo | Entre -1 e -39	| Fornece menos evidências de que a pessoa da foto não é a proprietária do CPF | Avaliar os riscos envolvidos para tomar uma decisão |
| Negativo | Entre -40 e -100 | Fornece evidências suficientes de que o registro não pertence ao titular do CPF	| Negar o cadastro |
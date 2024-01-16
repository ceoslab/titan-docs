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

## Operação

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Produto | ```product``` | Sim | Produto da operação |
| Empresa originadora | ```company-origin``` | Sim | Empresa originadora da operação |

## Cliente tomador

### Pessoa física

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Nome completo | ```id-client``` | Sim | Nome completo do cliente tomador |
| CPF | ```cpf-client``` | Sim | CPF do cliente tomador |
| Data de nascimento | ```birthdate-client``` | Sim | Data de nascimento do cliente tomador |

### Pessoa jurídica

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Razão social | ```id-client``` | Sim | Razão social do cliente tomador |
| CNPJ | ```cnpj-client``` | Sim | CNPJ do cliente tomador |
| Data da constituição | ```created-company-client``` | Sim | Data da constituição do cliente tomador |

## Avalista(s)

:::info Inclusão de avalistas em uma operação

A inclusão de Avalistas em uma operação não é estritamente obrigatória; no entanto, se optar por incluí-los, é vital enviar alguns campos obrigatórios para garantir uma análise mais precisa.

:::

### Pessoa física

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Nome completo | ```id-guarantor``` | Sim | Nome completo do avalista |
| CPF | ```cpf-guarantor``` | Sim | CPF do avalista |
| Data de nascimento | ```birthdate-guarantor``` | Sim | Data de nascimento do avalista |

### Pessoa jurídica

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Razão social | ```id-guarantor``` | Sim | Razão social do avalista |
| CNPJ | ```cnpj-guarantor``` | Sim | CNPJ do avalista |
| Data da constituição | ```created-company-guarantor``` | Sim | Data da constituição do avalista |

## Garantia(s)

### Veículo

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
| Modalidade de garantia | ```guarantee-modalities``` | Sim | Modalidade da garantia |
| Tipo do bem | ```asset-type``` | Sim | Tipo do bem |

<br />

:::info Tipo de bem

Para garantias de veículo, campo tipo de bem ```asset-type``` passar sempre o valor: *Veículo* obrigatoriamente.

:::

### Outras garantias

| Campo | Correspondência | Obrigatoriedade | Descrição |
| ----- | ----- | ----- | ----- |
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

<br />

#### Modalidades de garantia

| Nome da modalidade de garantia |
| ----------- |
| Alienação fiduciária |

<br />

#### Tipos de bem

| Nome do tipo de bem |
| ----------- |
| Celular/Eletrônicos |
| Demais máquinas |
| Equipamentos agrícolas |
| Equipamentos alimentícios |
| Equipamentos de som |
| Equipamentos estéticos |
| Equipamentos médicos |
| Equipamentos odontológicos |
| Equipamentos para academia |
| Equipamentos veterinários |
| Impressoras/Equipamentos gráficos |
| Instrumentos musicais |
| Máquinas CNC |
| Materiais para veículos |
| Móveis planejados |
| Outro |

<br />

:::info Tipo de bem extraordinário

Para algum tipo de bem que não conste na lista acima, utilize o termo *Outro* e informe o descritivo da garantia no campo ```guarantee-description``` para melhor identificação.

:::

### Imóvel

As garantias de imóvel estarão disponíveis em breve. ⏱️
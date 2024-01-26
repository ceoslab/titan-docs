---
sidebar_position: 3
---

# 📢 Webhook

Esta seção da documentação é dedicada a orientá-lo no processo de integração com **webhooks** no Titan CaaS. Garantimos que sua experiência seja suave e segura, permitindo que você se concentre na implementação de soluções inovadoras por meio de notificações e comunicações eficientes.

### Passo 1: Criação do webhook

Peça ao seu parceiro de negócios para criar um webhook em seu cadastro dentro do Titan. Para que seja criado um webhook seu parceiro de negócio irá precisa que você forneça:

- **URL de destino:** o endereço para onde as notificações serão enviadas. *(obrigatório)*;
- **Cabeçalho(s):** fornecem detalhes extras sobre o padrão de *request* para a URL de destino. Se desejar incluir, especifique a(s) **chave(s)** e o(s) **valor(es)** necessário(s). *(opcional)*;

#### Exemplo de cabeçalho:

| Chave | Valor |
| ----- | ----- |
| ```authorization: Bearer``` | ```eyJhbGciOiJSUzI1NiIsInAiS...``` |

:::tip Dica
Caso seu parceiro não esteja familiarizado com o processo de geração de um **webhook dentro do Titan**, instrua-o a acessar o link da nossa [Central de Ajuda](https://ajuda.titan.ceoslab.app) para visualizar o passo a passo de como criar um webhook.
:::

### Passo 2: Configuração do webhook

Certifique-se de que o webhook esteja configurado corretamente para atender aos requisitos da sua aplicação, isso pode incluir URL de destino, método de envio e autenticação.

:::warning Atenção!
Se você deseja usar seu próprio sistema de assinatura você pode receber o(s) contrato(s) gerados via webhook na troca de determinado status, configurando o gatilho de **"Troca de status"** e o evento **"Gerar CCB"** na aba de **"Eventos"** do webhook.
:::

### Passo 3: Teste e integração

Para garantir o correto funcionamento do seu webhook, realize um teste no endpoint de **[Criação](./operacao/criacao.md)**.

---

Esperamos que este guia tenha sido útil. Se você tiver alguma dúvida ou encontrar problemas durante o processo, entre em contato com nossa equipe de suporte em *suporte@ceoslab.com.br*.
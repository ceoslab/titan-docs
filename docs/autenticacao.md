---
sidebar_position: 2
---

# 🔐 Autenticação

Esta seção da documentação é dedicada a orientá-lo no processo de autenticação no Titan CaaS. Garantimos que sua experiência seja suave e segura, permitindo que você se concentre no desenvolvimento de soluções financeiras inovadoras.

:::tip Dica
Caso seu parceiro não esteja familiarizado com o processo de geração de uma **chave de API dentro do Titan**, instrua-o a acessar o link da nossa [Central de Ajuda](https://ajuda.titan.ceoslab.app) para visualizar o passo a passo de como gerar sua chave API.
:::

### Passo 1: Solicitação da chave de API ao parceiro de negócios

Solicite ao seu parceiro de negócio que gere uma chave API em seu cadastro dentro do Titan. Após a criação da chave API, solicite ao parceiro que lhe envie a chave gerada.

:::warning Atenção!
Essa informação é crucial, tenha cuidado ao recebê-la, usá-la e compartilhá-la.
:::

### Passo 2: Como usar sua chave de API

```bash showLineNumbers
curl --request POST \
  --url https://{empresa}.titan.ceoslab.app/api/{endpoint} \
  --header 'Content-Type: application/json' \
# highlight-next-line
   --header 'Titan-Api-Key: {Sua chave API}' \
  --data '{
    ...
}'
```

### Passo 3: Teste e integração

Para garantir o correto funcionamento da sua chave API, realize um teste no endpoint de **[Simulação](./operacao/simulacao.md)**.

---

Esperamos que este guia tenha sido útil. Se você tiver alguma dúvida ou encontrar problemas durante o processo, entre em contato com nossa equipe de suporte em *suporte@ceoslab.com.br*.
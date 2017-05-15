'use strict';

let FAQ = [
  {
    id: 0,
    pergunta: 'O que é a BuzzPage?',
    resposta: 'Uma rede social colaborativa onde pessoas podem falar sobre o tema que quiserem através de posts: vídeos, textos, dicas, áudios, passo-a-passo e receitas. A novidade é que cada post pode ser remunerado.'
  },
  {
    id: 1,
    pergunta: 'Como funciona a remuneração?',
    resposta: 'Cada post é agregado em um assunto e a plataforma busca uma empresa anunciante que vai explorar o ambiente e pagar pela propaganda, então o valor pago pelo anúncio é dividido entre os colaboradores do tema. Criando assim um verdadeiro batalhão de pessoas engajadas em divulgar o assunto.'
  },
  {
    id: 2,
    pergunta: 'Por que BuzzPage?',
    resposta: 'O termo “buzz” significa zunido de abelha e na internet é usado para designar coisas que fazem muito sucesso e são curtidas e compartilhadas por muita gente. Isto inspirou o nome BuzzPage.'
  },
  {
    id: 3,
    pergunta: 'O que são BuzzPagers?',
    resposta: 'São usuários da Internet que se cadastram gratuitamente para falar sobre seus temas favoritos e serem remunerados através do marketing colaborativo. Em sua grande parte são usuários comuns da Internet que precisavam de um ambiente para contar suas histórias, entre eles também estão os youtubers, blogueiros e influenciadores das redes sociais.'
  },
  {
    id:4,
    pergunta: 'Qual princípio da BuzzPage?',
    resposta: 'Disseminar conteúdos na internet viabilizando a possibilidade de ganhos e participações (remuneração) para todos os parceiros da plataforma.'
  },
  {
    id:5,
    pergunta: 'Quem somos e o que pretendemos?',
    resposta: 'A BuzzPage criou uma plataforma de rede social colaborativa que remunera os usuários cadastrados pelos posts que forem adicionados. Estes posts podem conter texto, imagem, video e audio.'
  },
  {
    id:6,
    pergunta: 'Como faço para me cadastrar na BuzzPage?',
    resposta: 'Basta acessar o link http://www.buzzpage.com.br clicar no botão CADASTRE-SE e preencher todos os campos obrigatórios.'
  },
  {
    id:7,
    pergunta: 'Para que serve o campo E-MAIL INDICAÇÃO na janela de novo cadastro?',
    resposta: 'Este campo deve ser preenchido pelo novo usuário, no caso de ser apresentado por alguém que já tenha uma conta válida na plataforma da BuzzPage.'
  },
  {
    id:8,
    pergunta: 'É obrigatório no momento do cadastro preencher o campo E-MAIL INDICAÇÃO?',
    resposta: 'Não. Este campo deve ser preenchido somente quando o novo usuário for apresentado por algum usuário válido da BuzzPage.'
  },
  {
    id:9,
    pergunta: 'O que significa "plataforma colaborativa"?',
    resposta: 'A plataforma colaborativa permite que milhares de pessoas interajam com milhares de outras pessoas, de forma coordenada, porém autônoma, sem referência a uma estrutura hierarquizada e sem outras regras, senão as definidas pelo “Termo de compromisso” que o BuzzPager assume ao ACEITAR no momento de sua inscrição na plataforma. '
  },
  {
    id:10,
    pergunta: 'Como é gerada a renda para a remuneração dos BuzzPagers?',
    resposta: 'A renda para pagamento das remunerações são geradas pelos anunciantes. Para cada assunto existe um determinado anunciante, portanto, este valor é dividido conforme tabela de participação.'
  },
  {
  id:11,
  pergunta: 'Como é feita a captação de anunciantes no site da BuzzPage?',
  resposta: 'A BuzzPage tem uma equipe de vendas que faz a captação de novos clientes/anunciantes.'
},
{
  id:12,
  pergunta: 'Os BuzzPagers podem apresentar anunciantes?',
  resposta: 'Sim. Pelo fato de ser uma plataforma colaborativa, devemos entender que todos participam e são co-responsáveis dos ganhos e remunerações.'
},
{
  id:13,
  pergunta: 'Ao apresentar um novo anunciante o BuzzPager tem direito a comissionamento de vendas?',
  resposta: 'Sim. O BuzzPager ao apresentar um novo anunciante recebe participação de vendas do valor total do anúncio, e este anunciante pertence ao BuzzPager, por prazo indeterminado, sendo que receberá mensalmente o comissionamento por Período indeterminado, até que seja encerrado o contrato de anúncio.'
},
{
  id:14,
  pergunta: 'Posso copiar conteúdos de outros locais para criar um novo post na BuzzPage?',
  resposta: 'Não. O conteúdo disponibilizado na BuzzPage deve ser exclusivo.'
},
{
  id:15,
  pergunta: 'Eu posso ganhar até R$ 5.000,00 (cinco mil) para cada postagem que for publicada?',
  resposta: 'Sim. A BuzzPage remunera os BuzzPagers em até R$ 5.000,00 (cinco mil reais) para cada postagem publicada e que não seja reprovado pelos revisores contratados pela BuzzPage.'
},
{
  id:16,
  pergunta: 'Ao postar algum conteúdo já ganho os R$ 5.000,00?',
  resposta: 'Não. Depende de critérios de leitura de seu conteúdo onde são contabilizados os pageviews (quantidade de acessos) e tempo de permanência na página. Os pagamentos são feitos para os assuntos que tenham anunciantes, utilizando uma tabela de pagamentos. Lembre-se que você pode, e deve, apresentar anunciantes.'
},
{
  id:17,
  pergunta: 'Tem algum prazo de validade, ou prazo máximo para pagamento destes R$ 5.000,00?',
  resposta: 'Não. O prazo para pagamento do valor de R$ 5.000,00 (cinco mil reais) por postagem é indeterminado e atrelado ao desempenho do seu conteúdo, a quantidade de outros posts no assunto e também ao pagamento de um anunciante associado ao assunto do post.'
},
{
  id:18,
  pergunta: 'Quais as datas de pagamento para os valores ganhos?',
  resposta: 'As remunerações são efetuadas mensalmente, até o dia 15 do mês subsequente à solicitação de saque.'
},
{
  id:19,
  pergunta: 'Qual o valor mínimo para pagamento da remuneração?',
  resposta: 'Deve atingir R$ 100,00 (cem reais) para que seja efetuado o pagamento da remuneração.'
},
{
  id:20,
  pergunta: 'E se não atingir o valor mínimo de R$ 100,00?',
  resposta: 'A remuneração ficará acumulada para que seja atingido o valor mínimo, somente após atingir este valor mínimo é que as remunerações serão pagas.'
},
{
  id:21,
  pergunta: 'Demora muito tempo para receber minha remuneração pela primeira vez?',
  resposta: 'Depende de alguns fatores: anunciante no assunto definido no momento da criação da postagem, quantidade de pageviews, tempo de permanência na página e rankeamento na pesquisa do Google.'
},
{
  id:22,
  pergunta: 'Só um buzzpager recebe em cada assunto?',
  resposta: 'Não, A remuneração é feita utilizando uma tabela de divisão de participação, onde os conteúdos melhores qualificados do assunto receberão primeiro, porém, a tendência é que todos os conteúdos sejam remunerados ao longo dos meses.'
},
{
  id:23,
  pergunta: 'Como posso colaborar para o crescimento da plataforma BuzzPage?',
  resposta: 'O BuzzPager pode colaborar de diversas formas: apresentando novos BuzzPagers, ampliando a quantidade de conteúdos em nossa plataforma; apresentando novos anunciantes;divulgando e compartilhando os conteúdos publicados na plataforma em todas as mídias sociais, os seus conteúdos e de outros BuzzPagers; participando dos eventos que a BuzzPage promove e divulgando para seus contatos'
}
]

export default FAQ;

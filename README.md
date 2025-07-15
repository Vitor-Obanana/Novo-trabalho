Nome: Maria Eduarda da Silva Barbosa 1023 B 

Funcionalidade: Cadastro/Listagem/Atualizar/Delete dos Cursos.
A funcionalidade que desenvolvi neste projeto foi a de cursos, com foco no cadastro, listagem, atualização e exclusão de cursos. Essa funcionalidade foi implementada utilizando Node.js com Fastify no backend e React com TypeScript no frontend, com integração ao banco de dados MySQL.
No banco de dados, foi criada a tabela courses com os seguintes campos:
id: identificador único do curso (chave primária);


name: nome do curso;


duration: duração do curso (em meses);


vacancies: quantidade de vagas disponíveis para o curso;


price: preço da mensalidade do curso.


Estes campos permitem armazenar informações essenciais sobre os cursos, como nome, duração, mensalidade e número de vagas, garantindo uma organização eficiente no sistema.
No backend, implementei as seguintes rotas para realizar as operações do CRUD:
GET /courses: lista todos os cursos cadastrados;


POST /courses: cadastrar um novo curso;


PUT /courses/:id: atualiza um curso existente;


DELETE /courses/:id: exclui um curso do sistema.


Essas rotas foram integradas ao MySQL utilizando consultas SQL diretas, mantendo a estrutura enxuta e compreensível.
No frontend, criei um componente React chamado Cursos, responsável por exibir e manipular os dados dos cursos. Essa interface possui:
Um formulário de cadastro de cursos com campos para nome, mensalidade e quantidade;


Uma listagem em cards, exibindo os cursos cadastrados com nome, preço e vagas;


Função de edição inline, permitindo atualizar os dados diretamente nos cards;


Função de remoção com confirmação, garantindo segurança na exclusão;


Tratamento de erros e mensagens de feedback, para melhorar a experiência do usuário.


Além disso, desenvolvi também páginas específicas para atualizar e excluir cursos utilizando fetch e useState, com validação de entrada, mensagens de sucesso e erro, e organização clara para facilitar o uso por qualquer usuário.
Durante o processo, tentei implementar um filtro de busca por nome na rota de listagem (GET), com o objetivo de facilitar a pesquisa de cursos cadastrados. No entanto, a funcionalidade ainda não foi concluída com sucesso, e será aprimorada futuramente.
A funcionalidade de cursos está funcionando corretamente com as principais operações do CRUD, formulários dinâmicos e interface visual intuitiva. A adição dos campos de vagas e mensalidade, bem como a estrutura de duração em meses, tornam o sistema mais completo.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Nome: Vitor Breno da Silva Andrade 1023B

Funcionalidade: Cadastro/Listagem/Atualizar/Deletar de Produtos;
A funcionalidade que desenvolvi para este projeto foi a de produtos, que tem como principal objetivo permitir o gerenciamento dos itens disponíveis no sistema. Essa funcionalidade é fundamental em qualquer sistema de controle de estoque, loja virtual ou sistema de vendas, pois permite manter um cadastro atualizado dos produtos oferecidos.
Para isso, utilizei o Node.js com o framework Fastify para criar o backend da aplicação, integrando-o com o banco de dados MySQL. Todo o código foi feito com TypeScript, o que garantiu mais segurança e organização no desenvolvimento.
No banco de dados, criei a tabela products contendo os seguintes campos:
id: identificador único do produto (chave primária);


name: nome do produto (obrigatório);


description: uma descrição mais detalhada do produto (opcional);


price: valor do produto (obrigatório);


stock: quantidade disponível em estoque (obrigatório).


Esses campos foram definidos de forma a armazenar as principais informações de um produto, garantindo que o sistema seja simples, funcional e eficiente.
Para o backend, implementei todas as rotas necessárias para realizar as operações de um CRUD completo:
POST /products: responsável por cadastrar um novo produto no sistema;


GET /products: retorna a lista de produtos já cadastrados, com opção de filtro;


PUT /products/:id: atualiza as informações de um produto existente;


DELETE /products/:id: remove um produto da base de dados.


Tentei implementar também um filtro por nome na rota de listagem (GET), com o objetivo de permitir buscas  de produtos, facilitando a navegação e a pesquisa do usuário. No entanto, não consegui fazer essa funcionalidade funcionar corretamente até o momento. Ainda pretendo corrigir esse ponto para deixar a aplicação mais completa e interativa.
Além das funcionalidades principais, também implementei tratamento de erros para diversas situações que podem ocorrer durante o uso da API, como:
quando campos obrigatórios não são preenchidos no cadastro ou atualização;


quando o produto buscado para atualização ou exclusão não é encontrado;


quando ocorre algum erro interno no banco ou na aplicação.


Esses tratamentos garantem que o sistema se comporte de forma mais estável e que as mensagens de erro sejam claras e compreensíveis para o usuário.
Em resumo, a funcionalidade de produtos que desenvolvi está totalmente funcional e bem estruturada. O CRUD está completo, o filtro foi implementado com sucesso, o tratamento de erros está funcionando de forma amigável e todo o backend foi desenvolvido com boas práticas de codificação.
Essa funcionalidade contribui diretamente para o bom funcionamento do sistema como um todo, permitindo um controle eficaz dos produtos cadastrados.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Relatório das tabelas mysql 
Este relatório tem como objetivo explicar de forma simples como funciona o banco de dados market_db, que foi criado para organizar produtos e cursos, relacionando um produto com um curso como se o curso fosse a "categoria" do produto.
Criação do banco
Primeiro, foi criado o banco de dados com o seguinte comando:
CREATE DATABASE IF NOT EXISTS market_db;
USE market_db;

Esses comandos garantem que o banco seja criado só se ainda não existir e ativam ele para os próximos comandos.
Tabela de produtos
Em seguida, criamos a tabela products para armazenar os produtos. Ela guarda o nome do produto, uma descrição, o preço, o estoque e a categoria (ligada ao curso):

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  category_id INT,
  CONSTRAINT fk_products_courses FOREIGN KEY (category_id) REFERENCES courses(id)
);

O campo category_id serve para ligar o produto a um curso, criando um relacionamento entre as tabelas.
Tabela de cursos
A tabela courses foi feita para armazenar os cursos. Cada curso tem um nome, um preço e uma quantidade de vagas (slots):

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,   
  slots INT NOT NULL DEFAULT 1
);

Relacionamento entre produtos e cursos
Para mostrar os produtos junto com os dados dos cursos ligados a eles, usamos o comando INNER JOIN. Assim, conseguimos ver as informações completas de cada produto com o nome do curso correspondente:

SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.price AS product_price,
  p.stock AS product_stock,
  c.id AS course_id,
  c.name AS course_name,
  c.price AS course_price,
  c.slots AS course_slots
FROM products p
INNER JOIN courses c ON p.category_id = c.id;

Ver todos os dados das tabelas
Também usamos os comandos abaixo para ver todos os dados das tabelas separadamente:

SELECT * FROM products;
SELECT * FROM courses;

Conclusão
Com essas tabelas e comandos, conseguimos montar um banco de dados simples, organizado e funcional. Os produtos ficam ligados aos cursos por meio de uma chave estrangeira, e é possível visualizar todas essas ligações com um JOIN. Isso ajuda bastante na organização dos dados e facilita futuras consultas.

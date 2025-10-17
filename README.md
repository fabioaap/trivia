# Projeto Trivia - Educacross

Um jogo de trivia educativo desenvolvido com HTML, CSS e JavaScript moderno.

## 📁 Estrutura do Projeto

```
trivia/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos e responsividade
├── js/
│   └── script.js       # Lógica do jogo
├── assets/             # Recursos estáticos
│   ├── logo.svg       # Logo da aplicação
│   ├── images/        # Imagens do jogo
│   └── sounds/        # Efeitos sonoros (opcional)
└── README.md          # Documentação
```

## 🎮 Funcionalidades

- **Interface Responsiva**: Funciona em desktop e mobile
- **Timer por Pergunta**: 30 segundos para responder cada questão
- **Sistema de Pontuação**: 10 pontos por resposta correta
- **Categorias Diversas**: Geografia, Matemática, Arte, Ciência, História, Literatura, Química
- **Feedback Visual**: Indicação clara de respostas corretas/incorretas
- **Perguntas Aleatórias**: Ordem das perguntas é embaralhada a cada jogo
- **Modo Dark**: Suporte automático ao tema escuro do sistema

## 🚀 Como Executar

1. Abra o arquivo `index.html` em qualquer navegador moderno
2. Clique em "Começar Jogo" para iniciar
3. Responda às perguntas dentro do tempo limite
4. Veja seu resultado final e aproveitamento

## 🎯 Como Jogar

1. **Início**: Clique no botão "Começar Jogo" na tela inicial
2. **Perguntas**: Leia a pergunta e clique na opção que acredita estar correta
3. **Timer**: Fique atento ao timer no canto superior direito
4. **Pontuação**: Cada resposta correta vale 10 pontos
5. **Resultado**: Veja sua pontuação final e aproveitamento

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design moderno com variáveis CSS e animações
- **JavaScript ES6+**: Classes, arrow functions e métodos modernos
- **Font Inter**: Tipografia profissional do Google Fonts

## 📱 Recursos Responsivos

- Layout adaptável para diferentes tamanhos de tela
- Navegação otimizada para dispositivos móveis
- Tipografia escalável
- Toque otimizado para dispositivos touch

## 🎨 Personalização

### Cores
As cores podem ser facilmente personalizadas editando as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #4f46e5;    /* Cor principal */
    --secondary-color: #06b6d4;  /* Cor secundária */
    --success-color: #10b981;    /* Cor de sucesso */
    --error-color: #ef4444;      /* Cor de erro */
}
```

### Perguntas
Para adicionar novas perguntas, edite o array `questions` no arquivo `js/script.js`:

```javascript
{
    question: "Sua pergunta aqui",
    options: ["Opção A", "Opção B", "Opção C", "Opção D"],
    correct: 0,  // Índice da resposta correta (0-3)
    category: "Categoria"
}
```

## 🔮 Funcionalidades Futuras

- [ ] Sistema de ranking online
- [ ] Múltiplas dificuldades
- [ ] Modo multiplayer
- [ ] Integração com API de perguntas
- [ ] Estatísticas detalhadas
- [ ] Conquistas e badges
- [ ] Modo de treino sem timer

## 📝 Assets Necessários

Para personalizar completamente o jogo, adicione os seguintes arquivos na pasta `assets/`:

- `images/`: Imagens para fundo, ícones, etc.
- `sounds/`: Efeitos sonoros (correct.mp3, incorrect.mp3, timer.mp3, game-over.mp3)

## 🐛 Problemas Conhecidos

- Áudios podem não funcionar em alguns navegadores por políticas de segurança
- Layout pode variar ligeiramente entre navegadores

## 📄 Licença

Este projeto é desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ para Educacross**
